import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Comment, Tooltip, Input, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, EnterOutlined, SendOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import UserProfile from './UserProfile';
import CreateComment from './CreateComment';
import { updateComment, deleteComment } from '../api/comment';

@inject('auth', 'user')
@observer
class _Comment extends React.Component {
  constructor(props) {
    super(props);

    const { comment } = this.props;
    this.state = { showCreateReply: false, editable: false, comment: { ...comment } };
  }

  toggleCreateReply = () => {
    const { showCreateReply } = this.state;
    this.setState({ showCreateReply: !showCreateReply });
  }

  toggleEditReply = async () => {
    const { editable } = this.state;
    const prevContent = this.props.comment.content;
    const currentContent = this.state.comment.content;

    if (editable && prevContent != currentContent) {
      this.save();
    }

    this.setState({ editable: !editable });
  }

  save = async () => {
    const { user, article } = this.props;
    const _comment = this.props.comment;
    const { comment } = this.state;

    if (comment.content.length < 1) {
      comment.content = _comment.content;
      this.setState({ comment });
    } else {
      await updateComment(comment.id, comment);
      await user.refetch(article.id);
      this.setState({ comment: { ...this.props.comment } });
    }
  }

  delete = async () => {
    const { user, article } = this.props;
    const { comment } = this.state;
    await deleteComment(comment.id);
    await user.refetch(article.id);
    this.setState({ comment: { ...this.props.comment } });
  }

  get isOwner() {
    const { article, comment } = this.props;
    return comment.user && article.author.id == comment.user.id;
  }

  get actions() {
    const { i18n, auth, comment, depth } = this.props;
    const { showCreateReply, editable } = this.state;
    const _actions = [];

    if (depth < 3 && auth.hasPermission && !comment.removed) {
      _actions.push(<span key="comment-nested-reply-to" onClick={this.toggleCreateReply}>{showCreateReply ? <CloseCircleOutlined /> : <SendOutlined />} {showCreateReply ? i18n.t('replyToCancel') : i18n.t('replyTo')}</span>);
    }

    if (auth.hasPermission && comment.user && comment.user.id == auth.user.id) {
      _actions.push(
        <Popconfirm
          title={i18n.t('areYouSureDeleteThisComment')}
          onConfirm={this.delete}
          okText={i18n.t('yes')}
          cancelText={i18n.t('no')}
        >
          <span key="comment-delete"><DeleteOutlined /> {i18n.t('replyDelete')}</span>
        </Popconfirm>
      );
    }

    if (auth.hasPermission && comment.user && comment.user.id == auth.user.id) {
      _actions.push(<span key="comment-edit" onClick={this.toggleEditReply}>{editable ? <SaveOutlined /> : <EditOutlined />} {editable ? i18n.t('save') : i18n.t('replyEdit')}</span>);
    }

    return _actions;
  }

  changeReply = (e) => {
    const { comment } = this.state;
    comment.content = e.target.value;
    this.setState({ comment });
  }

  render() {
    const { i18n, auth, article, depth, comments, language, user } = this.props;
    const { showCreateReply, editable, comment } = this.state;
    moment.locale(language);

    return (
      <Comment
        author={<>{comment.user && <a style={FullWidthStyle}>{comment.user.username} {comment.user.email}</a>}</>}
        actions={this.actions}
        avatar={<>
          {comment.user.id == auth.user.id && <MyProfile />}
          {comment.user.id != auth.user.id && <UserProfile user={comment.user} />}
        </>}
        content={
          <>
            {editable && <Input.TextArea bordered={false} autoSize value={comment.content} style={InputCommentStyle} onChange={this.changeReply} />}
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
        className={this.isOwner ? 'owner' : ''}
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
            auth.hasPermission && showCreateReply && depth < 3 &&
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
    )
  }
}

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

export default withTranslation('_Comment')(_Comment);