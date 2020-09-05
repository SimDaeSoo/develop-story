import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import HydrateComponent from '../components/HydrateComponent';
import { getInitializeAuthData } from '../stores/Auth';
import { getInitializeUserData } from '../stores/User';

@inject('environment', 'auth', 'user')
@observer
class Settings extends HydrateComponent {
  render() {
    return (
      <div style={{ width: '100%', minHeight: '100%', maxWidth: '1280px', padding: '5px', margin: 'auto', textAlign: 'center', display: 'flex', position: 'relative', backgroundColor: '#202020' }}>
        ToDo.. setting Page....
      </div >
    );
  }
}
export async function getServerSideProps(context) {
  const auth = await getInitializeAuthData(context, { routing: true });
  const user = await getInitializeUserData(context);

  return { props: { initializeData: { auth, user, environment: { query: context.query } } } };
}

export default withTranslation('Settings')(Settings);