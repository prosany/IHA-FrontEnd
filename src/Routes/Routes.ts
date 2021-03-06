import Login from "Pages/Public/Login";
import Signup from "Pages/Public/Signup";
import Account from "Pages/Private/Account";
import Home from "Pages/Private/Home";

interface IRoute {
  id: number;
  path: string;
  component: React.ComponentType<any> | React.ComponentType | undefined;
}

const publicRoutes: IRoute[] = [
  { id: 0, path: "/login", component: Login },
  { id: 1, path: "/signup", component: Signup },
];

const privateRoutes: IRoute[] = [
  { id: 0, path: "/account", component: Account },
  { id: 1, path: "/", component: Home },
];

export default publicRoutes;
export { privateRoutes };
