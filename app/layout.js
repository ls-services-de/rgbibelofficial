import { Inter } from "next/font/google";
import OverlayManager from "./components/OverlayManager"; // Overlay Manager für Launch/Maintenance/Passwort
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import CookieConsent from "./components/CookieConsent";
import { SpeedInsights } from '@vercel/speed-insights/next';



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Die besten Gaming-PCs mit Top Preis-Leistung | RGBibelOfficial",
  description: "RGBibelOfficial bietet leistungsstarke Gaming-PCs, maßgeschneiderte Streaming-Systeme und hochwertige Fertig-PCs mit unschlagbarem Preis-Leistungs-Verhältnis.",
  
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>

        <OverlayManager>

          {/* Der Inhalt der Seite */}
          <CookieConsent />
          {children}
          <SpeedInsights />

        </OverlayManager>
        
      </body>
    </html>
    </ClerkProvider>
  );
}
