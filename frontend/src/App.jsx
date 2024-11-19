import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import UserAuth from "./pages/userAuth/UserAuth";

function App() {
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
