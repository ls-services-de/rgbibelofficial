'use client'

import React, { useState, useEffect } from 'react'
import { createClient } from '@sanity/client'
import { differenceInYears } from 'date-fns'
import { useUser } from '@clerk/clerk-react'
import { SignInButton } from '@clerk/clerk-react'

// Initialize Sanity Client
const client = createClient({
  projectId: '6fnwq7k5',
  dataset: 'production',
  apiVersion: '2023-08-15',
  useCdn: true,
  token: 'skYTgfsScgI25GMRQ3GAHnBepKCyf8qh0UEVQZSqh0WUtOobdY0lLpNY9fdhuxHhukmSQRWLbORed35KLNKpFcuxjnCkXGeXu88Xws27PavXhWZFsc5ebzTcTGQcCKjLN1O38vFi4WraXkeymmUqvjH7GbZXIGCkooi4mHjzNo1yoYM0E655',
})

function WarrantyForm() {
  const { user,isSignedIn } = useUser()
  const [step, setStep] = useState(0) // Start at step 0 for data choice
  const [pcNumber, setPcNumber] = useState('')
  const [errorDescription, setErrorDescription] = useState('')
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    street: '',
    houseNumber: '',
    postalCode: '',
    city: '',
    contactPerson: '',
    phone: '',
    email: '',
    emailRepeat: '',
  })
  const [deliveryMethod, setDeliveryMethod] = useState('dhl')
  const [packaging, setPackaging] = useState('own')
  const [warrantyStatus, setWarrantyStatus] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pcValidation, setPcValidation] = useState('')
  const [pcNumbers, setPcNumbers] = useState([])
  const [supportNumber, setSupportNumber] = useState('')
  const [useAccountData, setUseAccountData] = useState(false)

  useEffect(() => {
    const uniqueSupportNumber = `G_${Math.floor(1000000000 + Math.random() * 9000000000)}`
    setSupportNumber(uniqueSupportNumber)
  }, [])

  useEffect(() => {
    if (user && user.unsafeMetadata.pcNumbers) {
      setPcNumbers(user.unsafeMetadata.pcNumbers)
    }
  }, [user])

  const handleUseAccountData = () => {
    if (user) {
      setCustomerInfo(prevInfo => ({
        ...prevInfo,
        name: user.fullName || '',
        email: user.primaryEmailAddress?.emailAddress || '',
        emailRepeat: user.primaryEmailAddress?.emailAddress || '',
        // Add other fields if available in user metadata
      }))
      setUseAccountData(true)
    }
    setStep(1) // Move to the next step after choosing to use account data
  }

  const handleManualEntry = () => {
    setUseAccountData(false)
    setStep(1) // Move to the next step for manual entry
  }

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      if (pcValidation === 'invalid') {
        return
      } else if (pcNumber === '') {
        setError('Bitte geben Sie eine PC-Nummer ein.')
        return
      } else if (pcValidation === 'valid') {
        setStep(3)
        setError('')
        return
      } else {
        validatePcNumber()
        return
      }
    } else if (step === 3 && !errorDescription) {
      setError('Bitte geben Sie eine Fehlerbeschreibung ein.')
      return
    } else if (step === 4 && !customerInfo.name) {
      setError('Bitte füllen Sie alle Pflichtfelder aus.')
      return
    } else if (step === 5) {
      handleSubmit()
      return
    }
    setError('')
    setStep(step + 1)
  }

  const handlePreviousStep = () => {
    setError('')
    setStep(step - 1)
  }

  const validatePcNumber = async () => {
    setLoading(true)
    setPcValidation('')
    setTimeout(async () => {
      const query = `*[_type == "order" && pcNumber == $pcNumber][0]{
        pcNumber,
        creationDate
      }`

      const params = { pcNumber }

      try {
        const result = await client.fetch(query, params)
        if (result) {
          const creationDate = new Date(result.creationDate)
          const yearsSinceCreation = differenceInYears(new Date(), creationDate)

          setWarrantyStatus(yearsSinceCreation > 2 ? 'kostenpflichtig' : 'kostenlos')
          setPcValidation('valid')
        } else {
          setPcValidation('invalid')
          setError('PC-Nummer nicht gefunden. Bitte überprüfen Sie Ihre Eingabe.')
        }
      } catch (err) {
        console.error(err)
        setError('Fehler beim Abrufen der Daten. Versuchen Sie es später erneut.')
      } finally {
        setLoading(false)
      }
    }, 2000)
  }

  const handleInputChange = (e) => {
    setPcNumber(e.target.value)
    setPcValidation('')
    setError('')
  }

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo(prevInfo => ({
      ...prevInfo,
      [name]: value
    }))
  }

  const handleSubmit = async () => {
    try {
      const warrantyResponse = await client.create({
        _type: 'repairRequest',
        pcNumber,
        errorDescription,
        customerInfo,
        deliveryMethod,
        packaging,
        supportNumber,
      })
      console.log('Warranty Document created:', warrantyResponse)
      setSuccess(true)
    } catch (err) {
      console.error('Error creating document:', err)
      setError('Fehler beim Erstellen des Eintrags. Versuchen Sie es später erneut.')
    }
  }

  return (
    <div>
      <div className='fixed h-[100vh] top-0 w-full -z-40' style={{ backgroundImage: "url('/bg-details.png')" }}></div>
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {success ? (
          <div className="text-center bg-green-100 text-green-800 p-4 rounded-md">
            <h1 className="text-2xl font-bold text-black">Vielen Dank!</h1>
            <p>Ihr Garantiefall wurde erfolgreich eingereicht.</p>
            <p>Support Nummer: {supportNumber}</p>
          </div>
        ) : (
          <>
            

            {step === 0 && (
              <div className="bg-card text-white p-4 rounded-md shadow-md">
                <h1 className="text-2xl text-primary font-bold mb-4">Willkommen beim RGBibelOfficial – Garantie/Reparaturservice</h1>
                <p className="mb-4">
                  Beauftragen Sie jetzt bequem die Reparatur Ihres PCs oder Zubehörs. Sollte Ihr Produkt noch unter Garantie stehen, ist die Einsendung in unser Service-Center für Sie kostenlos. Außerhalb der Garantiezeit fällt eine Versandgebühr von 20-35€ an.
                </p>
                <p className="mb-4">
                  So einfach geht's:
                  <ul className="list-disc pl-5">
                    <li>Legen Sie den Garantiebericht (Fragen und Antworten PDF) bei.</li>
                    <li>Geben Sie die erforderlichen Daten auf den folgenden Seiten ein und drucken Sie den Reparaturbegleitschein sowie das Adresslabel aus.</li>
                    <li>Verpacken Sie Ihr Gerät sicher und legen Sie den ausgedruckten Reparaturbegleitschein bei.</li>
                    <li>Bei einer Garantiereparatur fügen Sie bitte eine Kopie des Kaufbelegs bei.</li>
                    <li>Geben Sie das Paket in einem DHL-Paketshop Ihrer Wahl ab.</li>
                  </ul>
                </p>
                <button
                  onClick={handleNextStep}
                  className="bg-primary text-white p-2 rounded-md w-full"
                >
                  Weiter
                </button>
              </div>
            )}


{step === 1 && (
  <div className="bg-card text-white p-4 rounded-md shadow-md">
    <h1 className="text-2xl text-primary font-bold mb-4">
      Willkommen beim RGBibelOfficial – Garantie/Reparaturservice
    </h1>
    <p className="mb-4">Wie möchten Sie fortfahren?</p>

    {user ? (
      isSignedIn ? (
        <button
          onClick={() => {
            handleUseAccountData();
            handleNextStep();
          }}
          className="bg-primary text-white p-2 rounded-md w-full mb-2"
        >
          Daten aus Konto verwenden
        </button>
      ) : (
        <SignInButton mode="modal">
          <button
            type="button"
            className="w-full py-2 text-black bg-white rounded-md mb-4"
          >
            Anmelden um Daten aus dem Konto abzurufen
          </button>
        </SignInButton>
      )
    ) : null}

    <button
      onClick={() => {
        handleManualEntry();
        handleNextStep();
      }}
      className="bg-secondary text-white p-2 rounded-md w-full"
    >
      Daten manuell eingeben
    </button>
  </div>
)}




{step === 2 && (
              <div className="bg-card text-white p-4 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4">Schritt 2 von 5</h2>
                <div className="mb-4">
                  {pcNumbers.length > 0 ? (
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">PC Nummer:</label>
                      <select
                        name="pcNumber"
                        value={pcNumber}
                        onChange={handleInputChange}
                        className="border text-white bg-card border-white rounded-md p-2 w-full mb-2"
                      >
                        <option value="">PC-Nummer auswählen</option>
                        {pcNumbers.map((pc) => (
                          <option key={pc} value={pc}>
                            {pc}
                          </option>
                        ))}
                      </select>
                      <p className="text-sm text-gray-300 mb-2">Oder geben Sie eine neue PC-Nummer ein:</p>
                    </div>
                  ) : (
                    <label className="block text-sm font-medium text-white mb-2">PC Nummer:</label>
                  )}
                  <input
                    type="text"
                    name="pcNumber"
                    value={pcNumber}
                    onChange={handleInputChange}
                    className="border text-white bg-card border-white rounded-md p-2 w-full"
                    placeholder="PC-Nummer eingeben"
                  />
                  {loading && <p className="text-white">Wird überprüft...</p>}
                  {pcValidation === 'valid' && !loading && (
                    <p className="text-green-500">✔️ PC-Nummer ist gültig!</p>
                  )}
                  {pcValidation === 'invalid' && !loading && (
                    <p className="text-red-500">❌ PC-Nummer ist ungültig.</p>
                  )}
                  <button
                    onClick={handleNextStep}
                    className="bg-primary text-white p-2 rounded-md w-full mt-4"
                    disabled={loading || pcValidation === 'invalid'}
                  >
                    Weiter
                  </button>
                  <button
                    onClick={handlePreviousStep}
                    className="bg-transparent border-primary text-white p-2 rounded-md w-full mt-2"
                  >
                    Zurück
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-card text-white p-4 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4">Schritt 3 von 5</h2>
                <div className="mb-4">
                  <label className="block mb-2">Fehlerbeschreibung</label>
                  <textarea
                    placeholder="Bitte beschreiben Sie das Problem detailliert."
                    value={errorDescription}
                    onChange={(e) => setErrorDescription(e.target.value)}
                    className="border text-black border-gray-300 rounded-md p-2 mb-4 w-full"
                  />
                  <button
                    onClick={handleNextStep}
                    className="bg-primary text-white p-2 rounded-md w-full"
                  >
                    Weiter
                  </button>
                  <button
                    onClick={handlePreviousStep}
                    className="bg-transparent border-primary text-white p-2 rounded-md w-full mt-2"
                  >
                    Zurück
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="bg-card text-white p-4 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4">Schritt 4 von 5</h2>
                <div className="mb-4">
                  <label className="block mb-2">Ihre Daten</label>
                  {Object.entries(customerInfo).map(([key, value]) => (
                    <input
                      key={key}
                      type={key.includes('email') ? 'email' : 'text'}
                      name={key}
                      placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      value={value}
                      onChange={handleCustomerInfoChange}
                      className="border text-black border-gray-300 rounded-md p-2 mb-4 w-full"
                    />
                  ))}
                  <button
                    onClick={handleNextStep}
                    className="bg-primary text-white p-2 rounded-md w-full"
                  >
                    Weiter
                  </button>
                  <button
                    onClick={handlePreviousStep}
                    className="bg-transparent border-primary text-white p-2 rounded-md w-full mt-2"
                  >
                    Zurück
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="bg-card text-white p-4 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4">Schritt 5 von 5</h2>
                <div className="mb-4">
                  <label className="block mb-2">Verpackung</label>
                  <select
                    value={packaging}
                    onChange={(e) => setPackaging(e.target.value)}
                    className="border text-black border-gray-300 rounded-md p-2 mb-4 w-full"
                  >
                    <option value="own">Eigene Verpackung</option>
                    <option value="foreign">Fremdverpackung</option>
                  </select>
                  <label className="block mb-2">Versandmethode</label>
                  <select
                    value={deliveryMethod}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="border text-black border-gray-300 rounded-md p-2 mb-4 w-full"
                  >
                    <option value="dhl">DHL</option>
                    <option value="other">Andere</option>
                  </select>
                  <button
                    onClick={handleSubmit}
                    className="bg-primary text-white p-2 rounded-md w-full"
                  >
                    Absenden
                  </button>
                  <button
                    onClick={handlePreviousStep}
                    className="bg-transparent border-primary text-white p-2 rounded-md w-full mt-2"
                  >
                    Zurück
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default WarrantyForm