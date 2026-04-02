"use client";

import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { GoLock } from 'react-icons/go'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { MdOutlineMailOutline } from 'react-icons/md'
import Link from 'next/link'
import { toast } from '@heroui/react'

import { TextField, Label, InputGroup, Button, FieldError, cn } from "@heroui/react";

const Login = () => {
  const [loginType, setLoginType] = useState('user') // 'user' or 'admin'
  const [agreed, setAgreed] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    const fieldMapping: { [key: string]: string } = {
      'email': 'email',
      'password': 'password',
    }
    const fieldName = fieldMapping[id] || id
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    const { email, password } = formData

    if (!email || !password) {
      return
    }

    console.log(`${loginType === 'user' ? 'User' : 'Admin'} Login Details:`, { ...formData, agreed })
    toast.success('Logged In Successfully!')
  }

  return (
    <div className="min-h-screen outfit flex items-center justify-center px-4 py-8 pt-28 md:pt-32">

      <div className='bg-[#111217FF] gap-5.5 flex flex-col px-5 md:px-7 py-6 items-center justify-center h-fit w-full max-w-[430px] rounded-[22px] border border-[#24262E]'>

        {/* logo */}
        <div
          className="flex items-center gap-2 orbitron bg-[#00CCFF1A] shadow-[0_0_10px_#00CCFF1A,0_0_20px_#00CCFF4D]
               text-[15px] md:text-[20px] px-2 py-4 border  border-[#00CCFF80] text-[#00CCFF] font-medium rounded-[12px] transition-all duration-300"
        >
          <span>HGW</span>
        </div>


        <div className='flex flex-col items-center leading-7'>
          <h1 className='text-[#E7EBEF] font-bold orbitron text-[21px] md:text-[27px]'>Welcome Back</h1>
          <p className='text-[13px] md:text-[16px] text-[#7B899D]'>Access the HGW Legend Vault</p>
        </div>

        {/* Login Type Toggle */}
        <div className='w-full p-1.5 flex items-center rounded-[12px] border border-[#24262E] bg-[#1B1C22]'>
          <button
            type="button"
            onClick={() => setLoginType('user')}
            className={`flex-1 py-2.5 rounded-[10px] text-[12px] md:text-[15px] font-bold orbitron transition-all duration-300 cursor-pointer ${loginType === 'user'
              ? 'bg-[#00CCFF] text-[#0B0B0F] shadow-[0_0_15px_#00CCFF4D]'
              : 'text-[#7B899D] hover:text-[#FFFFFF]'
              }`}
          >
            User Login
          </button>
          <button
            type="button"
            onClick={() => setLoginType('admin')}
            className={`flex-1 py-2.5 rounded-[10px] text-[12px] md:text-[15px] font-bold orbitron transition-all duration-300 cursor-pointer ${loginType === 'admin'
              ? 'bg-[#00CCFF] text-[#0B0B0F] shadow-[0_0_15px_#00CCFF4D]'
              : 'text-[#7B899D] hover:text-[#FFFFFF]'
              }`}
          >
            Admin Login
          </button>
        </div>

        {/* form  */}
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>

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


          {/* checkbox  */}
          <div className='flex items-center justify-between mt-1'>
            <div className='flex items-center gap-2.5'>
              <button
                type="button"
                role="checkbox"
                aria-checked={agreed}
                onClick={() => setAgreed(prev => !prev)}
                className={`w-4.5 h-4.5 flex shrink-0 items-center justify-center border rounded-sm transition-all cursor-pointer ${agreed
                  ? 'bg-[#00CCFF] border-[#00CCFF]'
                  : 'bg-[#2F3137] border-[#2F3137]'
                  }`}
              >
                {agreed && (
                  <span className='w-[6px] h-[10px] border-r-2 border-b-2 border-black rotate-45 -mt-0.5 block'></span>
                )}
              </button>
              <span
                className='text-[#7B899D] text-[14px] leading-tight cursor-pointer'
                onClick={() => setAgreed(prev => !prev)}
              >
                Remember me
              </span>
            </div>
            <Link href="/forgot-password" className='text-[#00CCFF] text-[12px] md:text-[14px] hover:underline'>Forgot Password?</Link>
          </div>


          {/* Sign in button  */}
          <Button type="submit" className='w-full mt-2   cursor-pointer bg-[linear-gradient(97.81deg,#00CCFF_0%,#3377FF_100%)] hover:bg-[linear-gradient(97.81deg,#05aad3_0%,#3377FF_100%)] text-[#0B0B0F] font-bold py-2 md:py-5 rounded-[12px] transition-colors orbitron text-[12px] md:text-[15px]'>
            SIGN IN
          </Button>

          <p className='text-[#7B899D] flex items-center justify-center gap-1 text-[12px] md:text-[15px] text-center'>
            Don't have an account? <Link href="/signup" className='text-[#00CCFF] font-medium hover:underline'>Sign Up</Link>
          </p>

        </form>

      </div>

    </div>
  )
}

export default Login