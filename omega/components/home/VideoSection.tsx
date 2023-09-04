import { useState } from 'react'
import CardVideo from './CardVideo'
import ModalVideo from './ModalVideo'

const VideoSection = () => {
  const [modal, setModal] = useState(false)

  return (
    <div className='bg-[#F0F0F0] py-14 relative'>
      {modal && <ModalVideo modal={modal} setModal={setModal} />}
      <CardVideo modal={modal} setModal={setModal} />
    </div>
  )
}

export default VideoSection
