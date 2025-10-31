import Header from "../components/Header"
import Footer from "../components/Footer"

const Versand = () => {
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
          <h1 className="text-5xl font-bold text-[#04cefe] mb-8">VERSANDINFORMATIONEN</h1>

          {/* Shipping Information */}
          <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg w-full max-w-2xl text-left">
            {/* Versand innerhalb Deutschlands */}
            <p className="text-lg font-semibold">Versand innerhalb Deutschlands</p>
            <p>
              Der Versand erfolgt ausschließlich innerhalb Deutschlands, in der Regel mit DHL.
              Größere Sendungen (z. B. Monitore oder Gehäuse in Sondergrößen) können abweichend
              mit einem anderen Versanddienstleister verschickt werden.
            </p>

            <div className="border-t border-gray-500 my-6"></div>

            {/* Versandkosten */}
            <p className="text-lg font-semibold">Verpackungs- und Versandkosten</p>
            <ul className="list-disc list-inside">
              <li>29,99 € für Bestellungen bis 2.500 € Warenwert</li>
              <li>35,99 € für Bestellungen über 2.500 € Warenwert</li>
            </ul>

            <div className="border-t border-gray-500 my-6"></div>

            {/* Zubehör */}
            <p className="text-lg font-semibold">Zusätzliche Versandkosten für Zubehör</p>
            <ul className="list-disc list-inside">
              <li>Maus: 9,95 €</li>
              <li>Tastatur: 14,95 €</li>
              <li>Monitor: 19,95 €</li>
            </ul>

            <div className="border-t border-gray-500 my-6"></div>

            {/* Sicherer Versand */}
            <p className="text-lg font-semibold">Sicherer Versand</p>
            <p>
              Alle PC-Systeme werden vor dem Versand sorgfältig und stoßsicher verpackt.
              Die Hardware wird mit Dämmmaterial fixiert und zusätzlich in Schutzfolie eingewickelt,
              um Transportschäden bestmöglich zu vermeiden. Unsere Systeme sind bei DHL mindestens
              bis zum Warenwert der Sendung versichert.
            </p>

            <div className="border-t border-gray-500 my-6"></div>

            {/* Verpackung */}
            <p className="text-lg font-semibold">Verpackung aufbewahren</p>
            <p>
              Wir empfehlen, die Originalverpackung des PCs aufzubewahren.
              Im Falle einer Reklamation oder Rücksendung ermöglicht dies eine sichere und schnelle Abwicklung.
              Schäden durch unsachgemäße Verpackung bei Rücksendungen können die Garantie-
              oder Gewährleistungsabwicklung beeinträchtigen.
            </p>

            <div className="border-t border-gray-500 my-6"></div>

            {/* Versanddauer */}
            <p className="text-lg font-semibold">Versanddauer</p>
            <p>
              Die Lieferfrist beginnt ab Zahlungseingang, nicht ab dem Bestelldatum.
              Sie gilt ab Erhalt der Bestellbestätigung.
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>Zahlung per Klarna, Kreditkarte oder Direktlink: Versand innerhalb von 14 Werktagen</li>
              <li>Zahlung per SEPA-Lastschrift: Versand innerhalb von 21 Werktagen</li>
            </ul>

            <p className="mt-4 font-semibold">Kurzfristig erhältlich:</p>
            <ul className="list-disc list-inside">
              <li>Klarna, Kreditkarte oder Direktlink: Versand innerhalb von 14 Werktagen</li>
              <li>SEPA-Lastschrift: Versand innerhalb von 21 Werktagen</li>
            </ul>

            <p className="mt-4 font-semibold">Vorbestellbar:</p>
            <p>Versandtermin wird individuell nach Wareneingang abgestimmt.</p>

            <p className="mt-4 font-semibold">Ausverkauft:</p>
            <p>Kein Versand möglich.</p>

            <p className="mt-4 font-semibold">In Kürze verfügbar / Nur vorbestellbar:</p>
            <p>Versandtermin wird nach Bestellbestätigung individuell mitgeteilt.</p>

            <div className="border-t border-gray-500 my-6"></div>

            {/* Hinweis zur Lieferzeit */}
            <p className="text-lg font-semibold">Hinweis zur Lieferzeit</p>
            <p>
              Die angegebenen Lieferzeiten sind Erfahrungswerte und können in Einzelfällen
              (z. B. aufgrund von Lieferengpässen, Feiertagen oder unerwarteten Ereignissen) abweichen.
              Sie stellen keine verbindliche Lieferzusage dar.
            </p>

            <div className="border-t border-gray-500 my-6"></div>

            {/* UStG Hinweis */}
            <p className="text-sm italic text-gray-400">
              „Gemäß § 19 UStG erheben und weisen wir keine Umsatzsteuer aus.“
            </p>

            <div className="border-t border-gray-500 my-6"></div>

            {/* Garantie-Link */}
            <p className="text-sm text-gray-400">
              Weitere Informationen zu Garantien und Rücksendungen finden Sie in unserem{" "}
              <a href="/garantie" className="text-[#04cefe] hover:underline">
                Garantiebereich
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

export default Versand
