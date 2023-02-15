import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";

const Layout = (props:any) => {
    return (
        <>
            <Navbar/>
            <main className="min-h-screen">
                <div className="">
                    {props.children}
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={8000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    draggable={false}
                    closeOnClick
                    pauseOnHover
                />
            </main>

            <Footer/>
        </>
    )
}

export default Layout;