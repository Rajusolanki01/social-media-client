import "./Home.scss";
import NavBar from "../../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMyInfo } from "../../redux/slices/appConfigStore";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyInfo())
  },[dispatch])

  return (
    <>
      <NavBar />
      <div className="outlet" style={{ marginTop: "60px" }}>
        <Outlet />
      </div>
    </>
  );
}

export default Home;
