import Home from "./components/home/Home";
import Details from "./components/details/Details";
import { Route, BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/:id" component={Details} />
      </Router>
    </div>
  );
}

export default App;
