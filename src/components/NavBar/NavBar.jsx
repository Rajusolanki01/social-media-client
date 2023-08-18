import "./NavBar.scss";
import { useNavigate } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading, showToast } from "../../redux/slices/appConfigStore";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/LocalStorageManager";
import { TOAST_FAILURE, TOAST_SUCCESS } from "../../App";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  async function handleLogoutClicked() {
    try {
      dispatch(setLoading(true));
      await axiosClient.post("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
      dispatch(
        showToast({
          type: TOAST_SUCCESS,
          message: "Logout successfully!'",
        })
      )
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(
        showToast({
          type: TOAST_FAILURE,
          message: "Logout error",
        })
      )
    }
  }

  function handleProfileClicked(userId) {
    if (userId) {
      dispatch(
        showToast({
          type: TOAST_SUCCESS,
          message: "Your Profile!",
        })
      )
      navigate(`/profile/${userId}`);
    }
  }

  return (
    <div className="Navbar">
      <div className="container-1">
        <h2 className="banner hover-link" onClick={() => navigate("/")}>
        Social Media
        </h2>
        <div className="right-side">
          <div
            className="profile hover-link"
            onClick={() => handleProfileClicked(myProfile?._id)}>
            <Avatar src={myProfile?.avatar?.url} />
          </div>
          <button className="Btn" onClick={handleLogoutClicked}>
            <div className="sign">
              <svg viewBox="0 0 512 512">
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
              </svg>
            </div>
            <div className="text">Logout</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
