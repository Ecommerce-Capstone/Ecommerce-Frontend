import React from "react";
import {cn} from "@/utils"

export interface TextAreaProps
    extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?:any;
}

const BasicInput = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({label, name, error, ...props}, ref) => {
        return (
            <>
                <div className="relative mb-4">
                    <label className="leading-7 text-sm text-gray-600">{label}</label>
                    <textarea name={name} {...props}
                           ref={ref}
                           className={cn("w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out", error && `bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500`)} />
                    { error && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error.message}</p>}
                </div>
            </>
        );
    },
)
BasicInput.displayName = "Input"

export default BasicInput;