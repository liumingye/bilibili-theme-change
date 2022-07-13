import {
  BrowserRouter,
  useRoutes,
  useParams,
  Navigate,
} from 'react-router-dom';

import './app.less';

import SideBar from './component/molecules/SideBar';
import Header from './component/molecules/Header';

import HomePage from './component/pages/Home';

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
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </div>
);

export default function App() {
  return (
    <>
      <LayoutSideBar />
      <LayoutContainer />
    </>
  );
}
