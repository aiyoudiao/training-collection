import { useState, useEffect, Suspense, lazy, memo } from "react";
import {
  BrowserRouter,
  Outlet,
  useLocation,
  useNavigate,
  useRoutes,
} from "react-router-dom";

// 动态导入组件
const Home = lazy(() => import("@/pages/home/index"));
const Battle = lazy(() => import("@/pages/battle/index"));
const Result = lazy(() => import("@/pages/result/index"));

const Layout: React.FC = memo(() => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [headerText, setHeaderText] = useState("Github 热门项目");

  useEffect(() => {
    if (pathname.includes("/battle") || pathname.includes("/result")) {
      setHeaderText("Github 用户对战");
    } else {
      setHeaderText("Github 热门项目");
    }
  }, [pathname]);

  const goToHome = () => {
    navigate("/");
    setHeaderText("Github 热门项目");
  };

  const goToBattle = () => {
    navigate("/battle");
    setHeaderText("Github 用户对战");
  };

  return (
    <div className="px-12 flex flex-col h-screen bg-green-50 font-sans">
      <header className="py-4 flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold text-primary">
          {headerText}
        </h1>
        <nav className="space-x-4">
          <button
            className={`px-3 py-2 rounded transition-transform duration-300 transform ${
              headerText === "Github 热门项目"
                ? "bg-primary text-white hover:bg-primary-dark hover:scale-105 hover:shadow-outline-green"
                : "text-gray-500 hover:text-primary"
            }`}
            onClick={goToHome}
          >
            主页
          </button>
          <button
            className={`px-3 py-2 rounded transition-transform duration-300 transform ${
              headerText === "Github 用户对战"
                ? "bg-primary text-white hover:bg-primary-dark hover:scale-105 hover:shadow-outline-green"
                : "text-gray-500 hover:text-primary"
            }`}
            onClick={goToBattle}
          >
            对战
          </button>
        </nav>
      </header>
      <main className="h-full flex-auto overflow-y-auto scrollbar-none">
        <Outlet />
      </main>
      <footer className="py-4 text-center text-primary-dark">
        群贤毕至，巅峰对决，谁与争锋？
      </footer>
    </div>
  );
});

const AppRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "battle", element: <Battle /> },
        { path: "result", element: <Result /> },
      ],
    },
  ]);
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={<div className="text-center text-primary">加载中...</div>}
      >
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
};

export default memo(App);
