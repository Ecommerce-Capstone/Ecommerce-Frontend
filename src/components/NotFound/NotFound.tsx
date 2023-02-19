import Image from "next/image";

const NotFound = () => {
    return (
        <>
            <div className="col-start-1 col-end-12">
                <div className="w-full flex justify-center text-center">
                    <Image src="/illustration/undraw_page_not_found_re_e9o6.svg" alt="not found" width={300} height={300} />
                </div>
            </div>
        </>
    )
}

export default NotFound