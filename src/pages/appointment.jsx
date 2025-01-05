import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Appcontext } from "../App";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import usePageTitle from "../customhooks/usetitle";
export default function Appoitment() {
  const [day, setDay] = useState("Monday");
  const [Time, setTime] = useState("10:30 am");
  const [Gender, setGender] = useState("Male");
  const [phoneNumber, setphoneNumber] = useState();
  const { doctors, isLoading, isError, refetch } = useContext(Appcontext);
  const { docid } = useParams();
  const [user] = useAuthState(auth);
  const Docinfo = doctors?.filter((doc) => doc.id == docid);
  const bookcal = collection(db, "appointments");
  const [fillup, setfillup] = useState(false);
  const [loading, setloading] = useState(false);
  const ToMyappointments = useNavigate();
  async function bookIT() {
    if (!day || !Time || !Gender) return setfillup(true);
    try {
      setloading(true);
      await addDoc(bookcal, {
        name: user?.displayName,
        email: user?.email,
        userPhoto: user?.photoURL,
        phoneNumber,
        doctor: Docinfo.map((doc) => doc.docname),
        docSpeciality: Docinfo.map((doc) => doc.Speciality),
        docimg: Docinfo.map((doc) => doc.docigm),
        day,
        fee: Docinfo.map((doc) => doc.fee),
        Time,
        Gender,
        userID: user?.uid,
        Status: true,
      });
      setloading(false);
      ToMyappointments("/Myappointments");
      alert("appointment booked");
    } catch {
      setloading(false);
      alert("somthing went wrong, sorry:(");
    }
  }
  usePageTitle("book a service");
  return (
    <div className="max-w-6xl px-6 py-10 mx-auto">
      {Docinfo?.map((dinfo) => (
        <section key={dinfo.id} className="bg-white ">
          <div>
            <p className="text-xl font-medium text-blue-500 ">appointment</p>

            <h1 className="mt-2 text-2xl font-semibold text-gray-800 capitalize lg:text-3xl ">
              book a service
            </h1>

            <main className="relative z-10 w-full mt-8 md:flex md:items-center xl:mt-12">
              <div className="absolute w-full bg-blue-600 -z-10 md:h-96 rounded-2xl"></div>

              <div className="w-full p-6 bg-blue-600 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
                <img
                  className="h-10 w-10 bg-cyan-500 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl"
                  src={dinfo.docigm}
                  alt="client photo"
                />

                <div className="mt-2 md:mx-6">
                  <div>
                    <p className="text-xl font-medium tracking-tight text-white">
                      {dinfo.docname}
                    </p>
                    <p className="text-blue-200 "> {dinfo.Speciality} </p>
                  </div>

                  <p className="mt-4 text-lg leading-relaxed text-white md:text-xl">
                    {dinfo.AboutDoc}
                  </p>
                  <span className="text-white text-xl mt-4 block">
                    <b>fee:</b> {dinfo.fee} $
                  </span>
                </div>
              </div>
            </main>
          </div>
        </section>
      ))}
      <div className=" mt-10">
        <h2 className="font-bold text-5xl flex justify-center my-16">
          Booking slots
        </h2>
        <div>
          <div className="block w-full mb-4">
            <label
              htmlFor="small_select"
              className="block mb-2 text-sm font-medium text-gray-600 w-full"
            >
              Select Day
            </label>
            <select
              id="small_select"
              className="h-auto border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1.5 px-2 focus:outline-none"
              onChange={(e) => setDay(e.target.value)}
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
          <div className="block w-full mb-4">
            <label
              htmlFor="default_select"
              className="block mb-2 text-sm font-medium text-gray-600 w-full"
            >
              Select Time
            </label>
            <select
              id="default_select_select"
              className="h-auto border border-gray-300 text-gray-600 text-base rounded-lg block w-full p-2.5  focus:outline-none"
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="10:30 am">10:30 am</option>
              <option value="11:30 am<">11:30 am</option>
              <option value="12:00 pm">12:00 pm</option>
              <option value="01:30 pm">01:30 pm</option>
              <option value="02:00 pm">02:00 pm</option>
              <option value="02:30 pm">02:30 pm</option>
              <option value="03:00 pm">03:00 pm</option>
              <option value="03:30 pm">03:30 pm</option>
              <option value="04:00 pm">04:00 pm</option>
              <option value="04:30 pm">04:30 pm</option>
              <option value="05:00 pm">05:00 pm</option>
            </select>
          </div>
          <div className="block w-full">
            <label
              htmlFor="large_select"
              className="block mb-2 text-sm font-medium text-gray-600 w-full"
            >
              Gender
            </label>
            <select
              id="large_select"
              onChange={(e) => setGender(e.target.value)}
              className="h-auto border border-gray-300 text-gray-600 text-base rounded-lg block w-full px-4 py-3  focus:outline-none"
            >
              <option value="Male">Male </option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <form className="max-w-sm mx-auto my-5">
          <label
            htmlFor="phone-input"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Phone number:
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 19 18"
              >
                <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
              </svg>
            </div>
            <input
              type="number"
              id="phone-input"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="123-456-7890"
              onChange={(e) => setphoneNumber(Number(e.target.value))}
            />
          </div>
          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-gray-500 "
          >
            Select a phone number that matches the format.
          </p>
        </form>
        <button
          onClick={bookIT}
          className="w-64 cursor-pointer mt-10 bg-violet-500 rounded-md text-white font-semibold transition duration-300 ease-in-out hover:bg-violet-700 hover:ring-2 hover:ring-violet-800 hover:shadow-xl hover:shadow-violet-500 focus:ring-violet-300 focus:shadow-violet-400 px-5 py-2"
        >
          Book an appointment
        </button>
        {loading && <p className="text-lg font-bold my-4"> booking... </p>}
        {fillup && (
          <p className="mt-6 text-red-700">
            pleas select all date, time ,and type
          </p>
        )}
      </div>
    </div>
  );
}
