import { Inter } from "next/font/google";
import OverlayManager from "./components/OverlayManager"; // Overlay Manager für Launch/Maintenance/Passwort
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import CookieConsent from "./components/CookieConsent";
import { SpeedInsights } from '@vercel/speed-insights/next';



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RGBibel Official",
  description: "RGBibel Official – Dein Experte für hochwertige Gaming-PCs! 🚀 Konfiguriere deinen individuellen Fertig-PC mit unserem leistungsstarken Konfigurator. Profitiere von Custom-Support, erstklassiger Hardware & blitzschnellem Versand. Jetzt PC zusammenstellen!",
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
