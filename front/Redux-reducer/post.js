import produce from 'immer';

export const initialState = {
  upLoadImagesLoading: false, // 이미지 업로드
  upLoadImagesDone: false,
  upLoadImagesError: null,
  likePostLoading: false, // like button
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false, // unlike button
  unlikePostDone: false,
  unlikePostError: null,
  retweetLoading: false, // retweet
  retweetDone: false,
  retweetError: null,
  mainPosts: [],
  imagePaths: [],
  hasMorePost: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const addComment = (data) => ({ type: ADD_COMMENT_REQUEST, data });

// eslint-disable-next-line consistent-return
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case REMOVE_IMAGE:
      draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
      break;
    case RETWEET_REQUEST:
      draft.retweetLoading = true;
      draft.retweetDone = false;
      draft.retweetError = null;
      break;
    case RETWEET_SUCCESS:
      draft.retweetLoading = false;
      draft.retweetDone = true;
      draft.retweetError = null;
      draft.mainPosts.unshift(action.data);
      break;
    case RETWEET_FAILURE:
      draft.retweetLoading = false;
      draft.retweetDone = false;
      draft.retweetError = action.err;
      break;
    case UPLOAD_IMAGES_REQUEST:
      draft.uploadImagesLoading = true;
      draft.uploadImagesDone = false;
      draft.uploadImagesError = null;
      break;
    case UPLOAD_IMAGES_SUCCESS:
      draft.uploadImagesLoading = false;
      draft.uploadImagesDone = true;
      draft.uploadImagesError = null;
      draft.imagePaths = action.data;
      break;
    case UPLOAD_IMAGES_FAILURE:
      draft.uploadImagesLoading = false;
      draft.uploadImagesDone = false;
      draft.uploadImagesError = action.err;
      break;
    case LIKE_POST_REQUEST:
      draft.likePostLoading = true;
      draft.likePostDone = false;
      draft.likePostError = null;
      break;
    case LIKE_POST_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
      post.Likers.push({ id: action.data.UserId });
      draft.likePostLoading = false;
      draft.likePostDone = true;
      draft.likePostError = null;
      break; }
    case LIKE_POST_FAILURE:
      draft.likePostLoading = false;
      draft.likePostDone = false;
      draft.likePostError = action.err;
      break;
    case UNLIKE_POST_REQUEST:
      draft.unlikePostLoading = true;
      draft.unlikePostDone = false;
      draft.unlikePostError = null;
      break;
    case UNLIKE_POST_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
      post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
      draft.unlikePostLoading = false;
      draft.unlikePostDone = true;
      draft.unlikePostError = null;
      break; }
    case UNLIKE_POST_FAILURE:
      draft.unlikePostLoading = false;
      draft.unlikePostDone = false;
      draft.unlikePostError = action.err;
      break;
    case LOAD_POSTS_REQUEST:
      draft.loadPostsLoading = true;
      draft.loadPostsDone = false;
      draft.loadPostsError = null;
      break;
    case LOAD_POSTS_SUCCESS:
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
      draft.mainPosts = draft.mainPosts.concat(action.data);
      draft.hasMorePost = action.data.length === 10;
      break;
    case LOAD_POSTS_FAILURE:
      draft.loadPostsLoading = false;
      draft.loadPostsError = action.err;
      break;
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;
    case ADD_POST_SUCCESS:
      draft.mainPosts.unshift(action.data);
      draft.addPostLoading = false;
      draft.addPostDone = true;
      draft.imagePaths = [];
      break;
    case ADD_POST_FAILURE:
      draft.addPostLoading = false;
      draft.addPostError = action.err;
      break;
    case ADD_COMMENT_REQUEST:
      draft.addCommentLoading = true;
      draft.addCommentDone = false;
      draft.addCommentError = null;
      break;
    case ADD_COMMENT_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
      post.Comments.unshift(action.data);
      draft.addCommentLoading = false;
      draft.addCommentDone = true;
      break;
    }
    case ADD_COMMENT_FAILURE:
      draft.addCommentLoading = false;
      draft.addCommentError = action.err;
      break;
    case REMOVE_POST_REQUEST:
      draft.removePostLoading = true;
      draft.removePostDone = false;
      draft.removePostError = null;
      break;
    case REMOVE_POST_SUCCESS:
      draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
      draft.removePostLoading = false;
      draft.removePostDone = true;
      break;
    case REMOVE_POST_FAILURE:
      draft.removePostLoading = false;
      draft.removePostError = action.err;
      break;
    default:
      break;
  }
});

export default reducer;
