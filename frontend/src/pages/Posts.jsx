import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import Layout from '../components/Layout';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
    fetchPageContent();
  }, []);

  const fetchPageContent = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pages/posts`);
      setPageContent(response.data);
    } catch (error) {
      console.error('Error fetching page content:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts`);
      setPosts(response.data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ color: '#8B0000' }}>Loading posts...</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#8B0000', textAlign: 'center', marginBottom: '2rem' }}>
          {pageContent?.title || '📝 Community Posts'}
        </h1>
        
        {pageContent?.content && (
          <div style={{
            background: 'rgba(255,255,255,0.9)',
            borderRadius: '15px',
            padding: '1.5rem',
            marginBottom: '2rem',
            border: '2px solid #DAA520',
            whiteSpace: 'pre-wrap',
            lineHeight: '1.6'
          }}>
            {pageContent.content}
          </div>
        )}
        
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} style={{
              background: 'white',
              borderRadius: '15px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              boxShadow: '0 8px 25px rgba(139, 69, 19, 0.1)',
              border: '2px solid #DAA520'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <img 
                  src="/images/anbu_thane_ellam_sethu.JPEG" 
                  alt="Channel Avatar"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    marginRight: '1rem',
                    border: '2px solid #FFD700'
                  }}
                />
                <div>
                  <h4 style={{ margin: 0, color: '#8B0000' }}>
                    {post.author}
                  </h4>
                  <div style={{ color: '#888', fontSize: '0.9rem' }}>
                    {post.timeAgo}
                  </div>
                </div>
              </div>
              <div style={{
                color: '#333',
                lineHeight: '1.6',
                fontSize: '1.1rem'
              }}>
                {post.content}
              </div>
            </div>
          ))
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'white',
            borderRadius: '15px',
            border: '2px solid #DAA520'
          }}>
            <h3 style={{ color: '#8B0000', marginBottom: '1rem' }}>No posts available</h3>
            <p style={{ color: '#666' }}>
              Configure YouTube API to fetch community posts from the channel.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Posts;