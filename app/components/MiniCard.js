import Link from "next/link"

function MiniCard({ product }) {
  return (
    <Link href={`/details/${product.slug}`} className="block w-full h-full">
      <div className="bg-card text-white p-4 rounded-md shadow-md hover:bg-[#035163] transition-colors duration-300 flex flex-col h-full">
        {/* Product Image - Fixed height */}
        <div className="flex items-center justify-center overflow-hidden rounded-md mb-6 h-[180px]">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        {/* Product Name and Price - Text aligned left with more space */}
        <div className="mt-auto w-full">
          <h3 className="text-lg font-semibold min-h-[56px]">{product.name}</h3>
          <p className="text-sm mt-1 font-bold">{product.price}€</p>
        </div>
      </div>
    </Link>
  )
}

export default MiniCard

