import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import Preloader from "@/components/ui/preloader";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";
import ScrollToTop from "@/components/ui/scroll-to-top";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Lumeron | Empowering Saudi Arabia's Digital Future",
  description: "MASCO's tech arm accelerating Vision 2030 through resilient infrastructure, managed services, and emerging technologies.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
          <LanguageProvider>
            <SmoothScrollProvider>
              <ScrollToTop />
              <Preloader />
            <Script
              id="orchids-browser-logs"
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
              strategy="afterInteractive"
              data-orchids-project-id="b1cd8c82-7d59-48f9-9b1f-b8b6ad292087"
            />
            <ErrorReporter />
            <Script
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
              strategy="afterInteractive"
              data-target-origin="*"
              data-message-type="ROUTE_CHANGE"
              data-include-search-params="true"
              data-only-in-iframe="true"
              data-debug="true"
              data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
            />
            {children}
            <VisualEditsMessenger />
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
