import { useContext, useEffect, useState } from "react";
import Loader from "./loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Appcontext } from "../App";

export default function Docscomp() {
  const { doctors, isLoading, isError, refetch } = useContext(Appcontext);
  if (isError)
    return (
      <div className="h-[60dvh] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold my-10"> somthing went wrong </h1>
        <button
          onClick={() => refetch()}
          className="w-44 h-12 rounded-3xl bg-sky-400 font-bold"
        >
          try again
        </button>
      </div>
    );
  const [specialistState, setspecialist] = useState("");
  if (isLoading) return <Loader />;

  function changeSpecialist(text) {
    setspecialist((specialistState) => text);
  }

  return (
    <div className="  flex my-20 justify-evenly lg:flex-nowrap md:flex-wrap sm:flex-wrap sm:gap-20 md:gap-20  lg:gap-0 ">
      <div className="">
        <div className="card w-72 bg-white p-5 shadow-md shadow-purple-200/50 rounded-md">
          <ul className="w-full flex flex-col gap-2">
            <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
              <button
                onClick={() => changeSpecialist("")}
                className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
              >
                All
              </button>
            </li>
            <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
              <button
                onClick={() => changeSpecialist("General physician")}
                className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
              >
                General physician
              </button>
            </li>
            <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
              <button
                onClick={() => changeSpecialist("Gynecologist")}
                className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
              >
                Gynecologist
              </button>
            </li>
            <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
              <button
                onClick={() => changeSpecialist("Dermatologist")}
                className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
              >
                Dermatologist
              </button>
            </li>
            <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
              <button
                onClick={() => changeSpecialist("Pediatricians")}
                className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
              >
                Pediatricians
              </button>
            </li>
            <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
              <button
                onClick={() => changeSpecialist("Neurologist")}
                className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
              >
                Neurologist
              </button>
            </li>
            <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
              <button
                onClick={() => changeSpecialist("Gastroenterologist")}
                className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
              >
                Gastroenterologist
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div>
        {specialistState == "" ? (
          <div className="flex flex-wrap justify-center gap-10 ">
            {doctors?.map((doc) => (
              <Link key={doc.id} to={`/appointment/${doc.id}`}>
                <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md cursor-pointer hover:translate-y-3	transition-all">
                  <img
                    src={doc.docigm}
                    className="relative mx-4 -mt-6 h-72 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600"
                  ></img>
                  <div className="p-6">
                    <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                      {doc.docname}
                    </h5>
                    <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                      <b> {doc.Speciality} </b>
                    </p>
                  </div>
                  <div className="p-6 pt-0">
                    <button
                      data-ripple-light="true"
                      disabled
                      type="button"
                      className="select-none rounded-lg bg-lime-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold  text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                      Available
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-10 ">
            {doctors
              ?.filter((fil) => fil.Speciality == specialistState)
              .map((doc) => (
                <Link key={doc.id} to={`/appointment/${doc.id}`}>
                  <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md cursor-pointer hover:translate-y-3	transition-all">
                    <img
                      src={doc.docigm}
                      className="relative mx-4 -mt-6 h-72 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600"
                    ></img>
                    <div className="p-6">
                      <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        {doc.docname}
                      </h5>
                      <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                        <b> {doc.Speciality} </b>
                      </p>
                    </div>
                    <div className="p-6 pt-0">
                      <button
                        data-ripple-light="true"
                        disabled
                        type="button"
                        className="select-none rounded-lg bg-lime-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold  text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      >
                        Available
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
