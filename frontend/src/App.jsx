// src/App.jsx
import CheckboxGroup from './components/CheckboxGroup';

function App() {
    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Laptop Specifications</h1>

            <CheckboxGroup title="Colors" endpoint="colors/" dataKey="colors" renderOption={(c) => c.name} />
            <CheckboxGroup title="RAM Size" endpoint="memory-size/" dataKey="RAM_size" />
            {/* Add more groups below like this */}
        </div>
    );
}

export default App;
