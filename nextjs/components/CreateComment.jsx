import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Comment, Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import MyProfile from './MyProfile';
import { createComment } from '../api/comment';

const FullWidthStyle = {
  width: '100%'
};

const AlignRightStyle = {
  textAlign: 'right'
};

const InputCommentStyle = {
  textAlign: 'left',
  backgroundColor: 'rgba(255,255,255,0.1)'
};

const SubmitCommentStyle = {
  position: 'absolute',
  right: '0',
  bottom: '0',
  backgroundColor: 'transparent'
};

const CreateComment = inject('auth', 'user')(observer(({ article, comment, auth, user }) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const send = async () => {
    setLoading(true);
    await createComment({ user: auth.user.id, content, comment: comment ? comment.id : null, article: article.id });
    setLoading(false);
    await user.refetch(article.id);
    setContent('');
  }

  const changeContent = (e) => {
    setContent(e.target.value);
  }

  return (
    <div style={FullWidthStyle}>
      <Comment
        author={<a>{auth.user.username} {auth.user.email}</a>}
        avatar={<MyProfile />}
        className={article.author.id == auth.user.id ? 'owner' : ''}
        content={
          <div style={AlignRightStyle}>
            <Input.TextArea bordered={false} autoSize style={InputCommentStyle} value={content} onChange={changeContent} />
            <Button type='link' icon={<SendOutlined />} style={SubmitCommentStyle} loading={loading} onClick={send} disabled={content.length < 1} />
          </div>
        }
      >
      </Comment>
    </div>
  );
}));

export default CreateComment;