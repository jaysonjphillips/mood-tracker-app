import React from 'react'
import MainLayout from '../layouts/main'
import Hero from '../components/static/Hero'

const Dashboard = () => {
  console.log('yes')
  return (
    <MainLayout>
      <h1>Dashboard</h1>
      <Hero />
    </MainLayout>
  )
}

export default Dashboard
