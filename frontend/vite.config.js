import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Optional: Automatically open the browser when the server starts
    host: true
  },
  build: {
    rollupOptions: {
      input: "src/index.jsx"
    }
  }
});
