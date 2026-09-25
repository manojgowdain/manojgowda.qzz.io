import { Helmet } from "react-helmet-async";

/* ---------------------------
   PROJECTS DATA
---------------------------- */
const projects = [
  {
    name: "Toonkit",
    description:
      "Open-source contributor, core developer, and maintainer of Toonkit.js, an upgraded and extensible toolkit built around the Toon format for IoT and device communication systems. Enhanced to solve real-world IoT challenges involving buffer management, packet size constraints, and efficient binary protocol handling.",
    image:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
    liveUrl: "https://toonkit.js.org/",
    technologies: ["JavaScript", "TypeScript", "IoT", "Protocol Buffers", "Binary Protocols"],
    status: "Production",
    type: "Open Source Library",
  },
    {
    name: "PGbloom",
    description:
      "PGBloom is a PostgreSQL-first infrastructure toolkit for JavaScript and TypeScript developers. Instead of installing standard npm packages like Redis, it provides backend utilities directly on top of your existing PostgreSQL database",
    image:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
    liveUrl: "https://pgbloom.iotkit.in",
    technologies: ["JavaScript", "TypeScript", "IoT", "Protocol Buffers", "Binary Protocols"],
    status: "Production",
    type: "Open Source Library",
  },
  {
    name: "FoNotify",
    description:
      "FoNotify (fonotify) — Fire Once, Notify Once: an ultra-lightweight real-time notification library designed to tell connected clients to fetch updates without sending payloads. Works with Express, Fastify, Hono, Next.js, React, and React Native; optional Redis support for cross-instance delivery.",
    image:
      "https://camo.githubusercontent.com/00a4f8f92883e25712db9c524a74ae1516aa5ff14b461173cc58bdaf63c53466/68747470733a2f2f64756d6d79696d6167652e636f6d2f363030783430302f3030302f66666626746578743d466f4e6f74696679",
    liveUrl: "https://www.npmjs.com/package/fonotify",
    technologies: ["TypeScript", "Node.js", "Express", "Fastify", "Redis", "SSE"],
    status: "Production",
    type: "Open Source Library",
  },
  {
    name: "VMarg",
    description:
      "B2B IoT tracking platform deployed on AWS. VMarg provides real-time device tracking, data visualization, and logging for large-scale IoT deployments.",
    image:
      "https://rukminim2.flixcart.com/image/180/240/xif0q/gps-device/a/q/4/gps-tracker-device-made-in-india-track-true-original-imagsbfckwddtxaz.jpeg?q=90",
    // liveUrl: "https://vmarg.skoegle.com",
    technologies: ["Node.js", "MQTT", "AWS", "Docker", "IoT"],
    status: "Production",
    type: "IoT Platform",
  },
  {
    name: "Aventra",
    description:
      "Android tracking app built on top of VMarg to visualize real-time GPS-based IoT tracker locations and history.",
    image:
      "https://images.pexels.com/photos/7709286/pexels-photo-7709286.jpeg",
    liveUrl:
      "https://play.google.com/store/search?q=aventra&c=apps",
    technologies: ["React Native", "IoT", "GPS", "AWS", "Maps API"],
    status: "Live",
    type: "Android App",
  },
  {
    name: "SkoFit",
    description:
      "Hardware prototyping app to validate and visualize incoming sensor data like heart rate, blood pressure, and steps.",
    image:
      "https://images.pexels.com/photos/4031818/pexels-photo-4031818.jpeg",
    // liveUrl:
      // "https://play.google.com/store/apps/details?id=com.manoj2002.skoFit",
    technologies: [
      "React Native",
      "Bluetooth",
      "Health Sensors",
      "Data Visualization",
      "IoT",
    ],
    status: "Live",
    type: "Android App",
  },
  {
    name: "walletExpress",
    description:
      "Developer-focused Web3 testing ecosystem combining web app, API services, and Telegram bot interface. Generates dummy crypto wallet addresses for Bitcoin, Ethereum, and other blockchains for testing dApps, APIs, and blockchain integrations. Designed as a lightweight developer SDK-style utility for multi-platform usage.",
    image:
      "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg",
    liveUrl: "https://walletexpress.manojgowda.qzz.io",
    technologies: ["React", "Express.js", "JavaScript", "Web3", "Bitcoin", "Ethereum", "Telegram Bot"],
    status: "Live",
    type: "Web3 Dev Tool",
  },
  {
    name: "SkoCloud",
    description:
      "Personal cloud storage solution similar to Google Drive for web and mobile platforms.",
    image:
      "https://images.pexels.com/photos/1181373/pexels-photo-1181373.jpeg",
    technologies: ["React Native", "Node.js", "AWS S3"],
    status: "In Development",
    type: "Mobile & Web App",
  },
];

