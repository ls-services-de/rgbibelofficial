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
  const [addWindows, setAddWindows] = useState(false)
  const [windowsOption, setWindowsOption] = useState("no-key")

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

  const handleAddToCart = () => {
    // Berechne den Preis des Hauptprodukts und des Windows-Produkts (falls zutreffend)
    const windowsPrice = addWindows ? (windowsOption === "with-key" ? 49.95 : 28.9) : 0
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
      addWindows,
    })

    // Add Windows to the cart if a Windows option is selected
    if (addWindows) {
      const windowsName = windowsOption === "with-key" ? "Windows 11 Pro (mit Key)" : "Windows 11 Pro (ohne Key)"
      const windowsPrice = windowsOption === "with-key" ? 49.95 : 28.9

      addToCart({
        product: {
          _id: "windows-" + product._id,
          name: windowsName,
          price: windowsPrice,
          image: "/windows.png", // Add an image for Windows
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
  let tooltipText = " Das Produkt wird innerhalb von 14 Werktagen verschickt."

  if (product?.status === "verzoegerung") {
    statusColor = "bg-orange-500"
    statusText = "kurzfristig lieferbar"
    tooltipText = "Das Produkt könnte aufgrund von unvorhergesehenen Verzögerungen bis zu 21 Werktagen benötigen"
  }
  if (product?.status === "vorbestellbar") {
    statusColor = "bg-red-500"
    statusText = "vorbestellbar"
    tooltipText =
      " Das Produkt ist aktuell nicht auf Lager, aber vorbestellbar. Der Versand erfolgt, sobald es verfügbar ist."
  }
  if (product?.status === "ausverkauft") {
    statusColor = "bg-grey-500"
    statusText = "Ausverkauft / Nicht mehr verfügbar"
    tooltipText = "Das Produkt ist dauerhaft nicht erhältlich."
  }
  if (product?.status === "inkuerze") {
    statusColor = "bg-yellow-500"
    statusText = "In Kürze verfügbar"
    tooltipText = " Das Produkt ist momentan nicht  vorrätig, aber es wird bald verfügbar sein."
  }
  if (product?.status === "nurvorbestellbar") {
    statusColor = "bg-blue-500"
    statusText = "Nur vorbestellbar"
    tooltipText = " Das Produkt muss vorbestellt werden."
  }

  const windowsPrice = addWindows ? (windowsOption === "with-key" ? 49.95 : 28.9) : 0
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

          {/* Windows Checkbox */}
          {productType === "pc" && (
            <div className="mt-4">
              <div className="text-white mb-2">Windows-Optionen:</div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="no-windows"
                    name="windows-option"
                    checked={!addWindows}
                    onChange={() => setAddWindows(false)}
                    className="mr-2"
                  />
                  <label htmlFor="no-windows" className="text-white">
                    Kein Windows (System wird ohne Betriebssystem ausgeliefert)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="windows-no-key"
                    name="windows-option"
                    checked={addWindows && windowsOption === "no-key"}
                    onChange={() => {
                      setAddWindows(true)
                      setWindowsOption("no-key")
                    }}
                    className="mr-2"
                  />
                  <label htmlFor="windows-no-key" className="text-white">
                    Windows 11 Pro Installation inkl. Treiber (ohne Key!)  28,90 €
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="windows-with-key"
                    name="windows-option"
                    checked={addWindows && windowsOption === "with-key"}
                    onChange={() => {
                      setAddWindows(true)
                      setWindowsOption("with-key")
                    }}
                    className="mr-2"
                  />
                  <label htmlFor="windows-with-key" className="text-white">
                    Windows 11 Pro Installation inkl. Treiber (mit Key!)  49,95 €
                  </label>
                </div>
                <div className="text-sm text-gray-400 mt-1 flex items-center">
                  <Info className="w-4 h-4 mr-1" />
                  Bei Nichtauswahl wird das System ohne Betriebssystem ausgeliefert.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Details

