const Button = (props: any) => {
    return (
        <>
            <button type="submit" className={`p-2.5 px-9 text-sm font-medium text-white bg-sky-900 rounded-lg border border-sky-900 hover:bg-blue-900 ${props.className}`}>
                {props.children}
            </button>
        </>
    )
}

export default Button;