import { Wrench, Clock } from "lucide-react"
import Header from '../components/Header';

export default function MaintenanceOverlay() {
  return (
    <>
    <Header className="z-50"/>
    <div className="fixed inset-0  backdrop-blur-sm z-40 flex items-center justify-center">
      <div className="text-center p-8 max-w-md mx-4">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <Wrench className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-4">Wartungsarbeiten</h1>

        <p className="text-dimWhite mb-6 leading-relaxed">
          Wir führen derzeit Wartungsarbeiten durch, um Ihnen ein besseres Erlebnis zu bieten. Bitte versuchen Sie es in
          Kürze erneut.
        </p>

        <div className="flex items-center justify-center text-sm text-white">
          <Clock className="w-4 h-4 mr-2" />
          
        </div>

        
      </div>
    </div>
    </>
  )
}
