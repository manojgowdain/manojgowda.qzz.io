export function adminAuth(req, res, next) {
  // Hardcoded credentials
  const ADMIN_EMAIL = "mail@manojgowda.in";
  const ADMIN_PASS = "Manoj@2002";

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Admin Dashboard"');
    return res.status(401).send("Authentication required.");
  }

  const base64 = authHeader.split(" ")[1];
  const decoded = Buffer.from(base64, "base64").toString("utf8");
  const [email, password] = decoded.split(":");

  if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
    return next(); // Auth success
  }

  res.setHeader("WWW-Authenticate", 'Basic realm="Admin Dashboard"');
  return res.status(401).send("Invalid credentials.");
}
