
import { useState } from 'react'
import Details from './Details.jsx'

function RecordCard({ record }) {
    const [showDetails, setShowDetails] = useState(false)

    const toggleDetails = () => {
    setShowDetails((previous) => !previous)
    }

    return (
        
    <article className='food-card'>
    <p className='food-category'>{record.Type}</p>
        <h2>{record.Name}</h2>
        
            <p className="restaurant-badge">
            {record.Vendor}
            </p>    
    <div className='nutrition-grid'>
        <div className="calories-box">
                <strong>{record.Calories}</strong>
                <small>Calories per serving</small>
            </div>

            <div>
                <strong>{record["Protein (g)"]} g</strong>
                <small>Protein</small>
            </div>
            <div>
                <strong>{record["Fat (g)"]} g</strong>
                <small>Total fat</small>
            </div>
    </div>
            

        <button className="nutrition-Btn" onClick={toggleDetails}>
            {showDetails ? "Hide Details" : "View Nutrition Details"}
        </button>

        {showDetails && <Details record={record} />}
        </article>
    )
}

export default RecordCard
