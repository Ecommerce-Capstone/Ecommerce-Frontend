import React from "react";
import {cn} from "@/utils"
import {IProductCategory} from "@/types/IProductCategory";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?:any;
    options: IProductCategory[],
    defaultValue?: number
}

const BasicInput = React.forwardRef<HTMLSelectElement, InputProps>(
    ({label, name, error, options, defaultValue, ...props}, ref) => {
        if (!defaultValue && options.length > 0){
            defaultValue = options[0].id
        }
        return (
            <>
                <div className="relative mb-4">
                    <label className="leading-7 text-sm text-gray-600">{label}</label>
                    <select ref={ref} name={name} {...props} className={cn("bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5", error && `bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500`)} defaultValue={defaultValue}>
                        <option value={0} disabled={true}>--SELECT {name?.toUpperCase()}--</option>
                        {
                            options.map(productCategory => (
                                <option key={productCategory.id} value={productCategory.id}>{productCategory.name}</option>
                            ))
                        }
                    </select>
                    { error && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error.message}</p>}
                </div>
            </>
        );
    },
)
BasicInput.displayName = "Input"

export default BasicInput;