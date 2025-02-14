'use client'

import { useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import sanityClient from '@sanity/client'


const client = sanityClient({
  projectId: '6fnwq7k5',
  dataset: 'production',
  apiVersion: '2023-11-21',
  useCdn: true,
})

export default function DashboardPage() {
  const { user } = useUser()
  const [pcNumber, setPcNumber] = useState('')
  const [message, setMessage] = useState('')
  const [orders, setOrders] = useState([])
  const [supportRequests, setSupportRequests] = useState([])
  const [repairRequests, setRepairRequests] = useState([])
  const [activeTab, setActiveTab] = useState('bestellungen')


  useEffect(() => {
    const fetchData = async () => {
      if (user?.unsafeMetadata?.pcNumbers?.length > 0) {
        try {
          const orderQueries = user.unsafeMetadata.pcNumbers.map(
            (pc) => `*[_type == "order" && pcNumber == "${pc}"]{pcNumber, products, status}[0]`
          )
          const supportQueries = user.unsafeMetadata.pcNumbers.map(
            (pc) => `*[_type == "contactForm" && pcNumber == "${pc}"]{supportNumber, firstName, lastName, status, timestamp}[0]`
          )
          const repairQueries = user.unsafeMetadata.pcNumbers.map(
            (pc) => `*[_type == "repairRequest" && pcNumber == "${pc}"]{pcNumber, errorDescription, status, supportNumber}[0]`
          )

          const [orderResults, supportResults, repairResults] = await Promise.all([
            Promise.all(orderQueries.map((query) => client.fetch(query))),
            Promise.all(supportQueries.map((query) => client.fetch(query))),
            Promise.all(repairQueries.map((query) => client.fetch(query)))
          ])

          setOrders(orderResults.filter(Boolean))
          setSupportRequests(supportResults.filter(Boolean))
          setRepairRequests(repairResults.filter(Boolean))
        } catch (error) {
          console.error('Error fetching data:', error)
          setMessage('Ein Fehler ist beim Abrufen der Daten aufgetreten.')
        }
      }
    }
    fetchData()
  }, [user])

  const checkPcNumberAndUpdate = async () => {
    if (!pcNumber.trim()) {
      setMessage('Bitte geben Sie eine PC-Nummer ein.')
      return
    }

    if (user?.unsafeMetadata?.pcNumbers?.includes(pcNumber)) {
      setMessage('Diese PC-Nummer wurde bereits hinzugefügt.')
      return
    }

    try {
      const result = await client.fetch(
        `*[_type == "order" && pcNumber == $pcNumber][0]`,
        { pcNumber }
      )
      if (result) {
        const updatedPcNumbers = [...(user?.unsafeMetadata?.pcNumbers || []), result.pcNumber]
        await user?.update({
          unsafeMetadata: {
            pcNumbers: updatedPcNumbers,
          },
        })
        setMessage('PC-Nummer erfolgreich aktualisiert!')
        setOrders((prev) => [...prev, result])
        setPcNumber('')
      } else {
        setMessage('PC-Nummer nicht gefunden.')
      }
    } catch (error) {
      console.error('Error adding PC number:', error)
      setMessage('Ein Fehler ist beim Aktualisieren der Metadaten aufgetreten.')
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'abgeschlossen':
        return 'bg-green-100 text-green-800'
      case 'pending':
      case 'offen':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
      case 'in bearbeitung':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const renderStats = () => {
    let stats = []
    switch (activeTab) {
      case 'bestellungen':
        stats = [
          { label: 'Bestellungen', value: orders.length },
          { label: 'Zugestellt', value: orders.filter(order => order.status === 'Paket zugestellt').length },
          { label: 'In Bearbeitung', value: orders.filter(order => order.status !== 'Paket zugestellt').length },
          
          
        ]
        break
      case 'supportanfragen':
        stats = [
          { label: 'Supportanfragen', value: supportRequests.length },
          { label: 'Offen', value: supportRequests.filter(req => req.status === 'Offen').length },
          { label: 'In Bearbeitung', value: supportRequests.filter(req => req.status === 'In Bearbeitung').length },
          { label: 'Abgeschlossen', value: supportRequests.filter(req => req.status === 'Abgeschlossen').length },
          
        ]
        break
      case 'reparaturanfragen':
        stats = [
          { label: 'Reparaturanfragen', value: repairRequests.length },
          { label: 'In Bearbeitung', value: repairRequests.filter(req => req.status === 'In Bearbeitung').length },
          { label: 'Abgeschlossen', value: repairRequests.filter(req => req.status === 'Abgeschlossen').length },
          
        ]
        break
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-card rounded-lg shadow p-6 transition-transform hover:scale-105"
          >
            <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
            <dd className="mt-1 text-3xl font-semibold text-primary">{stat.value}</dd>
          </div>
        ))}
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'bestellungen':
        return renderOrders()
      case 'supportanfragen':
        return renderSupportRequests()
      case 'reparaturanfragen':
        return renderRepairRequests()
      default:
        return null
    }
  }

  const renderOrders = () => (
    <>
      <div className="bg-wcard rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-medium text-primary mb-4">Neue Bestellung hinzufügen</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={pcNumber}
            onChange={(e) => setPcNumber(e.target.value)}
            placeholder="Enter PC Number"
            className="flex-1 min-w-0 rounded-md border-gray-300 shadow-sm px-4 py-2 bg-card text-white"
          />
          <button
            onClick={checkPcNumberAndUpdate}
            className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Bestellung hinzufügen
          </button>
        </div>
        {message && (
          <p className={`mt-2 text-sm ${
            message.includes('successfully') ? 'text-green-600' : 'text-red-600'
          }`}>
            {message}
          </p>
        )}
      </div>

      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-card rounded-lg shadow p-6 transition-all hover:shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-primary">Bestellung #{order.pcNumber}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)} max-w-full truncate hover:overflow-visible hover:whitespace-normal`}
                >
                  {order.status || 'Ausstehend'}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-primary mb-2">Produkte:</h4>
                <ul className="space-y-1">
                  {order.products?.map((product, idx) => (
                    <li key={idx} className="text-sm text-white">
                      • {product}
                    </li>
                  )) || <li className="text-sm text-gray-500">Keine Produkte verfügbar.</li>}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-primary mb-2">Noch keine Bestellungen</h3>
          <p className="text-gray-500">Fügen Sie Ihre erste Bestellung mit dem Formular oben hinzu.</p>
        </div>
      )}
    </>
  )

  const renderSupportRequests = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {supportRequests.length > 0 ? (
        supportRequests.map((request, index) => (
          <div
            key={index}
            className="bg-card rounded-lg shadow p-6 transition-all hover:shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-primary">Support #{request.supportNumber}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(request.timestamp).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)} max-w-full truncate hover:overflow-visible hover:whitespace-normal`}
              >
                {request.status || 'Ausstehend'}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-primary mb-2">Details:</h4>
              <p className="text-sm text-white">Name: {request.firstName} {request.lastName}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <h3 className="text-lg font-medium text-primary mb-2">Noch keine Supportanfragen</h3>
          <p className="text-gray-500">Supportanfragen werden hier angezeigt, sobald Sie welche haben.</p>
        </div>
      )}
    </div>
  )

  const renderRepairRequests = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {repairRequests.length > 0 ? (
        repairRequests.map((request, index) => (
          <div
            key={index}
            className="bg-card rounded-lg shadow p-6 transition-all hover:shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-primary">Reparatur #{request.supportNumber}</h3>
                <p className="text-sm text-gray-500 mt-1">PC: {request.pcNumber}</p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)} max-w-full truncate hover:overflow-visible hover:whitespace-normal`}
              >
                {request.status || 'Pending'}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-primary mb-2">Fehlerbeschreibung:</h4>
              <p className="text-sm text-white">{request.errorDescription}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <h3 className="text-lg font-medium text-primary mb-2">Noch keine Reparaturanfragen</h3>
          <p className="text-gray-500">Reparaturanfragen werden hier angezeigt, sobald Sie welche haben.</p>
        </div>
      )}
    </div>
  )

  return (
    <div className="p-4 md:p-6">
      {/* Navigation Tabs */}
      <nav className="mb-8">
        <div className="border-b border-gray-200">
          <div className="flex flex-col md:flex-row space-y-2 md:space-x-8 md:space-y-0">
            {['Bestellungen', 'Supportanfragen', 'Reparaturanfragen'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`py-4 px-1 border-b-2 font-medium text-sm md:text-base ${
                  activeTab === tab.toLowerCase()
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Stats Section */}
      {renderStats()}

      {/* Content Section */}
      {renderContent()}
    </div>
  )
}

