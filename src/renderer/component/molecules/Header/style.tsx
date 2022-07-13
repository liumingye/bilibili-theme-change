import styled from 'styled-components';

const Style = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  border-bottom: 1px solid #f2f2f2;
  height: 75px; // +1px边框高度
  -webkit-app-region: drag;

  .center {
    width: 100%;
  }

  .right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: -8px;

    .divider {
      height: 16px;
      width: 1px;
      background: #e3e5e7;
      margin-left: 20px;
    }
  }
`;

export default Style;
