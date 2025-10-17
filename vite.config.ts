import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api/products": {
        target: "http://localhost:8080",
        changeOrigin: true,
        configure: (proxy, _options) => {
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            const lang = req.url?.split("=")[1] || "en";
            const productsPath = path.join(__dirname, "_mock_api/products.json");
            const translationsPath = path.join(__dirname, `src/locales/${lang}/translation.json`);

            const productsData = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
            const translationsData = JSON.parse(fs.readFileSync(translationsPath, "utf-8"));

            const translatedProducts = productsData.map((product: any) => ({
              ...product,
              name: translationsData.products[product.id]?.name || product.name,
              description: translationsData.products[product.id]?.description || product.description,
              category: translationsData.categories[product.category] || product.category,
            }));

            _res.setHeader("Content-Type", "application/json");
            _res.end(JSON.stringify(translatedProducts));
          });
        },
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
