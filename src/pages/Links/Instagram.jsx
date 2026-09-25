import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

export default function Instagram() {
  const navigate = useNavigate();
  const instagramProfileUrl = "https://www.instagram.com/manojgowda.in";

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      window.open(instagramProfileUrl, "_blank"); // Open Instagram in new tab
      navigate("/"); // Redirect current tab back home
    }, 2000);

    return () => clearTimeout(redirectTimer); // cleanup
  }, [navigate]);

  return (
    <div
      style={{
        backgroundColor: "#000000",
        color: "#ffffff",
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
          Manoj Gowda | Instagram Profile - Full Stack Developer & DevOps
          Engineer
        </title>
        <meta
          name="description"
          content="Follow Manoj Gowda on Instagram – Full Stack Developer & DevOps Engineer from Bengaluru, India. Explore MERN stack projects, IoT innovations, fintech apps, and personal updates."
        />
        <meta
          name="keywords"
          content="
      Manoj Gowda Instagram, Instagram Manoj Gowda, Manoj Gowda profile Instagram,
      Manoj Gowda developer Instagram, Full Stack Developer Instagram, MERN Stack Instagram,
      IoT Engineer Instagram, DevOps Engineer Instagram, Fintech Developer Instagram,
      Software Engineer Instagram, React Developer Instagram, Node.js Instagram,
      MongoDB Instagram, Cloud Engineer Instagram, Bangalore Instagram Developer,
      Bengaluru Instagram Tech, manojgowda.qzz.io Instagram
    "
        />
        <meta name="author" content="Manoj Gowda" />
        <link rel="canonical" href="https://manojgowda.qzz.io/instagram" />

        {/* Open Graph (for LinkedIn/FB/WhatsApp sharing) */}
        <meta property="og:title" content="Manoj Gowda | Instagram Profile" />
        <meta
          property="og:description"
          content="Discover Instagram updates from Manoj Gowda – MERN stack developer, IoT enthusiast, fintech software engineer, and DevOps specialist."
        />
        <meta property="og:url" content="https://manojgowda.qzz.io/instagram" />
        <meta property="og:type" content="website" />

        {/* Twitter Card (for better preview on X/Twitter) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Manoj Gowda | Instagram Profile" />
        <meta
          name="twitter:description"
          content="Follow Manoj Gowda on Instagram for project updates, IoT innovations, fintech apps, and developer insights."
        />
      </Helmet>

      {/* Instagram Logo (SVG) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="white"
        style={{ marginBottom: "24px" }}
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.344 3.608 1.319.975.975 1.257 2.242 1.319 3.608.058 1.266.07 1.646.07 4.84s-.012 3.574-.07 4.84c-.062 1.366-.344 2.633-1.319 3.608-.975.975-2.242 1.257-3.608 1.319-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.344-3.608-1.319-.975-.975-1.257-2.242-1.319-3.608C2.175 15.574 2.163 15.194 2.163 12s.012-3.574.07-4.84c.062-1.366.344-2.633 1.319-3.608.975-.975 2.242-1.257 3.608-1.319C8.416 2.175 8.796 2.163 12 2.163zm0 1.687c-3.17 0-3.548.012-4.796.07-1.026.047-1.58.216-1.948.385-.49.213-.84.47-1.21.84-.37.37-.627.72-.84 1.21-.169.368-.338.922-.385 1.948-.058 1.248-.07 1.626-.07 4.796s.012 3.548.07 4.796c.047 1.026.216 1.58.385 1.948.213.49.47.84.84 1.21.37.37.72.627 1.21.84.368.169.922.338 1.948.385 1.248.058 1.626.07 4.796.07s3.548-.012 4.796-.07c1.026-.047 1.58-.216 1.948-.385.49-.213.84-.47 1.21-.84.37-.37.627-.72.84-1.21.169-.368.338-.922.385-1.948.058-1.248.07-1.626.07-4.796s-.012-3.548-.07-4.796c-.047-1.026-.216-1.58-.385-1.948a3.414 3.414 0 0 0-.84-1.21 3.414 3.414 0 0 0-1.21-.84c-.368-.169-.922-.338-1.948-.385-1.248-.058-1.626-.07-4.796-.07zm0 3.905a5.932 5.932 0 1 1 0 11.864 5.932 5.932 0 0 1 0-11.864zm0 1.687a4.245 4.245 0 1 0 0 8.49 4.245 4.245 0 0 0 0-8.49zm6.406-2.87a1.386 1.386 0 1 1-2.772 0 1.386 1.386 0 0 1 2.772 0z" />
      </svg>

      <h1 style={{ fontSize: "28px", marginBottom: "16px" }}>
        Redirecting to Instagram...
      </h1>

      <p style={{ fontSize: "16px", maxWidth: "500px", marginBottom: "24px" }}>
        You'll be redirected to Manoj Gowda's Instagram profile in a moment. If
        you're not redirected automatically, please click the button below.
      </p>

      <a
        href={instagramProfileUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: "#E1306C",
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
        Visit Instagram Profile
      </a>
    </div>
  );
}
