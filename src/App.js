import LoadingBar from "react-top-loading-bar";
import Feed from "./components/Feed/Feed";
import Profile from "./components/Profile/Profile";
import RequireUser from "./components/RequireUser/RequireUser";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import OnlyIfNotLoggedIn from "./components/RequireUser/OnlyIfNotLoggedIn";
import  toast , { Toaster } from "react-hot-toast";


export const TOAST_SUCCESS = "toast_success";
export const TOAST_FAILURE = "toast_failure";

function App() {
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);
  const toastData = useSelector((state) => state.appConfigReducer.toastData);
  const loadingRef = useRef();

  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
    } else {
      loadingRef.current?.complete();
    }
  }, [isLoading]);

  useEffect(() => {
    switch (toastData.type) {
      case TOAST_SUCCESS:
        toast.success(toastData.message);
        break;
      case TOAST_FAILURE:
        toast.error(toastData.message);
        break;
      default:
        break;
    }
  }, [toastData]);

  return (
    <div className="App">
      <LoadingBar color="#f11946" height={3} ref={loadingRef} />
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route element={<RequireUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
          </Route>
        </Route>
        <Route element={<OnlyIfNotLoggedIn />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
