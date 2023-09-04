import ReactPlayer from "react-player"
import arrowLeft from '../../assets/icons/arrow-l.svg'

const ModalEnrique = ({ setVideo, url }: any) => {
  return (
    <div
    onClick={() => setVideo(false)}
    className='fixed top-0 left-[0] right-0 bottom-0 bg-black/50 z-[105] flex justify-center items-center w-full h-screen'>
    <div className='bg-white rounded-xl w-[90%] md:w-[40%] flex justify-center items-center h-[90%] absolute mt-20'>
     <div className="w-full absolute top-5 left-5 flex justify-items-center items-center gap-x-4">
      <div onClick={() => setVideo(false)} className="w-10 h-10 bg-redOmega cursor-pointer hover:bg-redOmega2 transition-colors flex justify-center items-center rounded-full">
        <img src={arrowLeft.src} alt="volver" />
      </div>
      <span>Volver</span>
     </div>
    <ReactPlayer url={`http://localhost:1337${url}`} width='90%' height='80%' controls playing />
    </div>
    </div>
  )
}

export default ModalEnrique
