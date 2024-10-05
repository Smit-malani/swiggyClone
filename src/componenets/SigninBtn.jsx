import { signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import React from "react";
import { auth, provider } from "../config/firebaseAuth";
import { useDispatch, useSelector } from "react-redux";
import { addUserData, removeUserData } from "../utils/authSlice";
import { useNavigate } from "react-router-dom";
import { loginTooggle } from "../utils/toogleSlice";

function SigninBtn(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.authSlice.userData)

    async function handleAuth(){
        let data = await signInWithPopup(auth,provider)
        const userData = {
            name : data.user.displayName,
            photo : data.user.photoURL
        }
    dispatch(addUserData(userData))
    dispatch(loginTooggle())
    navigate("/")
    }

    async function handleLogout() {
        await signOut(auth)
        dispatch(removeUserData())
        dispatch(loginTooggle())
    }

    return(
        <>
            {
                userData ? <button className="my-5 w-full text-xl p-3 bg-orange-500 text-white" onClick={handleLogout}>
                Logout
            </button> : <button onClick={handleAuth} className="my-5 w-full text-xl p-3 bg-orange-500 text-white"> Login With Google</button>

            }
           
        </>
    )
}

export default SigninBtn