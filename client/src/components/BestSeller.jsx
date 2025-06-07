import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

function BestSeller() {

    const {product} = useAppContext();
    console.log(product);

  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-6 md:gap-6 gap-3'>
        {
            product.filter(item=> item.inStock).slice(0,5).map((products, index)=>(
                <ProductCard key={index} product={products}/>
            ))
        }
       
      </div>
    </div>
  )
}

export default BestSeller
