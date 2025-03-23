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
          <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg w-full max-w-lg text-left">
            <p className="text-lg font-semibold">1) Geltungsbereich</p>
            <p>
              1.1 Diese Allgemeinen Geschäftsbedingungen (AGB) der RGBibel UG (nachfolgend „Verkäufer") gelten für alle
              Verträge zur Lieferung von Waren, die ein Kunde mit dem Verkäufer über den Online-Shop des Verkäufers
              abschließt. Etwaige abweichende AGB des Kunden werden nicht berücksichtigt. Es gelten ausschließlich diese
              AGB.
            </p>
            <p>
              1.2 Diese AGB gelten ebenfalls für Verträge zur Bereitstellung von Lizenzschlüsseln oder digitalen
              Produkten, die für die Nutzung der Ware erforderlich sind.
            </p>
            <p>
              1.3 Verbraucher im Sinne dieser AGB ist jede natürliche Person, die zu Zwecken handelt, die überwiegend
              nicht ihrer gewerblichen oder selbständigen beruflichen Tätigkeit zugerechnet werden können.
            </p>
            <p>
              1.4 Unternehmer im Sinne dieser AGB ist eine natürliche oder juristische Person oder eine rechtsfähige
              Personengesellschaft, die bei Abschluss eines Rechtsgeschäfts in Ausübung ihrer gewerblichen oder
              selbständigen beruflichen Tätigkeit handelt.
            </p>

            <p className="text-lg font-semibold mt-4">2) Vertragsschluss</p>
            <p>
              2.1 Die Produktbeschreibung im Online-Shop ist kein Angebot, sondern eine Aufforderung zur Abgabe eines
              Angebots durch den Kunden.
            </p>
            <p>
              2.2 Der Kunde gibt sein verbindliches Angebot durch das Absenden seiner Bestellung ab. Der Vertrag kommt
              zustande, wenn der Verkäufer das Angebot des Kunden durch eine Auftragsbestätigung oder durch Lieferung
              der Ware annimmt.
            </p>
            <p>
              2.3 Das Angebot des Kunden wird vom Verkäufer innerhalb von fünf Tagen angenommen, entweder durch eine
              Bestätigung oder durch Lieferung. Ohne diese Annahme kommt kein Vertrag zustande.
            </p>
            <p>
              2.4 Bei der Zahlungsmethode PayPal erfolgt die Annahme des Angebots des Kunden mit der Bestätigung der
              Zahlung.
            </p>

            <p className="text-lg font-semibold mt-4">3) Widerrufsrecht</p>
            <p>
              3.1 Verbraucher haben grundsätzlich ein Widerrufsrecht gemäß der Widerrufsbelehrung, die dem Kunden vor
              Abschluss der Bestellung zur Verfügung gestellt wird. Missbrauch des Widerrufsrechts wird nicht toleriert.
            </p>
            <p>3.2 Widerrufe, die außerhalb der festgelegten Fristen eingehen, werden nicht berücksichtigt.</p>

            <p className="text-lg font-semibold mt-4">4) Preise und Zahlungsbedingungen</p>
            <p>
              4.1 Alle angegebenen Preise sind Endpreise, die die gesetzliche Mehrwertsteuer beinhalten. Eventuelle
              Versandkosten werden zusätzlich berechnet und gesondert ausgewiesen.
            </p>
            <p>
              4.2 Die Zahlung ist unmittelbar nach Bestellabschluss fällig. Erfolgt keine Zahlung innerhalb von sieben
              Tagen, wird die Bestellung ohne weitere Ankündigung storniert.
            </p>
            <p>
              4.3 Bei Wahl der Zahlungsmethode PayPal akzeptiert der Verkäufer das Angebot des Kunden mit der
              Bestätigung der Zahlung. Es sind keine weiteren Bedingungen erforderlich.
            </p>

            <p className="text-lg font-semibold mt-4">5) Lieferung</p>
            <p>
              5.1 Die Lieferung erfolgt nur an die vom Kunden angegebene Adresse. Bei Änderungen der Lieferadresse nach
              Bestellabschluss werden zusätzliche Versandkosten berechnet.
            </p>
            <p>
              5.2 Teillieferungen können ohne Rücksprache erfolgen. Sollte eine Teillieferung notwendig sein, entstehen
              dem Kunden keine zusätzlichen Kosten.
            </p>
            <p>
              5.3 Wir liefern ausschließlich innerhalb Deutschlands und der EU. Für Lieferungen außerhalb dieses Gebiets
              muss eine gesonderte Vereinbarung getroffen werden.
            </p>

            <p className="text-lg font-semibold mt-4">6) Gewährleistung und Haftung</p>
            <p>
              6.1 Es gilt das gesetzliche Mängelhaftungsrecht. Alle Mängel müssen innerhalb der gesetzlichen Fristen
              gemeldet werden, um Gewährleistungsansprüche geltend zu machen.
            </p>
            <p>
              6.2 Garantieansprüche werden ausgeschlossen, wenn der Mangel durch unsachgemäße Nutzung oder Veränderungen
              der Ware entstanden ist.
            </p>
            <p>
              6.3 Der Verkäufer haftet nur für Schäden, die vorsätzlich oder grob fahrlässig verursacht wurden. Eine
              Haftung für einfache Fahrlässigkeit ist ausgeschlossen, außer bei Schäden aus der Verletzung des Lebens,
              des Körpers oder der Gesundheit.
            </p>

            <p className="text-lg font-semibold mt-4">7) Schlussbestimmungen</p>
            <p>7.1 Es gilt ausschließlich deutsches Recht. Das UN-Kaufrecht wird ausdrücklich ausgeschlossen.</p>
            <p>
              7.2 Gerichtsstand ist der Sitz des Verkäufers, sofern der Kunde Kaufmann ist oder seinen Wohnsitz
              außerhalb Deutschlands hat.
            </p>

            <p className="text-lg font-semibold mt-4">Zusatzinformationen:</p>
            <p>
              Garantieverfall: Die Garantie erlischt, wenn das Produkt an Dritte weiterverkauft oder unsachgemäß
              verwendet wird. Kundensupport: Wir bieten selbstverständlich Support, behalten uns jedoch vor, Anfragen,
              die nicht mit der bestellten Ware zusammenhängen, nicht zu berücksichtigen.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AGB

