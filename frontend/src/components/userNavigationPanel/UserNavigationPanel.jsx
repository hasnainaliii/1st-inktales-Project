import { Link } from "react-router-dom";
import AnimationWrapper from "../../common/animation/AnimationWrapper";
import { useAuthContext } from "../../context/UserAuthContext";
import { removeFromSession } from "../../api/SessionStore";

function UserNavigationPanel() {
  const {
    userAuth: { username },
    setUserAuth,
  } = useAuthContext();

  function handleSignOut() {
    removeFromSession("user");
    setUserAuth({ access_token: null });
  }

  return (
    <AnimationWrapper
      className="absolute right-0 z-50 "
      transition={{ duration: 0.2 }}
    >
      <div className="bg-white absolute right-0 border-grey w-60  duration-200 ">
        <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </Link>
        <Link to={`/user/${username}`} className="link pl-8 py-4">
          Profile
        </Link>
        <Link to="/dashboard/blogs" className="link pl-8 py-4">
          Dashboard
        </Link>
        <Link to="/settings/edit-profile" className="link pl-8 py-4">
          Settings
        </Link>
        <span className="absolute border-t border-grey  w-[100%]"></span>
        <button
          className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
          onClick={handleSignOut}
        >
          <h1 className="font-bold text-xl mg-1">Sign Out</h1>
          <p className="text-dark-grey">@{username}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
}

export default UserNavigationPanel;
