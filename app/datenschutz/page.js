import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Datenschutz = () => {
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
          <h1 className="text-5xl font-bold text-[#04cefe] mb-8">DATENSCHUTZERKLÄRUNG</h1>

          {/* Privacy Policy Content */}
          <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg w-full max-w-lg text-left">
            <p className="text-lg font-semibold">1. Einleitung</p>
            <p>Willkommen auf unserer Website! Datenschutz ist uns sehr wichtig. In dieser Erklärung erfahren Sie, welche Daten wir erheben, wie wir sie verwenden und welche Rechte Sie haben.</p>
            <p className="mt-2">Verantwortlich: RGBibel UG (haftungsbeschränkt), August-Bebel-Straße 26-53, Medienhaus, 14482 Potsdam, Deutschland, E-Mail: <a href="mailto:info@rgbibelofficial.com" className="text-[#04cefe] hover:underline">info@rgbibelofficial.com</a></p>
            <p>Externer Datenschutzbeauftragter: nicht bestellt. Bei Fragen wenden Sie sich bitte direkt an die oben angegebene E-Mail-Adresse.</p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">2. Besuch der Website</p>
            <p>Wenn Sie unsere Website nur besuchen, erfassen wir nur notwendige technische Daten (Server-Logfiles):</p>
            <ul className="list-disc pl-5">
              <li>Besuchte Seiten & Datum/Uhrzeit</li>
              <li>Übertragene Datenmenge</li>
              <li>Referrer (vorherige Seite)</li>
              <li>Browsertyp & Version</li>
              <li>Betriebssystem</li>
              <li>IP-Adresse (ggf. anonymisiert)</li>
            </ul>
            <p>Zweck: Stabilität und Sicherheit unserer Website. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Sicherheit: Alle Daten werden verschlüsselt via SSL/TLS übertragen (erkennbar an „https://“ und dem Schloss-Symbol im Browser).</p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">3. Cookies</p>
            <p>Wir nutzen Cookies, um die Nutzung der Website angenehm zu gestalten und Funktionen bereitzustellen:</p>
            <ul className="list-disc pl-5">
              <li>Session-Cookies: nach Schließen des Browsers gelöscht</li>
              <li>Persistente Cookies: bleiben länger auf Ihrem Gerät</li>
            </ul>
            <p>Rechtsgrundlagen: Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO), Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO). Sie können Cookies jederzeit in Ihrem Browser deaktivieren oder löschen.</p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">4. Kontaktaufnahme</p>
            <p>Wenn Sie uns per E-Mail oder Kontaktformular kontaktieren, verarbeiten wir Ihre Daten ausschließlich für die Bearbeitung Ihrer Anfrage. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO</p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">5. Kommentare & Bewertungen</p>
            <p>Wenn Sie Kommentare oder Bewertungen hinterlassen, speichern wir:</p>
            <ul className="list-disc pl-5">
              <li>Ihren Kommentar / Bewertung</li>
              <li>Datum & Uhrzeit</li>
              <li>Name oder Pseudonym</li>
              <li>IP-Adresse (für Sicherheit)</li>
            </ul>
            <p>Rechtsgrundlagen: Art. 6 Abs. 1 lit. b und f DSGVO</p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">6. Kundenkonto</p>
            <p>Wenn Sie ein Kundenkonto anlegen, verarbeiten wir Ihre Daten nur zur Abwicklung Ihrer Bestellungen. Sie können Ihr Konto jederzeit löschen lassen. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO</p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">7. Bestellabwicklung & Versand</p>
            <p>Für die Lieferung Ihrer Bestellung geben wir Ihre Daten an Transportunternehmen (z. B. DHL) und Zahlungsdienstleister (z. B. Stripe) weiter. Wir informieren Sie auch über den Bestellstatus oder digitale Produkte.</p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">8. Zahlungsdienstleister – Stripe</p>
            <p>Wir nutzen Stripe für sichere Zahlungsabwicklung. Ihre Zahlungsinformationen (z. B. Kreditkarten) werden direkt von Stripe verarbeitet. RGBibel UG hat keinen Zugriff auf sensible Zahlungsdaten. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO</p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">9. Rechte der Kunden</p>
            <ul className="list-disc pl-5">
              <li>Auskunft über gespeicherte Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
              <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
            </ul>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">10. Widerspruchsrecht</p>
            <p>Wenn wir Ihre Daten aufgrund berechtigter Interessen verarbeiten, können Sie jederzeit Widerspruch einlegen. Bei Direktwerbung können Sie jederzeit widersprechen.</p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">11. Dauer der Speicherung</p>
            <p>Wir speichern personenbezogene Daten nur so lange, wie es für die Erfüllung der Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.</p>
          </div>

          {/* Bottom Text */}
          <div className="mt-8 text-center text-sm text-gray-400 max-w-lg">
            <p>Für weitere Informationen zu unseren Datenschutzrichtlinien kontaktieren Sie uns bitte unter <a href="mailto:info@rgbibelofficial.de" className="text-[#04cefe] hover:underline">info@rgbibelofficial.de</a>.</p>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Datenschutz;
