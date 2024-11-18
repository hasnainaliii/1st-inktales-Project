import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="signin" element={<h1>sign in</h1>} />
        <Route path="signup" element={<h1>sign up</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
