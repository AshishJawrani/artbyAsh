import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log(`Received enquiry from ${name} (${email}): ${subject}`);

    try {
      if (resend) {
        await resend.emails.send({
          from: "Art Portfolio <onboarding@resend.dev>",
          to: process.env.CONTACT_EMAIL || "artby.ash29@gmail.com",
          subject: `New Art Inquiry: ${subject || "No Subject"}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          replyTo: email,
        });
        return res.json({ success: true, message: "Email sent successfully" });
      } else {
        // Fallback if no API key is provided - log to console and return success
        // In a real app, you'd want to save to a database here
        console.warn("RESEND_API_KEY not found. Email not sent, but enquiry logged.");
        return res.json({ 
          success: true, 
          message: "Enquiry received (Demo Mode: Email not sent as API key is missing)",
          demo: true 
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
