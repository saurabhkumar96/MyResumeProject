import { useState } from "react";

export function useFetch(){
    const [data, setData] = useState("hello")
    return {data}
}