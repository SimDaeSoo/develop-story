import React from 'react';
import Link from 'next/link';
import { withTranslation } from "react-i18next";
import { Comment, Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import UserProfile from './UserProfile';

class EmptyComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
  }

  changeContent = (e) => {
    this.setState({ content: e.target.value });
  }

  render() {
    const { i18n } = this.props;
    const { content } = this.state;

    return (
      <div style={FullWidthStyle}>
        <Comment
          author={<Link href='/connect/google'><a>{i18n.t('loginForComment')}</a></Link>}
          avatar={<UserProfile user={{ username: '-', email: '-', link: '-', message: '-', thumbnail: '/assets/default_user.png' }} disabled={true} />}
          content={
            <div style={AlignRightStyle}>
              <Input.TextArea bordered={false} autoSize style={InputCommentStyle} value={content} onChange={this.changeContent} />
              <Button type='link' icon={<SendOutlined />} style={SubmitCommentStyle} disabled={content.length < 1} />
            </div>
          }
        >
        </Comment>
      </div>
    )
  }
}

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

export default withTranslation('EmptyComment')(EmptyComment);