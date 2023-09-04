import { createContext, Dispatch } from "react";

export const PopUpContext = createContext<Dispatch<any> | null>(null);
