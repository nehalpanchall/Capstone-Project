import { useNavigate } from "react-router-dom";

const Footer = () => {
  const nav = useNavigate();
  return (
    <div
      className=""
      style={{
        backgroundColor: "#757575",
        color: "white",
      }}
    >
      <div className="row">
        <ul className="d-flex justify-content-around">
          <li
            onClick={() => {
              nav("/about");
            }}
            style={{
              cursor: "pointer"
            }}
          >
            About Us
          </li>
          <li
            onClick={() => {
              nav("/contact");
            }}
            style={{
              cursor: "pointer"
            }}
          >
            Contact Us
          </li>
          <li
            onClick={() => {
              nav("/terms");
            }}
            style={{
              cursor: "pointer"
            }}
          >
            Terms & conditions
          </li>
          <li
            onClick={() => {
              nav("/privacy");
            }}
            style={{
              cursor: "pointer"
            }}
          >
            Privacy & policy
          </li>
        </ul>
        <div className="d-flex justify-content-center">
          Copyright © 2024 Drive 24
        </div>
      </div>
    </div>
  );
};
export default Footer;
