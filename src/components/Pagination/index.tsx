import {IPage} from "@/types/IPage";
import {cn} from "@/utils";

export interface PageProps {
    page: IPage,
    onChangePageHandler:any
}

const Pagination = ({page, onChangePageHandler, ...props} : PageProps) => {
    if (!page){
        return (<></>)
    }
    const firstPage = page.page <= 0
    const lastPage = page.last
    const pages = []
    for (let i = 0; i < page.total_pages; i++){
        pages.push(i)
    }
    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px">
                    {
                        !firstPage && <li>
                            <button type="button" onClick={() => onChangePageHandler(page.page - 1)} className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700" >Previous</button>
                        </li>
                    }
                    {
                        pages.map((p, i) => (
                            <li key={p}>
                                <button type="button" onClick={() => onChangePageHandler(p)} className={cn("px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700", p === page.page && "bg-slate-300 cursor-not-allowed")} disabled={p === page.page} >{p + 1}</button>
                            </li>
                        ))
                    }
                    {
                        !lastPage && <li>
                            <button type="button" onClick={() => onChangePageHandler(page.page + 1)} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700" >Next</button>
                        </li>
                    }
                </ul>
            </nav>

        </>
    )
}

export default Pagination