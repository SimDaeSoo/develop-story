import React, { useState, useRef, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Editor } from '@toast-ui/react-editor';
import colorSyntaxPlugin from "@toast-ui/editor-plugin-color-syntax";
import hljs from "highlight.js";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import { Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { youtubePlugin, imagePlugin } from '../utils/plugins';

const YoutubeInsertCode = `
\`\`\`youtube
{
    "youtubeID": "",
    "ratio": {
        "width": 16,
        "height": 9
    }
}
\`\`\`
`;

const ImageInsertCode = `
\`\`\`image
{
    "url": ""
}
\`\`\`
`;

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

    useEffect(() => {
        const editor = editorRef.current.getInstance();
        const toolbar = editor.getUI().getToolbar();

        editor.eventManager.addEventType('youtube_insert');
        editor.eventManager.listen('youtube_insert', () => editor.insertText(YoutubeInsertCode));

        toolbar.insertItem(21, {
            type: 'button',
            options: {
                className: 'youtube-button',
                event: 'youtube_insert',
                tooltip: 'Insert Youtube',
                style: 'background:#202020; background-image:url("/assets/youtube.png"); background-size: 20px;'
            }
        });

        editor.eventManager.addEventType('image_insert');
        editor.eventManager.listen('image_insert', () => editor.insertText(ImageInsertCode));

        toolbar.insertItem(21, {
            type: 'button',
            options: {
                className: 'image-button',
                event: 'image_insert',
                tooltip: 'Insert Image',
                style: 'background:#202020; background-image:url("/assets/images.png"); background-size: 20px;'
            }
        });
    }, [editorRef]);

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