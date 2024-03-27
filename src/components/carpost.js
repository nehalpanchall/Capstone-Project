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

const CarPost = () => {
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [birthdate, setbirthdate] = useState(new Date());
  const [image, setimage] = useState([]);
  const [salleddate, setsalleddate] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm();

  const imageuploadapicall = async (image, carId) => {
    try {
      let data = new FormData();
      data.append("image", image);
      data.append("type", "carImage");
      data.append("carId", carId);
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

      const result = await axios.request(config);
      console.log("hello1", result.data);
      if (result.data.success) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  //api
  const onSubmit = async (data) => {
    // if(image.length !== 4 ){
    //   alert ("select 4 image")
    //   return
    // }
    setIsFormSubmit(true);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8000/car/carPost",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      data: data,
    };
    try {
      const response = await axios.request(config);

      if (response.status === 200) {
        console.log("data submitted successfully");
        for (let i = 0; i < image.length; i++) {
          console.log("image", i, image[i]);
          await imageuploadapicall(image[i].actualfile, response.data.carpostdetails._id);
        }
        toast.success(response.data.message);
        setValue("title", "");
        setValue("description", "");
      }
      setIsFormSubmit(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);

      setIsFormSubmit(false);
    }
  };

  return (
    <div className="container">
      <h1
        className="mt-2"
        style={{
          color: "red",
          marginBottom: "20px",
          textAlign: "center",
          wordBreak: "break-word",
          fontSize: "22px",
        }}
      >
        Post Your Car
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="row">
          <div className="row d-flex justify-content-center">
            <div className={image.length === 0 ? "" : "card d-block"}>
              {image.map((item, index) => {
                return <img
                  src={item.previewUrl}
                  style={{
                    height: "80px",
                    width: "100px",
                    borderRadius: "20px",
                    padding: '2px'
                  }}
                />;
              })}
            </div>
            <label
              className={image.length === 0 ? "" : "mt-2"}
              style={{
                backgroundColor: "#ded4d4",
                width: "fit-content",
                borderRadius: "20px",
                padding: "10px",
              }}
            >
              choose File
              <input
                accept="image/png, image/jpg, image/jpeg"
                type="file"
                multiple
                className="d-none"
                onChange={(e) => {
                  console.log(e.target.files);
                  let array = [...image];
                  for (let i = 0; i < e.target.files.length; i++) {
                    const object = {
                      previewUrl: URL.createObjectURL(e.target.files[i]),
                      actualfile: e.target.files[i],
                    };
                    array.push(object);
                  }
                  setimage(array);
                }}
              />
            </label>
          </div>
          <div className="col-md-6 mt-3">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="title"
                {...register("title", {
                  required: "Title is required.",
                })}
                autoFocus
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(
                    /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
                    ""
                  );
                  if (value !== "") {
                    setValue("title", value);
                    clearErrors("title");
                  } else {
                    setValue("title", "");
                  }
                }}
              />
              <label htmlFor="title">Title</label>
              <p className="error_box">{errors?.title?.message}</p>
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <div className="form-floating mb-5">
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="Price"
                {...register("price", {
                  required: "Price is required.",
                })}
                autoFocus
                onChange={(e) => {
                  let value = e.target.value.trim();
                  value = value.replace(
                    /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
                    ""
                  );
                  if (value !== "") {
                    setValue("Price", value);
                    clearErrors("price");
                  } else {
                    setValue("price", "");
                  }
                }}
              />
              <label for="title">Price</label>
              <p className="error_box">{errors?.Price?.message}</p>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            rows={3}
            cols={50}
            id="description"
            placeholder="Add Your Description Here"
            {...register("description", {
              required: "description is required.",
            })}
            onChange={(e) => {
              let value = e.target.value;
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
        <div className="row d-flex">
          <div className="col-md-3 col-sm-12" style={{ position: "relative", zIndex: "999" }}>
            <DatePicker
              showIcon
              selected={birthdate}
              onChange={(date) => setbirthdate(date)}
              maxDate={new Date()}
              disableFuture={true}
            />
          </div>
          <div className="form-check form-switch col-md-4 col-sm-12" style={{
            padding: '0px 0px 0px 50px'
          }}>
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="isHost"
              {...register("isHost", {
              })}
            />
            <label className="form-check-label" htmlFor="isHost">
              Is new Car ?
            </label>
          </div>
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
          >
            Save{isFormSubmit && <Loader />}
          </button>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};

export default CarPost;
