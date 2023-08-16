import React from 'react'
import Footer from './Footer'
import '../App.css'



export default function MainLayout(props) {
  return (
    <main style={{ zIndex:"-1", marginTop: "140px"}}>
      {props.children}      
      <Footer></Footer>
    </main>
  )
}
