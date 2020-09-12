import React, { useEffect, useRef } from 'react';
import Router from 'next/router';
import { withTranslation } from "react-i18next";
import { Button, Popconfirm } from 'antd';
import { observer, inject } from 'mobx-react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Viewer } from '@toast-ui/react-editor';
import hljs from "highlight.js";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import { deleteArticle } from '../api/article';
import { youtubePlugin, imagePlugin } from '../utils/plugins';

const ViewerStyle = {
    width: '100%',
    height: 'auto',
    minHeight: '300px',
    paddingBottom: '44px',
    position: 'relative'
};

const ButtonStyle = {
    position: 'absolute',
    bottom: '12px',
    right: '12px'
};

const editButtonStyle = {
    marginRight: '4px'
};

const ToastViewer = inject('auth', 'user')(observer(({ auth, i18n, article }) => {
    const viewerRef = useRef();
    useEffect(() => viewerRef.current && viewerRef.current.getInstance().setMarkdown(article.content), [article.content]);
    const edit = () => Router.push('/articles/[article]/edit', `/articles/${article.id}/edit`);
    const _deleteArticle = async () => {
        await deleteArticle(article.id);
        Router.back();
    }

    return (
        <div style={ViewerStyle} className='tui-viewer'>
            <Viewer
                ref={viewerRef}
                initialValue={article.content}
                plugins={[[codeSyntaxHighlight, { hljs }], youtubePlugin, imagePlugin]}
            />
            {
                article.author.id == auth.user.id &&
                <div style={ButtonStyle}>
                    <Button type="primary" style={editButtonStyle} icon={<EditOutlined />} loading={false} onClick={edit}>{i18n.t('edit')}</Button>
                    <Popconfirm
                        title={i18n.t('areYouSureDeleteThisArticle')}
                        onConfirm={_deleteArticle}
                        okText={i18n.t('yes')}
                        cancelText={i18n.t('no')}
                    >
                        <Button type="danger" icon={<DeleteOutlined />} loading={false}>{i18n.t('delete')}</Button>
                    </Popconfirm>
                </div>
            }
        </div>
    );
}));

export default withTranslation('ToastViewer')(ToastViewer);