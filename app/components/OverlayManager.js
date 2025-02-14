"use client";

import React, { useState, useEffect } from "react";
import LaunchOverlay from "./LaunchOverlay";
import MaintenanceOverlay from "./MaintenanceOverlay";
import PasswordOverlay from "./PasswortOverlay";
import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: "6fnwq7k5",
  dataset: "production",
  apiVersion: "2023-08-15",
  useCdn: true,
});

const OverlayManager = ({ children }) => {
  const [overlayType, setOverlayType] = useState(null);
  const [launchEndDate, setLaunchEndDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [passwordVerified, setPasswordVerified] = useState(false); // Zustand wird zurückgesetzt bei jedem Laden

  useEffect(() => {
    const fetchOverlayStatus = async () => {
      try {
        const overlayData = await client.fetch(`*[_type == "overlays"][0]`);
        const now = new Date();

        // Wartungs-Overlay prüfen
        if (overlayData.maintenance) {
          const startDate = overlayData.maintenanceStartDate ? new Date(overlayData.maintenanceStartDate) : null;
          const endDate = overlayData.maintenanceEndDate ? new Date(overlayData.maintenanceEndDate) : null;

          if (startDate && now >= startDate && (!endDate || now <= endDate)) {
            setOverlayType("maintenance");
            return;
          }
        }

        // Launch-Overlay prüfen
        if (overlayData.launchScreen) {
          const startDate = overlayData.launchStartDate ? new Date(overlayData.launchStartDate) : null;
          const endDate = overlayData.launchEndDate ? new Date(overlayData.launchEndDate) : null;

          if (startDate && now >= startDate && (!endDate || now <= endDate)) {
            setOverlayType("launch");
            setLaunchEndDate(overlayData.launchEndDate);
            return;
          }
        }

        // Kein Overlay, setze auf normal
        setOverlayType("normal");
      } catch (error) {
        console.error("Fehler beim Abrufen der Overlay-Daten:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOverlayStatus();
    const interval = setInterval(fetchOverlayStatus, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePasswordCorrect = () => {
    setPasswordVerified(true); // Passwort wurde eingegeben
  };

  const handleLaunchEnd = () => {
    setOverlayType("normal");
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <p>Lädt...</p>
      </div>
    );
  }

  return (
    <>
      {/* Render Launch- oder Wartungs-Overlay */}
      {!passwordVerified && overlayType === "launch" && (
        <LaunchOverlay endDate={launchEndDate} onLaunchEnd={handleLaunchEnd} />
      )}
      {!passwordVerified && overlayType === "maintenance" && <MaintenanceOverlay />}

      {/* Passwort-Overlay anzeigen, wenn nicht verifiziert und ein Overlay aktiv */}
      {!passwordVerified && (overlayType === "launch" || overlayType === "maintenance") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <PasswordOverlay onPasswordCorrect={handlePasswordCorrect} />
        </div>
      )}

      {/* Normale Seite anzeigen, wenn Passwort eingegeben oder kein Overlay aktiv */}
      {(passwordVerified || overlayType === "normal") && children}
    </>
  );
};

export default OverlayManager;
