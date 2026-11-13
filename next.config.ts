import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
];

/**
 * Uygulama eskiden ana domainde (koordine.com.tr) çalışıyordu; şimdi app.koordine.com.tr'de.
 * Yer imlerinde ve e-postalarda kalan eski adresler uygulamaya yönlendirilir.
 * Liste: maps-analytics/src/app altındaki sayfa yolları. Bu sitede bu yolların hiçbiri kullanılmaz.
 * 307 (geçici) seçildi: tarayıcı kalıcı olarak önbelleğe almaz, ileride yol bu sitede kullanılabilir.
 */
const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://app.koordine.com.tr").replace(/\/$/, "");
const appPaths = [
  "login",
  "register",
  "dashboard",
  "map",
  "projects",
  "stores",
  "reports",
  "tickets",
  "approvals",
  "contracts",
  "progress-payments",
  "invoices",
  "hr",
  "inventory",
  "team",
  "notifications",
  "settings",
  "admin",
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Yerel ağdaki cihazlardan dev sunucusuna erişim
  allowedDevOrigins: ["192.168.1.5"],
  async redirects() {
    return appPaths.map((p) => ({
      source: `/${p}/:path*`,
      destination: `${appUrl}/${p}/:path*`,
      permanent: false,
    }));
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
