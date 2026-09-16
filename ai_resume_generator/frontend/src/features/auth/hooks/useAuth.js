import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import { getMe, login, logout, register } from "../services/auth.api.js";


export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context


    const handleRegister = async ({ username, email, password }) => {
        try {
            setLoading(true)
            const data = await register({ username, email, password })
            setUser(data.user)
            
        } catch (error) {
            console.log(error.message)
        }
        finally {
            setLoading(false)
        }
    }


    const handleLogin = async ({ email, password }) => {
        try {
            setLoading(true)
            const data = await login({ email, password })
            setUser(data.user)
        } catch (error) {
            console.log(error.message)
        }
        finally {
            setLoading(false)
        }
    }


    const handleLogout = async () => {
        try {
            setLoading(true)
            const data = await logout()
            setUser(null)
        } catch (error) {
            console.log(error.message)
        }
        finally {
            setLoading(false)
        }
    }

        useEffect(() => {
        const getadndSetUser = async () => {
            try {
                setLoading(true)
                const data = await getMe()
                setUser(data.user)
            } catch (error) {
                console.log(error.message)
            }
            finally {
                setLoading(false)
            }
        }
        getadndSetUser()
    },[])

    return { user, loading, handleLogin, handleRegister, handleLogout }
}
