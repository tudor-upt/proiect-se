function LaptopList({ laptops, loading }) {
    const isEmpty = laptops.length === 0;

    return (
        <div style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: loading || isEmpty ? 'flex' : 'grid',
            justifyContent: loading || isEmpty ? 'center' : undefined,
            alignItems: loading || isEmpty ? 'center' : undefined,
            gridTemplateColumns: !loading && !isEmpty ? 'repeat(auto-fill, minmax(300px, 1fr))' : undefined,
            gap: '1rem',
            height: '100%',   // full height of the flex parent
            boxSizing: 'border-box'
        }}>
            {loading ? (
                <div style={{ fontSize: '1.5rem', color: '#aaa' }}>
                    Loading laptops...
                </div>
            ) : isEmpty ? (
                <div style={{ fontSize: '1.5rem', color: '#aaa' }}>
                    No laptops found.
                </div>
            ) : (
                laptops.map((laptop, idx) => (
                    <div key={idx} style={{
                        border: '1px solid #ddd',
                        padding: '1rem',
                        borderRadius: '8px',
                        backgroundColor: '#252525',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}>
                        <img src={laptop.image} alt={laptop.name} style={{ width: '100%', borderRadius: '4px' }} />
                        <h3 style={{ marginTop: '0.5rem' }}>{laptop.name}</h3>
                        <p><strong>CPU:</strong> {laptop.cpu?.prod} {laptop.cpu?.model}</p>
                        <p><strong>GPU:</strong> {laptop.gpu?.prod} {laptop.gpu?.model}</p>
                        <p><strong>RAM:</strong> {laptop.memory_size} GB ({laptop.memory_type})</p>
                        <p><strong>Storage:</strong> {laptop.total_storage} GB</p>
                        <p><strong>Display:</strong> {laptop.display_size}" {laptop.display_type} ({laptop.display_horizontal_resolution}x{laptop.display_vertical_resolution})</p>
                        <p><strong>Price:</strong> {laptop.price} USD</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default LaptopList;
