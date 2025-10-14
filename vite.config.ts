import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

// Custom plugin to handle video range requests
const videoRangePlugin = (): Plugin => ({
  name: 'video-range-request',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // Only handle video files
      if (req.url && /\.(mp4|webm|ogg)$/i.test(req.url)) {
        const videoPath = path.join(process.cwd(), 'public', req.url);
        
        // Check if file exists
        if (!fs.existsSync(videoPath)) {
          return next();
        }

        const stat = fs.statSync(videoPath);
        const fileSize = stat.size;
        const range = req.headers.range;

        // Set headers for range support
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Content-Type', 'video/mp4');

        if (range) {
          // Parse range header
          const parts = range.replace(/bytes=/, '').split('-');
          const start = parseInt(parts[0], 10);
          const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
          const chunksize = (end - start) + 1;

          // Create read stream for the requested range
          const file = fs.createReadStream(videoPath, { start, end });

          // Set partial content headers
          res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Content-Length': chunksize,
          });

          file.pipe(res);
        } else {
          // No range, send entire file
          res.writeHead(200, {
            'Content-Length': fileSize,
          });
          fs.createReadStream(videoPath).pipe(res);
        }
      } else {
        next();
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    cors: true,
  },
  plugins: [
    react(),
    videoRangePlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/',
}));
