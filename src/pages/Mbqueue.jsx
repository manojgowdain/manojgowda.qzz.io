import { Helmet } from "react-helmet-async";

const Mbqueue = () => {
  return (
    <div className="section">
      <Helmet>
        <title>mbqueue | High-Performance MongoDB Job Queue for Node.js</title>
        <meta
          name="description"
          content="mbqueue is a high-performance, MongoDB-backed job queue for Node.js. Designed for high-volume job insertion, parallel processing, batching, and distributed deployments."
        />
        <meta
          name="keywords"
          content="mbqueue, Node.js job queue, MongoDB queue, message queue, background jobs, task processing, distributed workers, job retry, npm package mbqueue"
        />
        <meta name="author" content="Manoj Gowda" />
        <link rel="canonical" href="https://manojgowda.in/mbqueue" />

        {/* Open Graph */}
        <meta property="og:title" content="mbqueue | MongoDB-backed Job Queue for Node.js" />
        <meta
          property="og:description"
          content="mbqueue is a scalable, MongoDB-backed job queue for Node.js. Supports batching, retries, parallel workers, and distributed processing."
        />
        <meta property="og:url" content="https://manojgowda.in/mbqueue" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="mbqueue | MongoDB-backed Job Queue for Node.js" />
        <meta
          name="twitter:description"
          content="High-performance Node.js job queue powered by MongoDB. Supports high-volume insertion, retries, prioritization, and distributed workers."
        />
      </Helmet>

      <div className="container fade-in">
        <div className="section-header">
          <h1 className="section-title">
            📦 <span className="gradient-text">mbqueue</span>
          </h1>
          <p className="section-subtitle">
            High-performance, MongoDB-backed job queue for Node.js 🚀
          </p>
        </div>

        <div className="card">
          <h2 className="card-title">Overview</h2>
          <p>
            <strong>mbqueue</strong> is a robust job queue system designed for
            high-volume job insertion, parallel processing, memory-efficient
            batching, and distributed deployments. Perfect for emails,
            notifications, background tasks, and more.
          </p>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <h3 className="card-title">🚀 Features</h3>
            <ul className="list">
              <li>High-volume job insertion (thousands/sec)</li>
              <li>Batch processing with adaptive flushing</li>
              <li>Concurrent workers for parallel processing</li>
              <li>Priority-based job processing</li>
              <li>Robust error handling & retries with backoff</li>
              <li>Memory monitoring with emergency flush</li>
              <li>Distributed multi-server deployments</li>
              <li>Real-time statistics & monitoring</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="card-title">📦 Installation</h3>
            <pre className="install-cmd">npm install mbqueue</pre>
            <a
              href="https://www.npmjs.com/package/mbqueue"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-2"
            >
              View on NPM
            </a>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">🛠️ Usage Example</h3>
          <pre className="code-block">
{`const QueueManager = require('mbqueue');

const queue = new QueueManager('mongodb://localhost:27017', 'job_queue', {
  batchSize: 5000,
  batchTimeout: 10000,
  maxPendingJobs: 500000
});

await queue.connect();

// Add a job
await queue.addJob('email', { name: 'John', email: 'john@example.com' });

// Start processing jobs
queue.startProcessing('email', async (data) => {
  return { sent: true };
}, { batchSize: 1, maxConcurrent: 10 });`}
          </pre>
        </div>

        <div className="card">
          <h3 className="card-title">🏗️ Distributed Setup</h3>
          <p>
            Multiple producers can add jobs while workers across different
            servers process them without duplication. Central MongoDB acts as the
            single source of truth.
          </p>
        </div>

        <div className="card">
          <h3 className="card-title">📊 Monitoring</h3>
          <pre className="code-block">
{`const stats = queue.getStats();
console.log(stats);

/*
{
  totalAdded: 1000,
  totalProcessed: 950,
  pendingJobsByType: { email: 50 },
  memoryUsageMB: 110,
  uptime: 3600
}
*/`}
          </pre>
        </div>

        <div className="card">
          <h3 className="card-title">📌 Key Takeaways</h3>
          <ul className="list">
            <li>High-volume job insertion & parallel workers</li>
            <li>Memory-safe batching and adaptive flushing</li>
            <li>Distributed, multi-server architecture</li>
            <li>Robust retry & error handling</li>
            <li>Simple MongoDB alternative to Redis, RabbitMQ, Kafka</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Mbqueue;
