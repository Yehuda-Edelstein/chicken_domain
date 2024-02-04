import "./Header.scss";
import fav from "./../../assets/fav.png";

function Header() {
  return (
    <div className="header">
      <div className="name">
        <img src={fav} alt="" width="30px" />
        <div>
          <span style={{ color: "#ffadc0" }}>domains.</span>
          <a href="https://yehuda.lol" style={{ color: "#b17986" }}>
            yehuda{" "}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
