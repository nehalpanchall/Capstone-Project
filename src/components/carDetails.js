import { useState } from "react";
import Loader from "../layouts/loader";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Modal } from "react-bootstrap";
import './css/custom.css'

const CarDetails = () => {
    const carID = window.location.pathname.split('/')[2]
    console.log('carID', carID)
    const [isLoading, setIsLoading] = useState(true)
    const [isApiCall, setIsApiCall] = useState(true)
    const [carDetails, setCarDetails] = useState(null)
    const [isFormSubmit, setIsFormSubmit] = useState(false)
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const onSubmit = async () => {
        setIsFormSubmit(true)
        try {
            const data = {
                id: carDetails._id
            }

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:8000/booking/create',
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token"),
                },
                data
            }
            const response = await axios.request(config)
            console.log('response', response)
            const carData = carDetails
            carData.isSalled = true
            setIsFormSubmit(false)
        } catch (error) {
            console.log('error', error)
            setIsFormSubmit(false)
            toast.error(error.response.data.message);
        }
    }

    const getCarListId = async () => {
        try {
            let config = {
                method: "get",
                maxBodyLength: Infinity,
                url: `http://localhost:8000/car/getCarListId/${carID}`,
                headers: {
                    "Content-Type": "application/json"
                },
            };
            const response = await axios.request(config)
            setCarDetails(response.data.cardetail)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    };
    if (isApiCall) {
        setIsApiCall(false)
        getCarListId();
    }
    if (isLoading) {
        return <Loader />
    }

    const carouselPortion = () => {
        return (
            <Modal
                show={true}
                onHide={() => setIsPopupOpen(false)}
                className="common_modal"
                centered
                fullscreen={true}
            >
                <div>
                    <span style={{
                        position: 'fixed',
                        right: '20px',
                        top: '10px',
                        backgroundColor: 'white',
                        zIndex: '9',
                        borderRadius: '10%',
                        cursor: 'pointer'
                    }}
                        onClick={() => setIsPopupOpen(false)}
                    > <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                            <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                        </svg></span>
                    {/* <Modal.Header closeButton></Modal.Header> */}
                    <Modal.Body>
                        <Carousel
                            className="carousal-main gallery_carousel bg-black bg-opacity-50"
                            // selectedItem={currentIndex}
                            infiniteLoop={true}
                            autoPlay={false}
                            showIndicators={true}
                            showThumbs={false}
                            width="100%"
                            emulateTouch={true}
                            swipeable={true}
                            showStatus={false}
                            useKeyboardArrows={true}
                            showArrows={true}
                            // onChange={onChange}
                            stopOnHover={false}
                            transitionTime={0}
                        >
                            {carDetails?.photos?.map((item, i) => {
                                return (
                                    <div
                                        id="myCarousel"
                                        key={i}
                                        // className="min-vh-100"
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: '100%',
                                            width: '100%'
                                        }}
                                    >
                                        <img
                                            key={i}
                                            draggable={false}
                                            src={`http://localhost:8000/uploads/${item}`}
                                            alt="image"
                                            style={{
                                                margin: "auto",
                                                display: "block",
                                                objectFit: "contain",
                                                pointerEvents: "none",
                                                maxHeight: '90vh'
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </Carousel>
                    </Modal.Body>
                </div>
            </Modal>
        );
    }

    return <>{isPopupOpen && carouselPortion()}
        <div className="container">
            <div className="row">
                <h1>{carDetails.title}</h1>
            </div>
            <div className="row">
                <div className="col-md-8">
                    <div style={{
                        backgroundImage: `url(http://localhost:8000/uploads/${carDetails.photos[0]})`,
                        backgroundSize: 'cover',
                        cursor: 'pointer',
                        height: '500px',
                        padding: '5px',
                        borderRadius: '20px'
                    }} onClick={() => setIsPopupOpen(true)}></div>
                </div>
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-mf-12">
                            <div style={{
                                backgroundImage: `url(http://localhost:8000/uploads/${carDetails.photos[1]})`,
                                backgroundSize: 'cover',
                                cursor: 'pointer',
                                height: '250px',
                                padding: '5px',
                                borderRadius: '20px'
                            }} onClick={() => setIsPopupOpen(true)}></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div style={{
                                height: '100%',
                                width: '100%'
                            }} onClick={() => setIsPopupOpen(true)}>
                                <img
                                    src={`http://localhost:8000/uploads/${carDetails.photos[2]}`}
                                    style={{
                                        height: '250px',
                                        width: '100%',
                                        padding: '5px',
                                        borderRadius: '20px',
                                        margin: '2px',
                                        cursor: 'pointer'
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-6" >
                            <div style={{
                                height: '100%',
                                width: '100%'
                            }} onClick={() => setIsPopupOpen(true)}>
                                <img
                                    src={`http://localhost:8000/uploads/${carDetails.photos[3]}`}
                                    style={{
                                        height: '250px',
                                        width: '100%',
                                        padding: '5px',
                                        borderRadius: '20px',
                                        margin: '2px',
                                        cursor: 'pointer'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                New: <img
                    src={carDetails.isNew ? '/assets/right.jpg' : '/assets/wrong.jpg'}
                    style={{
                        height: "25px",
                        width: "25px",
                        padding: '0px'
                    }}
                />
            </div>
            <div className="row">
                {carDetails.description}
            </div>
            <div className="row mt-3">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <button
                        className="submitButton"
                        style={{
                            backgroundColor: `${carDetails.isSalled ? 'red' : '#757575'}`,
                            color: "white",
                        }}
                        type="button"
                        disabled={isFormSubmit || carDetails.isSalled}
                        onClick={onSubmit}
                    >
                        {carDetails.isSalled ? 'This car is already salled' : `Book Now with ${carDetails.price} only `}      {isFormSubmit && <Loader />}
                    </button>
                    <ToastContainer />
                </div>
            </div>
        </div>
    </>
}

export default CarDetails