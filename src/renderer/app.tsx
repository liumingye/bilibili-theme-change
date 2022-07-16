import { ConfigProvider } from 'antd';
import { observer } from 'mobx-react';
import { ReactNode } from 'react';
import {
  BrowserRouter,
  Navigate,
  useParams,
  useRoutes,
} from 'react-router-dom';
import { useStore } from './stores';

import './app.less';

import Header from './component/Header';
import SideBar from './component/SideBar';

import HomePage from './views/Home';

export default () => {
  interface Props {
    children: ReactNode;
  }

  const Redirect = ({ to }: { to: string }) => {
    const { teamId, projectId } = useParams();
    return (
      <Navigate
        to={`${to
          .replace(':teamId', teamId ?? '')
          .replace(':projectId', projectId ?? '')}`}
      />
    );
  };

  // Redirections for breaking changes in URLs
  const redirects = [
    ['/settings/workspace/:teamId', '/settings/workspaces/:teamId'],
  ].map(([from, to]) => ({
    path: from,
    element: <Redirect to={to} />,
  }));

  function AppRoutes() {
    return useRoutes([
      { path: '/', element: <HomePage /> },
      ...redirects,
      { path: '*', element: <HomePage /> },
    ]);
  }

  const LayoutSideBar = () => (
    <div id="layout_sideBar">
      <SideBar />
    </div>
  );

  const LayoutContainer = () => (
    <div id="layout_container">
      <Header />
      <div className="app_container">
        <div className="page_content">
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </div>
      </div>
    </div>
  );

  const Providers = observer(({ children }: Props) => {
    const { appStore } = useStore();
    return (
      <ConfigProvider prefixCls={appStore.theme}>{children}</ConfigProvider>
    );
  });

  return (
    <Providers>
      <LayoutSideBar />
      <LayoutContainer />
    </Providers>
  );
};
