import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const Github = () => {
  const navigate = useNavigate();
  const githubProfileUrl = "https://github.com/manojgowdain";

  useEffect(() => {
    // Set a small timeout to allow users to see the redirect message
    const redirectTimer = setTimeout(() => {
      // Open GitHub profile in a new tab
      window.open(githubProfileUrl, "_blank");
      // Navigate back to home page
      navigate("/");
    }, 2000);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div
      style={{
        backgroundColor: "#0d1117",
        color: "#c9d1d9",
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
          Manoj Gowda | GitHub Profile - Full Stack Developer & DevOps Engineer
        </title>
        <meta
          name="description"
          content="Explore Manoj Gowda's GitHub profile showcasing MERN stack projects, IoT applications, fintech solutions, and DevOps engineering. Full Stack Developer from Bengaluru, India."
        />
        <meta
          name="keywords"
          content="
      Manoj Gowda GitHub, GitHub Manoj Gowda, Manoj Gowda profile GitHub,
      Manoj Gowda developer GitHub, Full Stack Developer GitHub, MERN stack GitHub,
      IoT developer GitHub, fintech developer GitHub, DevOps engineer GitHub,
      JavaScript GitHub, React GitHub, Node.js GitHub, MongoDB GitHub,
      Bangalore GitHub developer, Bengaluru GitHub portfolio, manojgowda.qzz.io GitHub
    "
        />
        <meta name="author" content="Manoj Gowda" />
        <link rel="canonical" href="https://manojgowda.qzz.io/github" />

        {/* Open Graph (for LinkedIn/FB/WhatsApp sharing) */}
        <meta property="og:title" content="Manoj Gowda | GitHub Profile" />
        <meta
          property="og:description"
          content="Discover projects by Manoj Gowda – Full Stack Developer & DevOps Engineer specializing in MERN, IoT, fintech, and cloud solutions."
        />
        <meta property="og:url" content="https://manojgowda.qzz.io/github" />
        <meta property="og:type" content="website" />

        {/* Twitter Card (for better preview on X/Twitter) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Manoj Gowda | GitHub Profile" />
        <meta
          name="twitter:description"
          content="View Manoj Gowda's GitHub – showcasing MERN stack, IoT, fintech, and cloud projects."
        />
      </Helmet>

      <svg
        height="64"
        aria-hidden="true"
        viewBox="0 0 16 16"
        version="1.1"
        width="64"
        data-view-component="true"
        style={{ fill: "white", marginBottom: "24px" }}
      >
        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
      </svg>

      <h1 style={{ fontSize: "28px", marginBottom: "16px" }}>
        Redirecting to GitHub...
      </h1>

      <p style={{ fontSize: "16px", maxWidth: "500px", marginBottom: "24px" }}>
        You'll be redirected to Manoj Gowda's GitHub profile in a moment. If
        you're not redirected automatically, please click the button below.
      </p>

      <a
        href={githubProfileUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: "#238636",
          color: "white",
          padding: "10px 20px",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Visit GitHub Profile
      </a>
    </div>
  );
};

export default Github;
