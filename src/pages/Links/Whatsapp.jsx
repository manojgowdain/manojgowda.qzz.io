import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

export default function Whatsapp() {
  const navigate = useNavigate();
  const whatsappUrl = "https://wa.me/9513849323"; // your WhatsApp link

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      window.open(whatsappUrl, "_blank"); // Open WhatsApp chat
      navigate("/"); // Go back home
    }, 2000);

    return () => clearTimeout(redirectTimer); // cleanup
  }, [navigate]);

  return (
    <div
      style={{
        backgroundColor: "#25D366", // WhatsApp green
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
          Manoj Gowda | WhatsApp Contact - Full Stack Developer & DevOps
          Engineer
        </title>
        <meta
          name="description"
          content="Chat with Manoj Gowda directly on WhatsApp. Full Stack Developer & DevOps Engineer from Bengaluru, India specializing in MERN stack, IoT, fintech, and cloud solutions."
        />
        <meta
          name="keywords"
          content="
      Manoj Gowda WhatsApp, WhatsApp Manoj Gowda, contact Manoj Gowda WhatsApp,
      Manoj Gowda developer WhatsApp, Full Stack Developer WhatsApp, MERN Stack WhatsApp,
      IoT Engineer WhatsApp, DevOps Engineer WhatsApp, Fintech Developer WhatsApp,
      Software Engineer WhatsApp, React Developer WhatsApp, Node.js WhatsApp,
      MongoDB WhatsApp, Cloud Engineer WhatsApp, Bangalore WhatsApp Developer,
      Bengaluru WhatsApp Tech, manojgowda.in WhatsApp
    "
        />
        <meta name="author" content="Manoj Gowda" />
        <link rel="canonical" href="https://manojgowda.in/whatsapp" />

        {/* Open Graph (for WhatsApp/LinkedIn/FB sharing) */}
        <meta property="og:title" content="Manoj Gowda | WhatsApp Contact" />
        <meta
          property="og:description"
          content="Connect with Manoj Gowda instantly on WhatsApp – Full Stack Developer & DevOps Engineer specializing in MERN, IoT, fintech, and cloud solutions."
        />
        <meta property="og:url" content="https://manojgowda.in/whatsapp" />
        <meta property="og:type" content="website" />

        {/* Twitter Card (for X/Twitter preview) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Manoj Gowda | WhatsApp Contact" />
        <meta
          name="twitter:description"
          content="Chat with Manoj Gowda via WhatsApp – MERN stack developer, DevOps engineer, and IoT enthusiast."
        />
      </Helmet>

      {/* WhatsApp Logo */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 32 32"
        fill="white"
        style={{ marginBottom: "24px" }}
      >
        <path
          d="M16.002 3c-7.167 0-13 5.832-13 12.998 
        0 2.291.605 4.523 1.75 6.5L3 29l6.668-1.715A12.9 
        12.9 0 0 0 16.002 29c7.167 0 13-5.832 
        13-12.998S23.169 3 16.002 3zm0 
        23.715a10.67 10.67 0 0 1-5.438-1.5l-.39-.232-3.957 
        1.016 1.063-3.855-.25-.398a10.68 10.68 0 0 1-1.667-5.633c0-5.91 
        4.81-10.717 10.72-10.717 2.867 0 5.555 
        1.117 7.582 3.145a10.65 10.65 0 0 1 3.137 
        7.57c0 5.91-4.809 10.717-10.8 10.717zm5.941-8.066c-.324-.162-1.91-.945-2.207-1.055-.297-.109-.516-.162-.734.163s-.844 
        1.055-1.035 1.273c-.191.215-.381.242-.707.08s-1.383-.51-2.635-1.623c-.973-.867-1.629-1.938-1.82-2.266-.191-.324-.02-.5.145-.661.148-.145.324-.381.488-.57.162-.191.215-.324.324-.543.109-.215.055-.406-.027-.57-.08-.162-.733-1.77-1.004-2.426-.262-.629-.527-.543-.734-.553-.191-.008-.406-.01-.625-.01-.215 
        0-.57.082-.867.406s-1.137 1.11-1.137 2.707 1.164 3.145 
        1.324 3.363c.162.215 2.293 3.5 5.555 4.91.777.334 
        1.381.533 1.855.68.779.248 1.488.213 2.051.129.625-.094 
        1.91-.781 2.18-1.535.27-.754.27-1.4.189-1.535-.08-.135-.297-.215-.621-.377z"
        />
      </svg>

      <h1 style={{ fontSize: "28px", marginBottom: "16px" }}>
        Redirecting to WhatsApp...
      </h1>

      <p style={{ fontSize: "16px", maxWidth: "500px", marginBottom: "24px" }}>
        You'll be redirected to Manoj Gowda's WhatsApp chat in a moment. If
        you're not redirected automatically, please click the button below.
      </p>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: "white",
          color: "#25D366",
          padding: "10px 20px",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Chat on WhatsApp
      </a>
    </div>
  );
}
