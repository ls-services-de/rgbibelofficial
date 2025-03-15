"use client";

import React, { useState } from "react";
import sanityClient from "@sanity/client";


const client = sanityClient({
  projectId: "6fnwq7k5",
  dataset: "production",
  apiVersion: "2023-08-15",
  useCdn: true,
});

const STATUS_LIST = [
  { title: "Zahlung bestätigt", value: "Zahlung bestätigt", description: "Wir haben Ihre Zahlung erfolgreich erhalten. Ihre Bestellung wurde in unser System aufgenommen und für die nächste Phase vorbereitet." },
  { title: "In Bearbeitung", value: "In Bearbeitung", description: "Ihr Auftrag wird nun bearbeitet. Unsere Mitarbeiter prüfen die Bestellung und bereiten die Komponenten für den nächsten Schritt vor." },
  { title: "Komponentenprüfung", value: "Komponentenprüfung", description: "Unser Team beginnt mit der Bearbeitung Ihrer Bestellung. Die Komponenten werden auf Verfügbarkeit und Qualität geprüft." },
  { title: "Im Belastungstest", value: "Im Belastungstest", description: "Die ausgewählten Komponenten werden getestet, um maximale Leistung und Stabilität zu gewährleisten." },
  { title: "Versandbereit", value: "Versandbereit", description: "Ihr Produkt wurde fertiggestellt, verpackt und ist bereit für den Versand." },
  { title: "Elektronisch angekündigt", value: "Elektronisch angekündigt", description: "Die Lieferung wurde bei unserem Versandpartner angemeldet und wartet auf die Abholung." },
  { title: "Paket an DHL übergeben", value: "Paket an DHL übergeben", description: "Ihr Paket wurde an DHL übergeben und befindet sich auf dem Weg zu Ihnen." },
  { title: "Paket im Paketzustellzentrum", value: "Paket im Paketzustellzentrum", description: "Das Paket ist im lokalen Zustellzentrum angekommen und wird bald zugestellt." },
  { title: "Paket in Zustellung", value: "Paket in Zustellung", description: "Ihr Paket befindet sich in der Zustellung und wird Ihnen in Kürze geliefert." },
  { title: "Paket zugestellt", value: "Paket zugestellt", description: "Ihr Paket wurde zugestellt." },
];

