function LaptopList({ laptops }) {
    return (
        <div style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
            height: '100%'
        }}>

        {laptops.length === 0 ? (
                <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>No laptops found.</p>
            ) : (
                laptops.map((laptop, idx) => (
                    <div key={idx} style={{
                        border: '1px solid #ddd',
                        padding: '1rem',
                        borderRadius: '8px',
                        backgroundColor: '#252525'
                    }}>
                        <img src={laptop.image} alt={laptop.name} style={{ width: '100%', borderRadius: '4px' }} />
                        <h3 style={{ marginTop: '0.5rem' }}>{laptop.name}</h3>
                        <p><strong>CPU:</strong> {laptop.cpu?.prod} {laptop.cpu?.model}</p>
                        <p><strong>GPU:</strong> {laptop.gpu?.prod} {laptop.gpu?.model}</p>
                        <p><strong>RAM:</strong> {laptop.memory_size} GB ({laptop.memory_type})</p>
                        <p><strong>Storage:</strong> {laptop.total_storage} GB</p>
                        <p><strong>Display:</strong> {laptop.display_size}" {laptop.display_type} ({laptop.display_horizontal_resolution}x{laptop.display_vertical_resolution})</p>
                        <p><strong>Price:</strong> {laptop.price} USD</p>
                        {/*<button style={{*/}
                        {/*    marginTop: '0.5rem',*/}
                        {/*    backgroundColor: '#1f1f1f',*/}
                        {/*    color: 'rgb(250,14,14)',*/}
                        {/*    border: 'none',*/}
                        {/*    padding: '0.5rem 1rem',*/}
                        {/*    borderRadius: '4px',*/}
                        {/*    cursor: 'pointer'*/}
                        {/*}}>Add to Cart</button>*/}
                    </div>
                ))
            )}
        </div>
    );
}

export default LaptopList;
