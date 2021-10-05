import Breed from "./breed/Breed";
import "./Home.css";
// import PropTypes from "prop-types";
const Home = ({ title }) => {
  return (
    <div className="container">
      <header className="Home">
        <h1 className="Title">{title}</h1>
        <Breed />
      </header>
    </div>
  );
};

Home.defaultProps = { title: "Cat Browser" };
// Home.propTypes = { title: PropTypes.string.isRequired };
export default Home;
