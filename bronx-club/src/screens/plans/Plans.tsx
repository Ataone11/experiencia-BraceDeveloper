import { Link } from "react-router-dom";
import basic from "../../assets/Plans/basic.png";
import silver from "../../assets/Plans/silver.png";
import premium from "../../assets/Plans/premium.png";
import {
  getLoadingPlans,
  getPlansState,
  getErrorPlans,
} from "../../reducers/plansReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPlan } from "../../actions/plansActions";

const Plans = () => {
  const plans = useSelector(getPlansState);
  const loading = useSelector(getLoadingPlans);
  const error = useSelector(getErrorPlans);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!plans) {
      getPlan(dispatch);
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
    <div className="">
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
      <div className="bg-white w-full h-[30%]">
        <div className="grid grid-cols-1  md:grid-cols-3 gap-x-1 gap-y-1 pt-40 justify-between md:pl-80 pl-10">
          {plans.map((j) => (
            <div>
              <Link to={`/basic/${j._id}`}>
                <img
                  src={j.imgUrl}
                  className="w-auto h-[60%] hover:opacity-25"
                  alt=""
                />
                <h1 className="object-none object-left text-lg font-black ">
                  {j.name}
                </h1>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Plans;
