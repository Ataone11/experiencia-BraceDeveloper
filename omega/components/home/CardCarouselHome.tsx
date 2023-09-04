const CardCarouselHome = ({ item }: any) => {
  return (
    <div className="flex flex-col snap-center shrink-0 rounded-lg shadowCard relative w-[280px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-[280px]  bg-white h-[380px] sm:h-[340px] first:ml-5 last:mr-5">
      <div className="h-[400px] w-full flex justify-center items-center">
        <img
          src={item.icon.src}
          className="w-[150px] object-cover mx-auto  grid place-content-center"
        />
      </div>
      <div className="px-10 py-4   w-full h-full">
        <p className="text-center sm:text-small text-base">
          {item.description}
        </p>
      </div>
      <div className="w-full mx-auto flex justify-center items-center pb-4">
        <a href={item.url} target="_blank" rel="noreferrer">
          <button className="flex flex-col justify-center items-center text-small md:text-normal py-1 px-9 md:py-1 md:px-6 bg-redOmega text-white font-semibold rounded-full shadow-md hover:bg-redOmega2 focus:outline-none focus:ring-2 focus:ring-redOmega3 focus:ring-opacity-100 focus:ring-offset-1 transition-colors">
            Ir a este portal
          </button>
        </a>
      </div>
    </div>
  )
}

export default CardCarouselHome
