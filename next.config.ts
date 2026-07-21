import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Formatos modernos — WebP e AVIF para melhor compressão
    formats: ["image/avif", "image/webp"],
    // Qualidade padrão — 85 é ideal entre qualidade e tamanho
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes:  [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Headers de segurança e cache para performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "X-Frame-Options",           value: "SAMEORIGIN" },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // Cache longo para assets estáticos (imagens, fontes)
        source: "/:path*.(png|jpg|jpeg|gif|webp|avif|svg|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  // Compressão gzip/brotli automática pelo Next.js
  compress: true,

  // Reduz tamanho do bundle removendo propTypes em produção
  reactStrictMode: true,
};

export default nextConfig;
