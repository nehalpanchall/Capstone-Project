import { useState } from "react";
import { FloatingLabel, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./css/login.css";
import Loader from "../layouts/loader";
import axios from "axios";
import Register from "./register";
import Calendar from "react-calendar";
import { toast, ToastContainer } from "react-toastify";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../reduxStore";
import { useNavigate } from "react-router";

const Profile = ({ handleLogin }) => {
  const dispatch = useDispatch();
  const router = useNavigate()
  const [isActiveEmail, setIsActiveEmail] = useState(false);
  const [isActivePassword, setIsActivePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] =
    useState("confirmpassword");
  const [password, setPassword] = useState("");
  const [isLoader, setIsLoader] = useState(true);
  const [isApiCall, setIsApiCall] = useState(true);
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [birthdate, setbirthdate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState({
    value: "UserProfile",
    label: "User Profile",
  });
  const [images, setImages] = useState("null");
  const [result, setResult] = useState("");
  const [isUploadImage, setIsImageUpload] = useState(false)

  const options = [
    { value: "UserProfile", label: "User Profile" },
    { value: "Changepassword", label: "Change password" },
  ];

  let user = JSON.parse(localStorage.getItem('user'))

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm();

  const getUserDetails = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:8000/users/getUserDetail",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await axios.request(config)
      const user = response.data.user
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("email", user.email);
      setbirthdate(user.birthdate);
      const object = {
        previewUrl: [null, '', undefined].includes(user.profile) ? '/assets/profile.png' : `http://localhost:8000/uploads/${user.profile}`,
        actualfile: null,
      };
      setImages(object);
      setIsLoader(false);
      // console.log(JSON.stringify(response.data));
      // toast.success(response.data.message);
    } catch (error) {
      router('/')
    }
  };
  if (isApiCall) {
    setIsApiCall(false);
    getUserDetails();
  }

  const imageuploadapicall = async (image) => {
    try {
      let data = new FormData();
      data.append("image", image);
      data.append("type", "userProfile");

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:8000/users/imgupload",
        headers: {
          // "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        data: data,
      };

      const response = await axios.request(config)
      user.profile = 'http://localhost:8000/uploads/' + response.data.user.profile
      localStorage.setItem('user', JSON.stringify(user))
      dispatch(actions.setProfileChangeFlag())
      setIsImageUpload(false)
    } catch (error) {
      setIsImageUpload(false)
      toast.error(error.message)
    }
  };

  const onsubmit = async (data) => {
    try {
      setIsFormSubmit(true);
      data["birthdate"] = birthdate;
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:8000/users/userDetail",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),

        },
        data: data,
      };

      const response = await axios.request(config)
      setIsFormSubmit(false);
      toast.success(response.data.message);
    } catch (error) {
      setIsFormSubmit(false);
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  const ChangePasswordApiCall = async (data) => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:8000/users/changepassword",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        data: data,
      };
  
      const response = await axios.request(config)
      console.log('response', response)  
    } catch (error) {
      console.log('err', error)
      toast.error(error.response.data.error)
    }
  };

  const ChangePassword = () => {
    return (
      <form
        onSubmit={handleSubmit(ChangePasswordApiCall)}
        autoComplete="off"
        className="mt-3"
      >
        <div className="form-floating">
          <input
            type={passwordType}
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            {...register("password", {
              required: "Password required.",
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
        <div className="form-floating">
          <input
            type={confirmPasswordType}
            className="form-control"
            id="confirmpassword"
            placeholder="confirmpassword"
            {...register("confirmpassword", {
              required: "confirmpassword is required.",
            })}
            onChange={(e) => {
              setValue("confirmpassword", e.target.value);
              let value = e.target.value.trim();
              value = value.replace(
                /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
                ""
              );
              if (value !== "") {
                setValue("confirmpassword", value);
                clearErrors("confirmpassword");
                setIsActivePassword(true);
                if (/^[A-Za-z0-9!@#$%*?]+/.test(value) && value.length < 15) {
                  setValue("confirmpassword", value.trim());
                  setPassword(value);
                  setIsActivePassword(true);
                  clearErrors("confirmpassword");
                } else {
                  setValue("confirmpassword", password);
                  if (password !== "") {
                    setIsActivePassword(true);
                  } else {
                    setIsActivePassword(false);
                  }
                }
              } else {
                setValue("confirmpassword", "");
                setPassword("");
                setIsActivePassword(false);
              }
            }}
          />
          <button
            className="btn btn-outline-primary password_eye"
            onClick={toggleConfirmPassword}
            type="button"
          >
            {confirmPasswordType === "password" ? (
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
          <label htmlFor="floatingPassword">Confirm Password</label>
          <p className="error_box">{errors?.password?.message}</p>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="submitButton"
            style={{
              backgroundColor: "#757575",
              color: "white",
            }}
            type="submit"
            disabled={isFormSubmit}
          >
            Save {isFormSubmit && <Loader />}
          </button>

        </div>
      </form>
    );
  };
  const userProfileUi = () => {
    return (
      <form
        onSubmit={handleSubmit(onsubmit)}
        autoComplete="off"
        className="mt-3"
      >
        <div className="row d-flex justify-content-center">
          <div className="d-flex justify-content-center">
            <img
              src={[null, '', undefined, 'null'].includes(images?.previewUrl) ? '/assets/profile.png' : images.previewUrl}
              style={{
                height: "85px",
                width: "85px",
                borderRadius: "50%",
              }}
            />
          </div>
          <label
            className="mt-2"
            style={{
              backgroundColor: "#ded4d4",
              width: "fit-content",
              borderRadius: "20px",
              padding: "10px",
            }}
          >
            choose File {isUploadImage && <Loader />}
            <input
              type="file"
              className="d-none"
              onChange={(e) => {
                console.log("ii", e.target.files[0]);
                const object = {
                  previewUrl: URL.createObjectURL(e.target.files[0]),
                  actualfile: e.target.files[0],
                };
                setImages(object);
                setIsImageUpload(true)
                imageuploadapicall(e.target.files[0]);
              }}
              disabled={isUploadImage}
            />
          </label>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="first"
                placeholder="john"
                {...register("firstName", {
                  required: "last name is required.",
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
                  required: "last name is required.",
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
            </div>
          </div>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            disabled={true}
            {...register("email", {
              // required: "Email is required.",
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
        </div>
        <div style={{ position: "relative", zIndex: "999" }}>
          <DatePicker
            showIcon
            selected={birthdate}
            onChange={(date) => setbirthdate(date)}
            // onChange={this.handleChange}
            maxDate={new Date()}
            disableFuture={true}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="submitButton"
            style={{
              backgroundColor: "#757575",
              color: "white",
            }}
            type="submit"
            disabled={isFormSubmit}
          >
            Save {isFormSubmit && <Loader />}
          </button>
        </div>
      </form>
    );
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const toggleConfirmPassword = () => {
    if (confirmPasswordType === "password") {
      setConfirmPasswordType("text");
      return;
    }
    setConfirmPasswordType("password");
  };
  if (isLoader) {
    return <div className="d-flex justify-content-center"><Loader /></div>;
  }
  return (
    <div className="container">
      <div
        style={{
          position: "relative",
          zIndex: "999",
          width: "200px",
        }}
        className="mt-2"
      >
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
          value={selectedOption}
        />
      </div>
      <ToastContainer />

      {selectedOption.value === "UserProfile"
        ? userProfileUi()
        : ChangePassword()}
    </div>
  );
};

export default Profile;
