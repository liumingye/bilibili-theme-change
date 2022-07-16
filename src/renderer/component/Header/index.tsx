import { Tabs, Input } from 'antd';

import Style from './style';

import ControlButton from '../ControlButton';

const Logo: React.FC = () => (
  <span
    style={{
      width: '85px',
      // backgroundColor: '#f2f2f2',
      textAlign: 'center',
      height: '50px',
      padding: '10px 0',
    }}
  >
    logo
  </span>
);

const Menu: React.FC = () => {
  const { TabPane } = Tabs;
  const onChange = (key: string) => {
    window.console.log(key);
  };
  return (
    <Tabs className="menu" defaultActiveKey="1" onChange={onChange}>
      <TabPane tab="首页" key="1" />
      <TabPane tab="电影" key="2" />
      <TabPane tab="Tab 3" key="3" />
    </Tabs>
  );
};

const SearchInput: React.FC = () => {
  const { Search } = Input;
  const onSearch = (value: string) => window.console.log(value);
  return (
    <Search
      className="search"
      placeholder="搜索你感兴趣的视频"
      allowClear
      onSearch={onSearch}
      style={{ width: 200 }}
    />
  );
};

export default () => {
  return (
    <Style>
      <div className="left">
        <Logo />
        <Menu />
      </div>
      <span className="center" />
      <div className="right">
        <SearchInput />
        <span className="divider" />
        <ControlButton />
      </div>
    </Style>
  );
};
