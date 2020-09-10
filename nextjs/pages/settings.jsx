import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import HydrateComponent from '../components/HydrateComponent';
import { getInitializeAuthData } from '../stores/Auth';
import { getInitializeUserData } from '../stores/User';
import CategoriesTable from '../components/CategoriesTable';
import { Button, Divider, Descriptions, Input } from 'antd';
import { PlusOutlined, CameraOutlined, SaveOutlined } from '@ant-design/icons';

@inject('environment', 'auth', 'user')
@observer
class Settings extends HydrateComponent {
  render() {
    const { user } = this.props;

    return (
      <div style={SettingPageStyle}>
        <Divider orientation="left" style={{ marginTop: '32px' }}>My Profile Setting</Divider>
        <div style={{ textAlign: 'center', width: '100%' }}>
          <div style={{ width: '164px', display: 'inline-block', verticalAlign: 'bottom', margin: '10px' }}>
            <img src={user.thumbnail} style={{ width: '164px', height: '164px', objectFit: 'cover' }} />
            <Button icon={<CameraOutlined />} style={{ marginTop: '1px', width: '100%' }}>Change</Button>
          </div>
          <div style={{ display: 'inline-block', verticalAlign: 'bottom', margin: '10px', minWidth: '300px', maxWidth: '100%', width: 'calc(100% - 204px)' }}>
            <Descriptions bordered column={1} size='small'>
              <Descriptions.Item label="Name">
                <Input defaultValue={user.username}></Input>
              </Descriptions.Item>
              <Descriptions.Item label="E-mail">
                <Input defaultValue={user.email}></Input>
              </Descriptions.Item>
              <Descriptions.Item label="Link">
                <Input defaultValue={user.link}></Input>
              </Descriptions.Item>
              <Descriptions.Item label="Message">
                <Input defaultValue={user.message}></Input>
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>

        <Divider orientation="left" >Categories Setting</Divider>
        <CategoriesTable categories={user.categories} />
        <div style={{ textAlign: 'right' }}>
          <Button style={{ margin: '12px auto', width: '100%' }} icon={<PlusOutlined />}>Add Category</Button>
        </div>
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
          <Button style={{ margin: '12px' }} icon={<SaveOutlined />}>Save</Button>
        </div>
      </div >
    );
  }
}

const SettingPageStyle = {
  width: '100%',
  minHeight: '100%',
  maxWidth: '1280px',
  padding: '10px',
  margin: 'auto',
  position: 'relative',
  backgroundColor: '#202020'
};

export async function getServerSideProps(context) {
  const auth = await getInitializeAuthData(context, { routing: true });
  const user = await getInitializeUserData(context);

  if (((user || {}).user || {}).id != ((auth || {}).user || {}).id || ((auth || {}).user || {}).id === undefined) {
    context.res.writeHead(303, { Location: '/_404' });
    context.res.end();
  }

  return { props: { initializeData: { auth, user, environment: { query: context.query } } } };
}

export default withTranslation('Settings')(Settings);