import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";

const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
}

export default cn