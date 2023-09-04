
const SkeletonCampañasActivas = () => {
    return (
        <div className="md:hidden w-full">
            <h2 className="mb-1 w-28 h-2.5 rounded-xl bg-gray-300 animate-pulse"></h2>
            <div className="mb-2.5 ml-1 md:ml-5 md:w-full">
                <div className="flex items-center w-40  h-12 md:h-16 md:w-full rounded-xl  bg-gray-300 animate-pulse relative">
                    <div className="rounded-full bg-slate-400 w-12 h-12 md:w-16 md:h-16 absolute -left-1 md:-left-5 animate-pulse">

                    </div>
                    <div className="ml-12 md:ml-12 px-1.5 text-white">
                        <h3 className="w-16 h-2 mb-1 bg-gray-400 animate-pulse">
                        </h3>
                        <p className="w-12 h-2 mb-1 bg-gray-400 animate-pulse">
                        </p>
                    </div>
                </div>
                <div className="hidden md:block md:py-1 text-tittleM">
                    <span className="md:text-primary">Debes publicar en 2 dias</span>
                </div>
            </div>
        </div>
    );
}

export default SkeletonCampañasActivas;