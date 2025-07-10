import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import {Button, Input, Logo} from './index'
import { useForm } from "react-hook-form";


function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [signupError, setSignupError] = useState('');
    const {register, handleSubmit, formState: {errors}, setError} = useForm();

    const signupMethod = async(data) => {
        setSignupError('');
        try {
            const session = await authService.createAccount(data);
            if (session)
            {
                const userData = await authService.getCurrentUser();
                dispatch(login(userData));
                navigate('/');
            }
        } catch (signupError) {
            setSignupError(signupError.message)
        }
    }


    useEffect(() => {
        setError('password', {
            type: 'manual',
            message: 'Password should be 8 char long atleast'
        })
    }, [setError])
    return (
        <div
        className="flex items-center justify-center w-full"
        >
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%"/>
                    </span>
                </div>

                <h2 className="text-center text-2l font-bold leading-tight">Create your account</h2>

                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account? &nbsp;
                    <Link to='/login' className="font-medium text-primary transition-all duration-200 hover:underline">Login</Link>
                </p>

                {signupError && <p className="text-red-600 mt-8 text-center">{signupError}</p>}

                <form onSubmit={handleSubmit(signupMethod )} className="py-2">
                    <div className="space-y-5">
                        <Input 
                        label="Full Name: "
                        placeholder="Enter your full name"
                        className='py-1 border-black mb-0 p-2 rounded-lg border'
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        type="email"
                        label="Email: "
                        placeholder="Enter your email address"
                        className='py-1 p-2 rounded-lg border border-black mt-0'
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm.test(value) || "Enter a valid email address",
                            }
                        })}
                        />
                        <Input 
                        type="password"
                        label="Password: "
                        placeholder="Enter your password"
                        className='py-1 border-black p-2 rounded-lg border'
                        {...register("password", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value) || "Enter a valid password"
                            }
                        })}
                        />
                        {errors.password && (<p>{errors.password.message}</p>)}
                        <Button type='submit' className="w-full cursor-pointer">Create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;