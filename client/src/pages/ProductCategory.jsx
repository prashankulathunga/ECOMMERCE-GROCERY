import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';

function ProductCategory() {

    const {product} = useAppContext();
    const {category} = useParams();

    const searchCategory = categories.find(item=> item.path.toLowerCase() === category);
    const filletedCategory = product.filter(products=> products.category.toLocaleLowerCase() === category);
    console.log('I am Search category', searchCategory);
    console.log(filletedCategory);

  return (
    <div>
      {
        searchCategory && (
            <div className='mt-16'>
            <div className='flex flex-col items-end w-max'>
            <p className='text-2xl font-medium uppercase'>{searchCategory.text}</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'/>
        </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-6 md:gap-6 gap-3'>
                {
                    filletedCategory ? (
                        filletedCategory.map((filletedProduct, index)=>(
                            <ProductCard key={index} product={filletedProduct}/>
                        ))
                    ):(
                        <div className='flex justify-center items-center'>
                            <p className='text-primary text-3xl font medium'>Product not found</p>
                        </div>
                    )
                }
            </div>
        </div>
        )
      }
    </div>
  )
}

export default ProductCategory
