import React from 'react'
import Hero from '../components/static/Hero'
import StaticLayout from '../layouts/static'
import PriceChart from '../components/static/PriceChart'

const Homepage = () => {
  return (
    <>
      <Hero />
      <StaticLayout>
        <PriceChart />
      </StaticLayout>
    </>
  )
}

export default Homepage
