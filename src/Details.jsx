
function Details({ record }) {
    if (!record) {
        return <p>Select a food and click Details to see more.</p>
    }

    return (
        <article>
        <h2>Food Details: {record.Name}</h2>
        <p>Vendor: {record.Vendor}</p>
        <p>Calories: {record.Calories}</p>
        <p>Fat: {record["Fat (g)"]} g</p>
        <p>Protein: {record["Protein (g)"]} g</p>
        <p>Carbohydrates: {record["Carbohydrate (g)"]} g</p>
        <p>Cholesterol: {record["Cholesterol (mg)"]} mg</p>
        <p>Sodium: {record["Sodium (mg)"]} mg</p>
        </article>
    )
    }

export default Details
