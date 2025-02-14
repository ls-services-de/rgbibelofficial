import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
              1.1 Diese Allgemeinen Geschäftsbedingungen (nachfolgend "AGB") der RGBibel UG (haftungsbeschränkt) (nachfolgend "Verkäufer"), gelten für alle Verträge zur Lieferung von Waren, die ein Verbraucher oder Unternehmer (nachfolgend „Kunde“) mit dem Verkäufer hinsichtlich der vom Verkäufer in seinem Online-Shop dargestellten Waren abschließt. Hiermit wird der Einbeziehung von eigenen Bedingungen des Kunden widersprochen, es sei denn, es ist etwas anderes vereinbart.
            </p>
            <p>
              1.2 Für Verträge zur Lieferung von Waren mit digitalen Elementen gelten diese AGB entsprechend, sofern insoweit nicht etwas Abweichendes geregelt ist. Dabei schuldet der Verkäufer neben der Lieferung der Ware die Bereitstellung von digitalen Inhalten oder digitalen Dienstleistungen (nachfolgend „digitale Produkte“), die in einer Weise in der Ware enthalten oder mit ihr verbunden sind, dass die Ware ihre Funktionen ohne sie nicht erfüllen kann.
            </p>
            <p>
              1.3 Für Verträge zur Bereitstellung von Lizenzschlüsseln gelten diese AGB entsprechend, sofern insoweit nicht etwas Abweichendes geregelt ist. Dabei schuldet der Verkäufer die Bereitstellung eines Lizenzschlüssels zur Nutzung der von ihm beschriebenen digitalen Inhalte oder digitalen Dienstleistungen (nachfolgend „digitale Produkte“) sowie die Einräumung der vertraglich vereinbarten Rechte zur Nutzung der jeweiligen digitalen Produkte. Der Kunde erwirbt kein geistiges Eigentum an dem digitalen Produkt. Für die Beschaffenheit des digitalen Produkts ist die jeweilige Produktbeschreibung des Verkäufers maßgeblich.
            </p>
            <p>
              1.4 Verbraucher im Sinne dieser AGB ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können.
            </p>
            <p>
              1.5 Unternehmer im Sinne dieser AGB ist eine natürliche oder juristische Person oder eine rechtsfähige Personengesellschaft, die bei Abschluss eines Rechtsgeschäfts in Ausübung ihrer gewerblichen oder selbständigen beruflichen Tätigkeit handelt.
            </p>

            <p className="text-lg font-semibold mt-4">2) Vertragsschluss</p>
            <p>
              2.1 Die im Online-Shop des Verkäufers enthaltenen Produktbeschreibungen stellen keine verbindlichen Angebote seitens des Verkäufers dar, sondern dienen zur Abgabe eines verbindlichen Angebots durch den Kunden.
            </p>
            <p>
              2.2 Der Kunde kann das Angebot über das in den Online-Shop des Verkäufers integrierte Online-Bestellformular abgeben. Dabei gibt der Kunde, nachdem er die ausgewählten Waren in den virtuellen Warenkorb gelegt und den elektronischen Bestellprozess durchlaufen hat, durch Klicken des den Bestellvorgang abschließenden Buttons ein rechtlich verbindliches Vertragsangebot in Bezug auf die im Warenkorb enthaltenen Waren ab.
            </p>
            <p>
              2.3 Der Verkäufer kann das Angebot des Kunden innerhalb von fünf Tagen annehmen, indem er dem Kunden eine schriftliche Auftragsbestätigung oder eine Auftragsbestätigung in Textform (Fax oder E-Mail) übermittelt, wobei insoweit der Zugang der Auftragsbestätigung beim Kunden maßgeblich ist, oder indem er dem Kunden die bestellte Ware liefert, wobei insoweit der Zugang der Ware beim Kunden maßgeblich ist, oder indem er den Kunden nach Abgabe von dessen Bestellung zur Zahlung auffordert. 
              Liegen mehrere der vorgenannten Alternativen vor, kommt der Vertrag in dem Zeitpunkt zustande, in dem eine der vorgenannten Alternativen zuerst eintritt. Die Frist zur Annahme des Angebots beginnt am Tag nach der Absendung des Angebots durch den Kunden zu laufen und endet mit dem Ablauf des fünften Tages, welcher auf die Absendung des Angebots folgt. Nimmt der Verkäufer das Angebot des Kunden innerhalb vorgenannter Frist nicht an, so gilt dies als Ablehnung des Angebots mit der Folge, dass der Kunde nicht mehr an seine Willenserklärung gebunden ist.
            </p>
            <p>
              2.4 Bei Auswahl einer von PayPal angebotenen Zahlungsart erfolgt die Zahlungsabwicklung über den Zahlungsdienstleister PayPal (Europe) S.à r.l. et Cie, S.C.A., 22-24 Boulevard Royal, L-2449 Luxemburg (im Folgenden: „PayPal“), unter Geltung der PayPal-Nutzungsbedingungen, einsehbar unter dd oder - falls der Kunde nicht über ein PayPal-Konto verfügt – unter Geltung der Bedingungen für Zahlungen ohne PayPal-Konto, einsehbar unter dd. Zahlt der Kunde mittels einer im Online-Bestellvorgang auswählbaren von PayPal angebotenen Zahlungsart, erklärt der Verkäufer schon jetzt die Annahme des Angebots des Kunden in dem Zeitpunkt, in dem der Kunde den Button anklickt, welcher den Bestellvorgang abschließt.
            </p>
            <p>
              2.5 Bei der Abgabe eines Angebots über das Online-Bestellformular des Verkäufers wird der Vertragstext nach dem Vertragsschluss vom Verkäufer gespeichert und dem Kunden nach Absendung von dessen Bestellung in Textform (z. B. E-Mail, Fax oder Brief) übermittelt. Eine darüber hinausgehende Zugänglichmachung des Vertragstextes durch den Verkäufer erfolgt nicht. Sofern der Kunde vor Absendung seiner Bestellung ein Nutzerkonto im Online-Shop des Verkäufers eingerichtet hat, werden die Bestelldaten auf der Website des Verkäufers archiviert und können vom Kunden über dessen passwortgeschütztes Nutzerkonto unter Angabe der entsprechenden Login-Daten kostenlos abgerufen werden.
            </p>
            <p>
              2.6 Vor verbindlicher Abgabe der Bestellung über das Online-Bestellformular des Verkäufers kann der Kunde mögliche Eingabefehler durch aufmerksames Lesen der auf dem Bildschirm dargestellten Informationen erkennen. Ein wirksames technisches Mittel zur besseren Erkennung von Eingabefehlern kann dabei die Vergrößerungsfunktion des Browsers sein, mit deren Hilfe die Darstellung auf dem Bildschirm vergrößert wird. Seine Eingaben kann der Kunde im Rahmen des elektronischen Bestellprozesses so lange über die üblichen Tastatur- und Mausfunktionen korrigieren, bis er den Button anklickt, welcher den Bestellvorgang abschließt.
            </p>
            <p>
              2.7 Für den Vertragsschluss stehen unterschiedliche Sprachen zur Verfügung. Die konkrete Sprachauswahl wird im Online-Shop angezeigt.
            </p>
            <p>
              2.8 Die Bestellabwicklung und Kontaktaufnahme finden in der Regel per E-Mail und automatisierter Bestellabwicklung statt. Der Kunde hat sicherzustellen, dass die von ihm zur Bestellabwicklung angegebene E-Mail-Adresse zutreffend ist, so dass unter dieser Adresse die vom Verkäufer versandten E-Mails empfangen werden können. Insbesondere hat der Kunde bei dem Einsatz von SPAM-Filtern sicherzustellen, dass alle vom Verkäufer oder von diesem mit der Bestellabwicklung beauftragten Dritten versandten E-Mails zugestellt werden können.
            </p>

            <p className="text-lg font-semibold mt-4">3) Widerrufsrecht</p>
            <p>
              3.1 Verbrauchern steht grundsätzlich ein Widerrufsrecht zu.
            </p>
            <p>
              3.2 Nähere Informationen zum Widerrufsrecht ergeben sich aus der Widerrufsbelehrung des Verkäufers.
            </p>

            <p className="text-lg font-semibold mt-4">4) Preise und Zahlungsbedingungen</p>
            <p>
              4.1 Sofern sich aus der Produktbeschreibung des Verkäufers nichts anderes ergibt, handelt es sich bei den angegebenen Preisen um Gesamtpreise, die die gesetzliche Umsatzsteuer enthalten. Gegebenenfalls zusätzlich anfallende Liefer- und Versandkosten werden in der jeweiligen Produktbeschreibung gesondert angegeben.
            </p>
            <p>
              4.2 Die Zahlungsmöglichkeit/en wird/werden dem Kunden im Online-Shop des Verkäufers mitgeteilt.
            </p>
            <p>
              4.3 Ist Vorkasse vereinbart, ist die Zahlung sofort nach Vertragsabschluss fällig.
            </p>
            <p>
              4.4 Bei Auswahl einer von PayPal angebotenen Zahlungsart erfolgt die Zahlungsabwicklung über den Zahlungsdienstleister PayPal (Europe) S.à r.l. et Cie, S.C.A., 22-24 Boulevard Royal, L-2449 Luxemburg (nachfolgend: „PayPal“), unter Geltung der PayPal-Nutzungsbedingungen, einsehbar unter www.paypal.com. Zahlt der Kunde mittels einer im Online-Bestellvorgang auswählbaren von PayPal angebotenen Zahlungsart, erklärt der Verkäufer schon jetzt die Annahme des Angebots des Kunden in dem Zeitpunkt, in dem der Kunde den Button anklickt, welcher den Bestellvorgang abschließt.
            </p>

            <p className="text-lg font-semibold mt-4">5) Lieferung</p>
            <p>
              5.1 Die Lieferung erfolgt nur an die im Bestellprozess angegebene Lieferadresse.
            </p>
            <p>
              5.2 Der Verkäufer ist zu Teillieferungen berechtigt, soweit dies für den Kunden zumutbar ist.
            </p>
            <p>
              5.3 Der Verkäufer liefert nur innerhalb Deutschlands und der Europäischen Union.
            </p>

            {/* Additional Sections Can Be Added Here */}

            <p className="text-lg font-semibold mt-4">6) Gewährleistung</p>
            <p>
              6.1 Es gilt das gesetzliche Mängelhaftungsrecht.
            </p>

            <p className="text-lg font-semibold mt-4">7) Schlussbestimmungen</p>
            <p>
              7.1 Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
            </p>
            <p>
              7.2 Sofern der Kunde Kaufmann ist, ist der Gerichtsstand für alle Streitigkeiten aus Vertragsverhältnissen zwischen dem Kunden und dem Verkäufer der Sitz des Verkäufers.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AGB;
