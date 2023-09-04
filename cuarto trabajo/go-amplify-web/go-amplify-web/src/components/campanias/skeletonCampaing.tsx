
const SkeletonCampañas = () =>{
    return(
        <div className="md:h-72 mb-4 md:mb-0 w-full h-40 bg-gray-300 rounded-rifa overflow-hidden relative animate-pulse">
            <div className="w-14 h-14 rounded-full bg-gray-400 animate-pulse absolute right-5 top-5">

            </div>
            <div className="absolute left-5 bottom-5">
                <div className="w-56 h-3 rounded-xl bg-gray-400 animate-pulse mb-1 md:mb-2">

                </div>
                <div className="w-48 h-2 rounded-xl bg-gray-400 animate-pulse">

                </div>
            </div>
        </div>
    )
}

export default SkeletonCampañas;