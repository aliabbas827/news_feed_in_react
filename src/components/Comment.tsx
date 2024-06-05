import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, Dropdown, Space } from 'antd';
import { editComment, deleteComment } from '../redux/post/postSlice';
import type { MenuProps } from 'antd';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <h1 onClick={() => setIsEditing(true)}>Edit</h1>
      ),
    },
    {
      key: '2',
      label: (
        <h1 onClick={handleDelete}>Delete</h1>
      ),
    },

  ];

  const addEmoji = (e: { native: any; }) => {
    let emoji = e.native;
    setEditedBody(editedBody + emoji);
  };

  return (
    <div className="p-4 bg-slate-100 shadow-md rounded-lg my-4">
      {isEditing ? (
        <>
          <Input value={editedBody} onChange={(e) => setEditedBody(e.target.value)} />
          <div className='flex sm:justify-start sm:flex-row-reverse sm:items-start flex-col items-end mt-3'>
          <Button icon={<span role="img" aria-label="emoji">😀</span>}
            onClick={() => setShowEmojiPicker(val => !val)}
          />
          {showEmojiPicker && (
            <Picker data={data} onEmojiSelect={addEmoji} />
          )}
          </div>
         
          <div className='pt-2'>
          <Button onClick={handleSave} className="mt-2">Save</Button>
          <Button onClick={() => setIsEditing(false)} className="ml-2">Cancel</Button>
          </div>
         
        </>
      ) : (
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
    </div>
  );
};

export default Comment;
