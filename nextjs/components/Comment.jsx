import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Comment, Tooltip, Input, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, EnterOutlined, SendOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import UserProfile from './UserProfile';
import MyProfile from './MyProfile';
import CreateComment from './CreateComment';
import { updateComment, deleteComment } from '../api/comment';

const CommentEnterWrapperStyle = {
  width: '16px',
  fontSize: '16px',
  display: 'inline-block',
  verticalAlign: 'top',
  textAlign: 'center'
};

const FullWidthStyle = {
  width: '100%'
};

const InputCommentStyle = {
  textAlign: 'left',
  backgroundColor: 'rgba(255,255,255,0.1)'
};

const GreyColorStyle = {
  color: '#606060'
};

const CommentWrapperStyle = {
  display: 'inline-block',
  width: 'calc(100% - 16px)'
};

const _Comment = inject('auth', 'user')(observer(({ auth, user, i18n, comment, depth, article, comments, language }) => {
  const [showCreateReply, setShowCreateReply] = useState(false);
  const [editable, setEditable] = useState(false);
  const [_comment, setComment] = useState({ ...comment });

  const toggleCreateReply = () => setShowCreateReply(!showCreateReply);
  const toggleEditReply = async () => {
    const prevContent = comment.content;
    const currentContent = _comment.content;
    if (editable && prevContent != currentContent) await save();
    setEditable(!editable);
  };

  const save = async () => {
    if (_comment.content.length < 1) {
      _comment.content = comment.content;
      setComment({ ..._comment });
    } else {
      await updateComment(_comment.id, _comment);
      await user.refetch(article.id);
    }
  };

  const _deleteComment = async () => {
    await deleteComment(_comment.id);
    await user.refetch(article.id);
    setComment({ ...comment });
  }

  const isOwner = comment.user && article.author.id == comment.user.id;
  const actions = comment.removed || !auth.hasPermission ? [] : [
    depth < 3 && !comment.removed ? <span key="comment-nested-reply-to" onClick={toggleCreateReply}>{showCreateReply ? <CloseCircleOutlined /> : <SendOutlined />} {showCreateReply ? i18n.t('replyToCancel') : i18n.t('replyTo')}</span> : null,
    comment.user && comment.user.id == auth.user.id ? (<Popconfirm
      title={i18n.t('areYouSureDeleteThisComment')}
      onConfirm={_deleteComment}
      okText={i18n.t('yes')}
      cancelText={i18n.t('no')}
    >
      <span key="comment-delete"><DeleteOutlined /> {i18n.t('replyDelete')}</span>
    </Popconfirm>) : null,
    comment.user && comment.user.id == auth.user.id ? <span key="comment-edit" onClick={toggleEditReply}>{editable ? <SaveOutlined /> : <EditOutlined />} {editable ? i18n.t('save') : i18n.t('replyEdit')}</span> : null
  ];

  const changeReply = (e) => {
    _comment.content = e.target.value;
    setComment({ ..._comment });
  };

  return (
    <Comment
      author={<>{comment.user && <a style={FullWidthStyle}>{comment.user.username} {comment.user.email}</a>}</>}
      actions={actions}
      avatar={<>
        {!comment.removed && comment.user.id == auth.user.id && <MyProfile />}
        {!comment.removed && comment.user.id != auth.user.id && <UserProfile user={comment.user} />}
      </>}
      content={
        <>
          {editable && <Input.TextArea bordered={false} autoSize value={_comment.content} style={InputCommentStyle} onChange={changeReply} />}
          {!editable && !comment.removed && <p>{comment.content}</p>}
          {!editable && comment.removed && <p>{i18n.t('removedComment')}</p>}
        </>
      }
      datetime={
        <>
          {
            !comment.removed &&
            <Tooltip title={moment(comment.created_at).format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment(comment.created_at).fromNow()} {comment.edited && `(${i18n.t('edited')})`}</span>
            </Tooltip>
          }
        </>
      }
      className={isOwner ? 'owner' : ''}
    >
      <>
        {/* Comments... */}
        {
          comments.filter(c => c.comment && c.comment.id === comment.id).map((comment, index) => {
            return (
              <div key={index}>
                <div style={CommentEnterWrapperStyle}>
                  <EnterOutlined className='mirror_x' style={GreyColorStyle} />
                </div>

                <div style={CommentWrapperStyle}>
                  {<_Comment comment={comment} article={article} i18n={i18n} auth={auth} depth={depth + 1} comments={comments} language={language} user={user} />}
                </div>
              </div>
            )
          })
        }
        {/* Create reply  */}
        {
          !comment.removed && auth.hasPermission && showCreateReply && depth < 3 &&
          <>
            <div style={CommentEnterWrapperStyle}>
              <EnterOutlined className='mirror_x' style={GreyColorStyle} />
            </div>
            <div style={CommentWrapperStyle}>
              <CreateComment article={article} comment={comment} />
            </div>
          </>
        }
      </>
    </Comment >
  );
}));

export default withTranslation('_Comment')(_Comment);