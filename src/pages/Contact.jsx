import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const EMAIL_API = "https://email-api.manojgowda.qzz.io";
const PROVISIONING_KEY = "asd4as5s4d5a4d5a45d4a54d5a65d45";
const API_KEY = "sd4a4da4d64as6d46sa46d46a46d64ad";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [tempToken, setTempToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGettingToken, setIsGettingToken] = useState(true);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Generate temporary token when contact page loads
  useEffect(() => {
    const generateToken = async () => {
      try {
        setIsGettingToken(true);

        const response = await axios.post(
          `${EMAIL_API}/auth/token`,
          {},
          {
            headers: {
              "X-Provisioning-Key": PROVISIONING_KEY,
            },
          }
        );

        if (response.data.success && response.data.token) {
          setTempToken(response.data.token);

          console.log("Temporary email token generated");
          console.log("Expires:", response.data.expires_at);
        } else {
          throw new Error("Failed to generate temporary token");
        }
      } catch (error) {
        console.error("Token generation failed:", error);

        setSubmitStatus({
          type: "error",
          text: "Unable to initialize contact form. Please refresh the page.",
        });
      } finally {
        setIsGettingToken(false);
      }
    };

    generateToken();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateNewToken = async () => {
    try {
      const response = await axios.post(
        `${EMAIL_API}/auth/token`,
        {},
        {
          headers: {
            "X-Provisioning-Key": PROVISIONING_KEY,
          },
        }
      );

      if (response.data.success && response.data.token) {
        setTempToken(response.data.token);
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tempToken) {
      setSubmitStatus({
        type: "error",
        text: "Contact form is not ready yet. Please refresh the page.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const { name, email, phone, subject, message } = formData;

    try {
      const response = await axios.post(
        `${EMAIL_API}/email/send`,
        {
          email: {
            from: "Manoj <manojgowda@in.iotkit.in>",
            to: [email, "mail@manojgowda.in"],
            subject: subject,
            html: `
              <h2>New Contact Form Message</h2>

              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Subject:</strong> ${subject}</p>

              <hr />

              <h3>Message</h3>
              <p>${message}</p>
            `,
            reply_to: email,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": API_KEY,
            Authorization: `Bearer ${tempToken}`,
          },
        }
      );

      if (response.data.success) {
        setSubmitStatus({
          type: "success",
          text: "Message sent successfully!",
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        // Generate fresh token after successful submission
        generateNewToken();
      } else {
        setSubmitStatus({
          type: "error",
          text:
            response.data.message ||
            "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      console.error("Email send error:", error);

      if (error.response?.status === 401) {
        setSubmitStatus({
          type: "error",
          text: "Your contact session expired. Please refresh the page.",
        });
      } else if (error.response?.status === 429) {
        setSubmitStatus({
          type: "warning",
          text: "Too many requests. Please try again later.",
        });
      } else {
        setSubmitStatus({
          type: "error",
          text:
            error.response?.data?.message ||
            "Something went wrong. Please try again later.",
        });
      }
    } finally {
      setIsSubmitting(false);

      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  return (
    <div className="section">
      <Helmet>
        <title>
          Contact Manoj Gowda | Full Stack Developer, MERN Specialist & DevOps
          Engineer
        </title>

        <meta
          name="description"
          content="Get in touch with Manoj Gowda – Full Stack Developer & DevOps Engineer."
        />
      </Helmet>

      <div className="container">
        <div className="fade-in">
          <div className="section-header">
            <h1 className="section-title">
              📫 <span className="gradient-text">Get In Touch</span>
            </h1>

            <p className="section-subtitle">
              Let's discuss your next project or collaboration opportunity
            </p>
          </div>

          <div className="contact-grid grid grid-2">
            {/* Contact information */}
            <div className="contact-info-section">
              <div className="card">
                <h3 className="card-title">Let's Connect</h3>

                <p className="contact-intro">
                  I'm always interested in new opportunities, interesting
                  projects, and great conversations.
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div className="contact-form-section">
              <div className="card">
                <h3 className="card-title">Send Message</h3>

                {submitStatus && (
                  <div
                    className={`form-message ${
                      submitStatus.type === "success"
                        ? "success"
                        : submitStatus.type === "warning"
                        ? "warning"
                        : "error"
                    }`}
                  >
                    {submitStatus.text}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="contact-form">
                  {/* Name */}
                  <div className="form-group">
                    <label htmlFor="name">Name</label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="email">Email</label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Phone */}
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>

                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="+91 9876543210"
                      pattern="[+]?[0-9\s-]{10,15}"
                    />
                  </div>

                  {/* Subject */}
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>

                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Enter subject"
                    />
                  </div>

                  {/* Message */}
                  <div className="form-group">
                    <label htmlFor="message">Message</label>

                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="form-textarea"
                      placeholder="Write your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={
                      isSubmitting || isGettingToken || !tempToken
                    }
                    className={`btn btn-primary submit-btn ${
                      isSubmitting ? "submitting" : ""
                    }`}
                  >
                    {isGettingToken
                      ? "Initializing..."
                      : isSubmitting
                      ? "Sending..."
                      : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

