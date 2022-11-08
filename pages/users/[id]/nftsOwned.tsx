/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-undef */
import Footer from '@components/footer'
import SvgCoin from '@components/icons/svgCoin'
import NavBar from '@components/navbar/navbar'
import getUserById from '@lib/api/users/getUserById'
import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { UserDetailResponse } from 'types/api-responses'
import defaultAvatar from '/assets/avataricon.png'

interface Props {
  user: UserDetailResponse
}

const UserDetail: NextPage<Props> = ({ user }) => {
  const { data: session } = useSession()
  const account = session?.user

  const [nfts, setNfts] = useState(user.nftsOwned)

  const [orderMenu, setOrderMenu] = useState(false)

  const openOrderMenu = () => {
    setOrderMenu(!orderMenu)
  }

  return (
    <div>
      <NavBar />
      <div>
        <div className="h-[350px] bg-slate-900"></div>
        <div className=" h-[185px] w-[185px] absolute top-[225px] left-[60px] rounded-full  border-[8px] border-white ">
          <Image
            width={175}
            height={175}
            className=" bg-white rounded-full object-cover h-[175px] w-[175px]"
            src={account?.image || defaultAvatar}
          />
        </div>
        <div className="mt-[100px] mb-[60px] ">
          {/* <div>
            <button
              id="dropdownButton"
              className="bg-gray-700 text-white hover:bg-gray-500 dark:bg-[#303339] dark:hover:drop-shadow-lg transition-all font-medium rounded-lg text-xl px-14 py-3 m-3 text-left flex items-center"
              type="button"
              onClick={openOrderMenu}
            >
              Order by <SvgChevron className="ml-4 w-4 h-4" />
            </button>
            <div
              className={`absolute before:absolute top-[523px] left-[40px] z-10 w-44  rounded shadow bg-gray-700 ${
                orderMenu ? '' : 'hidden'
              } ${styles.orderByMenu}`}
            >
              <div
                onClick={openOrderMenu}
                className={` w-full h-screen -z-10 fixed top-0 left-0  ${
                  orderMenu ? '' : 'hidden'
                }`}
              ></div>
              <ul className="py-2 text-lg text-gray-200">
                <li className="block py-2 px-4 hover:bg-gray-600 hover:text-white cursor-pointer">
                  Oldest
                </li>
                <li className="block py-2 px-4 hover:bg-gray-600 hover:text-white cursor-pointer">
                  Newest
                </li>
              </ul>
            </div>
          </div> */}
          <div className="flex justify-center">
            <div className="flex min-h-[900px] p-8 border-[1px] border-gray-400 rounded-[15px] w-[93%] flex-wrap">
              {nfts.length > 0 ? (
                nfts.map((el) => (
                  <div
                    key={el.id}
                    className={`w-[30%] mr-10 max-w-[287px] h-[380px] overflow-hidden relative flex flex-col bg-gray-800 rounded-xl p-[1px] border-slate-900 cursor-pointer group`}
                  >
                    <Link href={`/nfts/${el.id}`} key={el.id}>
                      {/* // h-[35rem] w-[22rem] */}
                      <div>
                        <div className="rounded-xl border-spacing-2 ">
                          <Image
                            src={el.image}
                            height={300}
                            width={400}
                            quality={20}
                            alt={`image-${el.name}`}
                            className="rounded-t-xl object-cover group-hover:scale-110 transition duration-300 ease-in-out overflow-auto"
                          />
                        </div>
                        <div className="flex flex-col p-4 w-full justify-between ">
                          <div className="flex flex-col gap-2">
                            <div className="flex flex-row w-full justify-between">
                              <h5
                                className={`text-xl text-white font-bold truncate ease duration-300`}
                              >
                                {el.name}
                              </h5>
                            </div>
                          </div>
                          <div className="flex flex-row justify-between items-center mb-6">
                            <div className="flex flex-row justify-center items-center gap-2">
                              <span>
                                <SvgCoin
                                  height={20}
                                  width={20}
                                  className={'fill-white'}
                                />
                              </span>
                              <span className="text-white font-semibold text-xl">
                                {el.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="h-[330px]">
                  <p>There are no nfts owned yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await getUserById({ id: params?.id as string })
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: data,
    },
  }
}

export default UserDetail
