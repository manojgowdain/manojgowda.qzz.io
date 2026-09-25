import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

export default function Linkedin() {
  const navigate = useNavigate();
  const linkedinProfileUrl = "https://www.linkedin.com/in/manojgowdain";

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      window.open(linkedinProfileUrl, "_blank"); // Open LinkedIn in new tab
      navigate("/"); // Redirect current tab back home
    }, 2000);

    return () => clearTimeout(redirectTimer); // cleanup
  }, [navigate]);

  return (
    <div
      style={{
        backgroundColor: "#0A66C2", // LinkedIn blue
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
        <title>
          Manoj Gowda | LinkedIn Profile - Full Stack Developer & DevOps
          Engineer
        </title>
        <meta
          name="description"
          content="Connect with Manoj Gowda on LinkedIn – Full Stack Developer & DevOps Engineer from Bengaluru, India. Specializing in MERN stack, IoT systems, fintech, and cloud solutions."
        />
        <meta
          name="keywords"
          content="
      Manoj Gowda LinkedIn, LinkedIn Manoj Gowda, Manoj Gowda profile LinkedIn,
      Manoj Gowda developer LinkedIn, Full Stack Developer LinkedIn, MERN Stack LinkedIn,
      IoT Developer LinkedIn, DevOps Engineer LinkedIn, Fintech Developer LinkedIn,
      Software Engineer LinkedIn, React LinkedIn, Node.js LinkedIn,
      MongoDB LinkedIn, Cloud Engineer LinkedIn, Bangalore LinkedIn Developer,
      Bengaluru LinkedIn Tech, manojgowda.in LinkedIn
    "
        />
        <meta name="author" content="Manoj Gowda" />
        <link rel="canonical" href="https://manojgowda.in/linkedin" />

        {/* Open Graph (for LinkedIn/FB/WhatsApp sharing) */}
        <meta property="og:title" content="Manoj Gowda | LinkedIn Profile" />
        <meta
          property="og:description"
          content="Discover Manoj Gowda on LinkedIn – MERN stack developer, IoT enthusiast, fintech software engineer, and DevOps specialist."
        />
        <meta property="og:url" content="https://manojgowda.in/linkedin" />
        <meta property="og:type" content="website" />

        {/* Twitter Card (for X/Twitter preview) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Manoj Gowda | LinkedIn Profile" />
        <meta
          name="twitter:description"
          content="Connect with Manoj Gowda on LinkedIn – Full Stack Developer & DevOps Engineer specializing in MERN, IoT, fintech, and cloud solutions."
        />
      </Helmet>

      {/* LinkedIn Logo (SVG) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        fill="white"
        viewBox="0 0 24 24"
        style={{ marginBottom: "24px" }}
      >
        <path
          d="M19 0h-14c-2.761 
        0-5 2.239-5 5v14c0 2.761 
        2.239 5 5 5h14c2.762 0 5-2.239 
        5-5v-14c0-2.761-2.238-5-5-5zm-11 
        19h-3v-10h3v10zm-1.5-11.268c-.966 
        0-1.75-.79-1.75-1.764s.784-1.764 
        1.75-1.764c.965 0 1.75.79 
        1.75 1.764s-.785 1.764-1.75 
        1.764zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 
        0-2.155 1.46-2.155 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.759 
        1.379-1.56 2.839-1.56 3.037 0 
        3.6 2.001 3.6 4.599v5.594z"
        />
      </svg>

      <h1 style={{ fontSize: "28px", marginBottom: "16px" }}>
        Redirecting to LinkedIn...
      </h1>

      <p style={{ fontSize: "16px", maxWidth: "500px", marginBottom: "24px" }}>
        You'll be redirected to Manoj Gowda's LinkedIn profile in a moment. If
        you're not redirected automatically, please click the button below.
      </p>

      <a
        href={linkedinProfileUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: "white",
          color: "#0A66C2",
          padding: "10px 20px",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Visit LinkedIn Profile
      </a>
    </div>
  );
}
