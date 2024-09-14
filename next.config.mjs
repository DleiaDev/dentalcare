/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    prependData: "@import './src/app/variables.module.scss';",
  },
};

export default nextConfig;
