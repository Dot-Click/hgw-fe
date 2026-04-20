"use client";

import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { GoLock } from 'react-icons/go'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { LuUser } from 'react-icons/lu'
import { MdFacebook, MdOutlineMailOutline } from 'react-icons/md'
import Link from 'next/link'
import { toast } from '@heroui/react'
import { TextField, Label, InputGroup, Button, FieldError, cn } from "@heroui/react";
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { signUpWithEmail, signInSocial } from '@/store/actions/authActions'

const SignUpContainer = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { loading: isLoading, loadingProvider, error: authError } = useAppSelector((state) => state.auth)

    const [agreed, setAgreed] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        const fieldMapping: { [key: string]: string } = {
            'full-name': 'fullName',
            'email': 'email',
            'password': 'password',
            'confirm-password': 'confirmPassword'
        }
        const fieldName = fieldMapping[id] || id
        setFormData((prev) => ({
            ...prev,
            [fieldName]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);

        const { fullName, email, password, confirmPassword } = formData;

        if (!fullName || !email || !password || !confirmPassword || !agreed) {
            if (!agreed && (fullName && email && password && confirmPassword)) toast.danger('You must agree to the terms');
            return;
        }

        if (password !== confirmPassword) {
            toast.danger('Passwords do not match');
            return;
        }

        const resultAction = await dispatch(signUpWithEmail({ email, password, fullName, agreedTerms: agreed }));
        if (signUpWithEmail.fulfilled.match(resultAction)) {
            toast.success('Account created successfully!');
            window.location.href = '/';
        } else {
            const message = resultAction.payload as string || 'Something went wrong';
            toast.danger(message);
        }
    }

    const handleGoogleSignIn = async () => {
        const resultAction = await dispatch(signInSocial('google'));
        if (signInSocial.rejected.match(resultAction)) {
            const message = resultAction.payload as string || 'Something went wrong';
            toast.danger(message);
        }
    };

    const handleFacebookSignIn = async () => {
        const resultAction = await dispatch(signInSocial('facebook'));
        if (signInSocial.rejected.match(resultAction)) {
             const message = resultAction.payload as string || 'Something went wrong';
             toast.danger(message);
        }
    };

    return (
        <div className="min-h-screen outfit flex items-center justify-center px-4 py-8 pt-28 md:pt-32 relative">
            <div className='bg-[#111217FF] gap-5.5 flex flex-col px-5 md:px-7 py-5 items-center justify-center h-fit w-full max-w-[430px] rounded-[22px] border border-[#24262E]'>

                <div className='flex flex-col gap-1.5'>
                    <div className='text-[#E7EBEF] leading-8 orbitron font-[900] text-[20px] md:text-[24px] text-center'>
                        <h1>How Good Was</h1>
                        <h2>account</h2>
                    </div>
                    <p className=' text-[11px] md:text-[16px] text-[#7B899D]'>Join the archive of sporting and cultural legends</p>
                </div>

                <div className='w-full flex flex-col gap-3'>
                    <Button 
                        onClick={handleGoogleSignIn}
                        isDisabled={isLoading}
                        type="button"
                        className='flex justify-center cursor-pointer items-center rounded-[12px] w-full px-4 py-6 border border-[#24262E] bg-[#404040] hover:bg-[#383838] gap-2 transition-all'
                    >
                        <FcGoogle className='text-lg md:text-2xl' />
                        <span className=' text-[13px] md:text-[16px] text-[#FFFFFF] font-[500] outfit'>
                            {loadingProvider === 'google' ? "Connecting..." : "Continue with Google"}
                        </span>
                    </Button>

                    <Button 
                        onClick={handleFacebookSignIn}
                        isDisabled={isLoading}
                        type="button"
                        className='flex justify-center cursor-pointer items-center rounded-[12px] w-full px-4 py-6 border border-[#24262E] bg-[#2258C3] hover:bg-[#1f4eac] gap-2 transition-all'
                    >
                        <MdFacebook className='text-lg md:text-2xl' />
                        <span className=' text-[13px] md:text-[16px] text-[#FFFFFF] font-[500] outfit'>
                            {loadingProvider === 'facebook' ? "Connecting..." : "Continue with Facebook"}
                        </span>
                    </Button>
                </div>

                <div className='flex w-full justify-center items-center gap-2'>
                    <span className='w-[25%] h-px bg-[#24262E]'></span>
                    <span className='text-[8px] md:text-[13px] orbitron text-[#7B899D]'>Or sign up with email</span>
                    <span className='w-[25%] h-px bg-[#24262E]'></span>
                </div>

                {/* form  */}
                <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>

                    {/* full name  */}
                    <TextField
                        className='w-full flex flex-col gap-1'
                        isInvalid={isSubmitted && !formData.fullName}
                    >
                        <Label className='text-[#7B899D] text-[12px] md:text-[14px]'>Full Name</Label>
                        <InputGroup className={cn(
                            'flex w-full items-center gap-4 bg-[#1B1C2280] border rounded-[12px]',
                            isSubmitted && !formData.fullName ? 'border-red-500' : 'border-[#24262E99]'
                        )}>
                            <InputGroup.Prefix>
                                <LuUser className={cn('text-lg md:text-2xl', isSubmitted && !formData.fullName ? 'text-red-500' : 'text-[#7B899D]')} />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                type="text"
                                id="full-name"
                                placeholder='Your full name'
                                value={formData.fullName}
                                onChange={handleChange}
                                className='bg-transparent outline-none w-full text-[#7B899D] text-[14px] md:text-[17px]'
                            />
                        </InputGroup>
                        <FieldError className="text-red-500 text-[12px] mt-1">Full name is required</FieldError>
                    </TextField>


                    {/* email  */}          
                    <TextField
                        className='w-full flex flex-col gap-1'
                        isInvalid={isSubmitted && !formData.email}
                    >
                        <Label className='text-[#7B899D] text-[12px] md:text-[14px]'>Email</Label>
                        <InputGroup className={cn(
                            'flex w-full items-center gap-4 bg-[#1B1C2280] border rounded-[12px]',
                            isSubmitted && !formData.email ? 'border-red-500' : 'border-[#24262E99]'
                        )}>
                            <InputGroup.Prefix>
                                <MdOutlineMailOutline className={cn('text-lg md:text-2xl', isSubmitted && !formData.email ? 'text-red-500' : 'text-[#7B899D]')} />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                type="email"
                                id="email"
                                placeholder='you@email.com'
                                value={formData.email}
                                onChange={handleChange}
                                className='bg-transparent outline-none w-full text-[#7B899D] text-[14px] md:text-[17px]'
                            />
                        </InputGroup>
                        <FieldError className="text-red-500 text-[12px] mt-1">Email is required</FieldError>
                    </TextField>


                    {/* password  */}
                    <TextField
                        className='w-full flex flex-col gap-1'
                        isInvalid={isSubmitted && !formData.password}
                    >
                        <Label className='text-[#7B899D] text-[12px] md:text-[14px]'>Password</Label>
                        <InputGroup className={cn(
                            'flex w-full items-center gap-4 bg-[#1B1C2280] border rounded-[12px]',
                            isSubmitted && !formData.password ? 'border-red-500' : 'border-[#24262E99]'
                        )}>
                            <InputGroup.Prefix>
                                <GoLock className={cn('text-lg md:text-2xl', isSubmitted && !formData.password ? 'text-red-500' : 'text-[#7B899D]')} />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder='********'
                                value={formData.password}
                                onChange={handleChange}
                                className='bg-transparent outline-none w-full text-[#7B899D] text-[14px] md:text-[17px]'
                            />
                            <InputGroup.Suffix onClick={() => setShowPassword(!showPassword)} className='cursor-pointer text-lg md:text-xl'>
                                {showPassword ? <IoEyeOffOutline className={cn(isSubmitted && !formData.password ? 'text-red-500' : 'text-[#7B899D]')} /> : <IoEyeOutline className={cn(isSubmitted && !formData.password ? 'text-red-500' : 'text-[#7B899D]')} />}
                            </InputGroup.Suffix>
                        </InputGroup>
                        <FieldError className="text-red-500 text-[12px] mt-1">Password is required</FieldError>
                    </TextField>


                    {/*confirm password  */}
                    <TextField
                        className='w-full flex flex-col gap-1'
                        isInvalid={isSubmitted && (!formData.confirmPassword || formData.password !== formData.confirmPassword)}
                    >
                        <Label className='text-[#7B899D] text-[12px] md:text-[14px]'>Confirm Password</Label>
                        <InputGroup className={cn(
                            'flex w-full items-center gap-4 bg-[#1B1C2280] border rounded-[12px]',
                            isSubmitted && (!formData.confirmPassword || formData.password !== formData.confirmPassword) ? 'border-red-500' : 'border-[#24262E99]'
                        )}>
                            <InputGroup.Prefix>
                                <GoLock className={cn('text-lg md:text-2xl', isSubmitted && (!formData.confirmPassword || formData.password !== formData.confirmPassword) ? 'text-red-500' : 'text-[#7B899D]')} />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirm-password"
                                placeholder='********'
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className='bg-transparent outline-none w-full text-[#7B899D] text-[14px] md:text-[17px]'
                            />
                            <InputGroup.Suffix onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='cursor-pointer text-lg md:text-xl'>
                                {showConfirmPassword ? <IoEyeOffOutline className={cn(isSubmitted && (!formData.confirmPassword || formData.password !== formData.confirmPassword) ? 'text-red-500' : 'text-[#7B899D]')} /> : <IoEyeOutline className={cn(isSubmitted && (!formData.confirmPassword || formData.password !== formData.confirmPassword) ? 'text-red-500' : 'text-[#7B899D]')} />}
                            </InputGroup.Suffix>
                        </InputGroup>
                        <FieldError className="text-red-500 text-[12px] mt-1">
                            {!formData.confirmPassword ? "Confirm password is required" : "Passwords do not match"}
                        </FieldError>
                    </TextField>
             

                    {/* checkbox  */}
                    <div className='flex items-center gap-2.5 mt-2'>
                        <button
                            type="button"
                            role="checkbox"
                            aria-checked={agreed}
                            onClick={() => setAgreed(prev => !prev)}
                            className={`w-4.5 h-4.5  flex shrink-0 items-center justify-center border rounded-sm transition-all cursor-pointer ${agreed
                                ? 'bg-[#00CCFF] border-[#00CCFF]'
                                : 'bg-[#2F3137] border-[#2F3137]'
                                }`}
                        >
                            {agreed && (
                                <span className='w-[6px] h-[10px] border-r-2 border-b-2 border-black rotate-45 -mt-0.5 block'></span>
                            )}
                        </button>

                        <span
                            className='text-[#7B899D] text-[11px] md:text-[14px]  leading-tight tracking-wider cursor-pointer'
                            onClick={() => setAgreed(prev => !prev)}
                        >
                            I agree to the <span className='text-[#00CCFF] hover:underline'>Terms</span> and <span className='text-[#00CCFF] hover:underline'>Privacy Policy</span>
                        </span>
                    </div>


                    {/* Sign up button  */}
                    <Button
                        type="submit"
                        isDisabled={isLoading}
                        className='w-full mt-2 cursor-pointer bg-[linear-gradient(97.81deg,#00CCFF_0%,#3377FF_100%)] hover:bg-[linear-gradient(97.81deg,#05aad3_0%,#3377FF_100%)] text-[#0B0B0F] font-[700] py-2.5 md:py-5 rounded-[12px] transition-colors orbitron text-[13px] md:text-[15px]'
                    >
                        {loadingProvider === 'email' ? "Creating Account..." : "Create Account"}
                    </Button>

                    <p className='text-[#7B899D] flex items-center  justify-center gap-2 text-[12px] md:text-[15px] text-center'>
                        Already have an account? <Link href="/login" className='text-[#00CCFF] font-[500] hover:underline'>Sign In</Link>
                    </p>

                </form>

            </div>

        </div>
    )
}

export default SignUpContainer;
