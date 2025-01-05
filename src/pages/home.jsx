import Speciality from "../components/Speciality";
import Mobileapp from "../components/mobileapp";
import Hero from "../components/hero";
import Ocs from "../components/ocs";
import usePageTitle from "../customhooks/usetitle";

export default function Home() {
  usePageTitle("PrimeCare");
  return (
    <>
      <Hero />
      <Speciality />
      <Ocs />
      <Mobileapp />
    </>
  );
}
