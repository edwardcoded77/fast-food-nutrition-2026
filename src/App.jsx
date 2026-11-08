
import { useState } from 'react'
import './App.css'
import "@picocss/pico/css/pico.css"
import useFetchData from './useFetchData.js'
import RecordCard from './RecordCard.jsx'

function App() {
  const { records, loading, error } = useFetchData(
    "https://studentedward-data-api.edwardolagunju25.workers.dev/api/v1/datasets/fast-food-nutrition/records?limit=460"
  )

  const [query, setQuery] = useState("")
  const [searchText, setSearchText] = useState("")
  const [selectedVendor, setSelectedVendor] = useState("All foods")
  const  [compareItems, setCompareItems] = useState([]) 



  // converting text to consistent format
    const normalize = (value) =>
      String(value ?? "").toLowerCase().replace(/[^a-z0-9]/g, "")

    // Build restaurant list using `map`, `filter` and `sort`
    const vendors = [...new Set(
          records.map((record) => record.Vendor).filter(Boolean))].sort((a, b) => a.localeCompare(b))

    // Filter the food records
    const shown = records.filter((record) => {
      const matchesSearch =
        normalize(record.Name).includes(normalize(query)) ||
        normalize(record.Type).includes(normalize(query)) ||
        normalize(record.Vendor).includes(normalize(query))

      const matchesVendor =
        // selectedVendor === "" ||
        record.Vendor  === selectedVendor

      return matchesSearch && matchesVendor
    })

      const compare = (item) => {
      setCompareItems([...compareItems, item])
      console.log(item)
      }

      const resetSearch = () => {
        setQuery("")
        setSearchText("")
        setSelectedVendor("All foods")
        setCompareItems([])
      }


  return (
    <div className="card">
        <header className="heading">
            <div className="hero-text">
          <p className="eyebrow">YOUR FOOD, YOUR CHOICE</p>
          <h1 >Eat better. Choose smarter.</h1>
          <p className="hero-description">
            Discover what's in your favorite meals and
            compare nutrition before you order.
          </p>
          </div>
          <div className="hero-image">
              <img  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700" alt="Burger with fresh lettuce, tomato, and cheese"/>
          </div>
        </header>
      <p>{error}</p>
      <section className="search-section">
        <h2>Find your food</h2>
        <p>Search meals and compare your favorite restaurants.</p>
      </section>
      
      <form
          className="search-form"
          onSubmit={(event) => {
            event.preventDefault()
            setQuery(searchText.trim())
          }}
          >
        <input
          type="text"
          id="query"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search foods or restaurants..."
          />
            <button type="submit" className="Search-Btn">Search</button>
      </form>

          <div className="restaurant-filter">
            <label htmlFor="restaurant">Filter by restaurant</label>
              <select
                id="restaurant"
                value={selectedVendor}
                onChange={(event) => setSelectedVendor(event.target.value)}
                  >
                <option value="">Select restaurant</option>
                {vendors.map((vendor) => (<option key={vendor} value={vendor}>{vendor}
                  </option>
                ))}
                </select>
        </div>
            
            <div className="compare">
            <h2>Compare your food </h2>
            <p>Selected foods: {compareItems.length}</p>
                
            <div className="compare-items"> 
              {compareItems.map((item) => (
                  <div className="compare-item"  key={item.id}>
                      <h3>{item.Name}</h3>
                      <p>{item.Vendor}</p>
                      <p>Calories: {item.Calories}</p>
                  </div>
                ))}
                </div>
              </div>

              <button type="button" className="resetBtn"onClick={resetSearch}>Reset Search</button>
        
        <div className="food-grid">
            {shown.length > 0 ? (
              shown.map((record) => (
                <RecordCard key={record.id} record={record} onCompare={compare}/>
              ))
            ) : query !== "" || searchText !== "" || selectedVendor !== "All foods" ? (
              <p>No matching foods found. Try another search or filter.</p>
            ) : null}
        </div>

    </div>
  )
}

export default App