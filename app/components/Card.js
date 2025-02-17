import Image from "next/image"
import BuyNowButton from "./BuyNowButton"
import Link from "next/link"

const Card = ({ product }) => {
  return (
    <>
    
        <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-2xl hover:bg-[#3b3b3b] ">
        
      <div className="flex flex-col h-full">
      <Link href={`/details/${product.slug}`}>
        <div className="relative h-[200px] w-auto mt-10 ml-10 mr-10">
          <Image
            src={
              product.image ||
              ""
            }
            alt={product.name}
            layout="fill"
            objectFit="contain"
            
          />
        </div>
        </Link>
        <div className="p-6 flex flex-col flex-grow">
        <Link href={`/details/${product.slug}`}>
        <h2 className="text-left text-xl sm:text-2xl font-bold text-primary mb-3">{product.name}</h2>

          <p className="text-gray-400 text-sm sm:text-base mb-8 flex-grow">{product.description}</p>
</Link>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col">
            
              <span className="text-2xl font-bold text-primary ">{product.price}€</span>
              <span className="text-sm text-gray-500">zzgl. Versandkosten</span>
              
            </div>

            <BuyNowButton product={product} />
          </div>
        </div>
      </div>
      
      
    </div>
          
    </>
  )
}

export default Card
