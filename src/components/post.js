import { useState } from "react";
import "./css/custom.css";
import Loader from "../layouts/loader";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

const Post = () => {
  const router = useNavigate()
  const [jsonArray, setJsonArray] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const [isApiCall, setIsApiCall] = useState(true);

  const getCarList = async () => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:8000/car/getAllCar",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await axios.request(config)
      setJsonArray(response.data.carList);

      setIsLoader(false);
      toast.success(response.data.message);
    } catch (error) {

    }
  };

  if (isApiCall) {
    setIsApiCall(false);
    getCarList();
  }

  if (isLoader) {
    return <div className="d-flex justify-content-center"><Loader /></div>;
  }

  return (
    <div className="row mx-0">
      {jsonArray.map((item, index) => {
        return (
          <div className="col-md-3 col-sm-6 col-12 mb-4" key={index} style={{
            cursor: "pointer"
          }} onClick={() => {
            router(`/car/${item._id}`)
          }}>
            <div className="card mx-auto">
              <div className="position-relative">
                <img
                  src={`http://localhost:8000/uploads/${item?.photos[0]}`}
                  className="card-img-top"
                  alt=""
                />
                <p className="price">{item.price}</p>
              </div>
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text two-line-truncate mb-0">
                  {item.description}
                </p>
                <span>{item.date}</span>
              </div>
              <div className="card-footer text-muted">
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex align-items-center">
                      <img
                        className="me-2"
                        src={`http://localhost:8000/uploads/${item?.user?.profile}`}
                        style={{ width: "16px", height: "16px" }}
                        alt="..."
                      />
                      <h6 className="mb-0">{item?.user?.firstName}&nbsp;{item?.user?.lastName}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Post;
