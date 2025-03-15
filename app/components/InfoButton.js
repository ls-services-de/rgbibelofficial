import { FaInfo } from "react-icons/fa"

const InfoButton = ({ setIsInfoOpen }) => {
  return (
    <button
      className="fixed bottom-[70px] right-4 bg-primary text-white p-2 rounded-full z-50"
      onClick={() => setIsInfoOpen(true)}
    >
      <FaInfo className="h-6 w-6" />
    </button>
  )
}

export default InfoButton

