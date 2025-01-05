import Docscomp from "../components/docstcomp";
import usePageTitle from "../customhooks/usetitle";

export default function Docspage() {
  usePageTitle("Doctors");
  return <Docscomp />;
}
