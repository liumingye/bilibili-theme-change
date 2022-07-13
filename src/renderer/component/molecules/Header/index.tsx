// import './index.less';
import Style from './style';

import ControlButton from '../ControlButton';

// const Menu = () => <div className="Menu">menu</div>;

export default () => {
  return (
    <Style>
      <div className="left">
        <span>logo</span>
        {/* <Menu /> */}
      </div>
      <span className="center" />
      <div className="right">
        <div>search</div>
        <span className="divider" />
        <ControlButton />
      </div>
    </Style>
  );
};
