// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const AuthLayout = ({ authentication = true, children }) => {

    const authStatus = useSelector((state) => state.auth.status);

    const navigate = useNavigate();

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        // if (authentication && authStatus !== authentication) {
        //     navigate("/login");
        // }
    }, [authentication, navigate, authStatus])

    return (
        <>
            {children}
        </>
    )
}

export default AuthLayout