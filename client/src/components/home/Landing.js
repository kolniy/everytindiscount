import React, { useEffect } from "react"
import Header from "../Layout/Header"
import Footer from "../Layout/Footer"
import Hero from "./sections/Hero"
import Services from "./sections/Services"
import Category from "./sections/Category"
import About from "./sections/About"
import Contact from "./sections/Contact"

const Landing = ({
  location
}) => {

  useEffect(() => {
    const view = location.state
    const category_section = document.getElementById('category');

    if(view){
      category_section.scrollIntoView()
    }
  }, [location.state])

  return <>
    <Header />
    <Hero />
    <Services />
    <Category />
    <About />
    <Contact />
    <Footer />
  </>
}

export default Landing