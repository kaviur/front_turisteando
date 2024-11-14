import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'upload.wikimedia.org',
      'res.cloudinary.com',
      'www.civitatis.com',
      'sp-ao.shortpixel.ai',  
      'www.ollantaytambo.org',
      'blog.viajesmachupicchu.travel',
      'www.peru.travel',
      'tribusviajeras.com',
      'andinoperu.b-cdn.net',
      'www.wayraqperu.com',
      'www.lorenzoexpeditions.com',
    ],
     remotePatterns: [
       {
         protocol: 'http',
         hostname: 'res.cloudinary.com',
         pathname: '/dworm9bnx/image/upload/**',
       },
     ],
  },
};

export default nextConfig;
