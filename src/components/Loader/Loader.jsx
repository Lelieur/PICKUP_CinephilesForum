import { Spinner } from "react-bootstrap"

const Loader = () => {
    return (
        <div className="Loader d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
                <span className="visual-hidden"></span>
            </Spinner>
        </div>
    )
}

export default Loader