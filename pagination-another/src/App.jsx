import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './components/Pagination';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = currentPage * postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading && posts.length === 0) {
    return <h2>Loading..</h2>;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Pagination</h1>
      <ul className="list-group my-4" style={{ listStyle: 'none' }}>
        {currentPosts.map((post, index) => {
          return (
            <li className="list-group-item" key={index}>
              {post.title}
            </li>
          );
        })}
      </ul>
      <Pagination pages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;
