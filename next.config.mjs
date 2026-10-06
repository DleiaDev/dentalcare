/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  // output: "standalone",

  images: {
    // loader: "cloudinary",
    // pathname: `/${process.env.CLOUDINARY_CLOUD_NAME}/**`,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: `/${process.env.CLOUDINARY_CLOUD_NAME}/image/private/**`,
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
    agentUpgrade: "latest",
  },

  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },

  turbopack: {
    rules: {
      // Convert *.svg imports to React components, except *.svg?url imports
      "*.svg": {
        condition: { not: { query: /[?&]url(?=&|$)/ } },
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
