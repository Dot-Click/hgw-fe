"use client";

import { useState } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { MdOutlineMailOutline } from 'react-icons/md'
import Link from 'next/link'
import { toast } from '@heroui/react'
import { TextField, Label, InputGroup, Button, FieldError, cn } from "@heroui/react";

const ResetPassword = () => {
    const [email, setEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitted(true)

        if (!email) {
            return
        }

        console.log('Reset Password Request for:', email)
        toast.success('Reset link sent to your email!')
    }

    return (
        <div className="min-h-screen outfit flex items-center justify-center px-4 py-8 pt-28 md:pt-32">

            <div className='bg-[#111217FF] gap-4 flex flex-col px-5 md:px-7 py-6 items-center justify-center h-fit w-full max-w-[440px] rounded-[22px] border border-[#24262E]'>

                <div className='flex flex-col items-center text-center md:leading-9 mb-2'>
                    <h1 className='text-[#E7EBEF] font-bold orbitron text-[18px] md:text-[27px]'>Reset Your Password</h1>
                    <p className='text-[11px] md:text-[15px] text-[#7B899D]'>Enter your email and we'll send a reset link.</p>
                </div>

                {/* form  */}
                <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>

                    {/* email  */}
                    <TextField
                        className='w-full flex flex-col gap-1'
                        isInvalid={isSubmitted && !email}
                    >
                        <Label className='text-[#7B899D] text-[12px] md:text-[14px]'>Email</Label>
                        <InputGroup className={cn(
                            'flex w-full items-center gap-4 bg-[#1B1C2280] border rounded-[12px]',
                            isSubmitted && !email ? 'border-red-500' : 'border-[#24262E99]'
                        )}>
                            <InputGroup.Prefix>
                                <MdOutlineMailOutline className={cn('text-lg md:text-2xl', isSubmitted && !email ? 'text-red-500' : 'text-[#7B899D]')} />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                type="email"
                                id="email"
                                placeholder='you@email.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='bg-transparent outline-none w-full text-[#7B899D] text-[14px] md:text-[17px]'
                            />
                        </InputGroup>
                        <FieldError className="text-red-500 text-[12px] mt-1">Email is required</FieldError>
                    </TextField>

                    {/* Action button  */}
                    <Button
                        type="submit"
                        className='w-full mt-2 cursor-pointer bg-[linear-gradient(97.81deg,#00CCFF_0%,#3377FF_100%)] hover:bg-[linear-gradient(97.81deg,#05aad3_0%,#3377FF_100%)] text-[#0B0B0F] font-bold py-3.5 md:py-6 rounded-[14px] transition-all duration-300 orbitron text-[13px] md:text-[15px] shadow-[0_0_20px_#00CCFF33]'
                    >
                        Send Reset Link
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

export default ResetPassword