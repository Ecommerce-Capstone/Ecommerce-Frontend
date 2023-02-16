import Layout from "@/components/Layout";
import Button from "@/components/Button";
import {signIn} from "next-auth/react";

const Unauthenticated = () => {
    return (
        <>
            <Layout>
                <div className="container mx-auto">
                    <div className="text-center mt-28">
                        <p className="text-lg my-8">Your session has been ended! Please re-authenticate your credentials</p>
                        <Button onClick={() => signIn()} >Login</Button>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Unauthenticated