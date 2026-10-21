import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: { default: "datui", template: "%s · datui" },
  description: "Accessible React components built with Tailwind CSS and Radix primitives.",
};

// Applies the saved (or system) theme before first paint so dark-mode pages don't flash light; AppRoot takes over after hydration.
const themeScript = `try{var s=localStorage.getItem("datui-docs-theme");var d=s==="dark"||((!s||s==="system")&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.setAttribute("data-theme",d?"dark":"light")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static, inline theme bootstrap with no user input */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
