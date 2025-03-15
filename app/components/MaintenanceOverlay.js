const MaintenanceOverlay = () => {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-90 flex items-center justify-center z-10">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold">Wartungsarbeiten</h1>
          <p className="mt-4">Unsere Website ist derzeit wegen Wartungsarbeiten nicht verfügbar. Bitte versuchen Sie es später erneut.</p>
        </div>
      </div>
    );
  };
  
  export default MaintenanceOverlay;
  