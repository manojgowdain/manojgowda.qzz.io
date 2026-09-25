import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
});

export function decodeBasicAuth(authHeader) {
  if (!authHeader || !authHeader.startsWith("Basic ")) return null;
  const base64 = authHeader.split(" ")[1];
  const decoded = Buffer.from(base64, "base64").toString("utf8");
  const [username, password] = decoded.split(":");
  return { username, password };
}

export async function handleContact(req, res) {
  try {
    const auth = decodeBasicAuth(req.headers.authorization);
    if (!auth) return res.status(401).json({ success: false, error: "Unauthorized" });

    const { username: userEmail, password } = auth;

    if (!password.includes("|")) return res.status(400).json({ success: false, error: "Password format invalid" });

    const [name, subject, message] = password.split("|");
    if (!name || !subject || !message) return res.status(400).json({ success: false, error: "All fields required" });

    // Send to you
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.ZOHO_EMAIL}>`,
      to: "manojgowdabr89@gmail.com",
      subject: `📩 New Enquiry from ${name}`,
      html: `
        <h2>New Enquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${userEmail}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
        <hr/>
        <p>Contact page secured with Basic Auth + Rate Limiting.</p>
      `,
    });

    // Auto-reply
    await transporter.sendMail({
      from: `"Manoj Gowda" <${process.env.ZOHO_EMAIL}>`,
      to: userEmail,
      subject: "✅ Thank you for approaching me",
      text: `Hello ${name}, Thank you for approaching me through my portfolio.`,
    });

    res.json({ success: true, message: "Enquiry processed successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
