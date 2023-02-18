import Layout from "@/components/Layout";
import 'boxicons/css/boxicons.min.css'
import Image from "next/image";

const UnauthorizedPage = () => {
    return (
        <>
            <Layout>
                <div className="container mx-auto text-center my-14">
                    <div className="flex justify-center">
                        <Image src={"/illustration/undraw_access_denied_re_awnf.svg"} alt={""} height={300} width={300} className="block" />
                    </div>
                    <h1 className="text-2xl mt-8">Not enough permission to access this page</h1>
                </div>
            </Layout>
        </>
    )
}

export default UnauthorizedPage