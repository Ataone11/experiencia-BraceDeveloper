
const SkeletonCategoria = (props: any) => {
    return (
        <div id={'hola'} className="md:flex md:items-center md:h-20 md:mb-8 bg-gray-300 py-2 mb-4 w-full h-24 rounded-points animate-pulse overflow-hidden text-transparent">
                  <h1 className="mx-auto w-28 md:w-40 h-4 rounded-xl md:mb-0 md:ml-16 md:mr-20 mb-4 bg-gray-400 animate-pulse"></h1>
                  <div className="flex overflow-hidden w-full">
                        <div className="flex items-center justify-center h-full w-full">
                            <div className="w-12 h-12 rounded-full bg-gray-400 animate-pulse"></div>
                        </div>
                        <div className="flex items-center justify-center h-full w-full">
                            <div className="w-12 h-12 rounded-full bg-gray-400 animate-pulse"></div>
                        </div>
                        <div className="flex items-center justify-center h-full w-full">
                            <div className="w-12 h-12 rounded-full bg-gray-400 animate-pulse"></div>
                        </div>
                        <div className="flex items-center justify-center h-full w-full">
                            <div className="w-12 h-12 rounded-full bg-gray-400 animate-pulse"></div>
                        </div>
                        <div className="flex items-center justify-center h-full w-full">
                            <div className="w-12 h-12 rounded-full bg-gray-400 animate-pulse"></div>
                        </div>
                        <div className="flex items-center justify-center h-full w-full">
                            <div className="w-12 h-12 rounded-full bg-gray-400 animate-pulse"></div>
                        </div>
                  </div>     
            </div>
    );
}
export default SkeletonCategoria;