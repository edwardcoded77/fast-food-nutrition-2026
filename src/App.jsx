
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
        selectedVendor === "All foods" ||
        record.Vendor  === selectedVendor

      return matchesSearch && matchesVendor
    })

  if (loading) {
    return <h1>Loading...</h1>
  }



  return (
    <div className="card">
        <header className="heading">
          <p className="eyebrow">YOUR FOOD, YOUR CHOICE</p>
          <h1>Eat better. Choose smarter.</h1>
          <p className="hero-description">
            Discover what's in your favorite meals and
            compare nutrition before you order.
          </p>
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
            <option value="All foods">All restaurants</option>

            {vendors.map((vendor) => (
              <option key={vendor} value={vendor}>
                {vendor}
              </option>
            ))}
          </select>
        </div>


      
        <div className="food-grid">
          {shown.length > 0 ? (
            shown.map((record) => (
              <RecordCard key={record.id} record={record} />
            ))
          ) : (
            <p>No matching foods found. Try another search or filter.</p>
          )}
        </div>

    </div>
  )
}

export default App