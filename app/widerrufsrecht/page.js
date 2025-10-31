import Header from "../components/Header"
import Footer from "../components/Footer"

const Widerrufsrecht = () => {
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
          <h1 className="text-5xl font-bold text-[#04cefe] mb-8">WIDERRUFSRECHT</h1>

          {/* Widerrufsrecht Content */}
          <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg w-full max-w-2xl text-left">
            {/* Widerrufsrecht */}
            <p className="text-lg font-semibold">Widerrufsrecht</p>
            <p>
              Verbraucher haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen den Vertrag zu widerrufen.
              Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem der Kunde oder ein von ihm benannter Dritter,
              der nicht der Beförderer ist, die letzte Ware in Besitz genommen hat.
            </p>

            <div className="border-t border-gray-500 my-6"></div>

            {/* Ausübung */}
            <p className="text-lg font-semibold">Ausübung des Widerrufsrechts</p>
            <p>
              Um das Widerrufsrecht auszuüben, muss der Kunde{" "}
              <strong>RGBibelOfficial, August-Bebel-Straße 26-53, Medienhaus, 14482 Potsdam, Deutschland</strong>, 
              E-Mail:{" "}
              <a href="mailto:info@rgbibelofficial.com" className="text-[#04cefe] hover:underline">
                info@rgbibelofficial.com
              </a>
              , mittels einer eindeutigen Erklärung (z. B. per E-Mail oder Brief) über seinen Entschluss informieren,
              den Vertrag zu widerrufen.
            </p>
            <p>
              Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts
              vor Ablauf der Frist absenden.
            </p>

            <div className="border-t border-gray-500 my-6"></div>

            {/* Folgen */}
            <p className="text-lg font-semibold">Folgen des Widerrufs</p>
            <p>
              Im Falle eines Widerrufs erstatten wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben,
              einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben,
              dass Sie eine andere Art der Lieferung als die von uns angebotene günstigste Standardlieferung gewählt haben),
              unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag, an dem wir Ihre Widerrufserklärung erhalten haben.
            </p>
            <p>
              Die Rückzahlung erfolgt über dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion verwendet haben,
              sofern nicht ausdrücklich etwas anderes vereinbart wurde. Für diese Rückzahlung entstehen Ihnen keine Entgelte.
            </p>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}

export default Widerrufsrecht
