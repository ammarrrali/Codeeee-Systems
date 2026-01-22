import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://codeeee-systems-4v7n.vercel.app",
      lastModified: new Date(),
    },
  ];
}