/* ---------------------------
   STRUCTURED DATA
---------------------------- */
const projectSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Projects by Manoj Gowda",
  "itemListElement": projects.map((p, i) => ({
    "@type": "SoftwareApplication",
    "position": i + 1,
    "name": p.name,
    "applicationCategory": p.type,
    "operatingSystem": p.type.includes("Android") ? "Android" : "Web",
    "url": p.liveUrl || "https://manojgowda.qzz.io/projects",
    "description": p.description,
    "creator": {
      "@type": "Person",
      "name": "Manoj Gowda",
    },
  })),
};

/* ---------------------------
   UTILS
---------------------------- */
const getStatusColor = (status) => {
  switch (status) {
    case "Live":
      return "#10b981";
    case "Production":
      return "#2563eb";
    case "In Development":
      return "#f59e0b";
    default:
      return "#6b7280";
  }
};

/* ---------------------------
   COMPONENT
---------------------------- */
const Projects = () => {
  return (
    <div className="section">
      <Helmet>
        <title>
          Projects | Manoj Gowda – Full Stack & DevOps Engineer
        </title>

        <meta
          name="description"
          content="Explore real-world projects built by Manoj Gowda including Toonkit (Open-source toolkit), FoNotify (real-time notifier), VMarg (IoT platform), Aventra (Android tracking app), SkoFit (hardware prototyping), walletExpress, and SkoCloud."
        />

        <link
          rel="canonical"
          href="https://manojgowda.qzz.io/projects"
        />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(projectSchema)}
        </script>
      </Helmet>

      <div className="container">
        <div className="section-header">
          <h1 className="section-title">
            🏆 <span className="gradient-text">Projects</span>
          </h1>
          <p className="section-subtitle">
            Applications I’ve built, deployed, and scaled
          </p>
        </div>

        <div className="projects-grid grid grid-2">
          {projects.map((project, index) => (
            <div key={index} className="project-card card">
              <div className="project-image-container">
                <img
                  src={project.image}
                  alt={project.name}
                  className="project-image"
                />

                <div className="project-overlay">
                  <span
                    className="project-status"
                    style={{
                      backgroundColor: getStatusColor(
                        project.status
                      ),
                    }}
                  >
                    {project.status}
                  </span>
                  <span className="project-type">
                    {project.type}
                  </span>
                </div>
              </div>

              <div className="project-content">
                <h3 className="project-name gradient-text">
                  {project.name}
                </h3>

                <p className="project-description">
                  {project.description}
                </p>

                <div className="project-technologies">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-actions">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      View Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <br />

        <div className="stats-grid grid grid-3">
          <div className="stat-card card">
            <div className="stat-icon">🚀</div>
            <h3 className="stat-number gradient-text">10+</h3>
            <p>Projects Delivered</p>
          </div>
          <div className="stat-card card">
            <div className="stat-icon">👥</div>
            <h3 className="stat-number gradient-text">100K+</h3>
            <p>Users Served</p>
          </div>
          <div className="stat-card card">
            <div className="stat-icon">⚡</div>
            <h3 className="stat-number gradient-text">99.9%</h3>
            <p>Uptime Achieved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
