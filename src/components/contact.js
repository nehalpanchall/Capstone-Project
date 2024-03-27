import { useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "../layouts/loader";
import "./css/contect.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ContactUs = () => {
  const [isActiveEmail, setIsActiveEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm();

  //api
  const onSubmit = async (data) => {
    setIsFormSubmit(true);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8000/users/submitInquiry",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      const response = await axios.request(config);

      if (response.status === 200) {
        toast.success(response.data.message)
        setValue("email", '');
        setValue("description", '');
      }
      setIsFormSubmit(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    
      setIsFormSubmit(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src="/assets/images.jpg" className="contact_img"></img>
        </div>
        <div className="col-md-6">
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            Contact Us
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows={3}
                cols={50}
                id="description"
                placeholder="Type Your Query Here"
                {...register("description", {
                  required: "description is required.",
                })}
                onChange={(e) => {
                  let value = e.target.value.trim();
                  value = value.replace(
                    /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
                    ""
                  );
                  if (value !== "") {
                    setValue("description", value);
                    clearErrors("description");
                  } else {
                    setValue("description", "");
                  }
                }}
              />
              {/* <label htmlFor="message">Message</label> */}
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
                Contect Us{isFormSubmit && <Loader />}
                <ToastContainer />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
