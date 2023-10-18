"use client";
import Snake from './components/Snake'
import TopBar from './components/TopBar'
import { useState } from 'react'

export default function Home() {
  const [theme, setTheme]=useState("light") 
  const updateTheme = (toggletheme) => {
    if(toggletheme){setTheme("light")}
    else{setTheme("dark")}
  }
  return (
    <main data-theme={theme} className="flex min-h-screen flex-col bg-primary text-primary"> 
     < div className='border-b border-gray-800 py-2 px-2 sm:px-4'><TopBar theme={updateTheme} /></div> 
     <div className='container mx-auto px-2 sm:px-12 py-4'>
      <Snake />
      </div>
      
    </main>
  )
}
