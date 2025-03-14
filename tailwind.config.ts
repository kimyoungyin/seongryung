import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        colors: {
            "base-bg": "#fff8e3", // 전체 배경
            "button-bg": "#d4b88a", // 버튼 배경
            "card-bg": "#fffdf8", // 카드 배경
            "input-border": "#e0d6c2", // Input border
            "text-primary": "#5d5348", // primary
            "text-secondary": "#726a5f", // secondary
            skeleton: "#e8e0d5", // skeleton
        },
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [],
} satisfies Config;
