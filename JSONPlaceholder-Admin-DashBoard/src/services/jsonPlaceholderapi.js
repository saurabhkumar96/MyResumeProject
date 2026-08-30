import axios from "axios";

const api = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com",
})

export const allUsers = async ()=>{
    try {
        const response = await api.get("/users")
        return response
    } catch (error) {   
        console.log(`something is error -> ${error.message}`)
    }
}

export const postDetail = async ()=>{
    try {
        const response = await api.get("/posts")
        return response
    } catch (error) {
        
    }
}
export const commentDetail = async ()=>{
    try {
        const response = await api.get("/comments")
        return response
    } catch (error) {
        
    }
}