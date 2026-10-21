
function RecordCard({ record}) {
    

    return (
        <article>
            <h2>Vendor: {record.Vendor}</h2>
            <p> Name: {record.Name} </p>
            <p>Calories: {record.Calories} </p>
            <p>Cholesterol: {record["Cholesterol (mg)"]} mg </p>
        </article>
    )
}

export default RecordCard
