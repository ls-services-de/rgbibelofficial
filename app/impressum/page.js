import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Impressum = () => {
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
          <h1 className="text-5xl font-bold text-[#04cefe] mb-8">IMPRESSUM</h1>

          {/* Company Information */}
          <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
            <p className="text-lg">Tim Hinsche – RGBibelOfficial</p>
            <p>August-Bebel-Straße | 26-53 | Medienhaus</p>
            <p>14482 Potsdam</p>
            <p className="mt-4">
              <a
                href="mailto:info@rgbibelofficial.com"
                className="text-[#04cefe] hover:underline"
              >
                info@rgbibelofficial.com
              </a>
            </p>

            <div className="border-t border-gray-500 my-6"></div>

            {/* Representative Information */}
            <p className="text-lg font-semibold">Vertretungsberechtigte Person:</p>
            <p>Tim Hinsche</p>

            <div className="border-t border-gray-500 my-6"></div>

            {/* VAT Information */}
            <p className="text-sm">
              Umsatzsteuer-Identifikationsnummer (EU) gemäß § 27 a UStG:
            </p>
            <p className="text-sm">DE88940236510</p>

            <div className="border-t border-gray-500 my-6"></div>

            {/* Phone Information */}
            <p className="text-sm">Telefon: +49 1522 4572334</p>
            <p className="text-sm">(Keine Anrufe ohne vorherige Terminvereinbarung.)</p>
          </div>

          {/* Bottom Text */}
          <div className="mt-8 text-center text-sm text-gray-400 max-w-lg">
            <p>
              Plattform der EU-Kommission zur Online-Streitbeilegung:{" "}
              <a
                href="https://ec.europa.eu/odr"
                className="text-[#04cefe] hover:underline ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://ec.europa.eu/odr
              </a>
            </p>
            <p className="mt-2">
              Hinweis: Wir sind zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle weder verpflichtet noch bereit.
            </p>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Impressum;
