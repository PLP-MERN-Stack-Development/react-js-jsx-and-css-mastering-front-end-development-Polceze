import React, { useState, useEffect, useCallback } from 'react';
import Button from './Button';
import Card from './Card';

const ApiDataDisplay = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasMore, setHasMore] = useState(true);

  // Fetch posts from JSONPlaceholder API
  const fetchPosts = useCallback(async (pageNum = 1, search = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageNum}&_limit=10`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      
      if (pageNum === 1) {
        setPosts(data);
      } else {
        setPosts(prev => [...prev, ...data]);
      }
      
      // Simple check for more data (JSONPlaceholder has 100 posts)
      setHasMore(data.length === 10 && pageNum < 10);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load and when page changes
  useEffect(() => {
    fetchPosts(page);
  }, [page, fetchPosts]);

  // Filter posts based on search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const resetSearch = () => {
    setSearchTerm('');
    setPage(1);
    fetchPosts(1);
  };

  if (error && page === 1) {
    return (
      <Card>
        <h2 className="text-2xl font-bold mb-4">API Data</h2>
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <Button onClick={() => fetchPosts(1)} variant="primary">
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4">Posts from JSONPlaceholder</h2>
      
      {/* Search functionality */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search posts..."
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <Button onClick={resetSearch} variant="secondary">
            Clear
          </Button>
        </div>
      </div>

      {/* Loading state */}
      {loading && page === 1 && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2">Loading posts...</p>
        </div>
      )}

      {/* Posts grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow dark:border-gray-700"
          >
            <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
              {post.body}
            </p>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-xs text-gray-500">Post ID: {post.id}</span>
              <span className="text-xs text-gray-500">User: {post.userId}</span>
            </div>
          </div>
        ))}
      </div>

      {/* No results */}
      {!loading && filteredPosts.length === 0 && posts.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No posts match your search.</p>
        </div>
      )}

      {/* Load more button */}
      {hasMore && !searchTerm && (
        <div className="text-center mt-6">
          <Button
            onClick={loadMore}
            disabled={loading}
            variant="primary"
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}

      {/* End of results */}
      {!hasMore && posts.length > 0 && (
        <div className="text-center mt-6">
          <p className="text-gray-500">All posts loaded.</p>
        </div>
      )}
    </Card>
  );
};

export default ApiDataDisplay;