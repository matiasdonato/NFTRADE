// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Footer from '@components/footer'
import SvgCoin from '@components/icons/svgCoin'
import SvgLoading from '@components/icons/svgLoading'
import SvgTrash from '@components/icons/svgTrash'
import NavBar from '@components/navbar/navbar'
import { useCart } from '@context/cart'
import getCollectionById from '@lib/api/collections/getCollectionById'
import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { RiVipCrownFill } from 'react-icons/ri'
import type { CollectionDetailResponse } from 'types/api-responses'

interface Props {
  collection: CollectionDetailResponse
}

const CollectionDetail: NextPage<Props> = ({ collection }) => {
  const { data: session } = useSession()
  const { cart, addItem } = useCart()
  const router = useRouter()
  const [admin, setAdmin] = useState(false)
  const [coins, setCoins] = useState(null)
  const [buyModal, setBuyModal] = useState(false)
  const [logModal, setLogModal] = useState(false)
  const [noCoins, setNoCoins] = useState(false)
  let loadingBuy = false

  useEffect(() => {
    async function getAdmin() {
      await fetch(`/api/user/${session?.user.id}/getIsAdmin/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((r) => r.json())
        .then((r) => setAdmin(r))
    }

    let id

    if (session) {
      id = session.user.id
    }

    async function getCoins() {
      id
        ? await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/${id}`)
            .then((res) => res.json())
            .then((res) => {
              setCoins(res.coins)
            })
        : setCoins(undefined)
      console.log('hola')
    }
    getAdmin()
    setTimeout(getCoins, 5000)
  }, [session])

  if (coins === null) {
    loadingBuy = true
  } else {
    loadingBuy = false
  }

  const [loadingPublished, setLoadingPublished] = useState(false)

  const [published, setPublished] = useState(collection.published)

  async function handlePublished(boolean: boolean) {
    const nftsId = collection.nfts.map((nft) => nft.id)
    setLoadingPublished(true)
    setPublished(boolean)

    await fetch('/api/put/published', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nftsId: nftsId,
        published: boolean,
      }),
    }).then((r) => console.info(r))
    await fetch('/api/put/publishedCollection', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collectionId: collection.id,
        published: boolean,
      }),
    }).then((r) => console.info(r))
    setLoadingPublished(false)
  }

  const [deleteWarning, setDeleteWarning] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  async function deleteNft() {
    setDeleteLoading(true)
    const nftsId = collection.nfts.map((nft) => nft.id)
    await fetch('/api/put/collectionPutErased', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: collection.id,
        nftsId: nftsId,
      }),
    })
    setDeleteLoading(false)
    router.push(`/`)
  }

  function buyFilter() {
    setLoadingPublished(true)
    if (session === undefined) {
      setLogModal(true)
      setLoadingPublished(false)
    } else if (coins < collection.price) {
      setNoCoins(true)
      setLoadingPublished(false)
    } else {
      setBuyModal(true)
    }
  }

  async function handleBuy() {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/collections/buy`,
      {
        collection: collection,
        nfts: collection.nfts,
        comprador: session?.user,
      },
    )
    console.log(res)
    if (res.status === 200) {
      console.log('comprado')
      router.push(`/users/${session?.user.id}/collectionsOwned`)
    } else {
      console.log('error')
    }
  }

  return (
    <div className="bg-gray-200 dark:bg-[#202225] flex flex-col items-center justify-around w-full min-h-screen transition-all">
      <NavBar />
      <div
        className={`${
          buyModal === true ? 'flex' : 'hidden'
        } flex-col items-center justify-evenly w-[320px] p-[15px] h-[200px] lg:w-[600px] lg:h-[300px] fixed z-[1] top-[50%] translate-y-[-50%] bg-zinc-100 rounded-[6px] shadow-lg border-[2px] dark:bg-zinc-900 dark:border-zinc-800 border-zinc-200 shadow-black`}
      >
        <p className="text-gray-600 dark:text-gray-100 w-[260px] lg:w-auto lg:text-[1.2rem] text-center font-[500]">
          Are you sure you want to buy <b> {collection.name} </b> for{' '}
          <b>{collection.price}</b> coins?
        </p>
        <div className="flex justify-evenly w-[200px] lg:w-[60%]">
          <button
            onClick={() => {
              setBuyModal(false)
              handleBuy()
            }}
            className="text-gray-900  lg:text-[1.2rem] lg:w-[100px]  dark:text-gray-100 font-[500] h-[38px] w-[80px] rounded-[8px] bg-blue-600 hover:bg-blue-500"
          >
            Buy
          </button>
          <button
            onClick={() => {
              setBuyModal(false)
              setLoadingPublished(false)
            }}
            className="text-gray-900  lg:text-[1.2rem] lg:w-[100px] dark:text-gray-100 font-[500] h-[38px] w-[80px] rounded-[8px] bg-red-600 hover:bg-red-500"
          >
            Cancel
          </button>
        </div>
      </div>
      <div
        className={`${
          logModal === true ? 'flex' : 'hidden'
        } flex-col items-center justify-evenly w-[320px] p-[15px] h-[200px] lg:w-[600px] lg:h-[300px] fixed z-[1] top-[50%] translate-y-[-50%] bg-zinc-100 rounded-[6px] shadow-lg border-[2px] dark:bg-zinc-900 dark:border-zinc-800 border-zinc-200 shadow-black`}
      >
        <p className="text-gray-600 dark:text-gray-100 w-[260px] lg:w-auto lg:text-[1.2rem] text-center font-[500]">
          You have to be logged to buy collections
        </p>
        <button
          onClick={() => setLogModal(false)}
          className=" absolute top-[15px] w-[35px] h-[35px] rounded-[100px] border-gray-700 dark:border-gray-100 border-[1px] hover:scale-[1.1] transition-all shadow-black shadow-sm right-[15px]"
        >
          X
        </button>
        <div className="flex justify-evenly w-[200px] lg:w-[60%]">
          <Link href={'/login'}>
            <button className="text-gray-900  lg:text-[1.2rem] lg:w-[100px]  dark:text-gray-100 font-[500] h-[38px] w-[80px] rounded-[8px] bg-blue-600 hover:bg-blue-500">
              Log in
            </button>
          </Link>
          <Link href={'/register'}>
            <button className="text-gray-900  lg:text-[1.2rem] lg:w-[100px] dark:text-gray-100 font-[500] h-[38px] w-[80px] rounded-[8px] bg-red-600 hover:bg-red-500">
              Register
            </button>
          </Link>
        </div>
      </div>
      <div
        className={`${
          noCoins === true ? 'flex' : 'hidden'
        } flex-col items-center justify-evenly w-[320px] p-[15px] h-[200px] lg:w-[600px] lg:h-[300px] fixed z-[1] top-[50%] translate-y-[-50%] bg-zinc-100 rounded-[6px] shadow-lg border-[2px] dark:bg-zinc-900 dark:border-zinc-800 border-zinc-200 shadow-black`}
      >
        <p className="text-gray-600 dark:text-gray-100 w-[260px] lg:w-auto lg:text-[1.2rem] text-center font-[500]">
          You do not have enough coins
        </p>
        <button
          onClick={() => setNoCoins(false)}
          className=" absolute top-[15px] w-[35px] h-[35px] rounded-[100px] border-gray-700 dark:border-gray-100 border-[1px] hover:scale-[1.1] transition-all shadow-black shadow-sm right-[15px]"
        >
          X
        </button>
        <div className="flex justify-evenly w-[200px] lg:w-[60%]">
          <Link href={'/buy'}>
            <button className="text-gray-900  lg:text-[1.2rem] lg:w-[100px]  dark:text-gray-100 font-[500] h-[38px] w-[80px] rounded-[8px] bg-blue-600 hover:bg-blue-500">
              Buy Coins
            </button>
          </Link>
        </div>
      </div>
      <div
        className={`mt-[120px] w-full transition-all ${
          (buyModal === true || logModal === true || noCoins === true) &&
          'blur-[8px] opacity-80 '
        } `}
      >
        <div className="w-full flex flex-col justify-center items-center">
          <div
            className={`${
              deleteWarning === true
                ? 'bg-gray-200 dark:bg-[#303339] flex justify-center border-[1px] rounded-[15px] shadow-red-800 shadow-md min-w-[300px] w-[60%] min-h-[300px] fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[1]'
                : 'hidden'
            } `}
          >
            <button
              onClick={() => setDeleteWarning(false)}
              className="rounded-full flex justify-center items-center dark:bg-zinc-700 w-[36px] h-[36px] border-[1px] border-gray-400 hover:scale-[1.1] transition-all absolute top-[11%] right-[0%] translate-x-[-50%] translate-y-[-50%] "
            >
              X
            </button>
            <div className="w-full flex justify-center flex-col items-center">
              <p className="text-[1.2rem] mb-8">{`Are you sure you want to delete ${collection.name}? this action will be permanent`}</p>
              <div>
                <button
                  onClick={deleteNft}
                  className="mr-10 w-[100px] bg-red-800 hover:scale-[1.1] transition-all h-[40px] rounded-[15px]  shadow-md shadow-gray-900 ]"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteWarning(false)}
                  className="w-[100px] h-[40px] rounded-[15px] hover:scale-[1.1] transition-all  shadow-md shadow-gray-900 ]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div
            className={` w-[85%]  sm:w-[80%] ${
              deleteWarning === true && 'blur-[10px] opacity-40'
            } `}
          >
            <div className="flex flex-col lg:flex-row items-center justify-center w-full mb-[50px] ">
              <div className="lg:mr-10 ">
                <header className="flex justify-between items-center px-5 sm:w-[505px] w-[300px] h-[55px] rounded-t-md bg-gray-100 dark:bg-[#303339]">
                  <p className="text-gray-600 dark:text-gray-400 text-[0.8rem] sm:text-[1rem]">
                    #{collection.id.toUpperCase()}
                  </p>
                  {(session?.user.id === collection.owner.id ||
                    admin === true) && (
                    <SvgTrash
                      onClick={() => setDeleteWarning(true)}
                      className={` ml-4 w-[25px] h-[25px] fill-slate-500 ${
                        admin === true && 'hover:fill-yellow-500'
                      } hover:fill-red-800 cursor-pointer`}
                    />
                  )}
                </header>
                <div className="w-[300px] h-[300px]  sm:w-[505px]  sm:h-[505px] border-2 border-gray-100 dark:border-[#303339]">
                  <Image
                    src={collection.image}
                    alt={`img-${collection.name}`}
                    className=" object-cover"
                    quality={50}
                    width={1000}
                    height={1000}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-between text-gray-600 dark:text-white mt-5 sm:ml-5 sm:my-10 ">
                <div className="arriba  w-full">
                  <h5 className="text-4xl font-bold">
                    {collection.name} #{collection.id.slice(0, 5).toUpperCase()}
                  </h5>

                  <div className="flex items-center justify-start my-10">
                    <p className="text-xl text-gray-600 dark:text-gray-400 font-semibold mr-5">
                      Property of{' '}
                      <span className="text-blue-500 hover:underline hover:text-blue-600 cursor-pointer">
                        <Link href={`/users/${collection.owner.id}`}>
                          {collection.owner.name}
                        </Link>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex ">
                  <div className="flex mr-3">
                    <p className="text-[1.5rem]">Actual price</p>
                  </div>
                  <div className=" text-[1.3rem] flex flex-row justify-start items-center gap-2">
                    <SvgCoin height={24} width={24} />
                    <span>{collection.price}</span>
                    {collection.discount > 0 && (
                      <span className=" text-[1rem] p-1 bg-red-800 rounded-[15px] ">
                        {' '}
                        -{collection.discount} %{' '}
                      </span>
                    )}
                  </div>
                </div>
                <div className="buttons flex justify-center items-center mt-[53px] mb-[43px] max-w-[690px]">
                  {collection.owner.id === session?.user.id ? (
                    loadingPublished ? (
                      <div className="animate-spin flex justify-center items-center w-full h-[82px] mt-2 rounded-full">
                        <SvgLoading className="w-[40px] h-[40px] " />
                      </div>
                    ) : published === false ? (
                      <div className="flex w-full ">
                        <button
                          onClick={() => handlePublished(true)}
                          className="text-xl bg-white hover:bg-gray-300 text-gray-600 dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] hover:drop-shadow-lg transition-all w-full min-h-[90px] py-3 px-20 rounded-xl"
                        >
                          Add to market
                        </button>
                      </div>
                    ) : (
                      <div className="flex w-full ">
                        <button
                          onClick={() => handlePublished(false)}
                          className="text-xl bg-white hover:bg-gray-300 text-gray-600 dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] hover:drop-shadow-lg transition-all w-full min-h-[90px] py-3 px-20 rounded-xl"
                        >
                          Remove from market
                        </button>
                      </div>
                    )
                  ) : published === false ? (
                    <div className="flex w-full ">
                      <p className="text-[1.2rem] min-h-[90px] flex justify-center items-center text-gray-400 italic p-4 bg-gray-600 rounded-xl w-full">
                        This product is not for sale at this time
                      </p>
                    </div>
                  ) : loadingPublished === true ? (
                    <div className="animate-spin flex justify-center items-center w-full h-[82px] mt-2 rounded-full">
                      <SvgLoading className="w-[40px] h-[40px] " />
                    </div>
                  ) : (
                    <div className="text-xl flex justify-center items-center w-full min-h-[90px] h-[90px] text-white bg-blue-600 hover:bg-blue-500 hover:drop-shadow-lg transition-all mx-2 rounded-xl">
                      {loadingBuy === false ? (
                        <button
                          onClick={() => buyFilter()}
                          className=" w-full h-full rounded-xl "
                        >
                          Buy Collection
                        </button>
                      ) : (
                        <div className="animate-spin flex justify-center items-center ml-1 w-[25px] h-[25px] rounded-full">
                          <SvgLoading className="max-sm:w-5 max-sm:h-5" />
                        </div>
                      )}
                    </div>
                  )}
                  {/* //dev */}
                </div>
                <article className="abajo mt-6 w-full sm:w-full min-h-[285px] lg:mt-0 rounded-t-xl border-2 border-gray-100 dark:border-[#303339] max-w-[690px]">
                  <header className="flex justify-between items-center text-xl font-semibold px-5 w-full h-[50px] rounded-t-md bg-gray-100 text-gray-600 dark:bg-[#303339] dark:text-gray-400">
                    Description
                  </header>
                  <p className="text-[1.2rem] p-5 text-gray-600 dark:text-gray-400">
                    {collection.description}
                  </p>
                </article>
              </div>
            </div>

            <div className=" flex flex-col justify-center items-center  w-full">
              <div className=" flex lg:w-[1000px] lg:mt-[100px]">
                <h2 className=" text-[1.5rem]  font-[500] text-gray-300 mb-4 ">
                  This collection contains the following products:
                </h2>
              </div>

              <div className="flex justify-center w-[100%] mb-10  ">
                <div className="flex min-h-[900px] px-3 pb-0 pt-3  border-[1px] border-gray-400 rounded-[15px] w-full lg:min-w-[1000px] justify-center flex-wrap">
                  {collection.nfts.length > 0 &&
                    collection.nfts.map((el) => (
                      <div
                        key={el.id}
                        className={` mb-3 w-full sm:min-w-[284px] sm:mr-4 max-w-[287px] h-[380px] overflow-hidden relative flex flex-col bg-gray-800 rounded-xl p-[1px] border-slate-900 cursor-pointer group  dark:bg-stone-900 dark:border-[1px]   dark:border-gray-400  group shadow-lg shadow-zinc-500`}
                      >
                        <Link href={`/nfts/${el.id}`}>
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
                              <div className="flex flex-row items-center gap-2 truncate">
                                <span>
                                  <RiVipCrownFill className="fill-yellow-500" />
                                </span>
                                <p
                                  className={` text-lg text-gray-800 dark:text-white font-semibold  truncate ease duration-300`}
                                >
                                  {el.owner.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await getCollectionById({ id: params?.id as string })
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      collection: data,
    },
  }
}

export default CollectionDetail
