import React, { useEffect, ReactElement } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { isUserAuthenticated } from './services/utils/Auth';
import userSessionStore from './services/stores/userSessionStore';
import PostsOverview from './pages/post-overview/PostsOverview';
import Post from './components/posts/post/Post';
import Main from './pages/main/Main';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import CreatePost from './pages/create-post/CreatePost';

import './App.css';

const App: React.FC = (): ReactElement => {
  useEffect(() => {
    if (isUserAuthenticated()) {
      userSessionStore.setIsLoggedIn(true)
    }
  }, [])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/posts" element={<PostsOverview />} />
          <Route path="/posts/:postId" element={<Post />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
