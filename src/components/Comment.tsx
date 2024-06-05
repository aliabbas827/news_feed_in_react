import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input } from 'antd';
import { editComment, deleteComment } from '../redux/post/postSlice';

interface CommentProps {
  id: string;
  postId: string;
  body: string;
  username: string;
  created_at: string;
}

const Comment: React.FC<CommentProps> = ({ id, postId, body, username, created_at }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(body);
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(editComment({
        id, postId, body: editedBody, username, created_at,
        likes: 0,
        dislikes: 0
    }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteComment({ postId, commentId: id }));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mb-2">
      {isEditing ? (
        <>
          <Input.TextArea value={editedBody} onChange={(e) => setEditedBody(e.target.value)} />
          <Button type="primary" onClick={handleSave} className="mt-2">Save</Button>
          <Button onClick={() => setIsEditing(false)} className="ml-2">Cancel</Button>
        </>
      ) : (
        <>
          <p>{body}</p>
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
          <Button onClick={handleDelete} className="ml-2">Delete</Button>
        </>
      )}
    </div>
  );
};

export default Comment;
