import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddData = () => {
  const [post, setPost] = useState({
    title: '',
    platform: '',
    developer: '',
    publisher: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  // Handle input changes
  const handleInput = (event) => {
    setPost({
      ...post,
      [event.target.name]: event.target.value, // Fix: Use event.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5156/api/VideoGame', post);
      console.log('Data added successfully:', response.data);
      navigate('/'); // Navigate to home page
    } catch (err) {
      console.error('Failed to add data:', err);
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddData;

