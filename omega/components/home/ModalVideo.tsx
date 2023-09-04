import ReactPlayer from 'react-player'
import arrowLeft from '../../assets/icons/arrow-l.svg'

const ModalVideo = ({ setModal }: any) => {
  return (
    <div
      onClick={() => setModal(false)}
      className="fixed top-0 left-[0] right-0 bottom-0 bg-black/50 z-[105] flex justify-center items-center w-full h-screen "
    >
      <div className="bg-white rounded-xl w-[90%] flex justify-center items-center h-[70vh] md:[80vh] absolute mt-20">
        <div className="w-full absolute md:top-5 top-2 left-5 flex justify-items-center items-center gap-x-4">
          <div
            onClick={() => setModal(false)}
            className="w-6 md:w-10 md:h-10 h-6 bg-redOmega cursor-pointer hover:bg-redOmega2 transition-colors flex justify-center items-center rounded-full"
          >
            <img src={arrowLeft.src} alt="volver" />
          </div>
        </div>
        <ReactPlayer
          url="https://omega-strapi-files.s3.amazonaws.com/OMEGA_bd6f0523a8.mp4"
          width="90%"
          height="80%"
          controls
          playing
        />
      </div>
    </div>
  )
}

export default ModalVideo
