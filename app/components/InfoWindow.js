const InfoWindow = ({ setIsInfoOpen, step, getStepDescription }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-card p-6 rounded-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-white">Info: Schritt {step}</h2>
          <p className="text-dimWhite">{getStepDescription(step)}</p>
          <button
            className="mt-4 px-4 py-2 bg-primary text-white rounded "
            onClick={() => setIsInfoOpen(false)}
          >
            Schließen
          </button>
        </div>
      </div>
    )
  }
  
  export default InfoWindow
  
  