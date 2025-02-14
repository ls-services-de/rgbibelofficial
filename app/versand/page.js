import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
          <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg w-full max-w-lg text-left">
            <p className="text-lg font-semibold">Versand innerhalb Deutschlands</p>
            <p>Wir versenden in der Regel innerhalb Deutschlands mit DHL. Ausgenommen davon sind große Pakete wie z.B. Monitore.</p>

            <div className="border-t border-gray-500 my-6"></div>

            {/* Shipping Costs */}
            <p className="text-lg font-semibold">Verpackungs- und Versandkosten</p>
            <ul className="list-disc list-inside">
              <li>29,99€ für Bestellungen bis 2500€</li>
              <li>35,99€ für Bestellungen über 2500€</li>
            </ul>

            <div className="border-t border-gray-500 my-6"></div>

            {/* Safety and Packaging */}
            <p className="text-lg font-semibold">Sicherer Versand</p>
            <p>Um eine sichere Lieferung zu gewährleisten, sind alle PC-Systeme von uns extra gesichert. Dazu gehört das Sichern der Hardware mit Dämmmaterial und das Einpacken in Schutzfolie, um eine möglichst hohe Sicherheit im Falle eines Sturzes zu gewährleisten.</p>
            <p>Zudem sind unsere Systeme mit mindestens dem Wert der verschickten Ware bei DHL versichert.</p>

            <div className="border-t border-gray-500 my-6"></div>

            {/* Packaging Recommendation */}
            <p className="text-lg font-semibold">Verpackung aufbewahren</p>
            <p>Wir empfehlen, die Verpackung des PCs aufzubewahren, damit wir im Falle einer Reklamation eine optimale Rücksendung gewährleisten können.</p>

            <div className="border-t border-gray-500 my-6"></div>

            {/* More Information */}
            <p className="text-sm text-gray-400">
              Für weitere Informationen zu Garantien und Rücksendungen entnehmen Sie bitte unserem <a href="/garantie" className="text-[#04cefe] hover:underline">Garantiebereich</a>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Versand;
