import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import './index.css'

//Layouts
import RootLayout from "./layouts/RootLayout";

//Pages
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

//context
import useAuthContext from "./hooks/useAuthContext";

const App = () => {

  const {user} = useAuthContext()

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={user ? <Home /> : <Navigate to='/login'/>} />
        <Route path="/signup" element={!user ? <SignUp/> : <Navigate to='/'/>}/>
        <Route path="/login" element={!user ? <Login/> : <Navigate to='/'/>}/>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
