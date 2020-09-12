import React from 'react';
import { withTranslation } from 'react-i18next';
import { getInitializeAuthData } from '../../stores/Auth';

const Provider = () => {
  return (<></>);
};

export async function getServerSideProps(context) {
  const auth = await getInitializeAuthData(context);

  if (auth.jwt && auth.user) {
    context.res.writeHead(303, { Location: '/' });
    context.res.end();
  }

  return { props: { initializeData: { auth, environment: { query: context.query } } } };
}

export default withTranslation('Provider')(Provider);