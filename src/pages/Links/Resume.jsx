import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

export default function Resume() {
  const navigate = useNavigate();
  const resumeFileUrl = "/manojgowda.in.pdf";

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      window.open(resumeFileUrl, "_blank"); // open PDF in new tab
      navigate("/"); // send user back home in current tab
    }, 2000);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        color: "white",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 20px",
      }}
    >
      <Helmet>
        <title>Download Resume | Manoj Gowda - Team Lead & Software Engineer</title>
        <meta
          name="description"
          content="Download the resume of Manoj Gowda – Team Lead and Software Engineer from Bengaluru, India with 2.5+ years of experience in full-stack development, DevOps, IoT platforms, and cloud infrastructure."
        />
        <meta
          name="keywords"
          content="Manoj Gowda resume, Manoj Gowda CV, Full Stack Developer resume, MERN stack resume, React developer resume, Node.js resume, Bangalore developer resume, Bengaluru software engineer CV, cloud engineer resume, fintech developer CV"
        />
        <meta name="author" content="Manoj Gowda" />
        <link rel="canonical" href="https://manojgowda.qzz.io/resume" />

        {/* Open Graph (Facebook, LinkedIn, WhatsApp) */}
        <meta property="og:title" content="Manoj Gowda | Resume Download" />
        <meta
          property="og:description"
          content="Get Manoj Gowda's resume – Team Lead and Software Engineer with 2.5+ years of experience in full-stack development, DevOps, IoT platforms, and cloud infrastructure."
        />
        <meta property="og:url" content="https://manojgowda.qzz.io/resume" />
        <meta property="og:type" content="article" />
        <meta property="og:file" content="https://manojgowda.qzz.io/manojgowda.in.pdf" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Manoj Gowda | Resume Download" />
        <meta
          name="twitter:description"
          content="Download the resume of Manoj Gowda – Full Stack Developer & DevOps Engineer from Bengaluru, India."
        />
      </Helmet>

      {/* Resume Icon (Document) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        fill="white"
        viewBox="0 0 24 24"
        style={{ marginBottom: "24px" }}
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16c0 
        1.1.9 2 2 2h12a2 2 0 0 0 
        2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
      </svg>

      <h1 style={{ fontSize: "28px", marginBottom: "16px" }}>
        Preparing Resume Download...
      </h1>

      <p style={{ fontSize: "16px", maxWidth: "500px", marginBottom: "24px" }}>
        You’ll be redirected shortly to download Manoj Gowda’s resume. If the
        download doesn’t start automatically, please use the button below.
      </p>

      <a
        href={resumeFileUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: "white",
          color: "#1a1a1a",
          padding: "10px 20px",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Download Resume (PDF)
      </a>
    </div>
  );
}
