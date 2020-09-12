import React, { useState } from 'react';
import Router from 'next/router';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Input, Select, Upload, Button, Tooltip } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import ToastEditor from '../components/ToastEditor';
import Network from '../utils/network';
import { createArticle, updateArticle } from '../api/article';

const FullSizeStyle = {
  width: '100%',
  height: '100%'
};

const EditorCoverStyle = {
  position: 'relative',
  height: '138px'
};

const CoverThumbnailStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const CoverTitleWrapperStyle = {
  position: 'absolute',
  top: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex'
};

const TitleWrapperStyle = {
  position: 'absolute',
  top: '42px',
  width: '100%'
};

const CoverTitleStyle = {
  width: '100%',
  fontSize: '1.5em',
  textAlign: 'center',
  border: 'none'
};

const SelectCategoryWrapperStyle = {
  position: 'absolute',
  right: '34px',
  top: '2px'
};

const CategoryStyle = {
  margin: '0 2px',
  backgroundColor: 'rgba(0,0,0,0.3)'
};

const DescriptionWrapperStyle = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '54px',
  display: 'flex'
};

const DescriptionStyle = {
  height: '54px',
  border: 'none',
  textAlign: 'center'
};

const EditorWrapperStyle = {
  position: 'relative',
  width: '100%',
  height: 'calc(100% - 138px)'
};

const UploadStyle = {
  position: 'absolute',
  top: '2px',
  right: '2px',
  backgroundColor: 'rgba(0,0,0,0.3)'
};

const ArticleEditor = inject('auth', 'user')(observer(({ auth, user, i18n }) => {
  const [article, setArticle] = useState(user.article.id ? user.article : {
    id: undefined,
    title: '',
    description: '',
    category: user.categories[0],
    created_at: new Date(),
    updated_at: new Date(),
    thumbnail: '',
    content: ``,
    author: {},
    comments: []
  });

  const beforeUpload = (file) => {
    const IS_PNG_OR_JPG = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif';
    if (!IS_PNG_OR_JPG) {
      console.log('error');
    }
    return IS_PNG_OR_JPG;
  };

  const onUpload = async (file, callback) => {
    const formData = new FormData();
    formData.append('files', file);

    const [_file] = await Network.post('/upload', formData);
    const { url } = _file;
    callback(url);
  };

  const onThumbnailChange = (fileData) => {
    onUpload(fileData.file, (url) => {
      article.thumbnail = url;
      setArticle({ ...article });
    });
  };

  const onTitleChange = (e) => {
    article.title = e.target.value;
    setArticle({ ...article });
  };

  const onDescriptionChange = (e) => {
    article.description = e.target.value;
    setArticle({ ...article });
  };

  const onCategoryChange = (id) => {
    const category = user.categories.filter(c => c.id === id)[0];
    article.category = category;
    setArticle({ ...article });
  };

  const onSave = async (content) => {
    article.content = content;

    if (article.id === undefined) {
      const { title, description, thumbnail, content, category } = article;
      const author = auth.user.id;
      const _category = category.id;
      const { id } = await createArticle({ title, description, thumbnail, content, author, category: _category });
      Router.push(`/articles/[article]`, `/articles/${id}`);
    } else {
      const { id, title, description, thumbnail, content, category } = article;
      const _category = category.id;
      await updateArticle(id, { title, description, thumbnail, content, category: _category });
      Router.push(`/articles/[article]`, `/articles/${id}`);
    }
  };

  return (
    <div style={FullSizeStyle}>
      <div style={EditorCoverStyle}>
        <img src={article.thumbnail || article.category.thumbnail || '/assets/default.png'} style={CoverThumbnailStyle} />
        <div style={CoverTitleWrapperStyle}>
          <div style={TitleWrapperStyle}>
            <Input placeholder={i18n.t('pleaseEnterArticleTitle')} value={article.title} onChange={onTitleChange} style={CoverTitleStyle} />
          </div>
        </div>

        <div style={SelectCategoryWrapperStyle}>
          <Select placeholder={i18n.t('category')} style={CategoryStyle} value={article.category.id || user.categories[0].id} onChange={onCategoryChange}>
            {
              user.categories.map((category) => {
                return (<Select.Option value={category.id} key={category.id}>{category[`title_${i18n.language}`]}</Select.Option>)
              })
            }
          </Select>
        </div>

        <div style={UploadStyle}>
          <Tooltip title={i18n.t('changeThumbnail')} placement="rightBottom">
            <Upload
              beforeUpload={beforeUpload}
              customRequest={onThumbnailChange}
              showUploadList={false}
            >
              <Button icon={<CameraOutlined />}></Button>
            </Upload>
          </Tooltip>
        </div>

        <div style={DescriptionWrapperStyle}>
          <Input.TextArea autoSize={{ minRows: 2, maxRows: 2 }} placeholder={i18n.t('pleaseEnterArticleDescription')} value={article.description} onChange={onDescriptionChange} style={DescriptionStyle} />
        </div>
      </div>
      <div style={EditorWrapperStyle}>
        <ToastEditor onUpload={onUpload} article={article} onSave={onSave} />
      </div>
    </div>
  );
}));

export default withTranslation('ArticleEditor')(ArticleEditor);