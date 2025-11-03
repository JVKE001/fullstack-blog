import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost.jsx";
import EditPost from "./pages/EditPost";
import MyPosts from "./pages/MyPosts";
import PostDetails from "./pages/PostDetails";
import ProtectedRoute from "./components/Routes/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetails />} />

        {/* Auth routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/myposts" element={<MyPosts />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
