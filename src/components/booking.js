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

const Booking = ({}) => {
  const [birthdate, setbirthdate] = useState(new Date());
  const [image, setimage] = useState([]);
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

  return (
    <div className="container">
      <h1
        style={{
          color: "red",
          marginBottom: "20px",
          textAlign: "center",
          wordBreak: "break-word",
          fontSize: "25px",
        }}
      >
        Booking
      </h1>

      <form autoComplete="off">
        <div className="row">
          <div className="row d-flex justify-content-center">
            <div>
              {image.map((item, index) => {
             return   <img
                  src={item.previewUrl}
                  style={{
                    height: "80px",
                    width: "100px",
                    borderRadius: "50%",
                  }}
                />;
              })}
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
              choose File
              <input
                accept="image/png, image/jpg, image/jpeg"
                type="file"
                multiple
                className="d-none"
                onChange={(e) => {
                  console.log(e.target.files);
                  let array = [];
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
          <div className="col-md-5">
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="Price"
                {...register("Price", {
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
                    setValue("price", value);
                    clearErrors("title");
                  } else {
                    setValue("price", "");
                  }
                }}
              />
              <label htmlFor="price">Price</label>
              <p className="error_box">{errors?.price?.message}</p>
            </div>
          </div>
        </div>
        <div style={{ position: "relative", zIndex: "999" }}>
        <label htmlFor="sale">Salled Date</label>
              <p className="error_box">{errors?.price?.message}</p>
          <DatePicker
            showIcon
            selected={birthdate}
            onChange={(date) => setbirthdate(date)}
            // onChange={this.handleChange}
            maxDate={new Date()}
            disableFuture={true}

          />
          
        </div>
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
            Is new Car ?
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
          >
            Save
          </button>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Booking;
