"use client"

import { useState, useEffect } from "react"
import sanityClient from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import useCartStore from "@/configuratorStore"
import { useRouter } from "next/navigation"
import TopBar from "./TopBar"
import InfoButton from "./InfoButton"
import InfoWindow from "./InfoWindow"

// Sanity Client Configuration
const client = sanityClient({
  projectId: "6fnwq7k5",
  dataset: "production",
  apiVersion: "2023-11-21",
  useCdn: true,
})
const builder = imageUrlBuilder(client)
const urlFor = (source) => builder.image(source)

const PCConfigurator = () => {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [isTopBarOpen, setIsTopBarOpen] = useState(true)

  const [gehaeuseOptions, setGehaeuseOptions] = useState([])
  const [cpuOptions, setCpuOptions] = useState([])
  const [mainboardOptions, setMainboardOptions] = useState([])
  const [recommendedMainboards, setRecommendedMainboards] = useState([])
  const [ramOptions, setRamOptions] = useState([])
  const [ssdOptions, setSsdOptions] = useState([])

  const [selectedGehaeuse, setSelectedGehaeuse] = useState(null)
  const [selectedCpu, setSelectedCpu] = useState(null)
  const [selectedCpuBrand, setSelectedCpuBrand] = useState("Intel")
  const [selectedMainboard, setSelectedMainboard] = useState(null)
  const [selectedRam, setSelectedRam] = useState(null)
  const [selectedSsd, setSelectedSsd] = useState(null)
  const [gpuOptions, setGpuOptions] = useState([])
  const [selectedGpu, setSelectedGpu] = useState(null)
  const [selectedGpuBrand, setSelectedGpuBrand] = useState("Nvidia")
  const [qty, setQty] = useState(1)
  const [step, setStep] = useState(1)
  const [powerSupplyOptions, setPowerSupplyOptions] = useState([])
  const [selectedPowerSupply, setSelectedPowerSupply] = useState(null)
  const [recommendedPowerSupplies, setRecommendedPowerSupplies] = useState([])
  const [selectedCoolingType, setSelectedCoolingType] = useState("luft")
  const [kuehlungOptions, setKuehlungOptions] = useState([])
  const [selectedKuehlung, setSelectedKuehlung] = useState(null)
  const [savedConfig, setSavedConfig] = useState(null)

  const addToCart = useCartStore((state) => state.addToCart)
  const router = useRouter()

  const steps = [
    { id: 1, name: "Gehäuse" },
    { id: 2, name: "CPU" },
    { id: 3, name: "Mainboard" },
    { id: 4, name: "Kühlung" },
    { id: 5, name: "RAM" },
    { id: 6, name: "SSD" },
    { id: 7, name: "Grafikkarte" },
    { id: 8, name: "Netzteil" },
    { id: 9, name: "Übersicht" },
  ]

  useEffect(() => {
    if (step === 1) {
      const fetchGehaeuseOptions = async () => {
        try {
          const query = `*[_type == "component" && type == "gehaeuse"] { _id, name, image, price, description, kuehler }`
          const data = await client.fetch(query)
          setGehaeuseOptions(data)
        } catch (error) {
          console.error("Fehler beim Abrufen der Gehäuse-Optionen:", error)
        }
      }

      fetchGehaeuseOptions()
    }
  }, [step])

  useEffect(() => {
    if (selectedGehaeuse && step === 2) {
      const fetchCpuOptions = async () => {
        try {
          const data = await client.fetch(
            `*[_type == "component" && type == "cpu" && brand == $selectedCpuBrand]{ _id, name, image, price, recommendedKuehlungsart, description }`,
            { selectedCpuBrand },
          )
          setCpuOptions(data)
        } catch (error) {
          console.error("Fehler beim Abrufen der CPU-Optionen:", error)
        }
      }

      fetchCpuOptions()
    }
  }, [selectedGehaeuse, selectedCpuBrand, step])

  useEffect(() => {
    if (selectedCpu) {
      setSelectedCoolingType(selectedCpu.recommendedKuehlungsart || "luft")
    }
  }, [selectedCpu])

  useEffect(() => {
    if (selectedCpu && step === 3) {
      const fetchMainboardOptions = async () => {
        try {
          const data = await client.fetch(
            `*[_type == "component" && type == "motherboard" && references($cpuId)]{ _id, name, image, price, recommendedFor, description }`,
            { cpuId: selectedCpu._id },
          )

          const recommended = data.filter(
            (mainboard) =>
              mainboard.recommendedFor && mainboard.recommendedFor.some((cpu) => cpu._ref === selectedCpu._id),
          )
          const nonRecommended = data.filter(
            (mainboard) =>
              !mainboard.recommendedFor || !mainboard.recommendedFor.some((cpu) => cpu._ref === selectedCpu._id),
          )

          setMainboardOptions(nonRecommended)
          setRecommendedMainboards(recommended)
        } catch (error) {
          console.error("Fehler beim Abrufen der Mainboard-Optionen:", error)
        }
      }

      fetchMainboardOptions()
    }
  }, [selectedCpu, step])

  useEffect(() => {
    if (selectedMainboard && step === 4) {
      const fetchKuehlungOptions = async () => {
        try {
          const data = await client.fetch(
            `*[_type == "component" && type == "kuehlung" && kuehlungsart == $selectedCoolingType]{ 
              _id, name, image, price, kuehlungsart, description 
            }`,
            { selectedCoolingType },
          )
          setKuehlungOptions(data)
        } catch (error) {
          console.error("Fehler beim Abrufen der Kühlung-Optionen:", error)
        }
      }

      fetchKuehlungOptions()
    }
  }, [selectedMainboard, selectedCoolingType, step])

  useEffect(() => {
    if (selectedMainboard && step === 5) {
      const fetchRamOptions = async () => {
        try {
          const data = await client.fetch(`*[_type == "component" && type == "ram"]{ _id, name, image, price, description }`)
          setRamOptions(data)
        } catch (error) {
          console.error("Fehler beim Abrufen der RAM-Optionen:", error)
        }
      }

      fetchRamOptions()
    }
  }, [selectedMainboard, step])

  useEffect(() => {
    if (selectedMainboard && step === 6) {
      const fetchSsdOptions = async () => {
        try {
          const data = await client.fetch(`*[_type == "component" && type == "ssd"]{ _id, name, image, price, description }`)
          setSsdOptions(data)
        } catch (error) {
          console.error("Fehler beim Abrufen der SSD-Optionen:", error)
        }
      }

      fetchSsdOptions()
    }
  }, [selectedMainboard, step])

  useEffect(() => {
    if (selectedRam && step === 7) {
      const fetchGpuOptions = async () => {
        try {
          const query = `*[_type == "component" && type == "gpu" ${selectedGpuBrand ? `&& brandgpu == $selectedGpuBrand` : ""}]{
            _id, name, image, price, brandgpu, description
          }`
          const params = selectedGpuBrand ? { selectedGpuBrand } : {}

          const data = await client.fetch(query, params)

          setGpuOptions(data)
        } catch (error) {
          console.error("Fehler beim Abrufen der Grafikkarten-Optionen:", error)
        }
      }

      fetchGpuOptions()
    }
  }, [selectedRam, selectedGpuBrand, step])

  useEffect(() => {
    if (selectedGpu && step === 8) {
      const fetchPowerSupplyOptions = async () => {
        try {
          const data = await client.fetch(
            `*[_type == "component" && type == "netzteil"]{ _id, name, image, price, recommendedFor, description }`,
          )

          const recommended = data.filter(
            (powerSupply) =>
              powerSupply.recommendedFor && powerSupply.recommendedFor.some((gpu) => gpu._ref === selectedGpu._id),
          )
          const nonRecommended = data.filter(
            (powerSupply) =>
              !powerSupply.recommendedFor || !powerSupply.recommendedFor.some((gpu) => gpu._ref === selectedGpu._id),
          )

          setPowerSupplyOptions(nonRecommended)
          setRecommendedPowerSupplies(recommended)
        } catch (error) {
          console.error("Fehler beim Abrufen der Netzteil-Optionen:", error)
        }
      }

      fetchPowerSupplyOptions()
    }
  }, [selectedGpu, step])

  const handleAddToCart = () => {
    if (
      selectedGehaeuse &&
      selectedCpu &&
      selectedMainboard &&
      selectedKuehlung &&
      selectedRam &&
      selectedSsd &&
      selectedGpu &&
      selectedPowerSupply
    ) {
      addToCart({
        product: {
          _id: selectedGehaeuse._id,
          name: selectedGehaeuse.name,
          image: selectedGehaeuse.image,
          price: selectedGehaeuse.price,
          description: "Konfigurator  - Gehäuse",
        },
        quantity: qty,
      })
      addToCart({
        product: {
          _id: selectedCpu._id,
          name: selectedCpu.name,
          image: selectedCpu.image,
          price: selectedCpu.price,
          description: "Konfigurator  - CPU",
        },
        quantity: qty,
      })
      addToCart({
        product: {
          _id: selectedMainboard._id,
          name: selectedMainboard.name,
          image: selectedMainboard.image,
          price: selectedMainboard.price,
          description: "Konfigurator  - Mainboard",
        },
        quantity: qty,
      })
      addToCart({
        product: {
          _id: selectedKuehlung._id,
          name: selectedKuehlung.name,
          image: selectedKuehlung.image,
          price: selectedKuehlung.price,
          description: "Konfigurator  - Kühlung",
        },
        quantity: qty,
      })
      addToCart({
        product: {
          _id: selectedRam._id,
          name: selectedRam.name,
          image: selectedRam.image,
          price: selectedRam.price,
          description: "Konfigurator  - RAM",
        },
        quantity: qty,
      })
      addToCart({
        product: {
          _id: selectedSsd._id,
          name: selectedSsd.name,
          image: selectedSsd.image,
          price: selectedSsd.price,
          description: "Konfigurator  - SSD",
        },
        quantity: qty,
      })
      addToCart({
        product: {
          _id: selectedGpu._id,
          name: selectedGpu.name,
          image: selectedGpu.image,
          price: selectedGpu.price,
          description: "Konfigurator  - GPU",
        },
        quantity: qty,
      })
      addToCart({
        product: {
          _id: selectedPowerSupply._id,
          name: selectedPowerSupply.name,
          image: selectedPowerSupply.image,
          price: selectedPowerSupply.price,
          description: "Konfigurator  - Netzteil",
        },
        quantity: qty,
      })
      addToCart({
        product: {
          _id: "shipping-costs",
          name: "Versandkosten",
          image: "",
          price: 35.99,
          description: "Versandkosten für die Konfiguration",
        },
        quantity: qty,
      })
      addToCart({
        product: {
          _id: "zpu",
          name: "ZPÜ-Gebühr",
          image: "",
          price: 13.19,
          description: "ZPÜ-Gebühr Kosten",
        },
        quantity: qty,
      })
      addToCart({
        product: {
          _id: "sbearbeitungsgebühr",
          name: "Bearbeitungsgebühr",
          image: "",
          price: 75,
          description: "Bearbeitungsgebühr für die Konfiguration",
        },
        quantity: qty,
      })

      localStorage.setItem(
        "pcConfig",
        JSON.stringify({
          gehaeuse: selectedGehaeuse,
          cpu: selectedCpu,
          mainboard: selectedMainboard,
          kuehlung: selectedKuehlung,
          ram: selectedRam,
          ssd: selectedSsd,
          gpu: selectedGpu,
          powerSupply: selectedPowerSupply,
          qty: qty,
        }),
      )

      router.push("/overview")
    } else {
      alert("Bitte wählen Sie alle Komponenten aus.")
    }
  }

  const getStepDescription = (stepId) => {
    switch (stepId) {
      case 1:
        return "Bestimmen Sie das spezifische Gehäuse für Ihren PC."
      case 2:
        return "Wählen Sie die passende CPU für Ihre Bedürfnisse."
      case 3:
        return "Finden Sie das optimale Mainboard für Ihre Konfiguration."
      case 4:
        return "Wählen Sie die geeignete Kühlung für Ihr System."
      case 5:
        return "Bestimmen Sie den Arbeitsspeicher für Ihren PC."
      case 6:
        return "Wählen Sie den Speicherplatz für Ihr System."
      case 7:
        return "Finden Sie die passende Grafikkarte für Ihre Anforderungen."
      case 8:
        return "Wählen Sie ein geeignetes Netzteil für Ihre Komponenten."
      case 9:
        return "Überprüfen Sie Ihre gewählte Konfiguration."
      default:
        return ""
    }
  }

  const renderOptions = (options, selectedOption, setSelectedOption) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {options.map((option) => (
        <div
        key={option._id}
        className={`cursor-pointer border rounded-lg p-4  transition-all duration-300 ease-out 
          transform  hover:bg-[#3b3b3b] 
          ${selectedOption?._id === option._id ? "border-primary bg-[#3b3b3b] " : "border-gray-300 hover:border-blue-300"}
        `}
        onClick={() => setSelectedOption(option)}
      >
       
      
          <img
            src={urlFor(option.image).url() || "/placeholder.svg"}
            alt={option.name}
            className="w-full h-[200px] object-contain mb-2 rounded hover:scale-110 transition-all duration-300 ease-out "
          />
          <p className="font-semibold text-center text-white">{option.name}</p>
          <p className=" text-center text-dimWhite">{option?.description}</p>
          {option?.kuehler?.length > 0 && (
  <p className="text-center text-dimWhite">Zusätzlich: {option.kuehler}</p>
)}

          {option.price && <p className="text-center text-primary">{option.price}€</p>}
        </div>
      ))}
    </div>
  )

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black pt-[60px] md:pt-[80px] mt-[20px]">
      <TopBar step={step} steps={steps} setStep={setStep} />
      {/* Left sidebar with steps - hidden on mobile */}
      <div className="hidden md:block w-80 bg-black p-8 ">
        <div className="relative">
          {steps.map((s, index) => (
            <div key={s.id} className="relative">
              <div className="flex items-start mb-8">
                {/* Timeline dot and line */}
                <div className="relative">
                  <div className={`w-4 h-4 rounded-full ${step >= s.id ? "bg-cyan-500" : "bg-gray-600"} z-10`} />
                  {index !== steps.length - 1 && (
                    <div
                      className={`absolute top-4 left-2 w-[2px] h-24 -translate-x-1/2 ${
                        step > s.id ? "bg-cyan-500" : "bg-gray-600"
                      }`}
                    />
                  )}
                </div>

                {/* Step content */}
                <div className="ml-6 cursor-pointer " onClick={() => setStep(s.id)}>
                  <h3 className={`font-medium mb-2 ${step >= s.id ? "text-cyan-500" : "text-gray-400"}`}>{s.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side with component selection */}
      <div className="w-full md:w-3/4 p-4">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Wählen Sie Ihr Gehäuse</h2>
            {renderOptions(gehaeuseOptions, selectedGehaeuse, setSelectedGehaeuse)}
          </>
        )}

        {step === 2 && (
          <>
           <div className="flex bg-[#014e61] rounded-full p-1 w-48 mb-10 mt-[50px]">
  {["Intel", "AMD"].map((brand) => (
    <label
      key={brand}
      className={`cursor-pointer w-1/2 text-center py-2 rounded-full transition-all
        ${
          selectedCpuBrand === brand
            ? "bg-primary text-white"
            : "text-gray-400 hover:text-white"
        }`}
    >
      <input
        type="radio"
        value={brand}
        checked={selectedCpuBrand === brand}
        onChange={() => setSelectedCpuBrand(brand)}
        className="hidden"
      />
      {brand}
    </label>
  ))}
</div>


            {renderOptions(cpuOptions, selectedCpu, setSelectedCpu)}
          </>
        )}

{step === 3 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Wählen Sie Ihr Mainboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...mainboardOptions, ...recommendedMainboards].map((board) => {
                const isRecommended = recommendedMainboards.some((rec) => rec._id === board._id)
                return (
                  <div
                    key={board._id}
                    className={`cursor-pointer border rounded-lg p-4  hover:bg-[#3b3b3b]   ${
                      selectedMainboard?._id === board._id
                        ? "border-primary bg-[#3b3b3b] "
                        : "border-gray-300 hover:border-blue-300"
                    }`}
                    onClick={() => setSelectedMainboard(board)}
                  >
                    <div className="relative">
                      {isRecommended && (
                        <span className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                          Empfohlen
                        </span>
                      )}
                      <img
                        src={urlFor(board.image).url() || "/placeholder.svg"}
                        alt={board.name}
                        className="w-full h-[200px] object-contain mb-2 rounded hover:scale-110 transition-all duration-300 ease-out "
                      />
                     
                      <p className="font-semibold text-center text-white">{board.name}</p>
                      {board.price && <p className="text-center text-primary">{board.price}€</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

{step === 4 && (
        <>
          <h2 className="text-2xl font-bold mb-4">Wählen Sie Ihre Kühlung</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="flex bg-[#014e61] rounded-full p-1 w-48">
              {["Luft", "Wasser"].map((coolingType) => (
                <label
                  key={coolingType}
                  className={`cursor-pointer w-1/2 text-center py-2 rounded-full transition-all
                    ${
                      selectedCoolingType.toLowerCase() === coolingType.toLowerCase()
                        ? "bg-primary text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                >
                  <input
                    type="radio"
                    value={coolingType.toLowerCase()}
                    checked={selectedCoolingType.toLowerCase() === coolingType.toLowerCase()}
                    onChange={() => setSelectedCoolingType(coolingType.toLowerCase())}
                    className="hidden"
                  />
                  {coolingType}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <span className="text-primary font-semibold">Empfohlene Kühlungsart: </span>
            <span className="text-white">
              {selectedCpu && selectedCpu.recommendedKuehlungsart === "luft" ? "Luftkühlung" : "Wasserkühlung"}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kuehlungOptions.map((option) => (
              <div
                key={option._id}
                className={`cursor-pointer border rounded-lg p-4 transition-all duration-300 ease-out 
                  transform hover:bg-[#3b3b3b] 
                  ${selectedKuehlung?._id === option._id ? "border-primary bg-[#3b3b3b]" : "border-gray-300 hover:border-blue-300"}
                `}
                onClick={() => setSelectedKuehlung(option)}
              >
                <img
            src={urlFor(option.image).url() || "/placeholder.svg"}
            alt={option.name}
            className="w-full h-[200px] object-contain mb-2 rounded hover:scale-110 transition-all duration-300 ease-out "
          />
                <p className="font-semibold text-center text-white">{option.name}</p>
                {option.price && <p className="text-center text-primary">{option.price}€</p>}
              </div>
            ))}
          </div>
        </>
      )}

      

        {step === 5 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Wählen Sie Ihren RAM</h2>
            {renderOptions(ramOptions, selectedRam, setSelectedRam)}
          </>
        )}

        {step === 6 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Wählen Sie Ihre SSD</h2>
            {renderOptions(ssdOptions, selectedSsd, setSelectedSsd)}
          </>
        )}

{step === 7 && (
  <>
    <h2 className="text-2xl font-bold mb-4">Wählen Sie Ihre Grafikkarte</h2>
    <div className="flex bg-[#014e61] rounded-full p-1 w-48 mb-10">
      {["Nvidia", "AMD"].map((brand) => (
        <label
          key={brand}
          className={`cursor-pointer w-1/2 text-center py-2 rounded-full transition-all
            ${selectedGpuBrand === brand
              ? "bg-primary text-white"
              : "text-gray-400 hover:text-white"
            }`}
        >
          <input
            type="radio"
            value={brand}
            checked={selectedGpuBrand === brand}
            onChange={() => setSelectedGpuBrand(brand)}
            className="hidden"
          />
          {brand}
        </label>
      ))}
    </div>
    {renderOptions(gpuOptions, selectedGpu, setSelectedGpu)}
  </>
)}


{step === 8 && (
  <>
    <h2 className="text-2xl font-bold mb-4">Wählen Sie Ihr Netzteil</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...powerSupplyOptions, ...recommendedPowerSupplies].map((powerSupply) => {
        const isRecommended = recommendedPowerSupplies.some((rec) => rec._id === powerSupply._id)
        return (
          <div
            key={powerSupply._id}
            className={`cursor-pointer border rounded-lg p-4 hover:bg-[#3b3b3b] ${
              selectedPowerSupply?._id === powerSupply._id
                ? "border-primary bg-[#3b3b3b]"
                : "border-gray-300 hover:border-blue-300"
            }`}
            onClick={() => setSelectedPowerSupply(powerSupply)}
          >
            <div className="relative">
              {isRecommended && (
                <span className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                  Empfohlen
                </span>
              )}
              <img
                src={urlFor(powerSupply.image).url() || "/placeholder.svg"}
                alt={powerSupply.name}
                className="w-full h-[200px] object-contain mb-2 rounded hover:scale-110 transition-all duration-300 ease-out"
              />
              <p className="font-semibold text-center text-white">{powerSupply.name}</p>
              {powerSupply.price && <p className="text-center text-primary">{powerSupply.price}€</p>}
            </div>
          </div>
        )
      })}
    </div>
  </>
)}

{step === 9 && (
  <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
    <h2 className="text-3xl font-bold mb-6 text-primary">Zusammenfassung Ihrer Konfiguration</h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4 ">
        {[
          { label: "Gehäuse", value: selectedGehaeuse?.name },
          { label: "CPU", value: selectedCpu?.name },
          { label: "Mainboard", value: selectedMainboard?.name },
          { label: "Kühlung", value: selectedKuehlung?.name },
          { label: "RAM", value: selectedRam?.name },
          { label: "SSD", value: selectedSsd?.name },
          { label: "Grafikkarte", value: selectedGpu?.name },
          { label: "Netzteil", value: selectedPowerSupply?.name },
        ].map((item, index) => (
          <div key={index} className="flex items-center border-b border-gray-700 pb-2">
            <span className="text-primary font-semibold w-1/3">{item.label}:</span>
            <span className="text-white ml-5">{item.value || "Nicht ausgewählt"}</span>
          </div>
        ))}
        <div className="mt-6 flex items-center">
          <label className="text-primary font-semibold mr-4">Anzahl:</label>
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number.parseInt(e.target.value)))}
            className="w-20 px-3 py-2 border rounded text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mt-6 border-t border-gray-700 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-primary font-semibold text-xl">Gesamtpreis:</span>
              <span className="text-white text-2xl font-bold">
                {(
                  (selectedGehaeuse?.price || 0) +
                  (selectedCpu?.price || 0) +
                  (selectedMainboard?.price || 0) +
                  (selectedKuehlung?.price || 0) +
                  (selectedRam?.price || 0) +
                  (selectedSsd?.price || 0) +
                  (selectedGpu?.price || 0) +
                  (selectedPowerSupply?.price || 0)
                ).toFixed(2)}
                €
              </span>
            </div>
          </div>
      </div>
      {selectedGehaeuse?.image && (
        <div className="flex items-center justify-center">
          <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
            <img
              src={urlFor(selectedGehaeuse.image).url() || "/placeholder.svg"}
              alt={selectedGehaeuse.name}
              className="absolute inset-0 w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
        
      )}
    </div>
  </div>
)}

        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="px-4 py-2 bg-primary text-white rounded ">
              Zurück
            </button>
          )}
          {step < 9 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-4 py-2 bg-primary text-white rounded  ml-auto"
            >
              Weiter
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 bg-primary text-white rounded  ml-auto"
            >
              In den Warenkorb
            </button>
          )}
        </div>
      </div>
      <InfoButton setIsInfoOpen={setIsInfoOpen} />
      {isInfoOpen && <InfoWindow setIsInfoOpen={setIsInfoOpen} step={step} getStepDescription={getStepDescription} />}
    </div>
  )
}

export default PCConfigurator

