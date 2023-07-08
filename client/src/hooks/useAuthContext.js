import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuthContext = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw Error("useAuthContext can only be used within the AuthContextProvider")
    }
    return context //returns user state and dispatch f/n
}
export default useAuthContext