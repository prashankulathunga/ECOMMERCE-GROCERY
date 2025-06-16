import React, { useEffect } from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'
import { useAppContext } from '../context/AppContext'

function Home() {

  const {axios, setUser} = useAppContext();

  const isUserAuthFetch = async ()=>{
    try {
        const {data} = await axios.get('/user/is-auth');
        if(data.success){
            setUser(data);
            setShowUserLogin(false);
        }else{
            setUser(null)
        }
    } catch (error) {
        console.log(error.message)
    }
}   

useEffect(()=>{
    isUserAuthFetch();
}, [])  

  return (
    <div className='mt-10'>
      <MainBanner/>
      <Categories/>
      <BestSeller/>
      <BottomBanner/>
      <NewsLetter/>
    </div>
  )
}

export default Home
