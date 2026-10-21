
function RecordCard({ record}) {
    

    return (
        <article>
            <h2>Vendor: {record.Vendor}</h2>
        <p> {record.Name} — {record.Calories} calories, Cholesterol: {record["Cholesterol (mg)"]} mg
</p>

        </article>
    )
}

export default RecordCard
