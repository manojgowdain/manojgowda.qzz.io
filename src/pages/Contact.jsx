import { useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // { type: 'success'|'error'|'warning', text: '...' }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, email, subject, message } = formData;

    try {
      const authString = btoa(`${email}:${name}|${subject}|${message}`);
      const response = await axios.get(
        "https://api-email.manojgowda.in/contact",
        {
          headers: { Authorization: `Basic ${authString}` },
        }
      );

      if (response.data.success) {
        setSubmitStatus({ type: "success", text: response.data.message });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else if (
        response.data.message?.toLowerCase().includes("too many requests")
      ) {
        setSubmitStatus({
          type: "warning",
          text: "You already submitted, please try after some time.",
        });
      } else {
        setSubmitStatus({
          type: "error",
          text:
            response.data.message ||
            "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus({
        type: "error",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      value: "mail@manojgowda.in",
      link: "mailto:mail@manojgowda.in",
    },
    {
      icon: "🌐",
      title: "Website",
      value: "manojgowda.in",
      link: "https://www.manojgowda.in",
    },
    {
      icon: "💼",
      title: "LinkedIn",
      value: "manojgowdain",
      link: "https://linkedin.com/in/manojgowdain",
    },
    {
      icon: "⚡",
      title: "GitHub",
      value: "manojgowdain",
      link: "https://github.com/manojgowdain",
    },
  ];

  return (
    <div className="section">
      {/* SEO */}
      <Helmet>
        <title>
          Contact Manoj Gowda | Full Stack Developer, MERN Specialist & DevOps
          Engineer
        </title>
        <meta
          name="description"
          content="Get in touch with Manoj Gowda – Full Stack Developer & DevOps Engineer from Bengaluru, India. Reach out for collaborations, IoT solutions, MERN stack projects, fintech applications, cloud deployments, and software development inquiries."
        />
        <meta
          name="keywords"
          content="
      Manoj Gowda, Manoj Gowda contact, Contact Manoj Gowda, Manoj Gowda email, manojgowda.in,
      Manoj Gowda developer, Manoj Gowda Full Stack Developer, Manoj Gowda DevOps Engineer,
      MERN stack developer contact, React developer contact, Node.js developer contact,
      Express.js developer, MongoDB developer, JavaScript engineer contact, Software engineer Bengaluru,
      Software engineer India, Hire Manoj Gowda, Freelance developer Bengaluru, IoT developer contact,
      Fintech developer contact, Cloud engineer Bengaluru, Portfolio contact Manoj Gowda,
      Project collaboration Manoj Gowda, Connect with Manoj Gowda, Remote software engineer India
    "
        />
        <meta name="author" content="Manoj Gowda" />
        <link rel="canonical" href="https://manojgowda.in/contact" />
        <meta
          property="og:title"
          content="Contact Manoj Gowda | Full Stack Developer & DevOps Engineer"
        />
        <meta
          property="og:description"
          content="Reach out to Manoj Gowda – MERN stack developer, DevOps engineer, and IoT enthusiast from Bengaluru, India. Contact for collaborations, projects, and professional inquiries."
        />
        <meta property="og:url" content="https://manojgowda.in/contact" />
        <meta property="og:type" content="website" />
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
            {/* Contact Info */}
            <div className="contact-info-section">
              <div className="card">
                <h3 className="card-title">Let's Connect</h3>
                <p className="contact-intro">
                  I'm always interested in new opportunities, interesting
                  projects, and great conversations. Whether you have a question
                  or just want to say hello, feel free to reach out!
                </p>

                <div className="contact-methods">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-method"
                    >
                      <div className="contact-icon">{info.icon}</div>
                      <div className="contact-details">
                        <h4>{info.title}</h4>
                        <p>{info.value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="availability-status">
                  <div className="status-indicator">
                    <div className="status-dot available"></div>
                    <span>Available for new projects</span>
                  </div>
                  <p className="status-description">
                    Currently open to discussing new opportunities and
                    collaborations.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="card">
                <h3 className="card-title">Send Message</h3>

                {/* Inline form messages */}
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
                    />
                  </div>

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
                    />
                  </div>

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
                    />
                  </div>

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
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn btn-primary submit-btn ${
                      isSubmitting ? "submitting" : ""
                    }`}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Example CSS for messages */}
      <style>{`
        .form-message.success { color: green; background: #e6f8e6; padding: 10px; border-radius: 5px; margin-bottom: 10px; }
        .form-message.error { color: red; background: #fde6e6; padding: 10px; border-radius: 5px; margin-bottom: 10px; }
        .form-message.warning { color: orange; background: #fff4e6; padding: 10px; border-radius: 5px; margin-bottom: 10px; }
      `}</style>
    </div>
  );
};

export default Contact;
