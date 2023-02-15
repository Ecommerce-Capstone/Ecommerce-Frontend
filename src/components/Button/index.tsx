import React from "react";
import 'boxicons/css/boxicons.min.css'
import {cn} from '@/utils'

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({type, className, isLoading, ...props}, ref) => {
        return (
            <>
                <button
                    type={type}
                    ref={ref}
                    className={cn("p-2.5 px-9 text-sm font-medium text-white bg-sky-900 rounded-lg border border-sky-900 hover:bg-blue-900", className)}>
                    {
                        isLoading ? <span><i className="bx bx-loader bx-spin" /> </span> : <span>{props.children}</span>
                    }
                </button>
            </>
        )
    },
)

Button.displayName = "Button"

export default Button;