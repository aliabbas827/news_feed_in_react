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
        username: "Muhammad Ali Abbas",
        created_at: new Date().toISOString(),
        comments: [],
        likes: 0,
        dislikes: 0,
        userReaction: null
      }));
      setNewPostBody('');
    }
  };

  return (
    <div className='py-7 '>
     
      <div className='p-5 my-3 bg-white rounded-lg shadow-md flex flex-col items-end gap-3'>
      <Input
        value={newPostBody}
        onChange={(e) => setNewPostBody(e.target.value)}
        placeholder="What's on your mind?"
      />
      {newPostBody.trim() && (
        <Button onClick={handleAddPost} style={{ marginTop: 10 }}>
          Post
        </Button>
      )}
      </div>
      {posts.slice().reverse().map(post => <Post key={post.id} {...post} />)}
    </div>
  );
};

export default Feed;
