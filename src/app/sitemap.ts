import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://aalien-app.vercel.app/",
            lastModified: new Date(),
        },
        {
            url: "https://aalien-app.vercel.app/catalogue",
            lastModified: new Date(),
        },
        {
            url: "https://aalien-app.vercel.app/profile",
            lastModified: new Date(),
        },
    ];
}
