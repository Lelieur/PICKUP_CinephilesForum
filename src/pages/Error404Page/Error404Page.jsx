import { travolta } from "../../const/image-paths"

const Error404Page = () => {
    return (
        <div className="Error404Page" style={{ textAlign: 'center', padding: '50px' }}>
            <img
                src={travolta}
                alt="Error 404"
                style={{ width: '300px', marginTop: '20px' }}
            />


            <p style={{ marginTop: '20px', fontSize: '18px', color: '#555' }}>
                Lo siento, la página que buscas no existe.
            </p>
        </div>
    )
}

export default Error404Page