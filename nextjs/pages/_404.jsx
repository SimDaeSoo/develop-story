import { withTranslation } from "react-i18next";
import Router from 'next/router';
import HydrateComponent from '../components/HydrateComponent';
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { getInitializeAuthData } from '../stores/Auth';
import { getInitializeUserData } from '../stores/User';

class Error extends HydrateComponent {
  home = () => {
    Router.push(`/`, `/`);
  }

  render() {
    const { i18n } = this.props;

    return (
      <div style={MainWrapperStyle} className='error-page'>
        <svg className="logo-svg" width="380px" height="500px" viewBox="0 0 837 1045" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnssketch="http://www.bohemiancoding.com/sketch/ns">
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" xmlnssketch="MSPage">
            <path d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z" id="Polygon-1" stroke="#007FB2" strokeWidth="6" xmlnssketch="MSShapeGroup"></path>
            <path d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z" id="Polygon-2" stroke="#EF4A5B" strokeWidth="6" xmlnssketch="MSShapeGroup"></path>
            <path d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z" id="Polygon-3" stroke="#795D9C" strokeWidth="6" xmlnssketch="MSShapeGroup"></path>
            <path d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z" id="Polygon-4" stroke="#F2773F" strokeWidth="6" xmlnssketch="MSShapeGroup"></path>
            <path d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z" id="Polygon-5" stroke="#36B455" strokeWidth="6" xmlnssketch="MSShapeGroup"></path>
          </g>
        </svg>
        <div className="message-box">
          <h1>404</h1>
          <p style={NotFoundStyle}>{i18n.t('pageNotFound')}</p>
          <div className="buttons-con">
            <div className="action-link-wrap">
              <Button icon={<HomeOutlined />} type='danger' onClick={this.home} style={{ lineHeight: '24px' }}>{i18n.t('goToHomePage')}</Button>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

const MainWrapperStyle = {
  width: '100%',
  minHeight: '100%',
  padding: '5px',
  textAlign: 'center',
  display: 'flex',
  position: 'relative'
};

const NotFoundStyle = {
  fontSize: '1.5em',
  fontWeight: 400
};

export async function getServerSideProps(context) {
  const auth = await getInitializeAuthData(context, { routing: true });
  const user = await getInitializeUserData(context);

  return { props: { initializeData: { auth, user, environment: { query: context.query } } } };
}

export default withTranslation('Error')(Error);