import { Link, Outlet } from "react-router-dom";
import  useLogout  from "../hooks/useLogout";
import useAuthContext from '../hooks/useAuthContext'

const RootLayout = () => {
  const { logout } = useLogout();
  const {user} = useAuthContext()

  const logoutHandler = () => {
    logout();
  };

  return (
    <div>
      <header>
        <div className="root__layout">
          <Link to="/">
            <h1>Elite Fitness Gym</h1>
          </Link>
          <nav>
            {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={logoutHandler}>Log out</button>
            </div> )}
            {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>)}
          </nav>
        </div>
      </header>
      <main className="root__layout-main">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
