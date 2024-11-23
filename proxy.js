const { createProxyMiddleware } = require("http-proxy-middleware");
const express = require("express");

const app = express();

// Konfigurasi Proxy
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://api.calorieninjas.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // Menghapus prefix '/api' dari path sebelum mengirim ke target
    },
  })
);

// Jalankan server proxy di port 5000
app.listen(5000, () => {
  console.log("Proxy server berjalan di http://localhost:5000");
});
