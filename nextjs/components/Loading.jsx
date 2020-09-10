import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Spin } from 'antd';

@inject('user')
@observer
class Loading extends React.Component {
  render() {
    const { i18n, user } = this.props;
    const article = (user || {}).article || {};

    return (
      <div style={LoadingStyle}>
        <div style={LoadingTextStyle}>
          <Spin size="large" tip={`${i18n.t('loading')}...`} />

          {/* SEO Optimization */}
          <div style={DisplayNoneStyle}>
            <h1>{article.title}</h1>
            <div className="article-content">{article.content}</div>
            {
              (article.comments || []).map((comment, index) => {
                return <div key={index} className='article-comment'>
                  {comment.content}
                </div>
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

const LoadingTextStyle = {
  margin: 'auto',
  fontSize: '2em'
};

const LoadingStyle = {
  margin: 'auto',
};

const DisplayNoneStyle = {
  display: 'none'
};

export default withTranslation('Loading')(Loading);