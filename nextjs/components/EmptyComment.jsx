import React, { useState } from 'react';
import Link from 'next/link';
import { withTranslation } from "react-i18next";
import { Comment, Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import UserProfile from './UserProfile';

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

const EmptyComment = ({ i18n }) => {
  const [content, setContent] = useState('');
  const changeContent = (e) => setContent(e.target.value);

  return (
    <div style={FullWidthStyle}>
      <Comment
        author={<Link href='/connect/google'><a>{i18n.t('loginForComment')}</a></Link>}
        avatar={<UserProfile user={{ username: '-', email: '-', link: '-', message: '-', thumbnail: '/assets/default_user.png' }} disabled={true} />}
        content={
          <div style={AlignRightStyle}>
            <Input.TextArea bordered={false} autoSize style={InputCommentStyle} value={content} onChange={changeContent} />
            <Button type='link' icon={<SendOutlined />} style={SubmitCommentStyle} disabled={content.length < 1} />
          </div>
        }
      >
      </Comment>
    </div>
  );
};

export default withTranslation('EmptyComment')(EmptyComment);