import bengalLogo from "./assets/Bengal.svg";
import Navbar from "react-bootstrap/Navbar";

function Home() {
  return (
    <>
      <div className="body">
        <Navbar data-bs-theme="dark" className="brand">
          <Navbar.Brand href="#home" className="text_FAIRWIN">
            <img
              alt=""
              src={bengalLogo}
              width="40"
              height="40"
              className="bengal"
            />
            &nbsp; FAIRWIN
          </Navbar.Brand>
        </Navbar>
      </div>
    </>
  );
}

export default Home;
