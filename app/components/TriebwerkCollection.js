'use client';

import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../../sanity/product-utils'; // Importiere die getAllProducts Funktion
import Cardtw from './Cardtw'; // Stelle sicher, dass der Pfad zur Card-Komponente korrekt ist

const TriebwerkCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Funktion zum Abrufen und Filtern der Triebwerk-Produkte
  const fetchTriebwerkProducts = async () => {
    try {
      const allProducts = await getAllProducts(); // Alle Produkte abrufen

      // Überprüfe die Struktur von allProducts und filtere die Triebwerk-Produkte
      const triebwerkProducts = allProducts.filter((product) => {
        // Prüfe, ob product.category ein Objekt ist (z.B. eine Referenz)
        if (typeof product.category === 'object' && product.category?._ref) {
          return product.category._ref === '6a6b8780-8a8f-489a-bec3-f5a4d808c981'; // Ersetze 'TriebwerkID' mit der tatsächlichen ID der Kategorie Triebwerk
        }
        return product.category === "Triebwerk"; // Vergleiche mit dem String "Triebwerk"
      });

      setProducts(triebwerkProducts); // Nur Triebwerk-Produkte speichern
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect zum Laden der Daten
  useEffect(() => {
    fetchTriebwerkProducts(); // Funktion aufrufen
  }, []);

  if (loading) return <p>Laden...</p>;
  if (error) return <p>Fehler beim Laden der Produkte.</p>;

  return (
    <div className='mt-[150px]'>
      <h2 className="text-4xl font-bold text-white mb-12">Unsere Kollektion</h2>
  
      <div className='mx-auto w-[80%] md:mt-0 mt-[50px] grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:grid-cols-2'>
        {products.length === 0 ? (
          <p>Keine Triebwerk Produkte gefunden.</p>
        ) : (
          products.map((product) => (
            <Cardtw key={product._id} product={product} />
          ))
        )}
      </div>


      
    </div>
  );
};

export default TriebwerkCollection;
