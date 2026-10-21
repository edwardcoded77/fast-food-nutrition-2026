import { useState } from 'react'
import './App.css'
import "@picocss/pico/css/pico.css"
import useFetchData from './useFetchData.js'
import RecordCard from './RecordCard.jsx'




// fetch data
function App() {
  const { records, loading, error } = useFetchData("https://studentedward-data-api.edwardolagunju25.workers.dev/api/v1/datasets/fast-food-nutrition/records")
      
      // create search state
        const [query, setQuery] = useState("")
        
        // read the search and update query
        const search = () => {
        setQuery(document.querySelector("#query").value)
      }

        // filter records
      const shown = records.filter((record) => 
        record.Name.toLowerCase().includes(query.toLowerCase()))



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
        <input type="text" id="query" placeholder="Search foods or restaurants..." />
        
        <button onClick={search}>Search</button>
        
        {query === "" ? (
          <p>Enter a food name and click Search.</p>
          ) : shown.length > 0 ? (
          shown.map((record) => (
            <RecordCard key={record.id} record={record} />
          ))
          ) : (
          <p>No matching foods found.</p>

          )}

    </div> 
  )
}

export default App
