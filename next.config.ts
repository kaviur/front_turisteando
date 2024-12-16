import type { NextConfig } from "next";
import { RemotePattern } from "next/dist/shared/lib/image-config";

const hostnames = [
  "upload.wikimedia.org",
  "res.cloudinary.com",
  "www.rumbosdelperu.com",
  "www.ollantaytambo.org",
  "www.civitatis.com",
  "sp-ao.shortpixel.ai",
  "blog.viajesmachupicchu.travel",
  "blog.viajesmachupicchu.travel",
  "blog.viajesmachupicchu.travel",
  "blog.viajesmachupicchu.travel",
  "blog.viajesmachupicchu.travel",
  "www.peru.travel",
  "tribusviajeras.com",
  "andinoperu.b-cdn.net",
  "www.wayraqperu.com",
  "www.lorenzoexpeditions.com",
  "www.rumbosdelperu.com",
];

const remotePatternsList: RemotePattern[] = hostnames.map((hostname) => ({
  protocol: "https",
  hostname,
}));

const nextConfig: NextConfig = {
  /* config options here */
  images: {
     remotePatterns: [
       {
         protocol: 'http',
         hostname: 'res.cloudinary.com',
         pathname: '/dworm9bnx/image/upload/**',
       },
      ...remotePatternsList,
     ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
