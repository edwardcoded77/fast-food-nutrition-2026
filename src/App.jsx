import { useState } from 'react'
import './App.css'
import "@picocss/pico/css/pico.css"
import useFetchData from './useFetchData.js'
import RecordCard from './RecordCard.jsx'





function App() {
  const { records, loading, error } = useFetchData("https://studentedward-data-api.edwardolagunju25.workers.dev/api/v1/datasets/fast-food-nutrition/records")
        if (loading){
    return <h1>Loading...</h1>
    }


  return (
    <div  className="card">
      <header className='heading'>
        <h1>Smart Food Choice</h1>
        <p>Eat smart, live well.</p>
        <h2>Your journey to better eating starts here.</h2>
        <p>Compare your favorite foods. Understand what's in them.Choose what works for you.</p>
      </header>
      <p>{error}</p>
          {records.map((record) => <RecordCard key={record.id} record={record} />)}

    </div> 
  )
}

export default App
