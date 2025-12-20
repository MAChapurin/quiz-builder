import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
//   },
// };

// export default nextConfig;
