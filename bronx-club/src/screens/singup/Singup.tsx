import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { Usuario } from "../../models/Usuario";
import * as videoService from "../../controlladores/userService";
import { connect } from "react-redux";

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface Params {
  id?: string;
}
const Singup = () => {
  const initialState = {
    name: "",
    last_name: "",
    address: "",
    mensage: "",
  };
  const [usuario, setVideo] = useState<Usuario>(initialState);
  const history = useHistory();
  const params = useParams<Params>();

  const getVideo = async (id: string) => {
    const res = await videoService.getVideoById(id);
    const { name, last_name, address, mensage } = res.data;
    setVideo({ name, last_name, address, mensage });
  };

  useEffect(() => {
    if (params.id) getVideo(params.id);
  }, [params.id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!params.id) {
      await videoService.createNewVideo(usuario);
      setVideo(initialState);
    } else {
    }
    history.push("/usuarios");
  };

  const handleInputChange = (e: InputChange) =>
    setVideo({ ...usuario, [e.target.name]: e.target.value });

  return (
    <div className="w-full  items-center bg-black justify-between">
      <div className="w-full">
        <div className="md:mx-auto py-6">
          {/* Content*/}
          <div className="px-4 py-6 sm:px-0 flex flex-col ">
            <div className="font-serif font-extrabold text-white" />
            <h1 className="object-none object-left font-bold pt-9 pl-5 text-3xl md:pt-40 md:text-5xl text-white md:pl-56">
              SIGN UP FOR A WORKOUT WITH A PERSONAL COACH
            </h1>
            <h1 className="md:hidden object-none object-left text-md font-bold text-white pl-6 pt-10">
              We will contact you through your email about your upcoming
              workout!
            </h1>
            <div className="grid grid-cols-1  md:grid-cols-2 gap-x-10 gap-y-16 pt-10 md:pt-40">
              <div className="justify-between font-bold container w-[80%] h-[50%] pl-5">
                <form
                  className="w-full max-w-2xl  md:pl-56"
                  onSubmit={handleSubmit}
                >
                  <div className="grid-flow-row -mx-3 mb-6">
                    <div className="w-full  px-3 p-3 mb-0 md:mb-0">
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500  py-3 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                        name="name"
                        id="grid-first-name"
                        type="text"
                        onChange={handleInputChange}
                        placeholder="your name"
                      />
                    </div>
                    <div className="w-full px-3">
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 py-3 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="last_name"
                        id="grid-last-name"
                        type="text"
                        onChange={handleInputChange}
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200  py-3 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="address"
                        onChange={handleInputChange}
                        placeholder="Your address name"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200  py-12 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 justify-start items-start"
                        name="mensage"
                        onChange={handleInputChange}
                        placeholder="Enter your menssage"
                      />
                    </div>
                  </div>
                  {params.id ? (
                    <button className="item border-4 border-blue-400 text-black font-bold p-2 rounded-full hover:bg-pink-300 hover:text-black transition duration-500">
                      Update
                    </button>
                  ) : (
                    <button className="bg-primary  hover:bg-opacity-100 text-white transition duration-200 group text-xl mx-0 my-0 inline-block py-4 px-10">
                      SUBMIT
                    </button>
                  )}
                </form>
              </div>
              <div>
                <h1 className="hidden md:block object-none object-left text-xl font-bold text-white">
                  We will contact you through your email about your upcoming
                  workout!
                </h1>
              </div>
            </div>
          </div>
          <div className="flex justify-center"></div>
          {/* /End replace */}
        </div>
      </div>

      <div className="bg-white h-[45%] w-full">
        <h2 className="font-bold text-black text-4xl pt-24 pl-24">
          ARE YOU READY FOR CHANGES?
        </h2>
        c{" "}
        <a
          href="/mas"
          className="bg-primary  hover:bg-opacity-100 text-white transition duration-200 group text-xl mx-20 mx my-8 inline-block py-4 px-7"
        >
          Make it happen
        </a>
        <div className="pt-12"></div>
      </div>
    </div>
  );
};

export default Singup;
