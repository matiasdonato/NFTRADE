import NFT2 from '@assets/NFT_5.png'
import Image from 'next/image'
import Link from 'next/link'

const AboutHome = () => {
  return (
    <section className="home__about flex items-center justify-center ">
      <div className='flex flex-row justify-center items-center content-center my-14 max-lg:mt-0 max-lg:mb-0 max-w-7xl'>
      <div className="home__about-right ease duration-500 max-lg:hidden">
        <Image src={NFT2} alt="nft2_img" height={650} width={710} />
      </div>
      <div className="home__about-left p-8 w-full max-w-2xl">
        <p className="left-title text-5xl font-bold tracking-wide max-md:text-3xl">
          Why choosing us?
        </p>
        <p className="mt-10 max-md:mt-5 mb-10 max-md:text-sm ease duration-500">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
          molestiae doloribus voluptatibus. Laudantium, reiciendis! Architecto
          illo commodi natus maxime fugiat cupiditate, et ducimus similique
          earum exercitationem, sit dolorem asperiores expedita!
        </p>
        <Link href="/about">
          <button
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 font-medium rounded-full text-sm py-2 px-7 text-center"
          >
            Read more
          </button>
        </Link>
      </div>
      </div>
    </section>
  )
}

export default AboutHome
