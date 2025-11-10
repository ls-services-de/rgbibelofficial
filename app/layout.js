import { Inter } from "next/font/google";
import OverlayManager from "./components/OverlayManager";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import CookieConsent from "./components/CookieConsent";
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from "next/script"; // <--- Wichtig!

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Die besten Gaming-PCs mit Top Preis-Leistung | RGBibelOfficial",
  description: "RGBibelOfficial bietet leistungsstarke Gaming-PCs, maßgeschneiderte Streaming-Systeme und hochwertige Fertig-PCs mit unschlagbarem Preis-Leistungs-Verhältnis.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="de">
        <body className={inter.className}>
          <OverlayManager>
            <CookieConsent />
            {children}
            <SpeedInsights />
          </OverlayManager>

          {/* Google Analytics */}
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-HQFJDEXLTQ"
          />
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HQFJDEXLTQ');
            `}
          </Script>
        </body>
      </html>
    </ClerkProvider>
  );
}
