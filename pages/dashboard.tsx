import Logo from '@assets/White.png'
import type { NextPage } from 'next'
import Image from 'next/image'
import SvgBox from '../components/icons/svgBox'
import SvgChartPie from '../components/icons/svgChartPie'
import SvgHome from '../components/icons/svgHome'
import SvgLogOut from '../components/icons/svgLogOut'
import SvgSettings from '../components/icons/svgSettings'

const DashBoard: NextPage = () => {
  return (
    <section className="flex">
      <div className="left z-40 h-screen w-64 p-4 overflow-y-auto bg-gray-800">
        <Image src={Logo} alt="Logo" height={90} width={160} />
        <div className="overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700"
              >
                <SvgHome className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />
                <span className="ml-3">Home</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <SvgChartPie className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Statistics
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700"
              >
                <SvgBox className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />

                <span className="flex-1 ml-3 whitespace-nowrap">
                  My NFT&apos;s
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700"
              >
                <SvgSettings className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />

                <span className="flex-1 ml-3 whitespace-nowrap">Settings</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700"
              >
                <SvgLogOut className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">Log out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="righ">
        <h1>This is the right side</h1>
      </div>
    </section>
  )
}

export default DashBoard