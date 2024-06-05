import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface PostState {
  id: string;
  body: string;
  username: string;
  created_at: string;
  comments: CommentState[];
  likes: number;
  dislikes: number;
}

interface CommentState {
  id: string;
  postId: string;
  body: string;
  username: string;
  created_at: string;
  likes: number;
  dislikes: number;
}

const initialState: PostState[] = [];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<Omit<PostState, 'id'>>) {
      const newPost = {
        ...action.payload,
        id: Math.random().toString(36).substring(7),
        comments: [],
        likes: 0,
        dislikes: 0,
      };
      state.push(newPost);
    },
    editPost(state, action: PayloadAction<PostState>) {
      const index = state.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deletePost(state, action: PayloadAction<string>) {
      return state.filter(post => post.id !== action.payload);
    },
    addComment(state, action: PayloadAction<{ postId: string, comment: Omit<CommentState, 'id'> }>) {
      const post = state.find(post => post.id === action.payload.postId);
      if (post) {
        const newComment = {
          ...action.payload.comment,
          id: Math.random().toString(36).substring(7),
          likes: 0,
          dislikes: 0,
        };
        post.comments.push(newComment);
      }
    },
    editComment(state, action: PayloadAction<CommentState>) {
      const post = state.find(post => post.comments.some(comment => comment.id === action.payload.id));
      if (post) {
        const index = post.comments.findIndex(comment => comment.id === action.payload.id);
        if (index !== -1) {
          post.comments[index] = action.payload;
        }
      }
    },
    deleteComment(state, action: PayloadAction<{ postId: string, commentId: string }>) {
      const post = state.find(post => post.id === action.payload.postId);
      if (post) {
        post.comments = post.comments.filter(comment => comment.id !== action.payload.commentId);
      }
    },
    toggleLike(state, action: PayloadAction<{ id: string, type: 'post' | 'comment', isLike: boolean }>) {
      const item = state.find(item => item.id === action.payload.id || item.comments.some(comment => comment.id === action.payload.id));
      if (item) {
        const target = action.payload.type === 'post' ? item : item.comments.find(comment => comment.id === action.payload.id);
        if (target) {
          if (action.payload.isLike) {
            target.likes++;
          } else {
            target.dislikes++;
          }
        }
      }
    },
  },
});

export const { addPost, editPost, deletePost, addComment, editComment, deleteComment, toggleLike } = postsSlice.actions;
export const selectPosts = (state: RootState) => state.posts;
export default postsSlice.reducer;
