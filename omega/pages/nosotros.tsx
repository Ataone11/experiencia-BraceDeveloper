import axios from 'axios'
import Carousel from '../components/nosotros/Carousel'
import TimeLine from '../components/nosotros/TimeLine'
import WeFirstSection from '../components/nosotros/WeFirstSection'
import WeValues from '../components/nosotros/WeValues'
import WorkWithUs from '../components/nosotros/WorkWithUs'
import { API_URL } from '../utils/constants'

const Nosotros = ({ team }: any) => {
  return (
    <>
      <WeFirstSection />
      <WeValues />
      {
        team.length > 0 && <Carousel team={team} />
      }
      <TimeLine />
      <WorkWithUs />
    </>
  )
}

export default Nosotros

export const getStaticProps = async () => {
  let resultTeam;
  try {
    resultTeam = await axios.get(`${API_URL}/api/teams?populate=foto`)
  
  } catch (error) {
    console.log(error)
  }
  return {
    props: {
      team: resultTeam ? resultTeam.data.data : [],
    },
  }
}
