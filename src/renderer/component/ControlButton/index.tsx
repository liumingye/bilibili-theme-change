import {
  CloseOutlined,
  MinusOutlined,
  ExpandOutlined,
} from '@ant-design/icons';
import MyButton from '../MyButton';
import Style from './style';

const windowControl = (control: 'minimize' | 'maximize' | 'close') => {
  window.electron.ipcRenderer.sendMessage('window-control', [{ control }]);
};

const Min = () => {
  return (
    <MyButton
      onClick={() => {
        windowControl('minimize');
      }}
      type="text"
      icon={<MinusOutlined />}
    />
  );
};

const Expand = () => {
  return (
    <MyButton
      onClick={() => {
        windowControl('maximize');
      }}
      type="text"
      icon={<ExpandOutlined />}
      onFocus={(e) => {
        e.target.blur();
      }}
    />
  );
};

const Close = () => {
  return (
    <MyButton
      onClick={() => {
        windowControl('close');
      }}
      type="text"
      icon={<CloseOutlined />}
      onFocus={(e) => {
        e.target.blur();
      }}
    />
  );
};

export default () => {
  return (
    <Style>
      <Min />
      <Expand />
      <Close />
    </Style>
  );
};
