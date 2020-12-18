import React, { useCallback, useEffect, useRef } from 'react';
import { Button, Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGES_REQUEST } from '../Redux-reducer/post';
import useInput from '../hooks/useInput';

const PostForm = () => {
  const [text, onChangeText, setText] = useInput('');
  const { imagePaths, addPostDone, addPostLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  // eslint-disable-next-line consistent-return
  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      // eslint-disable-next-line no-alert
      return alert('게시글을 작성하세요!');
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);
    console.log(formData);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const imageInput = useRef();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  }, []);
  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} name="image" onChange={onChangeImages} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={addPostLoading}>
          POST
        </Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }} alt={v} />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
