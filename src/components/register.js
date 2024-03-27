import { useState } from "react";
import { FloatingLabel, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./css/login.css";
import Loader from "../layouts/loader";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Register = ({ handleLogin }) => {
  const [isActiveEmail, setIsActiveEmail] = useState(false);
  const [isActivePassword, setIsActivePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [password, setPassword] = useState("");
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [birthdate, setbirthdate] = useState(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({
    defaultValues: {
      isHost: false,
    },
  });

  const onSubmit = async (data) => {
    setIsFormSubmit(true);
    data["birthdate"] = birthdate;
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8000/users/add",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      const response = await axios.request(config);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        const user = response.data.user
        user.profile = [null, '', undefined].includes(user.profile) ? '/assets/profile.png' : `http://localhost:8000/uploads/${user.profile}`
        localStorage.setItem("user", JSON.stringify(user));
        console.log("response", response);
        toast.success(response.data.message);
        handleLogin("closeRegisterWithSubmittedDetails");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setIsFormSubmit(false);
    }
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <Modal show={true} onHide={() => handleLogin("closeRegister")} centered>
      <Modal.Header
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            color: "red",
            marginBottom: "20px",
            textAlign: "center",
            wordBreak: "break-word",
            fontSize: "22px",
          }}
        >
          Sign Up
        </h1>
      </Modal.Header>
      <Modal.Body
        style={{
          padding: "40px 32px 36px",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="row">
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="first"
                  placeholder="john"
                  {...register("firstName", {
                    required: "First name is required.",
                  })}
                  autoFocus
                  onChange={(e) => {
                    let value = e.target.value.trim();
                    value = value.replace(
                      /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
                      ""
                    );
                    if (value !== "") {
                      setValue("firstName", value);
                      clearErrors("firstName");
                    } else {
                      setValue("firstName", "");
                    }
                  }}
                />
                <label htmlFor="first">First Name</label>
                <p className="error_box">{errors?.firstName?.message}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="doe"
                  {...register("lastName", {
                    required: "Last name is required.",
                  })}
                  onChange={(e) => {
                    let value = e.target.value.trim();
                    value = value.replace(
                      /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
                      ""
                    );
                    if (value !== "") {
                      setValue("lastName", value);
                      clearErrors("lastName");
                    } else {
                      setValue("lastName", "");
                      setEmail("");
                      setIsActiveEmail(false);
                    }
                  }}
                />
                <label htmlFor="lastName">Last Name</label>
                <p className="error_box">{errors?.lastName?.message}</p>
              </div>
            </div>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Enter valid email address.",
                },
              })}
              onChange={(e) => {
                let value = e.target.value.trim();
                value = value.replace(
                  /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
                  ""
                );
                if (value !== "") {
                  setValue("email", value);
                  clearErrors("email");
                  setIsActiveEmail(true);
                  if (/^[A-Za-z0-9!@#$%*?]+/.test(value)) {
                    setValue("email", value.trim());
                    setEmail(value);
                    setIsActiveEmail(true);
                    clearErrors("email");
                  } else {
                    setValue("email", email);
                    if (email !== "") {
                      setIsActiveEmail(true);
                    } else {
                      setIsActiveEmail(false);
                    }
                  }
                } else {
                  setValue("email", "");
                  setEmail("");
                  setIsActiveEmail(false);
                }
              }}
            />
            <label htmlFor="floatingInput">Email address</label>
            <p className="error_box">{errors?.email?.message}</p>
          </div>
          <div className="form-floating">
            <input
              type={passwordType}
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              {...register("password", {
                required: "Password is required.",
              })}
              onChange={(e) => {
                setValue("password", e.target.value);
                let value = e.target.value.trim();
                value = value.replace(
                  /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
                  ""
                );
                if (value !== "") {
                  setValue("password", value);
                  clearErrors("password");
                  setIsActivePassword(true);
                  if (/^[A-Za-z0-9!@#$%*?]+/.test(value) && value.length < 15) {
                    setValue("password", value.trim());
                    setPassword(value);
                    setIsActivePassword(true);
                    clearErrors("password");
                  } else {
                    setValue("password", password);
                    if (password !== "") {
                      setIsActivePassword(true);
                    } else {
                      setIsActivePassword(false);
                    }
                  }
                } else {
                  setValue("password", "");
                  setPassword("");
                  setIsActivePassword(false);
                }
              }}
            />
            <button
              className="btn btn-outline-primary password_eye"
              onClick={togglePassword}
              type="button"
            >
              {passwordType === "password" ? (
                <img
                  src="/assets/hide_eye.svg"
                  alt="Eye Hidden"
                  width={25}
                  height={25}
                />
              ) : (
                <img
                  src="/assets/show_eye.svg"
                  alt="Eye show"
                  width={25}
                  height={25}
                />
              )}
            </button>
            <label htmlFor="floatingPassword">Password</label>
            <p className="error_box">{errors?.password?.message}</p>
          </div>
          <div 
          style={{position:"relative",
        zIndex:"999"}}>
            <DatePicker
              showIcon
              selected={birthdate}
              onChange={(date) => setbirthdate(date)}
              // onChange={this.handleChange}
              maxDate={new Date()}
              disableFuture={true}
            />
          </div>
          {/* <Calendar onChange={(e)=>{console.log('e',e)}} value={birthdate} /> */}
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="isHost"
              // value={true}
              {...register("isHost", {
                // required: true,
              })}
            />
            <label className="form-check-label" htmlFor="isHost">
              Do you want to register as a host ?
            </label>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              className="submitButton"
              style={{
                backgroundColor: "#757575",
                color: "white",
              }}
              type="submit"
              disabled={isFormSubmit}
            >
              Sign Up {isFormSubmit && <Loader />}
            </button>
          </div>
          <ToastContainer />
          <div className="info_box">
            No account yet?{" "}
            <span
              style={{ cursor: "pointer", fontSize: "18px", color: "#757575" }}
              className="gray_links"
              onClick={() => {
                handleLogin("showLogin");
                setIsFormSubmit(false);
              }}
            >
              {" "}
              <b>Sign In</b>
            </span>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Register;
