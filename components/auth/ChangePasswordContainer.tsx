"use client";

import { useState, useEffect } from 'react'
import { IoArrowBackOutline, IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { GoLock } from 'react-icons/go'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from '@heroui/react'
import { TextField, Label, InputGroup, Button, FieldError, cn, Spinner } from "@heroui/react";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resetPassword } from '@/store/actions/authActions';
import { resetAuthStatus } from '@/store/slices/authSlice';

const ChangePasswordContainer = () => {
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    
    const dispatch = useAppDispatch();
    const { loading, error, resetPasswordSuccess } = useAppSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    })

    useEffect(() => {
        setMounted(true);
        if (!token) {
            toast.danger('Invalid or missing reset token');
            router.push('/login');
        }
        return () => {
            dispatch(resetAuthStatus());
        }
    }, [dispatch, token, router]);

    useEffect(() => {
        if (resetPasswordSuccess) {
            toast.success('Password updated successfully!');
            router.push('/login');
        }
    }, [resetPasswordSuccess, router]);

    useEffect(() => {
        if (error) {
            toast.danger(error);
        }
    }, [error]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [id === 'confirm-password' ? 'confirmPassword' : 'password']: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);

        const { password, confirmPassword } = formData;

        if (!password || !confirmPassword) {
            return;
        }

        if (password !== confirmPassword) {
            return;
        }

        if (password.length < 8) {
            toast.danger('Password must be at least 8 characters long');
            return;
        }

        if (!token) return;

        dispatch(resetPassword({ newPassword: password, token }));
    }

    if (!mounted) return null;

    return (
        <div className="min-h-screen outfit flex items-center justify-center px-4 py-8 pt-28 md:pt-32">

            <div className='bg-[#111217FF] gap-4 flex flex-col px-5 md:px-7 py-6 items-center justify-center h-fit w-full max-w-[440px] rounded-[22px] border border-[#24262E]'>

                <div className='flex flex-col items-center text-center md:leading-9 mb-2'>
                    <h1 className='text-[#E7EBEF] font-bold orbitron text-[18px] md:text-[27px]'>Change Password</h1>
                    <p className='text-[11px] md:text-[15px] text-[#7B899D]'>Create a new secure password for your account.</p>
                </div>

                {/* form  */}
                <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>

                    {/* password  */}
                    <TextField
                        className='w-full flex flex-col gap-1'
                        isInvalid={isSubmitted && !formData.password}
                    >
                        <Label className='text-[#7B899D] text-[12px] md:text-[14px]'>New Password</Label>
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
                                disabled={loading}
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
                                disabled={loading}
                            />
                            <InputGroup.Suffix onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='cursor-pointer text-lg md:text-xl'>
                                {showConfirmPassword ? <IoEyeOffOutline className={cn(isSubmitted && (!formData.confirmPassword || formData.password !== formData.confirmPassword) ? 'text-red-500' : 'text-[#7B899D]')} /> : <IoEyeOutline className={cn(isSubmitted && (!formData.confirmPassword || formData.password !== formData.confirmPassword) ? 'text-red-500' : 'text-[#7B899D]')} />}
                            </InputGroup.Suffix>
                        </InputGroup>
                        <FieldError className="text-red-500 text-[12px] mt-1">
                            {!formData.confirmPassword ? "Confirm password is required" : "Passwords do not match"}
                        </FieldError>
                    </TextField>

                    {/* Action button  */}
                    <Button
                        type="submit"
                        isDisabled={loading || !token}
                        className='w-full mt-2 cursor-pointer bg-[linear-gradient(97.81deg,#00CCFF_0%,#3377FF_100%)] hover:bg-[linear-gradient(97.81deg,#05aad3_0%,#3377FF_100%)] text-[#0B0B0F] font-bold py-3.5 md:py-6 rounded-[14px] transition-all duration-300 orbitron text-[13px] md:text-[15px] shadow-[0_0_20px_#00CCFF33]'
                    >
                        {loading ? <Spinner size="sm" color="current" /> : "Update Password"}
                    </Button>

                    <Link href="/login" className='text-[#00CCFF] flex items-center justify-center gap-2 text-[13px] md:text-[15px] text-center font-medium hover:text-[#00e1ff] transition-all group mt-2'>
                        <span className='group-hover:-translate-x-1 transition-transform'><IoArrowBackOutline /></span>
                        <span>Back to Login</span>
                    </Link>

                </form>

            </div>

        </div>
    )
}

export default ChangePasswordContainer;
