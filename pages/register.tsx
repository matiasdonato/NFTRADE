// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import darkImage from '@assets/logoDark.png'
import lightImage from '@assets/logoLight.png'
import SvgLoading from '@components/icons/svgLoading'
import axios from 'axios'
import { useFormik } from 'formik'
import {
  handleBlurEmail,
  handleBlurPassword,
  handleBlurUserName,
  registerValidate,
} from 'hook/validate'
import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi'
import styles from '../styles/form.module.css'

const SignIn: NextPage = () => {
  const { data: session, status } = useSession()
  const [show, setShow] = useState({ password: false, cpassword: false })
  const router = useRouter()
  const { theme } = useTheme()
  const [codeModal, setCodeModal] = useState(false)
  const [codeInput, setCodeInput] = useState('')
  const [loadingRegister, setLoadingRegister] = useState(false)

  useEffect(() => {
    if (session) router.push('/')
  }, [router, session, status])

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      cpassword: '',
    },
    validate: registerValidate,
    onSubmit,
  })

  async function onSubmit(values: {
    username: string
    email: string
    password: string
    cpassword: string
  }) {
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      }
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/signup`, options)
        .then((res) => res.json())
        .then(async (res) => {
          if (res.msg === 'ok') {
            try {
              const lucas = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
                callbackUrl: '/',
              })
              const yo = await JSON.stringify(lucas, null)
              if (!yo.includes('true')) {
                toast.error('Something went wrong. Try again!')
              }
            } catch (error) {
              toast.error('An error occurred while logging in', {
                duration: 5000,
              })
              router.push('/login')
            }
          }
        })
    } catch (error) {
      toast.error('An error occurred while registering.', { duration: 3000 })
      router.push('/register')
    }
  }

  const [code] = useState(Math.floor(Math.random() * 1000000))

  async function sendVerificationCode() {
    const res = await axios.post('/api/auth/verification', {
      mail: formik.values.email,
      code,
      name: formik.values.username,
    })
    if (res.status === 200) {
      console.log('email send')
    }
  }

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0 bg-gray-200 dark:bg-[#202225] transition-all">
        <Head>
          <title>NFTrade | Register</title>
        </Head>
        <div className="flex flex-col sm:flex-row justify-center items-center w-full">
          <div
            className={` ${
              codeModal === true ? 'flex' : 'hidden'
            } fixed flex-col justify-center gap-[10px] items-center p-[20px] lg:p-[60px] max-w-[80%] rounded-[15px] top-[50%] translate-y-[-50%] z-10 text-gray-600 shadow-lg bg-gray-100 dark:text-white dark:bg-[#292c30] dark:border-gray-700  `}
          >
            <h3 className="text-gray-600 text-center dark:text-white text-lg font-bold uppercase">
              We need to verify your account
            </h3>
            <p className="text-gray-600 text-center dark:text-white uppercase">
              Please enter the code we emailed to you:
            </p>
            <input
              type="number"
              className=" text-center my-[20px] text-[1.6rem] font-bold rounded-[5px] w-[80%] h-[70px] "
              value={codeInput}
              onChange={(e) => {
                if (e.target.value.length < 7) {
                  setCodeInput(e.target.value)
                }
              }}
            />
            {loadingRegister === true ? (
              <div className="bg-gray-100 text-gray-600 max-w-[200px]  dark:bg-[#303339]  dark:text-white transition-all rounded-[10px] py-2 text-lg w-[80%] disabled:cursor-not-allowed disabled:scale-[1] dark:disabled:bg-[#303339] h-[50px]  font-bold uppercase flex justify-center items-center">
                <div className="animate-spin flex justify-center items-center ml-1 w-[25px] h-[25px] rounded-full">
                  <SvgLoading className="max-sm:w-5 max-sm:h-5" />
                </div>
              </div>
            ) : (
              <button
                disabled={parseInt(codeInput) !== code}
                className=" bg-gray-100 text-gray-600 max-w-[200px] hover:bg-gray-200 dark:bg-[#303339] dark:hover:bg-[#393b41] dark:text-white transition-all rounded-[10px] py-2 text-lg w-[80%] disabled:cursor-not-allowed disabled:scale-[1] dark:disabled:bg-[#303339] h-[50px] hover:scale-105 font-bold uppercase"
                onClick={() => {
                  setLoadingRegister(true)
                  formik.handleSubmit()
                }}
              >
                Register
              </button>
            )}
          </div>
          <div
            className={` ${
              codeModal === true &&
              'blur-[6.5px] opacity-55 pointer-events-none'
            } flex flex-col items-center justify-center transition-all w-full max-w-md bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-[#202225] dark:border-gray-700 pb-5`}
          >
            <div className="flex items-center cursor-pointer">
              <Link href="/">
                <a>
                  <Image
                    src={theme === 'light' ? lightImage : darkImage}
                    alt="logo"
                    height={150}
                    width={260}
                  />
                </a>
              </Link>
            </div>
            <div className="flex flex-col items-center w-full">
              <h1 className=" text-4xl font-semibold text-gray-600 dark:text-white">
                Join our world
              </h1>
              <h3 className="reg-subtitle text-xl text-left text-gray-600 dark:text-gray-400">
                Tell us about you...
              </h3>
              <form
                className="flex flex-col items-center py-4 gap-8 w-full"
                onSubmit={() => {
                  setCodeModal(true)
                  sendVerificationCode()
                }}
              >
                <div
                  className={`flex border rounded-xl  w-4/5 px-4 py-1 justify-between text-lg ${
                    formik.errors.username && formik.touched.username
                      ? 'border-rose-600'
                      : ''
                  }`}
                >
                  <input
                    className={`bg-transparent focus:outline-none w-full text-gray-600 dark:text-gray-400 ${styles.input_text}`}
                    type="text"
                    placeholder={'Username'}
                    {...formik.getFieldProps('username')}
                    onBlur={handleBlurUserName}
                  />
                  <span className="icon flex items-center pl-2">
                    <HiOutlineUser size={28} />
                  </span>
                </div>
                <div
                  className={`flex border rounded-xl relative w-4/5 px-4 py-1 justify-between text-lg ${
                    formik.errors.email && formik.touched.email
                      ? 'border-rose-600'
                      : ''
                  }`}
                >
                  <input
                    className={`bg-transparent focus:outline-none w-full text-gray-600 dark:text-gray-400 ${styles.input_text}`}
                    type="email"
                    placeholder={'Email'}
                    {...formik.getFieldProps('email')}
                    onBlur={handleBlurEmail}
                  />
                  <span className="icon flex items-center pl-2">
                    <HiAtSymbol size={28} />
                  </span>
                </div>

                <div
                  className={`flex border rounded-xl relative w-4/5 px-4 py-1 justify-between text-lg ${
                    formik.errors.password && formik.touched.password
                      ? 'border-rose-600'
                      : ''
                  }`}
                >
                  <input
                    className={`bg-transparent focus:outline-none w-full text-gray-600 dark:text-gray-400 ${styles.input_text}`}
                    type={`${show.password ? 'text' : 'password'}`}
                    placeholder={'Password'}
                    {...formik.getFieldProps('password')}
                    onBlur={handleBlurPassword}
                  />
                  <span
                    className="icon flex items-center pl-2"
                    onClick={() =>
                      setShow({ ...show, password: !show.password })
                    }
                  >
                    <HiFingerPrint size={28} />
                  </span>
                </div>

                <div
                  className={`flex border rounded-xl relative w-4/5 px-4 py-1 justify-between text-lg ${
                    formik.errors.cpassword && formik.touched.cpassword
                      ? 'border-rose-600'
                      : ''
                  }`}
                >
                  <input
                    className={`bg-transparent focus:outline-none w-full text-gray-600 dark:text-gray-400 ${styles.input_text}`}
                    type={`${show.cpassword ? 'text' : 'password'}`}
                    placeholder={'Confirm Password'}
                    {...formik.getFieldProps('cpassword')}
                    onBlur={handleBlurPassword}
                  />
                  <span
                    className="icon flex items-center pl-2"
                    onClick={() =>
                      setShow({ ...show, cpassword: !show.cpassword })
                    }
                  >
                    <HiFingerPrint size={28} />
                  </span>
                </div>
              </form>
              <button
                disabled={formik.isValid === false}
                className="bg-gray-100 my-[10px] text-gray-600 hover:bg-gray-200 dark:bg-[#303339] dark:hover:bg-[#393b41] dark:text-white transition-all rounded-full py-2 text-lg w-4/5 hover:scale-105 font-bold disabled:cursor-not-allowed dark:disabled:hover:bg-zinc-800 dark:disabled:hover:scale-[1] dark:disabled:bg-zinc-800 uppercase"
                onClick={() => {
                  setCodeModal(true)
                  sendVerificationCode()
                }}
              >
                Register
              </button>
            </div>

            <p className="text-center text-sm mt-3 text-gray-600 dark:text-gray-400">
              already have an account?{' '}
              <Link href={'/login'}>
                <a className="text-blue-700 dark:text-blue-500 hover:underline transition-all">
                  log in
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default SignIn
