/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "lh3.googleusercontent.com",
            "avatars.githubusercontent.com",
            "avatars.mds.yandex.net",
            "sun1.userapi.com",
        ],
    },
    async redirects() {
        return [
            {
                source: "/github",
                destination: "https://github.com/diversis",
                permanent: false,
            },
        ];
    },
    trailingSlash: true,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },

    modularizeImports: {
        "@mui/material": {
            transform: "@mui/material/{{member}}",
        },
        "@mui/icons-material": {
            transform: "@mui/icons-material/{{member}}",
        },
        "@mui/styles": {
            transform: "@mui/styles/{{member}}",
        },
        "@mui/lab": {
            transform: "@mui/lab/{{member}}",
        },
    },
};

module.exports = nextConfig;
