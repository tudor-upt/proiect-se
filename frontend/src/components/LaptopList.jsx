function LaptopList({ laptops }) {
    return (
        <div style={{ flex: 1, padding: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {laptops.map((laptop, idx) => (
                <div key={idx} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', backgroundColor: '#fff' }}>
                    <h3>{laptop.name}</h3>
                    <p>{laptop.cpu}</p>
                    <p>{laptop.ram} GB RAM</p>
                    <p>{laptop.price} RON</p>
                    <button>Add to cart</button>
                </div>
            ))}
        </div>
    );
}

export default LaptopList;
