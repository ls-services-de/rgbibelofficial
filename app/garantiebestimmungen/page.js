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
          <h1 className="text-5xl font-bold text-[#04cefe] mb-8">GARANTIEBEDINGUNGEN FÜR COMPUTERSYSTEME</h1>

          {/* Warranty Terms Content */}
          <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg w-full max-w-2xl text-left">
            <p>
              RGBibelOfficial, nachfolgend „R.“ genannt, gewährt für alle von R. zusammengebauten PC-Systeme eine freiwillige Herstellergarantie. 
              Diese Garantie gilt ausschließlich für Endkunden innerhalb der EU und ist nicht übertragbar. Einzelkomponenten oder Bausätze, 
              die separat verkauft werden, sind von dieser freiwilligen Garantie ausgeschlossen, unterliegen jedoch der gesetzlichen Gewährleistung. 
              Es gilt die Kleinunternehmerregelung, die Mehrwertsteuer wird daher nicht ausgewiesen.
            </p>

            <p className="mt-4">
              Die hier beschriebenen Garantieleistungen stellen eine ergänzende freiwillige Garantie dar und ersetzen nicht die gesetzliche Gewährleistung, 
              die für Verbraucher in Deutschland in der Regel 24 Monate beträgt. Die freiwillige Garantie von R. beginnt mit dem Erhalt des PCs und gilt für 
              einen Zeitraum von zwölf Monaten. Innerhalb dieses Zeitraums werden Mängel, die bei ordnungsgemäßer Nutzung entstehen, kostenfrei behoben. 
              Dazu gehören Reparaturen, Ersatzteile sowie der Rückversand. R. behält sich das Recht vor, Geräte oder Komponenten aus wirtschaftlichen 
              oder logistischen Gründen durch gleichwertige Produkte zu ersetzen. Reklamationen führen nicht zu einer Verlängerung der Garantiezeit.
            </p>

            <p className="mt-4">
              Nach Ablauf der zwölf Monate liegt die Beweislast dafür, dass ein Mangel bereits innerhalb der Garantiezeit aufgetreten ist, beim Kunden (§ 477 BGB). 
              Die Garantie umfasst ausschließlich Material- oder Herstellungsfehler, die bei sachgemäßer Nutzung auftreten.
            </p>

            <p className="mt-4">
              Von der Garantie ausgeschlossen sind Schäden, die durch unsachgemäße Nutzung, unsachgemäße Verpackung bei Rücksendungen, Fremdeinwirkungen wie Flüssigkeiten 
              oder Stürze, Softwarefehler (einschließlich fehlerhafter Treiber-, Windows- oder Spiele-Updates), Viren oder Schadsoftware, Übertaktung, mechanische Beschädigungen, 
              Schäden durch nicht bei R. gekaufte Hardware, normale Abnutzung, Ausbau von Komponenten (außer Gehäuseseitenteile), Eingriffe ins BIOS, Bluescreens oder 
              Systemabstürze durch Updates verursacht werden.
            </p>

            <p className="mt-4">
              Schäden, die durch Softwareprobleme entstehen, sind von der Garantie ausgeschlossen, ebenso Datenverlust während der Reparatur oder Rücksendung. 
              Kunden sind verpflichtet, ihre Daten vor Einsendung zu sichern und sensible Daten zu löschen.
            </p>

            <p className="mt-4">
              R. haftet nicht für Schäden durch unsachgemäße Reparaturversuche des Kunden oder Dritter, Reparaturen durch Fremdwerkstätten, Datenverlust oder Schäden 
              aufgrund mangelhafter Verpackung bei Rücksendung.
            </p>

            <p className="mt-4">
              Für die Rücksendung von Geräten im Rahmen der freiwilligen Garantie trägt der Kunde die Kosten, sofern nicht ausdrücklich eine andere Vereinbarung getroffen wurde. 
Vor der Rücksendung muss der Kunde den Support von RGBibeOfficial kontaktieren, um das weitere Vorgehen abzustimmen. 
In bestimmten Fällen, wenn nur eine einzelne Komponente (z. B. Grafikkarte) von einem Defekt betroffen ist, kann der Kunde beantragen, nur diese Komponente einzusenden und den Rest des PCs bei sich zu behalten. 
RGBibelOfficial übernimmt keine Haftung für Schäden, die durch unsachgemäßes Ausbauen oder unsachgemäße Handhabung entstehen.
Sendet der Kunde den gesamten PC zurück, ist dieser sorgfältig zu polstern, sodass während des Transports keine Schäden entstehen. 
Das Gerät darf von außen nicht als Produkt der RGBibeOfficial erkennbar sein (ausgenommen das offizielle Versandlabel). Auch in diesem Fall haftet der Kunde für Beschädigungen, die durch mangelhafte Verpackung entstehen. 
Die Abholung beim Kunden erfolgt nach Absprache direkt an der Wohnungstür durch den von RGBibelOfficial beauftragten Versanddienstleister.
Für gesetzliche Gewährleistungsansprüche gelten weiterhin die gesetzlichen Regelungen, die eine Kostenübernahme durch den Händler vorsehen.
            </p>

            <p className="mt-4">
              Sendet der Kunde den gesamten PC zurück, ist dieser sorgfältig zu polstern, sodass während des Transports keine Schäden entstehen. Das Gerät darf von außen 
              nicht als Produkt der RGBibel UG erkennbar sein (ausgenommen das offizielle Versandlabel). Auch in diesem Fall haftet der Kunde für Beschädigungen, die durch 
              mangelhafte Verpackung entstehen. Die Abholung beim Kunden erfolgt nach Absprache direkt an der Wohnungstür durch den von RGBibel UG beauftragten Versanddienstleister.
            </p>

            <p className="mt-4">
              Für gesetzliche Gewährleistungsansprüche gelten weiterhin die gesetzlichen Regelungen, die eine Kostenübernahme durch den Händler vorsehen.
            </p>
          </div>

          {/* Bottom Text */}
          <div className="mt-8 text-center text-sm text-gray-400 max-w-2xl">
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
