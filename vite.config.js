import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Relative asset paths, so the build works under /Axel-Nokireki/ on GitHub Pages and at a domain root.
  base: "./",
  plugins: [react(), tailwindcss()],
});
