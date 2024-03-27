import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate } from "react-router-dom";
import "./css/navbar.css";
import { useState } from "react";
import Login from "../components/login";
import Register from "../components/register";
import { GiHamburgerMenu } from "react-icons/gi";
import { Dropdown } from "react-bootstrap";
import { HiMenuAlt1 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actions } from "../reduxStore";

const Navbar = () => {
  const profileChange = useSelector((state) => state.profile.isProfileChange);
  const dispatch = useDispatch();
  const [IsUserLoggedIn, setIsUSerLogeedIn] = useState(
    [null, undefined, "", "null"].includes(localStorage.getItem("token")) ? false : true
  );
  let user = JSON.parse(localStorage.getItem('user'))
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const router = useNavigate();

  useEffect(() => {
    if (profileChange) {
      dispatch(actions.setProfileChangeFlag())
      user = JSON.parse(localStorage.getItem('user'))
    }
  }, [profileChange])

  const handleLogin = (type) => {
    switch (type) {
      case "register":
        setShowLogin(false);
        setShowRegister(true);
        break;
      case "closeLogin":
        setShowLogin(false);
        break;
      case "showLogin":
        setShowLogin(true);
        setShowRegister(false);
        break;
      case "closeRegister":
        setShowRegister(false);
        break;
      case "closeLoginWithSubmittedDetails":
        setShowLogin(false);
        setIsUSerLogeedIn(true);
        break;
      case "closeRegisterWithSubmittedDetails":
        setShowRegister(false);
        setIsUSerLogeedIn(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {showLogin && <Login handleLogin={handleLogin} />}
      {showRegister && <Register handleLogin={handleLogin} />}

      <nav className="navbar">
        <div className="container">
          <div className="main-nav">
            <div className="logo" onClick={() => {
              router("/")
            }}>
              <Link href="/">

                {/* <a href="/"> */}
                <LazyLoadImage
                  className="logo_main"
                  draggable={false}
                  style={{
                    borderRadius: "5px",
                  }}
                  effect="blur"
                  width={"100%"}
                  height="50%"
                  src={"logo192.png"}
                  alt="image"
                  title="logo"
                />
                {/* </a> */}
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <div className={IsUserLoggedIn ? "col-md-7" : "col-md-8"}>
                {IsUserLoggedIn ? <span
                  style={{
                    color: "white",
                  }}
                  className="bordered_btn"
                  onClick={(e) => {

                    e.preventDefault();
                    setIsUSerLogeedIn(false);
                    localStorage.setItem("token", null)
                    localStorage.setItem("user", null)
                    router("/");

                  }}
                >
                  Logout
                </span> : (
                  <span
                    style={{
                      color: "white",
                    }}
                    className="bordered_btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowLogin(true);
                    }}
                  >
                    Sign In
                  </span>
                )}
              </div>
              {/* hamburger menu */}
              <div className="col-md-4">
                <div className="hamburger-menu">
                  <Dropdown className="dropdown_wrapper">
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      aria-label="mobile_btn"
                      className="d-flex align-items-center justify-content-between"
                      style={{
                        borderColor: 'white'
                      }}
                    >
                      <HiMenuAlt1 size="1.5em" className="" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown_box_dropdown" align="end">
                      {IsUserLoggedIn && (
                        <>
                          <Dropdown.Item>
                            <div
                              onClick={() => {
                                router("/profile");
                              }}
                            >
                              Profile
                            </div>
                          </Dropdown.Item>

                          <Dropdown.Item>
                            <div
                              onClick={() => {
                                router("/carPost");
                              }}
                            >
                              Car Post
                            </div>
                          </Dropdown.Item>

                          <Dropdown.Item>
                            <div
                              onClick={() => {
                                router("/booking");
                              }}
                            >
                              Booking
                            </div>
                          </Dropdown.Item>
                        </>
                      )}

                      <Dropdown.Item>Cars</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                </div>
              </div>
              {IsUserLoggedIn &&
                <div className="col-md-1">
                  <img src={['', null, undefined].includes(user?.profile) ? '/assets/profile.png' : `${user.profile}`} className="user_profile" />
                </div>}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
