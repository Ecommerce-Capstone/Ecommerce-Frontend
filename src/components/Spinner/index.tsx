import 'react-toastify/dist/ReactToastify.css';

const Spinner = () => {
    return (
        <>
            <div className="w-full text-center my-8 mx-auto">
                <i className="bx bx-loader bx-spin text-7xl" />
            </div>
        </>
    )
}

export default Spinner