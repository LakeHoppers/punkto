import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Punkto",
    short_name: "Punkto",
    description: "Daily German news, summarized in Turkish, English, and German.",
    start_url: "/tr",
    display: "standalone",
    background_color: "#FAF7F1",
    theme_color: "#9E3527",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
