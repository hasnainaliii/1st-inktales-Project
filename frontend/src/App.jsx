import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import UserAuth from "./pages/userAuth/UserAuth";
import { useEffect } from "react";
import { checkInSession } from "./api/SessionStore.js";
import { useAuthContext } from "./context/UserAuthContext.jsx";

function App() {
  const { userAuth: { access_token } = {}, setUserAuth } = useAuthContext();
  useEffect(function () {
    let userInSession = checkInSession("user");

    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="signin" element={<UserAuth type="signIn" />} />
        <Route path="signup" element={<UserAuth type="signUp" />} />
      </Route>
    </Routes>
  );
}

export default App;
