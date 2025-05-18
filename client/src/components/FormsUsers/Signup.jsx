import { If, useObjectState } from 'mg-js'
import React, { useEffect, useState } from 'react'
import { apiPost } from '../../services/apiRequest'
import { SIGNUP_URL } from '../../constant/urls'
import { useNavigate } from 'react-router-dom'

// הדף של יצירת משתמש
const Signup = () => {
    const [form, setForm] = useObjectState(["name", "email", "password"])
    const [error, setError] = useState("")
    const nav = useNavigate()
    const signUp = async (e) => {
        e.preventDefault()
        try {
            await apiPost(SIGNUP_URL, form)
            nav("/login")
        } catch (error) {
            if (error.response.status == 400) {
                setError("you already have an account pleas login")
            }
        }
    }
    return (
        <form className='mx-auto w-50 border border-2 rounded p-3 mt-4'>
            <label>name</label>
            <input onChange={(e) => setForm("name", e.target.value)} className='form-control' placeholder='enter your name' />
            <label>email</label>
            <input onChange={(e) => setForm("email", e.target.value)} className='form-control' placeholder='enter your email' />
            <label>password</label>
            <input onChange={(e) => setForm("password", e.target.value)} className='form-control' placeholder='enter your password' />
            <div className='d-flex justify-content-center'>
                <button onClick={signUp} className='btn btn-success mt-3'>send</button>
            </div>
            <If condition={error}>
                <p className='text-danger mt-4'>{error}</p>
            </If>


        </form>
    )
}

export default Signup