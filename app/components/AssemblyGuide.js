"use client"
import { useState, useRef, useCallback, useEffect } from "react"
import { jsPDF } from "jspdf"
import sanityClient from "@sanity/client"

const signatures = {
  liamSchneider: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-11XZywjIJdCWjQM9CkRp4rNin7gwfL.png",
}

const RGBIBEL_LOGO = "logo.png"

const client = sanityClient({
  projectId: "6fnwq7k5",
  dataset: "production",
  apiVersion: "2023-11-21",
  useCdn: true,
  token:
    "skYTgfsScgI25GMRQ3GAHnBepKCyf8qh0UEVQZSqh0WUtOobdY0lLpNY9fdhuxHhukmSQRWLbORed35KLNKpFcuxjnCkXGeXu88Xws27PavXhWZFsc5ebzTcTGQcCKjLN1O38vFi4WraXkeymmUqvjH7GbZXIGCkooi4mHjzNo1yoYM0E655",
})

async function fetchOrderByPCNumber(pcNumber) {
  return client.fetch(`*[_type == "order" && pcNumber == $pcNumber][0]`, { pcNumber })
}

async function uploadPDFToSanity(pdfFile, orderId) {
  return client.assets.upload("file", pdfFile).then((fileAsset) => {
    return client
      .patch(orderId)
      .set({
        montagebericht: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: fileAsset._id,
          },
        },
        status: "in Bearbeitung",
      })
      .commit()
  })
}

const steps = [
  {
    title: "CPU-Installation",
    description: "Platzieren Sie vorsichtig die CPU im Sockel.",
    imagePrompt: "Bitte laden Sie ein Bild der installierten CPU hoch.",
  },
  {
    title: "Mainboard-Installation",
    description: "Setzen Sie das Mainboard vorsichtig in das Gehäuse ein.",
    imagePrompt: "Bitte laden Sie ein Bild des installierten Mainboards hoch.",
  },
  {
    title: "Kühler-Installation",
    description: "Bringen Sie den CPU-Kühler an.",
    imagePrompt: "Bitte laden Sie ein Bild des installierten CPU-Kühlers hoch.",
  },
  {
    title: "RAM-Installation",
    description: "Installieren Sie die RAM-Module.",
    imagePrompt: "Bitte laden Sie ein Bild der installierten RAM-Module hoch.",
  },
  {
    title: "Grafikkarten-Installation",
    description: "Setzen Sie die Grafikkarte ein.",
    imagePrompt: "Bitte laden Sie ein Bild der installierten Grafikkarte hoch.",
  },
  {
    title: "Netzteil-Installation",
    description: "Installieren Sie das Netzteil.",
    imagePrompt: "Bitte laden Sie ein Bild des installierten Netzteils hoch.",
  },
  {
    title: "Kabelmanagement",
    description: "Ordnen Sie die Kabel sorgfältig an.",
    imagePrompt: "Bitte laden Sie ein Bild des Kabelmanagements hoch.",
  },
  {
    title: "Abschließende Überprüfung",
    description: "Führen Sie eine abschließende Überprüfung durch.",
    imagePrompt: "Bitte laden Sie ein Bild des fertig zusammengebauten PCs hoch.",
  },
]

