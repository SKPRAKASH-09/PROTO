import React from 'react'
import Header from '../../components/Home/Header'
import Categories from '../../components/Home/Categories'
import LatestNews from '../../components/Home/LatestNews'

const Home = () => {
  return (
    <div>
      <Header />
      <Categories />
      <LatestNews />
    </div>
  )
}

export default Home