import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import { createServer as createViteServer } from "vite";
import { initDb } from "./src/server/db.js";
import apiRoutes from "./src/server/api.js";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  // Security middleware - add security headers
  app.use(helmet());

  // Restrict CORS - allow only production origin
  const ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173",
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
    "https://yourportfolio.com", // Change to your actual domain
  ].filter(Boolean);

  app.use(cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400, // 24 hours
  }));

  app.use(express.json({ limit: "1mb" })); // Limit request size

  // Disable powered-by header
  app.disable("x-powered-by");

  // Initialize Database
  await initDb();

  // API Routes
  app.use("/api", apiRoutes);

  // Vite middleware for development
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    if (!isProduction) {
      console.log(`Server running on http://localhost:${PORT}`);
    }
  });
}

startServer();
