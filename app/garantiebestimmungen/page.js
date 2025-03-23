import Header from "../components/Header"
import Footer from "../components/Footer"

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
            <p className="text-lg font-semibold">1. Geltungsbereich</p>
            <p>
              Diese Garantie gilt ausschließlich für von RGBIBEL UG (RGBibelOfficial/RGBibel) zusammengebaute
              PC-Systeme, einschließlich aller verbauten Komponenten. Sie ist nur für Endkunden innerhalb der EU gültig
              und nicht übertragbar. Einzelkomponenten und Bausätze unterliegen der gesetzlichen Gewährleistungsfrist
              und sind nicht durch diese Garantie abgedeckt.
            </p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">2. Garantieumfang</p>
            <p>
              Die Garantie beträgt 9 Monate ab Erhalt des Produkts und deckt nur Mängel ab, die bei ordnungsgemäßer
              Nutzung entstanden sind. Reparaturen, Ersatzteile und Rückversand sind innerhalb der Garantiezeit
              kostenfrei. RGBIBEL behält sich das Recht vor, Geräte oder Komponenten aus wirtschaftlichen oder
              logistischen Gründen durch gleichwertige Produkte zu ersetzen. Nach Ablauf der 9 Monate greift nur noch
              die gesetzliche Gewährleistung. Eine Reklamation führt nicht zu einer Verlängerung der Garantiezeit.
            </p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">3. Ausschlüsse von der Garantie</p>
            <p>Die Garantie umfasst nicht Schäden, die durch:</p>
            <ul className="list-disc pl-5">
              <li>Unsachgemäße Nutzung</li>
              <li>Unsachgemäße Verpackung bei Rücksendungen</li>
              <li>Fremdeinwirkungen wie Flüssigkeiten, unsachgemäße Anwendung</li>
              <li>Softwarefehler (z. B. durch fehlerhafte Treiberupdates, Windows-Updates oder Spiele)</li>
              <li>Viren oder Schadsoftware</li>
              <li>Übertaktung</li>
              <li>Mechanische Beschädigungen</li>
              <li>Schäden durch nicht bei RGBIBEL gekaufte Hardware</li>
              <li>Normale Abnutzung</li>
              <li>Ausgebaute Komponenten (außer dem Gehäuseseitenteil)</li>
              <li>Staub</li>
              <li>Eingriffe in das BIOS, wie z. B. fehlerhafte BIOS-Updates</li>
              <li>
                Bluescreens und allgemeine Fehler, die durch Windows-Updates oder fehlerhafte Treiberaktualisierungen
                verursacht wurden
              </li>
            </ul>
            <p>entstehen.</p>
            <p>
              Es wird keine Haftung für Bluescreens oder Systemabstürze aufgrund fehlerhafter Treiber- oder
              Windows-Updates übernommen. Diese Ereignisse fallen nicht unter die Garantiebedingungen. Ebenso verfällt
              die Garantie bei Eingriffen ins BIOS, wie etwa fehlerhaften BIOS-Updates.
            </p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">4. Keine Garantie auf Software</p>
            <p>
              Schäden, die durch Softwarefehler entstehen, sind nicht durch die Garantie abgedeckt. Sollte die Nutzung
              des Systems durch Softwarefehler (z. B. Treiber-, Windows- oder Update-Probleme) beeinträchtigt werden,
              werden Reparaturen nicht kostenlos durchgeführt. Jeglicher Datenverlust während Reparaturen oder
              Rücksendungen ist ebenfalls nicht durch die Garantie abgedeckt. Kunden sind verpflichtet, ihre Daten vor
              Einsendung des Geräts zu sichern und sensible Daten zu löschen.
            </p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">5. Haftungsausschluss und zusätzliche Ausschlüsse</p>
            <p>RGBIBEL haftet nicht für Schäden durch:</p>
            <ul className="list-disc pl-5">
              <li>Unsachgemäße Reparaturversuche des Kunden oder Dritter</li>
              <li>Reparaturen durch Fremdwerkstätten</li>
              <li>Datenverlust auf dem Gerät. Kunden müssen ihre Daten vor der Einsendung sichern.</li>
              <li>
                Schäden aufgrund unsachgemäßer Verpackung des Geräts bei Rücksendung, welche durch den Kunden zu
                verschulden sind. In solchen Fällen trägt der Kunde die Kosten für Reparaturen oder Rücksendungen.
              </li>
            </ul>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">6. Reklamationsablauf</p>
            <p>
              Im Falle einer Reklamation muss der Kunde das Gerät an RGBIBEL zurücksenden. Die Adresse sowie der genaue
              Ablauf sind im Garantiebereich zu finden. Der PC muss im Originalkarton sicher verpackt werden. Eine
              unsachgemäße Verpackung führt dazu, dass der Kunde für Reparaturen oder Rücksendungen selbst aufkommt. Als
              Nachweis für die Garantie gilt ausschließlich die Rechnung des reklamierten Geräts und die dazugehörige
              PC-Nummer.
            </p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">7. Garantieverlängerung</p>
            <p>Eine Reklamation führt nicht zu einer Verlängerung der Garantiezeit.</p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">8. Lebenslanger Kundensupport</p>
            <p>
              RGBIBEL bietet einen lebenslangen Kundensupport für alle Produkte. Auch nach Ablauf der Garantiezeit steht
              RGBIBEL seinen Kunden mit Rat und Tat zur Seite.
            </p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">9. Verfall der Garantie beim Weiterverkauf</p>
            <p>
              Die Garantie verfällt sofort beim Verkauf des Produkts an Dritte. Ein Verkauf des Produkts mit
              Restgarantie ist unzulässig.
            </p>

            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-lg font-semibold">10. Der Kunde trägt die Kosten eines Rückversandes</p>
          </div>

          {/* Bottom Text */}
          <div className="mt-8 text-center text-sm text-gray-400 max-w-lg">
            <p>
              Für weitere Informationen zu unseren Garantiebedingungen kontaktieren Sie uns bitte unter{" "}
              <a href="mailto:info@rgbibelofficial.de" className="text-[#04cefe] hover:underline">
                info@rgbibelofficial.de
              </a>
              .
            </p>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}

export default Garantiebedingungen

