import { Helmet } from "react-helmet-async";

/* ----------------------------------
   EXPERIENCE DATA
-----------------------------------*/
const experiences = [
  {
    company: "Skoegle IOT Innovations Pvt Ltd",
    role: "Team Lead",
    period: "Sep 2026 – Present",
    location: "Bengaluru, Karnataka, India",
    type: "Full-time",
    achievements: [
      "Led and mentored development teams, ensuring adherence to high-quality engineering practices across multiple projects",
      "Designed and implemented system architecture for 5+ projects, focusing on scalability, performance and cost optimization",
      "Owned projects from technical planning through production support, driving timely delivery and long-term maintainability",
    ],
    technologies: [
      "Node.js",
      "React",
      "React Native",
      "Docker",
      "GitHub Actions",
      "PostgreSQL",
      "AWS",
      "Cloudflare",
      "NGINX",
      "Team Leadership",
      "System Architecture",
    ],
  },
  {
    company: "Skoegle IOT Innovations Pvt Ltd",
    role: "Software Engineer",
    period: "Jan 2026 – Aug 2026",
    location: "Bengaluru, Karnataka, India",
    type: "Full-time",
    achievements: [
      "Helped shape product architecture, infrastructure and scalable backend systems supporting large-scale IoT and health-tech deployments, working across the full product lifecycle from design to production",
      "Built REST APIs for hardware communication and GraphQL APIs for client-facing applications, and designed MQTT data pipelines to collect, process and stream real-time data from hardware devices",
      "Built Docker-based production infrastructure and zero-downtime CI/CD with GitHub Actions and Docker Compose; managed AWS EC2, RDS PostgreSQL, S3, VPC, Cloudflare CDN/DNS and NGINX",
      "Maintained production reliability for 20,000+ IoT devices using Portainer/Dozzle observability and automated maintenance workflows",
      "Open-source contributor and maintainer of Toonkit; solved IoT payload-size and parsing problems with compact, typed TOON payloads that declare schemas once instead of repeating JSON keys",
      "Built Toonkit as a reusable JavaScript/TypeScript toolkit with TOON parsing/serialization plus HTTP-client and Express/Fastify integrations, improving payload efficiency and frontend/backend symmetry",
      "Created FoNotify, an SSE-based real-time communication alternative to MQTT",
    ],
    technologies: [
      "Node.js",
      "Fastify",
      "Express.js",
      "TypeScript",
      "REST APIs",
      "GraphQL",
      "MQTT",
      "SSE",
      "PostgreSQL",
      "AWS EC2",
      "AWS RDS",
      "AWS S3",
      "AWS VPC",
      "Docker",
      "Docker Compose",
      "GitHub Actions",
      "Cloudflare",
      "NGINX",
      "Portainer",
      "Dozzle",
    ],
  },
  {
    company: "Skoegle IOT Innovations Pvt Ltd",
    role: "Junior Software Engineer",
    period: "Jan 2025 – Dec 2025",
    location: "Bengaluru, Karnataka, India",
    type: "Full-time",
    achievements: [
      "Developed backend systems with Node.js and Express, using PostgreSQL/Sequelize for relational data and MongoDB for rapid prototyping and flexible data models",
      "Involved in system design, database modeling, API architecture and performance optimization",
      "Developed and published React Native Android applications, working with BLE communication and real-time health metrics, while contributing across frontend, backend and IoT integration",
    ],
    technologies: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "MongoDB",
      "Sequelize ORM",
      "React Native",
      "BLE",
      "IoT",
    ],
  },
  {
    company: "TransFi India (Product Based Company)",
    role: "Junior Software Engineer",
    period: "Jun 2024 – Dec 2024",
    location: "Remote",
    type: "Full-time",
    achievements: [
      "Built and maintained crypto aggregation and fintech platforms using MERN/PERN with real-time integrations, secure third-party crypto APIs, payment gateways and social login",
      "Revamped the Ramp fintech product from scratch and built WalletExpress, an internal automation tool that saved 20+ hours/week and earned 2nd place in company project contributions",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "MERN Stack",
      "Cryptocurrency APIs",
      "Fintech",
    ],
  },
  {
    company: "Delbo Digital",
    role: "Software Engineer Intern",
    period: "Apr 2023 – Jan 2024",
    location: "Bangalore",
    type: "Internship",
    achievements: [
      "Built and deployed MERN applications for e-commerce and internal business operations; developed REST APIs, authentication and RBAC",
      "Integrated Firebase authentication, realtime database and cloud storage; managed Zoho Workspace email setup and user support",
    ],
    technologies: [
      "HTML",
      "JavaScript",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
      "GitHub",
    ],
  },
  {
    company: "Domico",
    role: "Freelance Software Engineer",
    period: "Freelance",
    location: "Remote",
    type: "Freelance",
    achievements: [
      "Handled AWS-based deployment, server setup, maintenance and production operations",
    ],
    technologies: [
      "AWS",
      "Docker",
      "Node.js",
      "React",
      "Cloud Infrastructure",
    ],
  },
];

