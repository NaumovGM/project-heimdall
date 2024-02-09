import React, { useState, useEffect } from 'react';

function App() {
    const [data, setData] = useState(null);
    const backendUrl = 'http://192.168.0.95:5000';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(backendUrl + '/api/data');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h1>Test API Call</h1>
            {data ? <p>Response from server: {data.message}</p> : <p>Loading...</p>}
        </div>
    );
}

export default App;
