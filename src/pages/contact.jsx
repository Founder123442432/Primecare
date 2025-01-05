import Contactel from "../components/contactel";
import usePageTitle from "../customhooks/usetitle";

export default function Contact() {
  usePageTitle("contact us");
  return <Contactel />;
}
