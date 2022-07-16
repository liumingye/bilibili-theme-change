import styled from 'styled-components';

const Style = styled.header`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--Ga1);
  height: 75px; // +1px边框高度
  -webkit-app-region: drag;

  .center {
    width: 100%;
  }

  .search,
  .menu {
    -webkit-app-region: no-drag;
  }

  .left {
    padding-left: 40px;
    display: flex;
    align-items: center;
    gap: 20px;
    grid-gap: 20px;

    .menu {
      [class$='-tabs-nav'] {
        margin-bottom: 0;

        &::before {
          border-bottom: none;
        }
      }
      [class*='-tabs-ink-bar'] {
        height: 3px;
        transform: scaleX(0.5);
      }
    }
  }

  .right {
    padding-right: 32px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .divider {
      height: 16px;
      width: 1px;
      background: var(--Ga2);
      margin-left: 20px;
    }
  }
`;

export default Style;
