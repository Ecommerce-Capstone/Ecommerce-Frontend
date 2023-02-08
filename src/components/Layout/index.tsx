import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout = (props:any) => {
    return (
        <>
            <Navbar/>
            <main className="min-h-screen">
                <div className="">
                    {props.children}
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Layout;