import Image from "next/image";

const Logo = (props:any) => {
    return (
        <>
            <Image src={"/logojatim.png"} alt={"Logo"} width={props.width ?? 30} height={props.height ?? 30} />
        </>
    )
}

export default Logo;