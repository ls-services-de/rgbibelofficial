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
          <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg w-full max-w-lg text-left">
            <p className="text-lg font-semibold">Widerrufsrecht</p>
            <p>Der Kunde hat das Recht, binnen vierzehn Tagen ohne Angabe von Gründen den Vertrag zu widerrufen.</p>
            <p>
              Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem der Kunde oder ein von ihm benannter Dritter,
              der nicht der Beförderer ist, die letzte Ware in Besitz genommen hat.
            </p>

            <p className="text-lg font-semibold mt-4">Ausübung des Widerrufsrechts</p>
            <p>
              Um das Widerrufsrecht auszuüben, muss der Kunde uns (RGBibel UG, August-Bebel-Straße 26-53, Medienhaus,
              14482 Potsdam, E-Mail: info@rgbibelofficial.de) mittels einer eindeutigen Erklärung (z. B. ein mit der
              Post versandter Brief oder eine E-Mail) über seinen Entschluss, den Vertrag zu widerrufen, informieren.
            </p>
            <p>
              Der Kunde kann das Widerrufsformular auf unserer Website ausfüllen, ist jedoch nicht dazu verpflichtet.
            </p>

            <p className="text-lg font-semibold mt-4">Wiederrufsvoraussetzungen und Rücksendung</p>
            <p>
              Nachdem der Kunde den Widerruf ausgeübt hat, muss er das Produkt an uns zurücksenden. Es wird
              vorausgesetzt, dass der Kunde die Ware in einer sicheren Verpackung zurücksendet, um Schäden während des
              Transports zu vermeiden.
            </p>
            <p>
              Der Kunde muss zusätzlich ein Bild des Rücksendescheins (z. B. von DHL) machen und uns zusammen mit der
              Rechnung und der zugehörigen PC-Nummer per E-Mail senden. Die Rücksendung muss unter Angabe dieser
              Informationen an die oben genannte Adresse erfolgen.
            </p>

            <p className="text-lg font-semibold mt-4">Erstattung</p>
            <p>
              Sobald die zurückgesendete Ware bei uns eingetroffen ist und geprüft wurde, erfolgt die Rückerstattung des
              Kaufpreises. Die Erstattung wird auf das vom Kunden für die Bestellung verwendete Konto durchgeführt.
            </p>
            <p>
              Der Kunde trägt die unmittelbaren Kosten der Rücksendung der Ware, sofern diese nicht bereits durch uns
              übernommen wurden.
            </p>

            <p className="text-lg font-semibold mt-4">Folgen des Widerrufs</p>
            <p>
              Wenn der Kunde den Vertrag widerruft, haben wir ihm alle Zahlungen, die wir von ihm erhalten haben,
              einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass der
              Kunde eine andere Art der Lieferung als die von uns angebotene günstigste Standardlieferung gewählt hat),
              unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über
              den Widerruf des Vertrags bei uns eingegangen ist.
            </p>
            <p>
              Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das der Kunde bei der ursprünglichen
              Transaktion eingesetzt hat, es sei denn, mit dem Kunden wurde ausdrücklich etwas anderes vereinbart. In
              keinem Fall werden dem Kunden wegen dieser Rückzahlung Entgelte berechnet.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Widerrufsrecht

