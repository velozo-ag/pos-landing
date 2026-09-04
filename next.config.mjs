/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: [
    "192.168.1.101",
    "192.168.1.*",
    "192.168.0.*",
    "localhost:3000",
    "127.0.0.1:3000",
  ],
};

export default nextConfig;
