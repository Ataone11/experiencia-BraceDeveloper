import axios from 'axios'
import Banner from '../components/home/Banner'
import { API_URL, QUERY_IMAGE } from '../utils/constants'
import Service from '../components/home/Service'
import Secure from '../components/home/Secure'
import VideoSection from '../components/home/VideoSection'
import CarouselInsures from '../components/home/CarouselInsures'

const Home = ({ banners } : {banners: any[]}) => {
  return (
    <div className=' w-full'>
      <div className=' w-11/12 m-auto container '>
        <Banner banner={banners} />
      </div>
      <div className='space-y-10'>
        <Service />
        <Secure />
        <VideoSection />
        <CarouselInsures />
      </div>
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  let banners;
  try {
    banners = await axios.get(`${API_URL}/api/banners${QUERY_IMAGE}`)
  } catch (error) {
    console.log(error)
  }
  return {
    props: {
      banners: banners ? banners.data.data : [],
    },
  }
}