/* ----------------------------------
   EDUCATION
-----------------------------------*/
const education = {
  degree: "Computer Science and Engineering",
  institution: "AMC Engineering College, Bengaluru (2024)",
  achievements: [
    "Participated in inter-college project competitions",
    "Built projects like KissanBazaar and Car Profile APIs",
    "Strong foundation in computer science fundamentals",
  ],
};

/* ----------------------------------
   STRUCTURED DATA (JSON-LD)
-----------------------------------*/
const experienceSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Manoj Gowda",
  "jobTitle": "Full Stack & DevOps Engineer",
  "url": "https://www.manojgowda.in",
  "worksFor": experiences.map((e) => ({
    "@type": "Organization",
    "name": e.company,
  })),
  "hasOccupation": experiences.map((e) => ({
    "@type": "Occupation",
    "name": e.role,
    "occupationLocation": {
      "@type": "City",
      "name": e.location,
    },
    "estimatedSalary": {
      "@type": "MonetaryAmountDistribution",
      "currency": "INR",
    },
  })),
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": education.institution,
  },
};

/* ----------------------------------
   COMPONENT
-----------------------------------*/
const Experience = () => {
  return (
    <div className="section">
      <Helmet>
        <title>
          Experience | Manoj Gowda – Full Stack & DevOps Engineer
        </title>

        <meta
          name="description"
          content="Professional experience of Manoj Gowda – Team Lead and Software Engineer at Skoegle IOT Innovations, specializing in IoT platforms, MERN stack, fintech systems, AWS, Docker, and scalable architectures."
        />

        <link
          rel="canonical"
          href="https://manojgowda.in/experience"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(experienceSchema)}
        </script>
      </Helmet>

      <div className="container fade-in">
        <div className="section-header">
          <h1 className="section-title">
            💼 <span className="gradient-text">Experience</span>
          </h1>
          <p className="section-subtitle">
            My professional journey in software engineering
          </p>
        </div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker">
                <div className="timeline-dot" />
              </div>

              <div className="timeline-content card">
                <h3 className="experience-role">
                  {exp.role}
                </h3>
                <h4 className="experience-company gradient-text">
                  {exp.company}
                </h4>

                <p className="experience-location">
                  📍 {exp.location}
                </p>

                <p className="experience-period">
                  {exp.period} • {exp.type}
                </p>

                <h5>Key Achievements</h5>
                <ul>
                  {exp.achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>

                <div className="tech-tags">
                  {exp.technologies.map((t, i) => (
                    <span key={i} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="education-section">
          <h2 className="section-title">
            🎓 <span className="gradient-text">Education</span>
          </h2>

          <div className="card">
            <h3>{education.degree}</h3>
            <h4 className="gradient-text">
              {education.institution}
            </h4>
            <ul>
              {education.achievements.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
