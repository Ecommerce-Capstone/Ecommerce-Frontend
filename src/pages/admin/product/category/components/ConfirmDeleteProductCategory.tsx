    import React from "react";
    import { cn } from "@/utils";

    interface ConfirmDeleteProductCategoryProps {
        deleteProductCategoryHandler: any,
        confirmDeleteProductCategoryHandler: any
    }

    const ConfirmDeleteProductCategory = ({deleteProductCategoryHandler, confirmDeleteProductCategoryHandler} : ConfirmDeleteProductCategoryProps) => {
    return (
        <>
        <div className="fixed z-10 overflow-y-auto top-0 w-full left-0">
            <div
            className={cn(
                "flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0"
            )}
            >
            <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
                <div
                className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
                >
                <div className="p-6 text-center">
                    <i className="bx bx-question-mark text-7xl" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this product?
                    </h3>

                    <button
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 mr-2"
                    onClick={confirmDeleteProductCategoryHandler}
                    >
                    Cancel
                    </button>
                    <button
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    onClick={deleteProductCategoryHandler}
                    >
                    Yes
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </>
    );
    };

    export default ConfirmDeleteProductCategory;
