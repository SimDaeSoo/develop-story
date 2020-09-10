import { Table, Button, Popconfirm, Input } from 'antd';
import icons from '../utils/icons';
import SelectIcons from './SelectIcon';

class CategoriesTable extends React.Component {
  get categoryColumns() {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: 'Title KO',
        dataIndex: 'title_ko',
        key: 'title_ko',
        render: (value) => <Input defaultValue={value}></Input>
      },
      {
        title: 'Title EN',
        dataIndex: 'title_en',
        key: 'title_en',
        render: (value) => <Input defaultValue={value}></Input>
      },
      {
        title: 'Icon',
        dataIndex: 'icon',
        key: 'icon',
        render: (value) => <SelectIcons icon={value} />
      },
      {
        title: '',
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        width: '49px',
        render: () => <Button icon={icons['CameraOutlined']}></Button>
      },
      {
        title: '',
        dataIndex: 'delete',
        key: 'delete',
        width: '49px',
        render: () => (
          <Popconfirm
            title={'Are you sure?'}
            okText={'yes'}
            cancelText={'no'}
          >
            <Button type='danger' icon={icons['DeleteOutlined']}></Button>
          </Popconfirm>
        )
      }
    ];
  }

  render() {
    const { categories } = this.props;
    return (<Table bordered size='small' columns={this.categoryColumns} pagination={false} dataSource={categories} rowKey='id' style={{ width: '100%' }} scroll={{ x: 800 }} />);
  }
}

export default CategoriesTable;