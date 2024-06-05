// Post.tsx

import React, { useState } from 'react';
import { Card, Button, Input, Dropdown, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { editPost, deletePost, addComment, toggleLikeDislike } from '../redux/post/postSlice';
import type { MenuProps } from 'antd';
import Comment from './Comment';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

interface PostProps {
  id: string;
  body: string;
  username: string;
  created_at: string;
  comments: any[];
  likes: number;
  dislikes: number;
  userReaction: 'like' | 'dislike' | null;
}



const Post: React.FC<PostProps> = ({ id, body, username, created_at, comments }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(body);
  const [newComment, setNewComment] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showEmojiPickerForPost, setShowEmojiPickerForPost] = useState(false);

  const dispatch = useDispatch();
  const post = useSelector((state: RootState) => state.posts.find(p => p.id === id));

  const handleLikeDislike = (type: 'like' | 'dislike') => {
    dispatch(toggleLikeDislike({ id, type }));
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(addComment({
        postId: id,
        comment: {
          body: newComment,
          username: "Muhammad Ali Abbas",
          created_at: new Date().toISOString(),
          likes: 0,
          dislikes: 0,
          postId: ''
        }
      }));
      setNewComment('');
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <h1 onClick={() => setIsEditing(true)} className=''>Edit</h1>
      ),
    },
    {
      key: '2',
      label: (
        <h1 onClick={() => dispatch(deletePost(id))} >Delete</h1>
      ),
    },

  ];
  const addEmoji = (e: { native: any; }) => {
    let emoji = e.native;
    setNewComment(newComment + emoji);
  };
  return (
    <Card title={`${username}`} extra={`Comments: ${comments.length}`} style={{ marginBottom: 20 }}>
     {isEditing ? (
  <>
      <Input
        value={editedBody}
        onChange={(e) => setEditedBody(e.target.value)}
      />
      <div className='flex sm:justify-start sm:flex-row-reverse  sm:items-start flex-col items-end mt-3'>
      <Button icon={<span role="img" aria-label="emoji">😀</span>}
        onClick={() => setShowEmojiPickerForPost(val => !val)}
      />
      {showEmojiPickerForPost && (
        <Picker data={data} onEmojiSelect={(e: { native: string; }) => setEditedBody(editedBody + e.native)} />
      )}
      </div>
     
    <div className='pt-3'>
      <Button onClick={() => {
        if (post) {
          dispatch(editPost({ id, body: editedBody, username, created_at, comments, likes: post.likes, dislikes: post.dislikes, userReaction: post.userReaction }));
        }
        setIsEditing(false);
        setShowEmojiPickerForPost(false); 
      }}>Save</Button>
      <Button onClick={() => {
        setIsEditing(false);
        setShowEmojiPickerForPost(false);
      }} style={{ marginLeft: 8 }}>Cancel</Button>
    </div>
  </>
): (
        <>
          <div className='flex items-center justify-between'>
            <p>{body}</p>
            <Space direction="vertical">
              <Space wrap>
                <Dropdown menu={{ items }} placement="bottom" >
                  <Button>Options</Button>
                </Dropdown>
              </Space>
            </Space>
          </div>


        </>
      )}
      <div className='flex sm:flex-row flex-col sm:items-center sm:justify-between'>
        <div className="flex items-center  my-4">
          <Button
            onClick={() => handleLikeDislike('like')}
            type={post?.userReaction === 'like' ? 'primary' : 'default'}
          >
            👍Liked
          </Button>
          <Button
            onClick={() => handleLikeDislike('dislike')}
            type={post?.userReaction === 'dislike' ? 'primary' : 'default'}
            className="ml-2"
          >
            👎Disliked
          </Button>
        </div>
        <div>
          <h1 className='font-semibold'>{formatDate(created_at)}</h1>
        </div>
      </div>

      <h2 className='mt-5 font-semibold text-lg'>Comments</h2>
      <div className='mt-2 flex flex-col items-end'>
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <Button icon={<span role="img" aria-label="emoji">😀</span>}
            onClick={() => setShowEmojiPicker(val => !val)}
            className='mt-2'
          />
          {showEmojiPicker && (
            <Picker data={data} onEmojiSelect={addEmoji} />
          )}
        <Button onClick={handleAddComment} className="mt-2">Add Comment</Button>
      </div>
      {comments.slice().reverse().map(comment => (
        <Comment key={comment.id} {...comment} postId={id} />
      ))}
    </Card>
  );
};

export default Post;
