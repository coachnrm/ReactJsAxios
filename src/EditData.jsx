import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const EditData = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    platform: '',
    developer: '',
    publisher: '',
  });

  // Fetch data for the selected item
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5156/api/VideoGame/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    fetchData();
  }, [id]);

  // Handle input changes
  const handleInput = (event) => {
    setPost({
      ...post,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5156/api/VideoGame/${id}`, post);
      navigate('/'); // Navigate back to the home page
    } catch (err) {
      console.error('Failed to update data:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Title:
          <input type="text" name="title" value={post.title} onChange={handleInput} required />
        </label>
      </div>
      <div>
        <label>
          Platform:
          <input type="text" name="platform" value={post.platform} onChange={handleInput} required />
        </label>
      </div>
      <div>
        <label>
          Developer:
          <input type="text" name="developer" value={post.developer} onChange={handleInput} required />
        </label>
      </div>
      <div>
        <label>
          Publisher:
          <input type="text" name="publisher" value={post.publisher} onChange={handleInput} required />
        </label>
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditData;

