import { useContext, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { addDoc } from "firebase/firestore";
import { Appcontext } from "../App";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../customhooks/usetitle";
export default function Adddoctor() {
  const [docname, setdocname] = useState("");
  const [docemail, setdocemail] = useState("");
  const [Experience, setdoExperience] = useState("");
  const [fee, setdocfee] = useState("");
  const [Speciality, setdocSpeciality] = useState("General physician");
  const [Degree, setdocDegree] = useState("");
  const [AboutDoc, setAboutDoc] = useState("");
  const [docimg, setdocimg] = useState("");
  const [uploading, setuploading] = useState(false);
  const { Docsel } = useContext(Appcontext);
  const alldor = useNavigate();
  async function addimg() {
    try {
      if (!docimg) return null;
      const fileref = ref(storage, `doctors/${docimg.name}`);
      await uploadBytes(fileref, docimg);
      const imgurl = await getDownloadURL(fileref);
      return imgurl;
    } catch {
      console.log("error");
    }
  }
  async function uploaddoctor() {
    try {
      setuploading(true);
      if (!docname || !docemail || !fee)
        return alert("pleas add more infos"), setuploading(false);
      const img = await addimg();
      if (!img) return null;
      await addDoc(Docsel, {
        docigm: img,
        docname,
        docemail,
        Experience,
        fee,
        Speciality,
        Degree,
        AboutDoc,
      });
      setuploading(false);
      alert("aded");
      alldor("/admin/alldoctors");
    } catch (Error) {
      alert(Error);
    }
  }
  usePageTitle("Add a d.r");
  return (
    <div>
      <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
        <div className="text-center mb-16">
          <a href="javascript:void(0)">
            <img
              src="https://cdn-icons-png.flaticon.com/128/7370/7370433.png"
              alt="logo"
              className="w-36 inline-block"
            />
          </a>
          <h4 className="text-gray-800 text-base font-semibold mt-6">
            Add Doctor
          </h4>
        </div>

        <form>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Doctor's Name
              </label>
              <input
                onChange={(e) => setdocname(e.target.value)}
                name="name"
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Fees</label>
              <input
                onChange={(e) => setdocfee(e.target.value)}
                name="fee"
                type="Number"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter fee"
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Doctor Email
              </label>
              <input
                onChange={(e) => setdocemail(e.target.value)}
                name="email"
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Speciality
              </label>
              <select
                onChange={(e) => setdocSpeciality(e.target.value)}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Experience
              </label>
              <input
                onChange={(e) => setdoExperience(e.target.value)}
                name="Experience"
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter Experience"
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Degree</label>
              <input
                onChange={(e) => setdocDegree(e.target.value)}
                name="Degree"
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter Degree"
              />
            </div>
          </div>
          <label className="text-gray-800 text-sm my-7 block">
            About Doctor
          </label>
          <textarea
            onChange={(e) => setAboutDoc(e.target.value)}
            className="w-full border p-3"
          ></textarea>
          <label className="text-gray-800 text-sm my-7 block">
            Upload doctor picture
          </label>
          <label
            onClick={addimg}
            htmlFor="uploadFile1"
            className="flex bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-3 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 mr-2 fill-white inline"
              viewBox="0 0 32 32"
            >
              <path
                d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                data-original="#000000"
              />
              <path
                d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                data-original="#000000"
              />
            </svg>
            Upload
            <input
              type="file"
              onChange={(e) => setdocimg(e.target.files[0])}
              id="uploadFile1"
              className="hidden"
            />
          </label>
          <p> {docimg?.name}</p>
          <div className="!mt-12">
            <button
              onClick={uploaddoctor}
              type="button"
              className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Add Doctor
            </button>
          </div>
          {uploading ? (
            <p className="text-lg font-bold my-5">Uploading...</p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
