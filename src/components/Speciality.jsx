import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FindbySpeciality = [
  {
    img: "src/assets/doctor.png",
    Speciality: "General physician",
    spnum: 1,
  },
  {
    img: "src/assets/gynecologist.png",
    Speciality: "Gynecologist",
    spnum: 2,
  },
  {
    img: "src/assets/dermatologist.png",
    Speciality: "Dermatologist",
    spnum: 3,
  },
  {
    img: "src/assets/pediatrics.png",
    Speciality: "Pediatricians",
    spnum: 4,
  },
  {
    img: "src/assets/neurologist.png",
    Speciality: "Neurologist",
    spnum: 5,
  },
  {
    img: "src/assets/gastroenterologist.png",
    Speciality: "Gastroenterologist",
    spnum: 6,
  },
];

export default function Speciality() {
  return (
    <div className="mt-10 mx-10">
      <div className="flex flex-col items-center">
        <h2 className="text-4xl py-4 font-bold">Find by Speciality</h2>
        <p className="text-center my-6 text-lg">
          Simply browse through our extensive list of trusted doctors, schedule
          <br />
          your appointment hassle-free.
        </p>
      </div>

      <div className="flex flex-wrap gap-5 justify-center">
        {FindbySpeciality.map((sp) => (
          <SpecialityCard
            key={sp.spnum}
            img={sp.img}
            speciality={sp.Speciality}
          />
        ))}
      </div>
    </div>
  );
}

// Card component with Framer Motion's whileInView for scroll animation
const SpecialityCard = ({ img, speciality }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="group before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-sky-200 via-sky-400  before:absolute before:top-0 w-80 h-72 relative bg-slate-50 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }} // Triggers animation when 10% of the card is in view
      variants={cardVariants}
    >
      <motion.img
        src={img}
        className="w-28 h-28 bg-blue-700 mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24 group-hover:-translate-y-20 transition-all duration-500"
        alt={`${speciality} image`}
      />
      <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
        <span className="text-2xl font-semibold"> {speciality} </span>
      </div>
      <Link
        to="/doctors"
        className="bg-blue-700 px-4 py-1 text-slate-50 rounded-md z-10 hover:scale-125 transition-all duration-500 hover:bg-blue-500"
      >
        Explore
      </Link>
    </motion.div>
  );
};
