import {
  LeftOutlined,
  HomeOutlined,
  UserOutlined,
  BulbOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import MyButton from '../MyButton';
import Style from './style';

const BackButton = () => {
  const BackButtonStyle = styled(MyButton)`
    margin-bottom: 50px;
  `;
  return (
    <BackButtonStyle
      type="text"
      icon={<LeftOutlined />}
      size="large"
      disabled
    />
  );
};

const NavButton = () => (
  <div className="NavButton">
    <MyButton type="text" icon={<HomeOutlined />} size="large">
      首页
    </MyButton>
    <MyButton type="text" icon={<UserOutlined />} size="large">
      我的
    </MyButton>
  </div>
);

const BottomButton = () => (
  <div className="BottomButton">
    <MyButton type="text" icon={<BulbOutlined />} size="large" />
    <MyButton type="text" icon={<SettingOutlined />} size="large" />
  </div>
);

export default () => {
  return (
    <Style>
      <div className="sidebar_pages">
        <BackButton />
        <NavButton />
      </div>
      <div className="sidebar_settings">
        <BottomButton />
      </div>
    </Style>
  );
};
