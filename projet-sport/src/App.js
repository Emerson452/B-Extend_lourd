import "./styles/index.css";
import "./styles/Posts.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import ZoomPost from './pages/ZoomPost';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Banner from './components/banner';
import Footer from './components/footer';

function App() {

  return (
    <div className="App">
      <Router>
        <Banner>
        </Banner>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/createpost" exact element={<CreatePost />} />
          <Route path="/post/:id" exact element={<ZoomPost />} />
          <Route path="/registration" exact element={<Registration />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </Router>
      <Footer>
      </Footer>
    </div>
  );
}

export default App;
