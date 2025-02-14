import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Garantiebedingungen = () => {
  return (
    <>
      <Header />
      <div className="relative min-h-screen w-full flex flex-col justify-between">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center -z-10"></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-90 -z-10"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 pt-[100px]">
          {/* Title */}
          <h1 className="text-5xl font-bold text-[#04cefe] mb-8">GARANTIEBEDINGUNGEN FÜR RGBIBEL-PCs</h1>

          {/* Warranty Terms Content */}
          <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg w-full max-w-lg text-left">
            <p>Diese Garantiebedingungen gelten ausschließlich für von RGBIBEL (RGBIBEL UG) zusammengebaute PC-Systeme, einschließlich aller verbauten Komponenten, und sind auf Endkunden innerhalb der EU beschränkt. Die Garantie ist nicht übertragbar. Einzelkomponenten und Bausätze unterliegen der gesetzlichen Gewährleistungsfrist.</p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">Garantieumfang:</p>
            <p>Die Garantie beträgt 2 Jahre ab Kaufdatum und deckt Mängel bei sachgemäßer Nutzung ab. Reparaturen, Ersatzteile und Rückversand sind im Rahmen der Garantie kostenlos. RGBIBEL UG behält sich das Recht vor, Geräte oder Komponenten aus wirtschaftlichen oder logistischen Gründen durch gleichwertige Produkte zu ersetzen.</p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">Von der Garantie ausgeschlossen sind:</p>
            <ul className="list-disc pl-5">
              <li>Schäden durch mangelnde Pflege oder Wartung.</li>
              <li>Mechanische Beschädigungen an Komponenten.</li>
              <li>Unsachgemäße Verpackung bei Rücksendungen.</li>
              <li>Schäden durch Fremdeinwirkungen, Flüssigkeiten oder unsachgemäße Anwendung.</li>
              <li>Fehler durch falsche BIOS-Einstellungen oder Betriebssystemkonfigurationen.</li>
              <li>Softwarefehler (z. B. Spiele, Treiber, Windows-Updates).</li>
              <li>Schäden durch Viren oder Schadsoftware.</li>
              <li>Übertaktung von CPU oder GPU.</li>
              <li>Normale Abnutzung.</li>
              <li>Fehler durch nicht bei RGBIBEL UG gekaufte Hardware.</li>
              <li>Ausgebaute Komponenten (außer dem Gehäuseseitenteil).</li>
            </ul>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">Keine Garantie auf Software:</p>
            <p>Software wird nicht durch die Garantie abgedeckt. Softwarefehler oder Schäden, die durch Verstöße gegen die Garantiebedingungen entstehen, führen zu kostenpflichtigen Reparaturen.</p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">Haftungsausschluss:</p>
            <p>RGBIBEL UG haftet nicht für Daten, die der Kunde auf den Systemen speichert. Kunden sollten vor Einsendung des PCs ihre Daten sichern und sensible Daten löschen.</p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">Weitere Ausschlüsse:</p>
            <p>Schäden durch unsachgemäße Reparaturversuche des Kunden oder Dritter. Kosten für Reparaturen durch Fremdwerkstätten werden nicht übernommen. Als Garantienachweis gilt die Rechnung des reklamierten Geräts. Reklamationen, die nicht unter die Garantie fallen, werden kostenpflichtig behandelt.</p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">Reklamationsablauf:</p>
            <p>Bei einem Garantiefall muss der Kunde den PC an RGBIBEL UG senden. Die Adresse ist im Impressum oder im Kontaktbereich zu finden. Der PC muss sicher im Originalkarton verpackt werden, um Schäden zu vermeiden. Unsachgemäße Verpackung kann dazu führen, dass die Reparatur kostenpflichtig erfolgt oder das Gerät unverändert zurückgesendet wird.</p>
          </div>

          {/* Bottom Text */}
          <div className="mt-8 text-center text-sm text-gray-400 max-w-lg">
            <p>Für weitere Informationen zu unseren Garantiebedingungen kontaktieren Sie uns bitte unter <a href="mailto:info@rgbibelofficial.de" className="text-[#04cefe] hover:underline">info@rgbibelofficial.de</a>.</p>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Garantiebedingungen;
