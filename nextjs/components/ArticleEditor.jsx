import React from 'react';
import Router from 'next/router';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Input, Select, Upload, Button, Tooltip } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import ToastEditor from '../components/ToastEditor';
import Network from '../utils/network';
import { createArticle, updateArticle } from '../api/article';

@inject('auth', 'user')
@observer
class ArticleEditor extends React.Component {
  constructor(props) {
    super(props);

    const { user } = this.props;
    this.state = {
      article: (user.article.id ? user.article : {
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
      })
    };
  }

  beforeUpload = (file) => {
    const IS_PNG_OR_JPG = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif';
    if (!IS_PNG_OR_JPG) {
      console.log('error');
    }
    return IS_PNG_OR_JPG;
  }

  onUpload = async (file, callback) => {
    const formData = new FormData();
    formData.append('files', file);

    const [_file] = await Network.post('/upload', formData);
    const { url } = _file;
    callback(url);
  }

  onThumbnailChange = (fileData) => {
    this.onUpload(fileData.file, (url) => {
      const { article } = this.state;
      article.thumbnail = url;
      this.setState({ article });
    });
  }

  onTitleChange = (e) => {
    const { article } = this.state;
    article.title = e.target.value;
    this.setState({ article });
  }

  onDescriptionChange = (e) => {
    const { article } = this.state;
    article.description = e.target.value;
    this.setState({ article });
  }

  onCategoryChange = (id) => {
    const { user } = this.props;
    const { article } = this.state;
    const category = user.categories.filter(c => c.id === id)[0];

    article.category = category;
    this.setState({ article });
  }

  onSave = async (content) => {
    const { auth } = this.props;
    const { article } = this.state;
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
    this.setState({ article });

    await new Promise(resolve => setTimeout(() => resolve(), 1000));
  }

  render() {
    const { i18n, user } = this.props;
    const { article } = this.state;

    return (
      <div style={FullSizeStyle}>
        <div style={EditorCoverStyle}>
          <img src={article.thumbnail || article.category.thumbnail || '/assets/default.png'} style={CoverThumbnailStyle} />
          <div style={CoverTitleWrapperStyle}>
            <div style={TitleWrapperStyle}>
              <Input placeholder={i18n.t('pleaseEnterArticleTitle')} value={article.title} onChange={this.onTitleChange} style={CoverTitleStyle} />
            </div>
          </div>

          <div style={SelectCategoryWrapperStyle}>
            <Select placeholder={i18n.t('category')} style={CategoryStyle} value={article.category.id || user.categories[0].id} onChange={this.onCategoryChange}>
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
                beforeUpload={this.beforeUpload}
                customRequest={this.onThumbnailChange}
                showUploadList={false}
              >
                <Button icon={<CameraOutlined />}></Button>
              </Upload>
            </Tooltip>
          </div>

          <div style={DescriptionWrapperStyle}>
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 2 }} placeholder={i18n.t('pleaseEnterArticleDescription')} value={article.description} onChange={this.onDescriptionChange} style={DescriptionStyle} />
          </div>
        </div>
        <div style={EditorWrapperStyle}>
          <ToastEditor onUpload={this.onUpload} article={article} onSave={this.onSave} />
        </div>
      </div>
    )
  }
}

const FullSizeStyle = {
  width: '100%',
  height: 'calc(100vh - 36px)'
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
}

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

export default withTranslation('ArticleEditor')(ArticleEditor);