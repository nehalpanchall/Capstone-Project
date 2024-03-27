
import { Spinner } from "react-bootstrap"
import './css/loader.css'

const Loader = ({ fullScreen }) => {
  if (fullScreen) {
    return <div className="fullscreen-loader">
      <div className="loader-content">
        <div className="spinner"></div>
      </div>
    </div>
  }
  return <Spinner animation="border" role="status" style={{ height: "1rem", width: "1rem" }}>
    <span className="visually-hidden">Loading...</span>
  </Spinner>
}

export default Loader