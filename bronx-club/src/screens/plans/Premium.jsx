import {
  getLoadingPlans,
  getPlansState,
  getErrorPlans,
} from "../../reducers/plansReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPlans } from "../../actions/plansActions";
import premium from "../../assets/Plans/premium.png";

const Premium = () => {
  const plans = useSelector(getPlansState);
  const loading = useSelector(getLoadingPlans);
  const error = useSelector(getErrorPlans);
  const id = `61ae2d1ce55458dd8aa5b89c`;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!plans) {
      getPlans(dispatch, id);
    }
    console.log(plans);
  }, [plans]);

  if (!plans && error) {
    return <div>Errror</div>;
  }

  if (!plans || loading) {
    return <div>cargando</div>;
  }

  return (
    <section>
      <div className="w-full h-[20%]  items-center bg-black justify-between">
        <div className="md:mx-auto py-6">
          {/* Content*/}
          <div className="px-4 py-6 sm:px-0 flex flex-col ">
            <div className="font-serif font-extrabold text-white" />
            <h1 className="object-none object-left font-bold pt-9 pl-5 text-3xl md:pt-40 md:text-5xl text-white md:pl-56">
              PRICES & PLANS
            </h1>
            <div className="flex justify-center"></div>
            {/* /End replace */}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1  md:grid-cols-2 gap-x-5 gap-y-5 pt-20 md:pt-40 h-full w-full">
        <div className="md:pl-80 pl-5">
          <img src={premium} className="w-[90%] h-[90%] scale-100" alt="" />
        </div>
        <div className="justify-around container w-full md:w-[60%] h-[50%] md:pl-5 text-xl text-black pl-10">
          <h2 className="object-none object-left text-2xl font-bold text-black  ">
            {plans.name}
          </h2>
          <h2 className="object-none object-left pt-5 text-2xl font-bold text-black  ">
            {plans.pricestandar}
          </h2>
          <div classname="pt-7 justify-center">
            <div classname="form-check pt-10">
              <h1 classname="font-bold text-xl pt-10">Membership period</h1>
              <input
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked
                type="radio"
              />
              <label
                classname="form-check-label inline-block text-gray-800 text-base font-bold"
                for="flexRadioDefault1"
              >
                1 Month (+{plans.pricestandar})
              </label>
            </div>
            <div classname="form-check">
              <input
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                type="radio"
              />
              <label
                classname="form-check-label inline-block text-gray-800 text-base"
                for="flexRadioDefault1"
              >
                3 month (+{plans.price3month})
              </label>
            </div>
            <div classname="form-check">
              <input
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                type="radio"
              />
              <label
                classname="form-check-label inline-block text-gray-800 text-base"
                for="flexRadioDefault1"
              >
                12 month (+{plans.price12month})
              </label>
            </div>
          </div>
          <a
            href="/mas"
            className=" bg-primary bg-opacity-80 hover:bg-opacity-100 text-white transition duration-200 group text-lg my-4 inline-block py-2 px-16"
          >
            Add to Bag
          </a>

          <h2 className="object-none object-left pt-5 text-base font-black text-black">
            Plan features
          </h2>
          <h2 className="object-none object-left pt-5 text-base  text-black">
            include:
          </h2>
          <h2 className="object-none object-left pt-10 text-base w-[27%]  text-black">
            {plans.include}
          </h2>
          <h2 className="object-none object-left pt-10 text-base font-black w-[80%] text-black">
            The contract may be terminated at the end of the membership
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Premium;
