import {cn} from '@/utils'

const Alert = (props: any) => {
    let variantClass;
    switch (props.variant){
        case 'success':
            variantClass = 'text-green-800 bg-green-50'
            break;
        case 'warning':
            variantClass = 'text-yellow-800 bg-yellow-50'
            break;
        case 'error':
            variantClass = 'text-red-800 bg-red-50'
            break;
        case 'secondary':
            variantClass = 'text-gray-800 bg-gray-50'
            break;
        case 'primary':
        default:
            variantClass = 'text-blue-800 bg-blue-50'
            break;
    }
    return (
        <>
            <div className={cn("p-4 mb-4 text-sm rounded-lg", variantClass, props.className)} role="alert">
                {props.children}
            </div>
        </>
    )
}

export default Alert