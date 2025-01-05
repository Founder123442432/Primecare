import { useContext } from "react";
import { Appcontext } from "../App";
import {
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import usePageTitle from "../customhooks/usetitle";

export default function Dashboard() {
  const { Allappointments, doctors } = useContext(Appcontext);
  const Earnings = Allappointments?.filter((app) => app.Status == true).reduce(
    (total, appointment) => {
      return total + Number(appointment.fee);
    },
    0
  );
  usePageTitle("Dashboard");
  return (
    <div className="">
      <h1 className="my-6 text-3xl font-bold">Dashboard</h1>
      <section className="bg-white ">
        <div className="px-4 flex gap-1 flex-wrap">
          <div className="bg-gradient-to-br from-sky-400 via-sky-400 to-violet-400 p-6 sm:p-10 rounded-2xl w-96 h-48 text-white flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex flex-col gap-6">
              <div className="">
                <span className="text-gray-200">Total Doctors</span>
                <br />
                <span className=" text-2xl text-white font-semibold">
                  {doctors?.length} Doctors
                </span>
              </div>
              <button className="text-black bg-white hover:bg-gray-50 px-4 py-2 rounded-lg w-fit ease duration-300 flex gap-1 items-center group">
                <span>This month</span>
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-sky-400 via-sky-400 to-violet-400 p-6 sm:p-10 rounded-2xl w-96 h-48 text-white flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex flex-col gap-6">
              <div className="">
                <span className="text-gray-200">Total Appointments</span>
                <br />
                <span className=" text-2xl text-white font-semibold">
                  {Allappointments?.length}
                </span>
              </div>
              <button className="text-black bg-white hover:bg-gray-50 px-4 py-2 rounded-lg w-fit ease duration-300 flex gap-1 items-center group">
                <span>This month</span>
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-sky-400 via-sky-400 to-violet-400 p-6 sm:p-10 rounded-2xl w-96 h-48 text-white flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex flex-col gap-6">
              <div className="">
                <span className="text-gray-200">Total Earnings</span>
                <br />
                <span className=" text-2xl text-white font-semibold">
                  {Earnings} $
                </span>
              </div>
              <button className="text-black bg-white hover:bg-gray-50 px-4 py-2 rounded-lg w-fit ease duration-300 flex gap-1 items-center group">
                <span>This month</span>
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-sky-400 via-sky-400 to-violet-400 p-6 sm:p-10 rounded-2xl w-96 h-48 text-white flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex flex-col gap-6">
              <div className="">
                <span className="text-gray-200">waiting Appointments</span>
                <br />
                <span className=" text-2xl text-white font-semibold">
                  {Allappointments?.filter((fil) => fil.Status == false).length}
                </span>
              </div>
              <button className="text-black bg-white hover:bg-gray-50 px-4 py-2 rounded-lg w-fit ease duration-300 flex gap-1 items-center group">
                <span>This month</span>
              </button>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400} className="my-20">
          <h2 className="text-3xl font-bold mb-11">Latest bookings</h2>
          <LineChart data={Allappointments}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis dataKey="fee" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="fee" stroke="#8884d8" />
            <Line dataKey="name" stroke="#ff85fe" />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}
