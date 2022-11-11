import Logo from '@assets/White.png'
import SvgBox from '@components/icons/svgBox'
import SvgChartPie from '@components/icons/svgChartPie'
import SvgHome from '@components/icons/svgHome'
import SvgLogOut from '@components/icons/svgLogOut'
import SvgSettings from '@components/icons/svgSettings'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const SideBar: NextPage = () => {
  return (
    <div className="dashboard__home-sidebar z-40 h-screen w-64 px-4 overflow-y-auto bg-gray-200 text-gray-600 dark:text-gray-400 border-r border-r-gray-400 dark:border-r-gray-600 dark:bg-[#202225] transition-all">
      <Image src={Logo} alt="Logo" height={350} width={580} />
      <div className="dashboard__home-sidebar-list overflow-y-auto">
        <ul className="space-y-2">
          <Link href="/dashboard">
            <li className="flex items-center p-2 text-base font-normal rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-[#393b41] cursor-pointer transition-all">
              <SvgHome className="w-6 h-6 transition duration-75" />
              <span className="ml-3">Home</span>
            </li>
          </Link>
          <Link href="#">
            <li className="flex items-center p-2 text-base font-normal rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-[#393b41] cursor-pointer transition-all">
              <SvgChartPie className="w-6 h-6 transition duration-75" />
              <span className="ml-3">Statistics</span>
            </li>
          </Link>
          <Link href="#">
            <li className="flex items-center p-2 text-base font-normal rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-[#393b41] cursor-pointer transition-all">
              <SvgBox className="w-6 h-6 transition duration-75" />
              <span className="ml-3">My NFT&apos;s</span>
            </li>
          </Link>
          <Link href="#">
            <li className="flex items-center p-2 text-base font-normal rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-[#393b41] cursor-pointer transition-all">
              <SvgSettings className="w-6 h-6 transition duration-75" />
              <span className="ml-3">Settings</span>
            </li>
          </Link>
          <Link href="#">
            <li className="flex items-center p-2 text-base font-normal rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-[#393b41] cursor-pointer transition-all">
              <SvgLogOut className="w-6 h-6 transition duration-75" />
              <span className="ml-3">Log out</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default SideBar
