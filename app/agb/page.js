import Header from "../components/Header"
import Footer from "../components/Footer"

const AGB = () => {
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
          <h1 className="text-5xl font-bold text-[#04cefe] mb-8">ALLGEMEINE GESCHÄFTSBEDINGUNGEN (AGB)</h1>

          {/* AGB Content */}
          <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg w-full max-w-2xl text-left">
            {/* Geltungsbereich */}
            <p className="text-lg font-semibold">Geltungsbereich</p>
            <p>
              Die nachfolgenden Allgemeinen Geschäftsbedingungen (AGB) von RGBibelOfficial (nachfolgend „Verkäufer“ oder „R.“) 
              gelten für alle Verträge über den Kauf von Waren, die ein Kunde über den Online-Shop des Verkäufers abschließt. 
              Abweichende Bedingungen des Kunden erkennen wir nicht an. Diese AGB gelten auch für digitale Produkte oder Lizenzschlüssel, 
              die zur Nutzung der bestellten Ware erforderlich sind.
            </p>
            <p>
              Verbraucher im Sinne dieser AGB sind natürliche Personen, die ein Rechtsgeschäft zu Zwecken abschließen, 
              die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können. 
              Unternehmer sind natürliche oder juristische Personen oder rechtsfähige Personengesellschaften, die bei Abschluss eines 
              Rechtsgeschäfts in Ausübung ihrer gewerblichen oder selbständigen beruflichen Tätigkeit handeln.
            </p>

            <div className="border-t border-gray-500 my-6"></div>

            {/* Vertragsschluss */}
            <p className="text-lg font-semibold">Vertragsschluss</p>
            <p>
              Die Produktdarstellung im Online-Shop stellt kein bindendes Angebot dar, sondern eine Aufforderung zur Abgabe einer Bestellung 
              durch den Kunden. Durch das Absenden der Bestellung gibt der Kunde ein verbindliches Angebot ab. Der Vertrag kommt zustande, 
              wenn der Verkäufer dieses Angebot durch eine Auftragsbestätigung per E-Mail oder durch Lieferung der Ware annimmt. 
              Bei Zahlungen über PayPal erfolgt die Annahme des Angebots mit der Bestätigung der Zahlung. Ohne diese Annahme kommt kein Vertrag zustande.
            </p>

            <div className="border-t border-gray-500 my-6"></div>

            {/* Preise und Zahlung */}
            <p className="text-lg font-semibold">Preise und Zahlungsbedingungen</p>
            <p>
              Alle Preise im Shop verstehen sich als Endpreise nach der Kleinunternehmerregelung gemäß § 19 UStG, es wird keine Mehrwertsteuer ausgewiesen. 
              Etwaige Versandkosten werden separat berechnet und gesondert angezeigt. Die Zahlung ist unmittelbar nach Bestellabschluss fällig. 
              Erfolgt keine Zahlung innerhalb von sieben Tagen, behält sich der Verkäufer vor, die Bestellung zu stornieren.
            </p>

            <div className="border-t border-gray-500 my-6"></div>

            {/* Lieferung */}
            <p className="text-lg font-semibold">Lieferung</p>
            <p>
              Die Lieferung erfolgt ausschließlich an die vom Kunden angegebene Lieferadresse. Änderungen der Lieferadresse nach Bestellabschluss 
              können zu zusätzlichen Versandkosten führen. Teillieferungen sind zulässig und können ohne gesonderte Ankündigung erfolgen; 
              dem Kunden entstehen daraus keine zusätzlichen Kosten. Lieferungen erfolgen grundsätzlich innerhalb Deutschlands. 
              Lieferungen in die übrige EU oder in andere Länder bedürfen einer gesonderten Vereinbarung.
            </p>

            <div className="border-t border-gray-500 my-6"></div>

            {/* Gewährleistung und Garantie */}
            <p className="text-lg font-semibold">Gewährleistung und Garantie</p>
            <p>
              Es gilt die gesetzliche Mängelhaftung. Reklamationen müssen innerhalb der gesetzlichen Fristen gemeldet werden. 
              Zusätzlich bietet R. eine freiwillige Garantie gemäß den separaten Garantiebedingungen, die ausdrücklich von der gesetzlichen Gewährleistung getrennt sind.
            </p>

            <div className="border-t border-gray-500 my-6"></div>

            {/* Widerrufsrecht */}
            <p className="text-lg font-semibold">Widerrufsrecht</p>
            <p>
              Verbraucher haben ein gesetzliches Widerrufsrecht gemäß der Widerrufsbelehrung auf der Website. 
              Bei konfigurierbaren oder individuellen PCs können Einschränkungen bestehen, da Maßanfertigungen unter Umständen vom Widerrufsrecht ausgeschlossen sind.
            </p>

            <div className="border-t border-gray-500 my-6"></div>

            {/* Haftung */}
            <p className="text-lg font-semibold">Haftung</p>
            <p>
              R. haftet nur für Schäden, die vorsätzlich oder grob fahrlässig verursacht wurden. 
              Eine Haftung für einfache Fahrlässigkeit ist ausgeschlossen, soweit nicht Leben, Körper oder Gesundheit betroffen sind. 
              Für Schäden durch unsachgemäße Nutzung, Eingriffe Dritter oder unzureichende Verpackung bei Rücksendungen übernimmt R. keine Haftung.
            </p>

            <div className="border-t border-gray-500 my-6"></div>

            {/* Schlussbestimmungen */}
            <p className="text-lg font-semibold">Schlussbestimmungen</p>
            <p>
              Es gilt deutsches Recht. Das UN-Kaufrecht wird ausgeschlossen. Gerichtsstand ist der Sitz des Verkäufers, 
              sofern der Kunde Kaufmann ist oder seinen Wohnsitz außerhalb Deutschlands hat.
            </p>
            <p>
              Die AGB gelten ab dem Zeitpunkt ihrer Veröffentlichung auf der Website und ersetzen alle vorherigen Fassungen. 
              Änderungen der AGB werden auf der Website bekanntgegeben.
            </p>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}

export default AGB
