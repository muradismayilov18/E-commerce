import React from 'react'
import Categories from '../components/Categories'
import ServiceSection from '../components/ServiceSection'
import WeeklyDeal from '../components/WeeklyDeal'
import Deal from '../components/Deal'
import LogoSection from '../components/LogoSection'
import Perspiciatis from '../components/Perspiciatis'
import Discount from '../components/Discount'
import Product from "../components/Product"
const Home = () => {
    
    return (
        <>
        <Categories/>
        <ServiceSection/>
        <WeeklyDeal/>
        <LogoSection/>
        <Perspiciatis/>
        <Deal/>
        <Discount/>
        <Product/>
        </>
    )
}

export default Home