import { Link } from 'react-router-dom';
import {  useState, useEffect } from 'react'
import axios from 'axios'


function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5156/api/VideoGame');
        setData(res.data); // Update the state with the fetched data
      } catch (err) {
        console.error(err); // Log error to console
        setError('Failed to fetch data.'); // Set an error message
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5156/api/VideoGame/${id}`);
      setData(data.filter((item) => item.id !== id)); // Update state to remove deleted item
    } catch (err) {
      console.error('Failed to delete data:', err);
    }
  };

  return (
    <>
    <div>
      <h2>Axios Library in React JS</h2>
      <Link to="/add-data">
        <button>Add Data</button>
      </Link>
      {error ? (
        <p>{error}</p>
      ) : data ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {item.title} {item.platform} {item.developer} {item.publisher}
              <Link to={`/edit/${item.id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </>
  );
}

export default App
