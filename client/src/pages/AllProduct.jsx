import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard';

function AllProduct() {

    const {product, searchQuery} = useAppContext();

    const [filteredProduct, setFilteredProduct] = useState([]);

    useEffect(()=>{
        if (searchQuery.length > 0) {
            setFilteredProduct(product.filter(item=> item.name.toLowerCase().includes(searchQuery.toLowerCase())));
        }else{
            setFilteredProduct(product)
        }
    }, [product, searchQuery])

  return (
    <div className='mt-16 flex flex-col'>
        <div className='flex flex-col items-end w-max'>
            <p className='text-2xl font-medium uppercase'>All Products</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'/>
        </div>
      
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-6 md:gap-6 gap-3'>
        {
            filteredProduct.filter(item=> item.inStock).map((products, index)=>(
                <ProductCard key={index} product={products}/>
            ))
        }
    </div>

    </div>
  )
}

export default AllProduct
