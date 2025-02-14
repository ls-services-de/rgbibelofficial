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
            <p className="text-lg font-semibold">1. Einleitung und Kontaktdaten des Verantwortlichen</p>
            <p>1.1 Wir freuen uns, dass Sie unsere Website besuchen und bedanken uns für Ihr Interesse. Im Folgenden informieren wir Sie über den Umgang mit Ihren personenbezogenen Daten bei der Nutzung unserer Website. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
            <p>1.2 Verantwortlicher für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist RGBibel UG (haftungsbeschränkt), August Bebel Straße 26-53 Medienhaus, 14482 Potsdam, Deutschland. E-Mail: <a href="mailto:info@rgbibelofficial.de" className="text-[#04cefe] hover:underline">info@rgbibelofficial.de</a>.</p>
            <p>1.3 Der Verantwortliche hat keinen externen Datenschutzbeauftragten bestellt. Bei Fragen zum Datenschutz können Sie uns direkt unter der oben angegebenen E-Mail-Adresse kontaktieren.</p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">2. Datenerfassung beim Besuch unserer Website</p>
            <p>2.1 Bei der bloß informatorischen Nutzung unserer Website, also wenn Sie sich nicht registrieren oder uns anderweitig Informationen übermitteln, erheben wir nur solche Daten, die Ihr Browser an den Seitenserver übermittelt (sog. „Server-Logfiles“). Diese Daten sind technisch erforderlich, um Ihnen die Website anzuzeigen:</p>
            <ul className="list-disc pl-5">
              <li>Unsere besuchte Website</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Menge der gesendeten Daten in Byte</li>
              <li>Quelle/Verweis, von welchem Sie auf die Seite gelangten</li>
              <li>Verwendeter Browser</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Verwendete IP-Adresse (ggf. in anonymisierter Form)</li>
            </ul>
            <p>Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses an der Verbesserung der Stabilität und Funktionalität unserer Website.</p>
            <p>2.2 Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung personenbezogener Daten eine SSL- bzw. TLS-Verschlüsselung. Sie können eine verschlüsselte Verbindung an der Zeichenfolge „https://“ und dem Schloss-Symbol in Ihrer Browserzeile erkennen.</p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">3. Cookies</p>
            <p>Um den Besuch unserer Website attraktiv zu gestalten und die Nutzung bestimmter Funktionen zu ermöglichen, verwenden wir Cookies. Teilweise werden diese Cookies nach Schließen des Browsers automatisch gelöscht („Session-Cookies“), teilweise verbleiben sie länger auf Ihrem Endgerät („persistente Cookies“). Sie können die Speicherdauer der Cookies in den Einstellungen Ihres Browsers einsehen.</p>
            <p>Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. b DSGVO zur Durchführung des Vertrages, gemäß Art. 6 Abs. 1 lit. a DSGVO im Falle einer erteilten Einwilligung oder gemäß Art. 6 Abs. 1 lit. f DSGVO zur Wahrung unserer berechtigten Interessen.</p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">4. Kontaktaufnahme</p>
            <p>Im Rahmen der Kontaktaufnahme mit uns (z.B. per E-Mail) werden personenbezogene Daten ausschließlich zum Zweck der Bearbeitung Ihres Anliegens verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.</p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">5. Kommentarfunktion</p>
            <p>Im Rahmen der Kommentarfunktion werden neben Ihrem Kommentar auch Angaben zum Zeitpunkt der Erstellung und der von Ihnen gewählte Name gespeichert. Ihre IP-Adresse wird aus Sicherheitsgründen mitprotokolliert. Rechtsgrundlagen für die Speicherung Ihrer Daten sind die Art. 6 Abs. 1 lit. b und f DSGVO.</p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">6. Datenverarbeitung bei Eröffnung eines Kundenkontos</p>
            <p>Wenn Sie ein Kundenkonto eröffnen, werden Ihre personenbezogenen Daten gemäß Art. 6 Abs. 1 lit. b DSGVO im erforderlichen Umfang verarbeitet. Sie können Ihr Kundenkonto jederzeit löschen lassen.</p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">7. Datenverarbeitung zur Bestellabwicklung</p>
            <p>Zur Bestellabwicklung werden personenbezogene Daten an das Transportunternehmen und das Kreditinstitut weitergegeben. Zudem verarbeiten wir Ihre Kontaktdaten, um Sie über Aktualisierungen zu informieren, wenn Sie digitale Produkte bei uns bestellt haben.</p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">8. Rechte des Betroffenen</p>
            <p>Das Datenschutzrecht gewährt Ihnen die folgenden Rechte:</p>
            <ul className="list-disc pl-5">
              <li>Auskunftsrecht gemäß Art. 15 DSGVO</li>
              <li>Recht auf Berichtigung gemäß Art. 16 DSGVO</li>
              <li>Recht auf Löschung gemäß Art. 17 DSGVO</li>
              <li>Recht auf Einschränkung der Verarbeitung gemäß Art. 18 DSGVO</li>
              <li>Recht auf Datenübertragbarkeit gemäß Art. 20 DSGVO</li>
              <li>Recht auf Widerruf erteilter Einwilligungen gemäß Art. 7 Abs. 3 DSGVO</li>
              <li>Recht auf Beschwerde gemäß Art. 77 DSGVO</li>
            </ul>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">9. Widerspruchsrecht</p>
            <p>Wenn wir Ihre personenbezogenen Daten aufgrund berechtigten Interesses verarbeiten, haben Sie jederzeit das Recht, Widerspruch einzulegen. Werden Ihre personenbezogenen Daten zur Direktwerbung verwendet, können Sie jederzeit Widerspruch dagegen einlegen.</p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">10. Dauer der Speicherung personenbezogener Daten</p>
            <p>Die Dauer der Speicherung richtet sich nach der Rechtsgrundlage und dem Verarbeitungszweck. Daten werden gelöscht, wenn sie nicht mehr erforderlich sind.</p>
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
