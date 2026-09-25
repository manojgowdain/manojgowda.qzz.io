import { Helmet } from "react-helmet-async";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Technologies",
      skills: [
        { name: "JavaScript", color: "#F7DF1E" },
        { name: "TypeScript", color: "#007ACC" },
        { name: "React", color: "#61DAFB" },
        { name: "React Native", color: "#61DAFB" },
        { name: "Next.js", color: "#000000" },
        { name: "Electron", color: "#47848F" },
        { name: "HTML5", color: "#E34C26" },
        { name: "CSS3", color: "#563D7C" },
        { name: "Tailwind CSS", color: "#06B6D4" },
      ],
    },
    {
      title: "Backend Technologies",
      skills: [
        { name: "Node.js", color: "#339933" },
        { name: "Bun", color: "#FFFFFF" },
        { name: "Express.js", color: "#000000" },
        { name: "Fastify", color: "#202020" },
        { name: "Python", color: "#3776AB" },
        { name: "MQTT", color: "#660066" },
        { name: "WebSockets", color: "#4A90E2" },
        { name: "SSE", color: "#2D6A4F" },
      ],
    },
    {
      title: "Databases & ORMs",
      skills: [
        { name: "MongoDB", color: "#4EA94B" },
        { name: "PostgreSQL", color: "#316192" },
        { name: "Firebase", color: "#FFCA28" },
        { name: "Mongoose", color: "#880000" },
        { name: "Sequelize", color: "#52B0E7" },
        { name: "Drizzle ORM", color: "#C5B358" },
      ],
    },
    {
      title: "DevOps & Cloud",
      skills: [
        { name: "Docker", color: "#2CA5E0" },
        { name: "AWS", color: "#232F3E" },
        { name: "Cloudflare", color: "#F6821F" },
        { name: "NGINX", color: "#009639" },
        { name: "GitHub Actions", color: "#2088FF" },
        { name: "Kubernetes", color: "#326CE5" },
        { name: "Vercel", color: "#000000" },
        { name: "Portainer", color: "#13BEF9" },
      ],
    },
  ];

  const npmPackages = [
    {
      name: "PGbloom",
      description:
        "PGBloom is a PostgreSQL-first infrastructure toolkit for JavaScript and TypeScript developers. Instead of installing standard npm packages like Redis, it provides backend utilities directly on top of your existing PostgreSQL database",
      version: "3.0.0",
      downloads: "500+",
      link: "https://pgbloom.iotkit.in",
    },
    {
      name: "toonkit",
      description:
        "An upgraded and extensible toolkit built around the Toon format for IoT and device communication systems. Handles buffer management, binary protocol parsing, and efficient real-time telemetry ingestion.",
      version: "Latest",
      downloads: "Growing",
      link: "https://toonkit.js.org/",
    },
    {
      name: "fonotify",
      description:
        "FoNotify — Fire Once, Notify Once. Minimal real-time notifications: triggers a 'fetch' signal with no payload. Works with Express/Fastify/Hono, supports Redis for cross-instance notifications, and reduces infra complexity.",
      version: "Latest",
      downloads: "Growing",
      link: "https://www.npmjs.com/package/fonotify",
    },
  ];


  return (
    <div className="section">
      <Helmet>
        <title>
          Skills & Expertise | Manoj Gowda - Full Stack Developer & DevOps
          Engineer
        </title>
        <meta
          name="description"
          content="Explore Manoj Gowda's technical skills in frontend, backend, databases, DevOps, and cloud computing. Expertise includes JavaScript, React, Node.js, MERN stack, Docker, AWS, and open-source npm packages like mbqueue, toonkit, and fonotify."
        />
        <meta
          name="keywords"
          content="
      Manoj Gowda skills, Manoj Gowda expertise, full stack developer skills, MERN stack skills,
      JavaScript developer, React developer, Node.js developer, MongoDB, Express.js, PostgreSQL,
      DevOps skills, Docker, AWS, npm packages mbqueue, npm packages cobit, software engineer,
      IoT developer, fintech developer, cloud solutions, Bengaluru developer, manojgowda.qzz.io
    "
        />
        <meta name="author" content="Manoj Gowda" />
        <link rel="canonical" href="https://manojgowda.qzz.io/skills" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Skills & Expertise | Manoj Gowda - Full Stack Developer & DevOps Engineer"
        />
        <meta
          property="og:description"
          content="Discover Manoj Gowda's technical skills across frontend, backend, databases, DevOps, and cloud solutions. Includes MERN stack, React, Node.js, Docker, AWS, and npm packages like mbqueue, toonkit, and fonotify."
        />
        <meta property="og:url" content="https://manojgowda.qzz.io/skills" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Skills & Expertise | Manoj Gowda - Full Stack Developer & DevOps Engineer"
        />
        <meta
          name="twitter:description"
          content="Explore Manoj Gowda's technical skills in MERN stack, React, Node.js, databases, DevOps, cloud computing, and open-source npm packages like mbqueue, toonkit, and fonotify."
        />
      </Helmet>

      <div className="container">
        <div className="fade-in">
          <div className="section-header">
            <h1 className="section-title">
              🛠️ <span className="gradient-text">Skills & Expertise</span>
            </h1>
            <p className="section-subtitle">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          <div className="skills-grid grid grid-2">
            {skillCategories.map((category, index) => (
              <div key={index} className="card">
                <h3 className="card-title">{category.title}</h3>
                <div className="skills-list">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="skill-badge"
                      style={{
                        "--skill-color": skill.color,
                        animationDelay: `${skillIndex * 0.1}s`,
                      }}
                    >
                      <div
                        className="skill-dot"
                        style={{ backgroundColor: skill.color }}
                      ></div>
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="npm-packages-section">
            <h2 className="section-title">
              📦 <span className="gradient-text">NPM Packages</span>
            </h2>
            <div className="packages-grid grid grid-2">
              {npmPackages.map((pkg, index) => (
                <div key={index} className="card package-card">
                  <div className="package-header">
                    <h3 className="package-name">{pkg.name}</h3>
                    <div className="package-stats">
                      <span className="package-version">v{pkg.version}</span>
                      <span className="package-downloads">
                        {pkg.downloads} downloads
                      </span>
                    </div>
                  </div>
                  <p className="package-description">{pkg.description}</p>
                  <div className="package-actions">
                    <a
                      href={pkg.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      View on NPM
                    </a>
                    <code className="install-cmd">npm i {pkg.name}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