const PCAssemblyGuide = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [uploadedImages, setUploadedImages] = useState({})
  const [pdfPreview, setPdfPreview] = useState(null)
  const [selectedSignature, setSelectedSignature] = useState(null)
  const [selectedSignatureName, setSelectedSignatureName] = useState("")
  const [pcNumber, setPcNumber] = useState("")
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [order, setOrder] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [isUploading, setIsUploading] = useState(false)

  const containerRef = useRef(null)

  const checkPassword = () => {
    if (password === process.env.NEXT_PUBLIC_PASSWORD) {
      setIsAuthenticated(true)
    } else {
      alert("Falsches Passwort. Bitte versuchen Sie es erneut.")
    }
  }

  const verifyPCNumber = async () => {
    try {
      const fetchedOrder = await fetchOrderByPCNumber(pcNumber)
      if (fetchedOrder) {
        setOrder(fetchedOrder)
        alert("PC-Nummer erfolgreich verifiziert!")
      } else {
        alert("PC-Nummer nicht gefunden. Bitte überprüfen Sie die Eingabe.")
      }
    } catch (error) {
      console.error("Error verifying PC number:", error)
      alert("Fehler bei der Überprüfung der PC-Nummer. Bitte versuchen Sie es erneut.")
    }
  }

  const handleItemSelection = (item) => {
    setSelectedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  useEffect(() => {
    if (order) {
      const allItems = order.products.flatMap((product) => product.split(",").map((item) => item.trim()))
      setSelectedItems(allItems)
    }
  }, [order])

  const generatePDFPreview = useCallback(async () => {
    try {
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const margin = 20

      // Helper function to add a new page
      const addNewPage = () => {
        doc.addPage()
        doc.setFillColor(240, 240, 240)
        doc.rect(0, 0, pageWidth, 40, "F")
        doc.setTextColor(60, 60, 60)
        doc.setFontSize(10)
        doc.text("RGBibel PC Assembly", margin, 25)
        doc.setDrawColor(200, 200, 200)
        doc.line(margin, 35, pageWidth - margin, 35)
      }

      // Add background and header to first page
      doc.setFillColor(240, 240, 240)
      doc.rect(0, 0, pageWidth, pageHeight, "F")
      doc.setFillColor(60, 60, 60)
      doc.rect(0, 0, pageWidth, 60, "F")

      // Add logo
      const logoImg = new Image()
      logoImg.crossOrigin = "anonymous"
      await new Promise((resolve, reject) => {
        logoImg.onload = resolve
        logoImg.onerror = reject
        logoImg.src = RGBIBEL_LOGO
      })
      doc.addImage(logoImg, "PNG", margin, 10, 40, 40)

      // Add title and header info
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(24)
      doc.setFont(undefined, "bold")
      doc.text("Montagebericht", 70, 30)
      doc.setFontSize(12)
      doc.setFont(undefined, "normal")
      doc.text(`Bestellungsnummer: ${pcNumber}`, 70, 45)
      const currentDate = new Date().toLocaleDateString("de-DE")
      doc.text(`Datum: ${currentDate}`, pageWidth - margin - doc.getTextWidth(`Datum: ${currentDate}`), 45)

      // Add introduction text
      let yOffset = 80
      doc.setTextColor(60, 60, 60)
      doc.setFontSize(12)
      const introText =
        "Vielen Dank, dass Sie sich für RGBibel entschieden haben! " +
        "Diese Anleitung zeigt Ihnen die wichtigsten Schritte, " +
        "die wir bei der Montage Ihres PCs durchgeführt haben, " +
        "und gibt Ihnen einen Überblick über den Aufbau Ihres Systems."
      const splitIntroText = doc.splitTextToSize(introText, pageWidth - 2 * margin)
      doc.text(splitIntroText, margin, yOffset)
      yOffset += splitIntroText.length * 7 + 10

      // Add steps with images
      doc.setFontSize(18)
      doc.setFont(undefined, "bold")
      doc.text("Montageschritte", margin, yOffset)
      yOffset += 15

      for (let i = 0; i < steps.length; i++) {
        if (yOffset > pageHeight - 60) {
          addNewPage()
          yOffset = 60
        }

        // Add step number and title
        doc.setFontSize(14)
        doc.setFont(undefined, "bold")
        doc.setTextColor(41, 128, 185) // Blue color for step titles
        doc.text(`${i + 1}. ${steps[i].title}`, margin, yOffset)
        yOffset += 10

        // Add step description
        doc.setFontSize(12)
        doc.setFont(undefined, "normal")
        doc.setTextColor(60, 60, 60)
        const splitDescription = doc.splitTextToSize(steps[i].description, pageWidth - 2 * margin)
        doc.text(splitDescription, margin, yOffset)
        yOffset += splitDescription.length * 7 + 5

        // Add image if available
        if (uploadedImages[i]) {
          try {
            const img = new Image()
            img.src = uploadedImages[i]
            await new Promise((resolve, reject) => {
              img.onload = resolve
              img.onerror = reject
            })

            const imgWidth = 40
            const imgHeight = (img.height * imgWidth) / img.width

            if (yOffset + imgHeight > pageHeight - 60) {
              addNewPage()
              yOffset = 60
            }

            doc.addImage(img, "JPEG", margin, yOffset, imgWidth, imgHeight)
            yOffset += imgHeight + 15
          } catch (error) {
            console.error("Error adding image to PDF:", error)
            doc.setTextColor(180, 0, 0)
            doc.text("Bild konnte nicht geladen werden", margin, yOffset)
            yOffset += 15
          }
        } else {
          doc.setTextColor(180, 0, 0)
          doc.text("Kein Bild verfügbar", margin, yOffset)
          yOffset += 15
        }
      }

      // Add selected items to the PDF
      addNewPage()
      yOffset = 60
      doc.setFontSize(18)
      doc.setFont(undefined, "bold")
      doc.setTextColor(41, 128, 185)
      doc.text("Ausgewählte Produkte", margin, yOffset)
      yOffset += 15

      doc.setFontSize(12)
      doc.setFont(undefined, "normal")
      doc.setTextColor(60, 60, 60)
      selectedItems.forEach((item, index) => {
        if (yOffset > pageHeight - 60) {
          addNewPage()
          yOffset = 60
        }
        doc.text(`• ${item}`, margin, yOffset)
        yOffset += 10
      })

      // Add signature on the last page
      if (selectedSignature) {
        if (yOffset > pageHeight - 100) {
          addNewPage()
          yOffset = 60
        }

        const signatureImg = new Image()
        signatureImg.crossOrigin = "anonymous"
        await new Promise((resolve, reject) => {
          signatureImg.onload = resolve
          signatureImg.onerror = reject
          signatureImg.src = selectedSignature
        })

        doc.addImage(signatureImg, "PNG", margin, yOffset, 50, 20)
        doc.setFontSize(10)
        doc.text(selectedSignatureName, margin, yOffset + 30)

        // Add disclaimer
        yOffset += 50
        doc.setFontSize(8)
        doc.setTextColor(100, 100, 100)
        const disclaimer = "Haftungshinweis: Diese Dokumentation dient ausschließlich zu Informationszwecken."
        const splitDisclaimer = doc.splitTextToSize(disclaimer, pageWidth - 2 * margin)
        doc.text(splitDisclaimer, margin, yOffset)
      }

      // Generate preview
      const pdfData = doc.output("datauristring")
      setPdfPreview(pdfData)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Fehler beim Generieren der PDF-Vorschau. Bitte versuchen Sie es erneut.")
    }
  }, [uploadedImages, selectedSignature, selectedSignatureName, pcNumber, selectedItems])

  const handleDownloadPDF = useCallback(() => {
    if (pdfPreview) {
      const link = document.createElement("a")
      link.href = pdfPreview
      link.download = `PC_Assembly_Report_${pcNumber}.pdf`
      link.click()
    }
  }, [pdfPreview, pcNumber])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImages({
          ...uploadedImages,
          [currentStep]: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadToDB = async () => {
    if (!pdfPreview || !order) return

    setIsUploading(true)
    try {
      const pdfBlob = await fetch(pdfPreview).then((res) => res.blob())
      const pdfFile = new File([pdfBlob], `PC_Assembly_Report_${pcNumber}.pdf`, { type: "application/pdf" })
      await uploadPDFToSanity(pdfFile, order._id)
      alert("PDF erfolgreich in die Datenbank hochgeladen!")
    } catch (error) {
      console.error("Error uploading PDF to Sanity:", error)
      alert("Fehler beim Hochladen der PDF in die Datenbank. Bitte versuchen Sie es erneut.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-card py-12 px-4">
      {!isAuthenticated ? (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden p-8">
          <h1 className="text-2xl font-bold mb-4 text-black">Passwort erforderlich</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
            placeholder="Passwort eingeben"
          />
          <button
            onClick={checkPassword}
            className="w-full bg-primary text-white font-bold py-2 px-4 rounded"
          >
            Zugriff
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Assembly Guide */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="p-8">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">PC Montageanleitung</h1>

                {/* PC Number Input and Verification */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order Nummer</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={pcNumber}
                      onChange={(e) => setPcNumber(e.target.value)}
                      className="w-full p-2 border rounded-l-md"
                      placeholder="Geben Sie Ihre Order Nummer ein"
                      required
                    />
                    <button
                      onClick={verifyPCNumber}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md"
                    >
                      Verifizieren
                    </button>
                  </div>
                </div>

                {/* Product Selection */}
                {order && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Produkte auswählen:</h2>
                    {order.products
                      .flatMap((product) => product.split(",").map((item) => item.trim()))
                      .map((item, index) => (
                        <label key={index} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item)}
                            onChange={() => handleItemSelection(item)}
                            className="form-checkbox"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                  </div>
                )}

                <div className="bg-gray-100 rounded-lg p-6 mb-8">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                    Schritt {currentStep + 1}: {steps[currentStep].title}
                  </h2>
                  <p className="text-gray-600 mb-4">{steps[currentStep].description}</p>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {steps[currentStep].imagePrompt}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                  {uploadedImages[currentStep] && (
                    <img
                      src={uploadedImages[currentStep] || "/placeholder.svg"}
                      alt={`Uploaded for ${steps[currentStep].title}`}
                      className="max-w-full h-auto rounded-lg shadow-md mb-4"
                    />
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:opacity-50"
                  >
                    Zurück
                  </button>
                  {currentStep === steps.length - 1 ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Unterschrift auswählen:</h3>
                        <button
                          onClick={() => {
                            setSelectedSignature(signatures.liamSchneider)
                            setSelectedSignatureName("Liam Schneider")
                          }}
                          className="flex items-center space-x-2 p-2 border rounded hover:bg-blue-100"
                        >
                          <img
                            src={signatures.liamSchneider || "/placeholder.svg"}
                            alt="Liam Schneider"
                            className="h-8"
                            crossOrigin="anonymous"
                          />
                          <span>Liam Schneider</span>
                        </button>
                      </div>
                      <button
                        onClick={generatePDFPreview}
                        disabled={!selectedSignature || !pcNumber}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                      >
                        PDF-Vorschau generieren
                      </button>
                      <button
                        onClick={handleDownloadPDF}
                        disabled={!pdfPreview}
                        className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                      >
                        PDF herunterladen
                      </button>
                      <button
                        onClick={handleUploadToDB}
                        disabled={!pdfPreview || isUploading}
                        className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                      >
                        {isUploading ? "Wird hochgeladen..." : "In Datenbank hochladen"}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                      disabled={!uploadedImages[currentStep]}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r disabled:opacity-50"
                    >
                      Weiter
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right side - PDF Preview */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-black">Dokumentenvorschau</h2>
                <div className="pdf-preview bg-gray-50 p-6 rounded-lg">
                  {/* Logo */}
                  <div className="flex items-center mb-6">
                    <img src={RGBIBEL_LOGO || "/placeholder.svg"} alt="RGBibel Logo" className="w-12 h-12 mr-4" />
                    <h1 className="text-2xl font-bold text-black">Montagebericht</h1>
                    <p className="text-sm text-gray-600 ml-auto">{new Date().toLocaleDateString("de-DE")}</p>
                  </div>

                  {/* PC Number */}
                  <p className="text-sm text-gray-700 mb-6">Ihre Bestellungsnummer: {pcNumber}</p>

                  {/* Introduction */}
                  <p className="text-gray-700 mb-8">
                    Vielen Dank, dass Sie sich für RGBibel entschieden haben! Diese Anleitung zeigt Ihnen die
                    wichtigsten Schritte, die wir bei der Montage Ihres PCs durchgeführt haben, und gibt Ihnen einen
                    Überblick über den Aufbau Ihres Systems.
                  </p>

                  {/* Steps */}
                  <h2 className="text-xl font-bold mb-4">durchgeführte Schritte:</h2>
                  <div className="space-y-6">
                    {steps.map((step, index) => (
                      <div key={index} className="step">
                        <h3 className="text-lg font-semibold">{`${index + 1}. ${step.title}`}</h3>
                        {uploadedImages[index] && (
                          <img
                            src={uploadedImages[index] || "/placeholder.svg"}
                            alt={`Step ${index + 1}`}
                            className="w-full max-w-md h-auto rounded-lg shadow-md mt-2"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add selected products to the preview */}
                  {selectedItems.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-2">Ausgewählte Produkte:</h3>
                      <ul className="list-disc list-inside">
                        {selectedItems.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Signature */}
                  {selectedSignature && (
                    <div className="mt-8">
                      <img src={selectedSignature || "/placeholder.svg"} alt="Signature" className="w-24 h-10" />
                      <p className="text-sm text-gray-600 mt-2">{selectedSignatureName}</p>
                      <p className="text-xs text-gray-500 mt-4">
                        Haftungshinweis: Diese Dokumentation dient ausschließlich zu Informationszwecken.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PCAssemblyGuide

