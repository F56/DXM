module.exports = {
  images: {
    domains: ["yts.mx", "image.tmdb.org"],
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = "electron-renderer";
    }
    return config;
  },
};
