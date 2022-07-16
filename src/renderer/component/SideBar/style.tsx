import styled from 'styled-components';

const Style = styled.div`
  padding: 25px 0;

  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  /* background-color: #f1f2f3; */

  -webkit-app-region: drag;

  svg {
    width: 1.2em;
    height: 1.2em;
  }

  button {
    -webkit-app-region: no-drag;
  }

  .NavButton,
  .BottomButton {
    display: flex;
    flex-direction: column;
  }

  .NavButton {
    flex: 1;
    gap: 16px;
    grid-gap: 16px;

    button {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 40px;
      height: 56px;

      span:last-child {
        margin-top: 4px;
        font-size: 13px;
        margin-left: 0;
      }
    }
  }

  .BottomButton {
    gap: 14px;
    grid-gap: 14px;
  }
`;

export default Style;
