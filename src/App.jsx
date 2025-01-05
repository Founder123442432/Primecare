import Navbar from "./components/navbar";
import Footerelement from "./components/footer";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Contact from "./pages/contact";
import Docspage from "./pages/docs";
import Login from "./pages/login";
import Appoitment from "./pages/appointment";
import { getDocs, collection } from "firebase/firestore";
import { db } from "/firebase/firebase";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import Myprifile from "./pages/myprofile";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import Myappointments from "./pages/myappointments";
import Error404 from "./components/404";
import Aboute from "./pages/about";
import Admin from "./admin/admin";
import Dashboard from "./admin/Dashboard";
import ViewAppointments from "./admin/ViewAppointments";
import Adddoctor from "./admin/adddoctor";
import Alldoctors from "./admin/alldoctors";
const Docsel = collection(db, "doctors");
async function getdoctors() {
  try {
    const data = await getDocs(Docsel);

    const filData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    return filData;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw new Error("Failed to fetch doctors data.");
  }
}

export const adminemail = "wibr8349@gmail.com";
console.log(import.meta.env);

function Adminprotect({ children }) {
  const [user] = useAuthState(auth);
  return user?.email == adminemail ? children : <Navigate to="/"></Navigate>;
}

async function getAllappointments() {
  const Appointments = collection(db, "appointments");
  const data = await getDocs(Appointments);
  const fillApps = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return fillApps;
}

function Loginp({ children }) {
  const [user] = useAuthState(auth);
  return !user ? children : <Navigate to="/"></Navigate>;
}
export const Appcontext = createContext();
function Ulp({ children }) {
  const [user] = useAuthState(auth);
  return user ? children : <Navigate to="/login"></Navigate>;
}

function App() {
  const {
    data: doctors,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: getdoctors,
  });

  const { data: Allappointments } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAllappointments,
  });
  const location = useLocation();
  const [shownavbar, setshownavber] = useState(true);
  useEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      setshownavber((pre) => false);
    } else {
      setshownavber(true);
    }
  }, [location]);

  return (
    <Appcontext.Provider
      value={{
        doctors,
        isLoading,
        isError,
        refetch,
        Allappointments,
        Docsel,
      }}
    >
      {shownavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctors" element={<Docspage />} />
        <Route
          path="/login"
          element={
            <Loginp>
              <Login />
            </Loginp>
          }
        />
        <Route
          path="/Myappointments"
          element={
            <Ulp>
              <Myappointments />
            </Ulp>
          }
        />
        <Route
          path="/appointment/:docid"
          element={
            <Ulp>
              <Appoitment />
            </Ulp>
          }
        />
        <Route
          path="/myprofile"
          element={
            <Ulp>
              <Myprifile />
            </Ulp>
          }
        />
        <Route path="*" element={<Error404 />} />
        <Route path="/aboutUs" element={<Aboute />} />
        <Route
          element={
            <Adminprotect>
              <Admin />
            </Adminprotect>
          }
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route
            path="/admin/ViewAppointments"
            element={<ViewAppointments />}
          />
          <Route path="/admin/AddDoctor" element={<Adddoctor />} />
          <Route path="/admin/alldoctors" element={<Alldoctors />} />
        </Route>
      </Routes>
      {shownavbar && <Footerelement />}
    </Appcontext.Provider>
  );
}

export default App;
