"use client"

import { useState, useCallback } from "react"
import useCartStore from "@/cartStore"
import { Info } from "lucide-react"

function Details({ product }) {
  const initialImage = product?.image || ""
  const initialColor = product?.colors && product.colors.length > 0 ? product.colors[0] : ""

  const [selectedImage, setSelectedImage] = useState(initialImage)
  const [qty, setQty] = useState(1)
  const [showTooltip, setShowTooltip] = useState(false)
  const [windowsOption, setWindowsOption] = useState("none")

  const addToCart = useCartStore((state) => state.addToCart)

  const zpu = 13.19

  const handleClick = () => {
    setShowTooltip(!showTooltip)
  }

  const category = product.category
  console.log(category)

  if (!product) {
    return <div>Laden...</div> // or any other placeholder until product is available
  }

  const productType = product.type // Now it's safe to access

  const getWindowsPrice = () => {
    switch (windowsOption) {
      case "none":
        return 0
      case "no-drivers-no-key":
        return 19.9
      case "with-drivers-no-key":
        return 29.9
      case "no-drivers-with-key":
        return 39.9
      case "with-drivers-with-key":
        return 49.9
      default:
        return 0
    }
  }

  const getWindowsName = () => {
    switch (windowsOption) {
      case "none":
        return ""
      case "no-drivers-no-key":
        return "Windows 11 Pro – Installation ohne Treiber (ohne Key)"
      case "with-drivers-no-key":
        return "Windows 11 Pro – Installation inkl. Treiber (ohne Key)"
      case "no-drivers-with-key":
        return "Windows 11 Pro – Installation ohne Treiber (mit Key)"
      case "with-drivers-with-key":
        return "Windows 11 Pro – Installation inkl. Treiber & Lizenz"
      default:
        return ""
    }
  }

  const handleAddToCart = () => {
    const windowsPrice = getWindowsPrice()
    const adjustedPrice = product.price + windowsPrice

    // Berechne den Versandpreis basierend auf der Produktkategorie
    const shippingCost = getShippingCostBasedOnCategory(product.category)

    // Total price including shipping costs
    const totalPrice = adjustedPrice + shippingCost

    // Add the main product to the cart
    addToCart({
      product: { ...product, price: product.price },
      quantity: qty,
      color: initialColor,
      windowsOption,
    })

    // Add Windows to the cart if a Windows option is selected
    if (windowsOption !== "none") {
      addToCart({
        product: {
          _id: "windows-" + product._id,
          name: getWindowsName(),
          price: windowsPrice,
          image: "/windows.png",
        },
        quantity: qty,
        color: "",
        associatedProductId: product._id,
      })
    }

    // Add shipping costs to the cart
    if (shippingCost > 0) {
      addToCart({
        product: {
          _id: "shipping-" + product._id,
          name: "Versand",
          price: shippingCost,
          image: "/versand.png", // Add an image for shipping
        },
        quantity: qty,
        color: "",
        associatedProductId: product._id,
      })
    }

    if (zpu > 0 && productType == "pc") {
      addToCart({
        product: {
          _id: "zpu-" + product._id,
          name: "ZPÜ-Gebühr",
          price: zpu,
          image: "/zpu.png", // Add an image for shipping
        },
        quantity: qty,
        color: "",
        associatedProductId: product._id,
      })
    }
  }

  const showPerformanceMetrics = product.type === "pc"

  // Funktion zur Berechnung der Versandkosten je nach Produktkategorie
  const getShippingCostBasedOnCategory = (product) => {
    let cost = 0

    switch (productType) {
      case "mouse":
        cost = 9.95
        break
      case "keyboard":
        cost = 14.95
        break
      case "monitor":
        cost = 19.95
        break
      case "pc":
        if (adjustedPrice < 2500) {
          cost = 29.99
        } else {
          cost = 35.99
        }
        break
      default:
        console.warn("Unbekannter Produkttyp, Standardversandkosten werden angewendet.")
        cost = 34.9
    }

    console.log(`Produkttyp: ${product.productType}, Versandkosten: ${cost}€`)
    return cost
  }

  const handleTooltipShow = useCallback(() => {
    setShowTooltip(true)
  }, [])

  const handleTooltipHide = useCallback(() => {
    setTimeout(() => setShowTooltip(false), 1000)
  }, [])

  let statusColor = "bg-green-500"
  let statusText = "erhältlich"
  let tooltipText = " Das Produkt wird innerhalb von 14 Werktagen verschickt."

  if (product?.status === "verzoegerung") {
    statusColor = "bg-orange-500"
    statusText = "kurzfristig lieferbar"
    tooltipText = "Das Produkt könnte aufgrund von unvorhergesehenen Verzögerungen bis zu 21 Werktagen benötigen"
  }
  if (product?.status === "vorbestellbar") {
    statusColor = "bg-red-500"
    statusText = "vorbestellbar"
    tooltipText =
      " Das Produkt ist aktuell nicht auf Lager, aber vorbestellbar. Der Versand erfolgt, sobald es verfügbar ist."
  }
  if (product?.status === "ausverkauft") {
    statusColor = "bg-grey-500"
    statusText = "Ausverkauft / Nicht mehr verfügbar"
    tooltipText = "Das Produkt ist dauerhaft nicht erhältlich."
  }
  if (product?.status === "inkuerze") {
    statusColor = "bg-yellow-500"
    statusText = "In Kürze verfügbar"
    tooltipText = " Das Produkt ist momentan nicht  vorrätig, aber es wird bald verfügbar sein."
  }
  if (product?.status === "nurvorbestellbar") {
    statusColor = "bg-blue-500"
    statusText = "Nur vorbestellbar"
    tooltipText = " Das Produkt muss vorbestellt werden."
  }

  const windowsPrice = getWindowsPrice()
  const adjustedPrice = product.price + windowsPrice

  // Dynamische Spezifikationen je nach Produkttyp
  const getSpecifications = () => {
    switch (productType) {
      case "keyboard":
        return [
          { label: "Layout", value: product?.layout },
          { label: "Switch-Modell", value: product?.switchmodell },
          { label: "Switch", value: product?.switch },
          { label: "Beleuchtung", value: product?.beleuchtung },
          { label: "Verbindung", value: product?.verbindung },
          { label: "Switch-Charakteristik", value: product?.switchcharakteristik },
          { label: "Switch-Schaltbetätigungskraft", value: product?.switchschaltbetaetigungskraft },
          { label: "Switch-Lebensdauer", value: product?.switchlebensdauer },
        ]
      case "mouse":
        return [
          { label: "Eignung", value: product?.eignung },
          { label: "Tasten", value: product?.tasten },
          { label: "Auflösung", value: product?.aufloesung },
          { label: "Sensor", value: product?.sensor },
          { label: "Abfragerate", value: product?.abfragerate },
          { label: "Verbindung", value: product?.verbindung },
          { label: "Beleuchtung", value: product?.beleuchtung },
          { label: "Abtastung", value: product?.abtastung },
        ]
      case "monitor":
        return [
          { label: "Diagonale", value: product?.diagonale },
          { label: "Auflösung", value: product?.aufloesung },
          { label: "Bildwiederholfrequenz", value: product?.bildwiederholfrequenz },
          { label: "Reaktionszeit", value: product?.reaktionszeit },
          { label: "Panel", value: product?.panel },
          { label: "Helligkeit", value: product?.helligkeit },
          { label: "Form", value: product?.form },
          { label: "Farbtiefe", value: product?.farbtiefe },
        ]
      default:
        return [
          { label: "Prozessor", value: product?.prozessor },
          { label: "Grafikkarte", value: product?.grafikkarte },
          { label: "Arbeitsspeicher", value: product?.arbeitsspeicher },
          { label: "SSD", value: product?.ssd },
          { label: "CPU-Kühlung", value: product?.cpukuehlung },
          { label: "Mainboard", value: product?.mainboard },
          { label: "Gehäuse", value: product?.gehaeuse },
          { label: "Netzteil", value: product?.netzteil },
          { label: "Zusätzlich", value: product?.zusaetzlich },
        ]
    }
  }

  return (
    <>
      <div className="fixed h-[100vh] w-[100%] top-0 right-0 -z-20" style={{ backgroundImage: "url(/bg-shop.png)" }}>
        {" "}
      </div>
      <div className="max-w-7xl mx-auto mt-[100px] px-4 relative">
        {/* Mobile-specific content */}
        <div className="block lg:hidden mb-6">
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-md">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Product Image"
                className="w-full h-auto object-contain"
                style={{ maxHeight: "400px" }}
              />
            </div>
            <ul className="flex gap-4 mt-4 overflow-x-auto">
              {product?.extraImages?.map((image) => (
                <li
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  className="w-20 h-auto cursor-pointer rounded-md overflow-hidden"
                >
                  <img src={image || "/placeholder.svg"} alt="Extra Image" className="w-full h-full object-cover" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main content for desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left side */}
          <div className="flex flex-col justify-between p-8">
            <h1 className="text-4xl font-bold text-[#04cefe] mb-4">{product?.name}</h1>

            {/* Replace the existing streaming/gaming metrics section with this */}
            {showPerformanceMetrics ? (
              <div className="flex space-x-8 items-center">
                <div className="w-1/2">
                  <div className="flex justify-between text-sm mb-1 text-white">
                    <span>Streaming:</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full">
                    <div className="bg-[#04cefe] h-2 rounded-full" style={{ width: `${product?.pstreaming}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1 text-[#04cefe]">
                    <span>Full HD</span>
                    <span>WQHD</span>
                    <span>4K</span>
                  </div>
                </div>

                <div className="w-1/2">
                  <div className="flex justify-between text-sm mb-1 text-white">
                    <span>Gaming:</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full">
                    <div className="bg-[#04cefe] h-2 rounded-full" style={{ width: `${product?.pgaming}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1 text-[#04cefe]">
                    <span>Full HD</span>
                    <span>WQHD</span>
                    <span>4K</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-4"></div> // Empty space for non-PC products
            )}

            <div className="grid grid-cols-2 gap-6 mt-4 text-base text-white">
              {/* Product specs */}
              {getSpecifications().map((spec, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-[#04cefe]">{spec.label}:</h4>
                  <p>{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="hidden lg:flex lg:flex-row lg:items-start">
            <div className="shadow-md relative overflow-hidden lg:w-1/2 xl:w-2/3 xl:pr-6">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Product Image"
                className="w-full h-auto lg:max-h-[400px] xl:max-h-[1000px] object-cover"
              />
            </div>
            <div className="lg:w-1/2 lg:flex lg:flex-col lg:space-y-4 lg:overflow-y-auto lg:h-[400px] mt-4 lg:mt-0 lg:ml-5">
              <ul className="flex gap-6 lg:flex-col">
                {product?.extraImages?.map((image) => (
                  <li
                    key={image}
                    onClick={() => setSelectedImage(image)}
                    className="w-16 h-16 cursor-pointer rounded-md overflow-hidden"
                  >
                    <img src={image || "/placeholder.svg"} alt="Extra Image" className="w-full h-full object-cover" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="absolute top-3 right-3 z-10">
            <div className="relative">
              <button
                className="bg-gray-800 text-white rounded-full p-2 shadow-md hover:bg-gray-700 transition-all duration-300 flex items-center justify-center"
                aria-label="Info"
                onClick={handleClick}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <Info className="w-4 h-4" />
              </button>

              {/* Tooltip - visible on hover (desktop) or click (mobile) */}
              {showTooltip && (
                <div
                  className="absolute top-full mt-2 right-0 bg-gray-800 text-white p-3 rounded-md shadow-lg w-48 text-sm z-20"
                  onClick={() => setShowTooltip(false)}
                >
                  <div className="relative">
                    <div className="absolute -top-2 right-3 w-3 h-3 bg-gray-800 transform rotate-45"></div>
                    <p>Bild kann nach Konfiguration abweichen</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div
          className="relative bg-cover bg-center bg-no-repeat p-6 mt-6 rounded-md"
          style={{ backgroundImage: "url(/bg-details.png)" }}
        >
          <div className="flex flex-col">
            {/* Availability Status */}
            <div className="relative flex items-center justify-between mb-4">
              <div
                className={`flex items-center ${statusColor} rounded-full px-4 py-1 text-white cursor-pointer transition-all duration-300 hover:opacity-90`}
                onMouseEnter={handleTooltipShow}
                onMouseLeave={handleTooltipHide}
              >
                {statusText}
              </div>
              {showTooltip && (
                <div className="absolute top-full left-0 mt-2 bg-gray-800 text-white text-sm p-2 rounded-md shadow-lg">
                  {tooltipText}
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-all duration-300"
                >
                  -
                </button>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number.parseInt(e.target.value)))}
                  className="w-12 text-center bg-gray-900 text-white border border-gray-700 rounded-md"
                  min="1"
                />
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-all duration-300"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price and Add to Cart */}
            <div className="flex flex-col">
              <button
                onClick={handleAddToCart}
                className="bg-[#04cefe] text-white py-2 px-6 rounded-md hover:bg-[#03b1dd] transition-all duration-300 shadow-lg"
              >
                In den Warenkorb
              </button>
              <div className="text-4xl font-bold text-[#04cefe] tracking-tight mt-4">
                {adjustedPrice.toLocaleString("de-DE", {
                  style: "currency",
                  currency: "EUR",
                })}
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="text-sm text-gray-500 mt-2">zzgl. Versand, inkl. MwSt.</div>

          {/* Windows Options */}
          {productType === "pc" && (
            <div className="mt-4">
              <div className="text-white mb-3 text-lg font-semibold">
                Vorinstallationsoptionen (Windows 11)
              </div>
              <div className="text-sm text-gray-400 mb-4">
                RGBibel bietet für jedes System verschiedene Windows-Optionen, damit Sie selbst entscheiden können, wie
                weit Ihr PC vorbereitet ausgeliefert wird.
              </div>

              <div className="flex flex-col space-y-3">
                {/* Option 1: Kein Betriebssystem */}
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    windowsOption === "none"
                      ? "border-[#04cefe] bg-gray-800/50"
                      : "border-gray-700 bg-gray-900/30 hover:border-gray-600"
                  }`}
                  onClick={() => setWindowsOption("none")}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="windows-none"
                        name="windows-option"
                        checked={windowsOption === "none"}
                        onChange={() => setWindowsOption("none")}
                        className="mr-3"
                      />
                      <div>
                        <label htmlFor="windows-none" className="text-white font-medium cursor-pointer">
                          Option 1: Kein Betriebssystem
                        </label>
                      </div>
                    </div>
                    <span className="text-[#04cefe] font-bold">0,00 €</span>
                  </div>
                  {windowsOption === "none" && (
                    <div className="mt-3 pl-8 text-sm text-gray-300 space-y-2">
                      <p>Der PC wird ohne Betriebssystem ausgeliefert.</p>
                      <p>
                        Diese Variante eignet sich für Kunden, die Windows oder ein alternatives Betriebssystem (z. B.
                        Linux) selbst installieren möchten.
                      </p>
                      <p className="text-yellow-400">
                        ⚠️ Der PC ist ohne Betriebssystem nicht direkt nutzbar. Eine manuelle Installation durch den
                        Kunden ist erforderlich.
                      </p>
                    </div>
                  )}
                </div>

                {/* Option 2: Installation ohne Treiber (ohne Key) */}
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    windowsOption === "no-drivers-no-key"
                      ? "border-[#04cefe] bg-gray-800/50"
                      : "border-gray-700 bg-gray-900/30 hover:border-gray-600"
                  }`}
                  onClick={() => setWindowsOption("no-drivers-no-key")}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="windows-no-drivers-no-key"
                        name="windows-option"
                        checked={windowsOption === "no-drivers-no-key"}
                        onChange={() => setWindowsOption("no-drivers-no-key")}
                        className="mr-3"
                      />
                      <div>
                        <label
                          htmlFor="windows-no-drivers-no-key"
                          className="text-white font-medium cursor-pointer"
                        >
                          Option 2: Windows 11 Pro – Installation ohne Treiber (ohne Key)
                        </label>
                      </div>
                    </div>
                    <span className="text-[#04cefe] font-bold">19,90 €</span>
                  </div>
                  {windowsOption === "no-drivers-no-key" && (
                    <div className="mt-3 pl-8 text-sm text-gray-300 space-y-2">
                      <p>Windows 11 Pro wird ohne Lizenzschlüssel installiert.</p>
                      <p>Das System dient zur Ersteinrichtung und Prüfung der Funktionalität.</p>
                      <div className="mt-2">
                        <p className="font-medium text-white">Leistungsumfang:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Windows 11 Pro (unaktiviert, ohne Key)</li>
                          <li>Keine Treiberinstallation</li>
                          <li>Laden des EXPO/XMP-Profils</li>
                          <li>Funktionstest auf Bootfähigkeit</li>
                        </ul>
                      </div>
                      <p className="text-blue-400">Für erfahrene Nutzer, die eigene Treiber und Software installieren möchten.</p>
                    </div>
                  )}
                </div>

                {/* Option 3: Installation inkl. Treiber (ohne Key) */}
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    windowsOption === "with-drivers-no-key"
                      ? "border-[#04cefe] bg-gray-800/50"
                      : "border-gray-700 bg-gray-900/30 hover:border-gray-600"
                  }`}
                  onClick={() => setWindowsOption("with-drivers-no-key")}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="windows-with-drivers-no-key"
                        name="windows-option"
                        checked={windowsOption === "with-drivers-no-key"}
                        onChange={() => setWindowsOption("with-drivers-no-key")}
                        className="mr-3"
                      />
                      <div>
                        <label
                          htmlFor="windows-with-drivers-no-key"
                          className="text-white font-medium cursor-pointer"
                        >
                          Option 3: Windows 11 Pro – Installation inkl. Treiber (ohne Key)
                        </label>
                      </div>
                    </div>
                    <span className="text-[#04cefe] font-bold">29,90 €</span>
                  </div>
                  {windowsOption === "with-drivers-no-key" && (
                    <div className="mt-3 pl-8 text-sm text-gray-300 space-y-2">
                      <p>Vollständige Installation mit allen Treibern und Tools, aber ohne Lizenz-Key.</p>
                      <p>Windows ist nicht aktiviert, aber vollständig funktionsfähig.</p>
                      <div className="mt-2">
                        <p className="font-medium text-white">Leistungsumfang:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Windows 11 Pro (unaktiviert)</li>
                          <li>Treiberinstallation für NVIDIA / AMD / Intel</li>
                          <li>Vorinstallierte Tools: GPU-Z, CPU-Z, Fan Control, SignalRGB, HWInfo64, FurMark</li>
                          <li>6 individuelle RGBibel-Wallpapers</li>
                          <li>EXPO/XMP-Profil geladen</li>
                        </ul>
                      </div>
                      <p className="text-blue-400">
                        Ideal für Kunden, die sofort starten möchten und bereits eine gültige Windows-Lizenz besitzen.
                      </p>
                    </div>
                  )}
                </div>

                {/* Option 4: Installation ohne Treiber (mit Key) */}
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    windowsOption === "no-drivers-with-key"
                      ? "border-[#04cefe] bg-gray-800/50"
                      : "border-gray-700 bg-gray-900/30 hover:border-gray-600"
                  }`}
                  onClick={() => setWindowsOption("no-drivers-with-key")}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="windows-no-drivers-with-key"
                        name="windows-option"
                        checked={windowsOption === "no-drivers-with-key"}
                        onChange={() => setWindowsOption("no-drivers-with-key")}
                        className="mr-3"
                      />
                      <div>
                        <label
                          htmlFor="windows-no-drivers-with-key"
                          className="text-white font-medium cursor-pointer"
                        >
                          Option 4: Windows 11 Pro – Installation ohne Treiber (mit Key)
                        </label>
                      </div>
                    </div>
                    <span className="text-[#04cefe] font-bold">39,90 €</span>
                  </div>
                  {windowsOption === "no-drivers-with-key" && (
                    <div className="mt-3 pl-8 text-sm text-gray-300 space-y-2">
                      <p>Windows 11 Pro wird installiert und dauerhaft aktiviert.</p>
                      <p>Treiber und Tools sind in dieser Variante nicht enthalten.</p>
                      <div className="mt-2">
                        <p className="font-medium text-white">Leistungsumfang:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Windows 11 Pro (aktiviert, mit digitalem Lizenz-Key)</li>
                          <li>Kein Treiberpaket, keine Zusatzsoftware</li>
                          <li>EXPO/XMP-Profil geladen</li>
                          <li>Aktivierung über digitale Hardwarelizenz</li>
                        </ul>
                      </div>
                      <p className="text-blue-400">
                        Für Kunden, die ein aktiviertes Windows wünschen, aber eigene Treiber bevorzugen.
                      </p>
                    </div>
                  )}
                </div>

                {/* Option 5: Installation inkl. Treiber & Lizenz */}
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    windowsOption === "with-drivers-with-key"
                      ? "border-[#04cefe] bg-gray-800/50"
                      : "border-gray-700 bg-gray-900/30 hover:border-gray-600"
                  }`}
                  onClick={() => setWindowsOption("with-drivers-with-key")}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="windows-with-drivers-with-key"
                        name="windows-option"
                        checked={windowsOption === "with-drivers-with-key"}
                        onChange={() => setWindowsOption("with-drivers-with-key")}
                        className="mr-3"
                      />
                      <div>
                        <label
                          htmlFor="windows-with-drivers-with-key"
                          className="text-white font-medium cursor-pointer"
                        >
                          Option 5: Windows 11 Pro – Installation inkl. Treiber & Lizenz
                        </label>
                      </div>
                    </div>
                    <span className="text-[#04cefe] font-bold">49,90 €</span>
                  </div>
                  {windowsOption === "with-drivers-with-key" && (
                    <div className="mt-3 pl-8 text-sm text-gray-300 space-y-2">
                      <p className="font-semibold text-[#04cefe]">Die Komplettlösung – sofort einsatzbereit, getestet und aktiviert.</p>
                      <div className="mt-2">
                        <p className="font-medium text-white">Leistungsumfang:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Windows 11 Pro (aktiviert, mit digitalem Lizenz-Key)</li>
                          <li>Alle Treiber (NVIDIA / AMD / Intel)</li>
                          <li>Tools: GPU-Z, CPU-Z, Fan Control, SignalRGB, HWInfo64, FurMark</li>
                          <li>6 individuelle RGBibel-Wallpapers</li>
                          <li>EXPO/XMP-Profil geladen</li>
                          <li>Funktions- und Stabilitätstest</li>
                        </ul>
                      </div>
                      <p className="text-green-400">
                        💡 Empfohlene Option – perfekt für Kunden, die ihren PC direkt nutzen möchten, ohne weitere
                        Einrichtung.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 p-3 bg-gray-800/50 border border-gray-700 rounded-lg">
                <p className="text-sm text-gray-300 flex items-start">
                  <span className="mr-2">🔒</span>
                  <span>
                    <strong>Hinweise zur Lizenzaktivierung:</strong> Die Aktivierung erfolgt über eine digitale Lizenz,
                    die direkt an die Hardware (Mainboard-Firmware) gebunden ist. Ein physischer Lizenzschlüssel oder
                    Datenträger wird nicht bereitgestellt. Die Lizenz bleibt auch nach Neuinstallationen gültig,
                    solange keine wesentlichen Hardwareänderungen vorgenommen werden.
                  </span>
                </p>
              </div>

              {windowsOption !== "none" && (
                <div className="mt-3 text-sm text-gray-400 flex items-center">
                  <Info className="w-4 h-4 mr-1" />
                  Bei Varianten ohne Lizenz-Key ist der Kunde verpflichtet, die Aktivierung eigenständig vorzunehmen.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Details
