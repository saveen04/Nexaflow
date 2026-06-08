import "./globals.css";
import { ClientLayout } from "@/components/layout/ClientLayout";

export const metadata = {
  title: "NexaFlow — AI Orchestration Platform",
  description: "Enterprise booking workflows powered by deep neural classification and real-time support logic.",
  icons: {
    icon: [
      { url: "/logo-nexaflow.png", type: "image/png" },
    ],
    apple: "/logo-nexaflow.png",
    shortcut: "/logo-nexaflow.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/logo-nexaflow.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo-nexaflow.png" />
      </head>
      <body className="bg-[#050505] text-slate-100 antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
