import React, { useState, useRef } from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Editor } from '@toast-ui/react-editor';
import colorSyntaxPlugin from "@toast-ui/editor-plugin-color-syntax";
import hljs from "highlight.js";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import { Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { youtubePlugin, imagePlugin } from '../utils/plugins';

const EditorStyle = {
    width: '100%',
    height: '100%',
    position: 'relative'
};

const ButtonStyle = {
    position: 'absolute',
    bottom: '32px',
    right: '12px'
};

const ToastEditor = inject('environment')(observer(({ i18n, environment, onUpload, article, onSave }) => {
    const editorRef = useRef();
    const [loading, setLoading] = useState(false);
    const [_article] = useState(article && article.id ? article : {
        title: '',
        category: {},
        created_at: new Date(),
        thumbnail: '',
        content: ``,
        author: {},
        comments: []
    })

    const save = async () => {
        const editor = editorRef.current.getInstance();
        const content = editor.getMarkdown();
        setLoading(true);
        await onSave(content);
    }

    return (
        <div style={EditorStyle}>
            <Editor
                ref={editorRef}
                initialValue={_article.content}
                previewStyle="vertical"
                width='100%'
                height='100%'
                initialEditType={environment.size === 'small' ? "wysiwyg" : 'markdown'}
                useCommandShortcut={true}
                usageStatistics={false}
                previewHighlight={false}
                plugins={[[codeSyntaxHighlight, { hljs }], colorSyntaxPlugin, youtubePlugin, imagePlugin]}
                hooks={{ addImageBlobHook: onUpload }}
            />
            <div style={ButtonStyle}>
                <Button type="primary" icon={<SaveOutlined />} loading={loading} onClick={save}>
                    {_article.id !== undefined && i18n.t('save')}
                    {_article.id === undefined && i18n.t('create')}
                </Button>
            </div>
        </div>
    );
}));

export default withTranslation('ToastEditor')(ToastEditor);