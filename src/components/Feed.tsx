import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { addPost } from '../redux/post/postSlice';
import Post from './Post';
import { Input, Button } from 'antd';

const Feed: React.FC = () => {
  const posts = useSelector((state: RootState) => state.posts);
  const dispatch: AppDispatch = useDispatch();
  const [newPostBody, setNewPostBody] = useState('');

  const handleAddPost = () => {
    if (newPostBody.trim()) {
      dispatch(addPost({
        body: newPostBody,
        username: "Static User",
        created_at: new Date().toISOString(),
        comments: [],
        likes: 0,
        dislikes: 0
      }));
      setNewPostBody('');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Input.TextArea
        rows={4}
        value={newPostBody}
        onChange={(e) => setNewPostBody(e.target.value)}
        placeholder="What's on your mind?"
      />
      {newPostBody.trim() && (
        <Button onClick={handleAddPost} style={{ marginTop: 10 }}>
          Post
        </Button>
      )}
      {posts.slice().reverse().map(post => <Post key={post.id} {...post} />)}
    </div>
  );
};

export default Feed;
