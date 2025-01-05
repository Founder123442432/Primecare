import { getDocs, collection, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "../components/loader";
import usePageTitle from "../customhooks/usetitle";
export default function Myappointments() {
  async function getappointment() {
    if (user);
    const dcal = query(
      collection(db, "appointments"),
      where("userID", "==", user?.uid)
    );
    const data = await getDocs(dcal);
    const filappoi = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    return filappoi;
  }
  const [user] = useAuthState(auth);
  const { data: appointments, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: getappointment,
  });
  usePageTitle("My appointments");
  if (isLoading) return <Loader />;
  if (appointments?.length == "0")
    return (
      <div className="h-96 flex justify-center items-center ">
        <h1 className="text-3xl font-bold">you have no appointments yet </h1>
      </div>
    );
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-4xl font-bold mb-36">My Appointments</h1>
        <div className="-my-8 divide-y-2 divide-gray-100">
          {appointments?.map((app) => (
            <div key={app.id} className="py-8 flex flex-wrap md:flex-nowrap">
              <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <img src={app.docimg} />
              </div>
              <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                  {app.doctor}
                </h2>
                <h2 className="text-lg font-bold">{app.docSpeciality} </h2>
                <h3>$ {app.fee}</h3>
                <span className="text-indigo-500 inline-flex items-center mt-4">
                  {app.day}, {app.Time}, {app.Type}
                </span>
                {app.Status == false ? (
                  <span className="text-green-600 block  items-center mt-4">
                    waiting
                  </span>
                ) : (
                  <span className="text-red-600 block  items-center mt-4">
                    Done
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
