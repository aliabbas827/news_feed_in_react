import React, { useState } from 'react';
import { Card, Button, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { editPost, deletePost, addComment } from '../redux/post/postSlice';
import Comment from './Comment';

interface PostProps {
  id: string;
  body: string;
  username: string;
  created_at: string;
  comments: any[]; 
}

const Post: React.FC<PostProps> = ({ id, body, username, created_at, comments }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(body);
  const [newComment, setNewComment] = useState('');
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost(id));
  };

  const handleEdit = () => {
    if (isEditing) {
      dispatch(editPost({
        id, body: editedBody, username, created_at,
        comments: [],
        likes: 0,
        dislikes: 0
      }));
      setIsEditing(false);
    } else {
      setIsEditing(true);
      setEditedBody(body);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedBody(body);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(addComment({
        postId: id,
        comment: {
          body: newComment,
          username: "Static User",
          created_at: new Date().toISOString(),
          likes: 0,
          dislikes: 0,
          postId: ''
        }
      }));
      setNewComment('');
    }
  };

  return (
    <Card title={username} style={{ marginBottom: 20 }}>
      {isEditing ? (
        <>
          <Input.TextArea rows={2} value={editedBody} onChange={(e) => setEditedBody(e.target.value)} />
          <Button onClick={handleEdit}>Save</Button>
          <Button onClick={handleCancelEdit} style={{ marginLeft: 8 }}>Cancel</Button>
        </>
      ) : (
        <>
          <p>{body}</p>
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleDelete} style={{ marginLeft: 8 }}>Delete</Button>
        </>
      )}
      <Input.TextArea
        rows={2}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <Button onClick={handleAddComment} className="mt-2">Add Comment</Button>
      <div className="mt-4">
        {comments.slice().reverse().map(comment => (
          <Comment key={comment.id} {...comment} postId={id} />
        ))}
      </div>
    </Card>
  );
};

export default Post;
