import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface User {
  id: string;
  name: string;
  email?: string;
}

interface Post {
  id: string;
  caption: string;
  likes: number;
  comments_count: number;
}

interface Comment {
  id: string;
  text: string;
}

const API_BASE_URL = 'http://localhost:3000/api';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
  const [errorFetchingPosts, setErrorFetchingPosts] = useState<string | null>(null);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        console.log(response.data.users);
        const usersArray = Object.keys(response.data.users).map((key) => ({
          id: key,
          name: response.data.users[key],
        }));
        setUsers(usersArray);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!selectedUserId) return;

    const fetchUserPosts = async () => {
      setLoadingPosts(true);
      setErrorFetchingPosts(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/users/${selectedUserId}/posts`);

        setUserPosts(response.data); 
      } catch (error) {
        console.error('Error fetching posts:', error);
        setErrorFetchingPosts('Failed to fetch posts. Please try again later.');
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchUserPosts();
  }, [selectedUserId]);

  // // Fetch comments of a selected post
  // useEffect(() => {
  //   if (selectedPostId) {
  //     const fetchPostComments = async () => {
  //       try {
  //         const response = await axios.get(`${API_BASE_URL}/posts/${selectedPostId}/comments`);
  //         setComments(response.data);
  //       } catch (error) {
  //         console.error('Error fetching comments:', error);
  //       }
  //     };
  //     fetchPostComments();
  //   }
  // }, [selectedPostId]);

  return (
    <div className="App">
      <h1>Social Media Dashboard</h1>

      {/* User List */}
      <div>
        <h2>Users</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id} onClick={() => setSelectedUserId(user.id)}>
                {user.name}
              </li>
            ))}
          </ul>
        )}
      </div>

  
      {selectedUserId && (
        <div>
          <h2>Posts for User {selectedUserId}</h2>

          {loadingPosts && <p>Loading posts...</p>}

      
          {errorFetchingPosts && <p style={{ color: 'red' }}>{errorFetchingPosts}</p>}

          {userPosts.length === 0 && !loadingPosts && !errorFetchingPosts && (
            <p>No posts available for this user.</p>
          )}

    
          <ul>
            {userPosts.map((post) => (
              <li key={post.id}>
                <p>{post.caption}</p>
                <p>Likes: {post.likes}</p>
                <p>Comments: {post.comments_count}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Post Comments */}
      {/* {selectedPostId && (
        <div>
          <h2>Comments for Post {selectedPostId}</h2>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>{comment.text}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default App;