const StatusCheckOrder = () => {
  const [number, setNumber] = useState("");
  const [statusType, setStatusType] = useState(null); // "order", "support", or "guarantee"
  const [orderDetails, setOrderDetails] = useState(null);
  const [supportStatus, setSupportStatus] = useState("");
  const [guaranteeStatus, setGuaranteeStatus] = useState("");
  const [error, setError] = useState("");

  // Handle number input change
  const handleChange = (e) => {
    setNumber(e.target.value);
  };

  // Define the getStatusProgress function
  const getStatusProgress = () => {
    if (orderDetails && orderDetails.status) {
      const statusIndex = STATUS_LIST.findIndex((status) => status.value === orderDetails.status);
      return statusIndex + 1; // +1 because array is 0-indexed
    }
    return 0; // Default progress is 0 if no status is available
  };

  // Fetch order details based on PC number
  const fetchOrder = async () => {
    const query = `*[_type == "order" && pcNumber == $pcNumber][0]{ pcNumber, products, status, preis }`;
    const params = { pcNumber: number };

    try {
      const result = await client.fetch(query, params);
      if (result) {
        setOrderDetails(result);
        setStatusType("order");
        setError("");
      } else {
        setOrderDetails(null);
        setError("Bestellung nicht gefunden. Bitte überprüfen Sie Ihre PC-Nummer.");
      }
    } catch (err) {
      setError("Fehler beim Abrufen der Bestellung. Bitte versuchen Sie es später.");
    }
  };

  // Fetch support status based on support number
  const fetchSupportStatus = async () => {
    const query = `*[_type == "contactForm" && supportNumber == $supportNumber][0]{ status }`;
    const params = { supportNumber: number };

    try {
      const result = await client.fetch(query, params);
      if (result) {
        setSupportStatus(result.status);
        setStatusType("support");
        setError("");
      } else {
        setSupportStatus("");
        setError("Keine Anfrage mit dieser Support-Nummer gefunden.");
      }
    } catch (err) {
      setError("Fehler beim Abrufen des Status. Bitte versuchen Sie es später.");
    }
  };

  // Fetch guarantee status based on Guarantee number
  const fetchGuaranteeStatus = async () => {
    const query = `*[_type == "repairRequest" && supportNumber == $guaranteeNumber][0]{ status }`;
    const params = { guaranteeNumber: number };

    try {
      const result = await client.fetch(query, params);
      if (result) {
        setGuaranteeStatus(result.status);
        setStatusType("guarantee");
        setError("");
      } else {
        setGuaranteeStatus("");
        setError("Keine Garantieanfrage mit dieser Nummer gefunden.");
      }
    } catch (err) {
      setError("Fehler beim Abrufen des Garantie-Status. Bitte versuchen Sie es später.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setSupportStatus(""); // Reset support status
    setGuaranteeStatus(""); // Reset guarantee status
    setOrderDetails(null); // Reset order details

    if (!number) {
      setError("Bitte geben Sie eine gültige Nummer ein.");
      return;
    }

    // Check if number starts with 'N' for PC number, 'S' for Support number, or 'G' for Guarantee number
    if (number.startsWith("N")) {
      fetchOrder(); // Handle PC number
    } else if (number.startsWith("S")) {
      fetchSupportStatus(); // Handle Support number
    } else if (number.startsWith("G")) {
      fetchGuaranteeStatus(); // Handle Guarantee number
    } else {
      setError("Bitte geben Sie eine gültige PC-, Support- oder Garantie-Nummer ein.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-[60px] px-4 sm:px-6 lg:px-8">
      <header className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl mx-auto md:text-3xl font-bold text-primary">Statusverfolgung</h1>
      </header>
      <p className="mb-5 text-white">Verfolgen Sie hier den aktuellen Bearbeitungsstatus Ihrer Bestellung, Kontakt- oder Garantieanfrage.</p>

      <div className="mb-8">
        <input
          type="text"
          placeholder="PC-, Support- oder Garantie-Nummer eingeben"
          value={number}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full md:w-80 lg:w-96 mx-auto"
        />
        <button onClick={handleSubmit} className="bg-primary text-white p-2 rounded-md w-full md:w-auto mt-4 md:mt-0">
          Status anzeigen
        </button>
      </div>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {statusType === "order" && orderDetails && (
        <div>
          <div className="text-sm text-gray-500 mb-6">PC-NUMMER: {orderDetails.pcNumber}</div>
          <ol className="relative border-l-2 border-slate-500 pl-4">
            {STATUS_LIST.map((status, index) => (
              <li key={index} className={`mb-10 ml-6 ${index + 1 <= getStatusProgress() ? "text-primary" : "text-gray-600"}`}>
                <span className={`absolute w-6 h-6 -left-3 rounded-full border-2 ${index + 1 <= getStatusProgress() ? "bg-primary" : "bg-gray-600"} border-none`}></span>
                <h3 className="font-semibold text-lg">{status.title}</h3>
                <p className="text-sm">{status.description}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {statusType === "support" && supportStatus && (
        <div className="text-center mt-4">
          <h2 className="text-xl text-white font-bold">Aktueller Support-Status</h2>
          <p className="text-primary">{supportStatus}</p>
        </div>
      )}

      {statusType === "guarantee" && guaranteeStatus && (
        <div className="text-center mt-4">
          <h2 className="text-xl text-white font-bold">Aktueller Status der Garantieanfrage</h2>
          <p className="text-primary">{guaranteeStatus}</p>
        </div>
      )}
    </div>
  );
};

export default StatusCheckOrder;
