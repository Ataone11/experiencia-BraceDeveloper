import Footer from "../footer/Footer";
import Navbar from "../header/Navbar";
import NavbarM from "../header/NavbarM";
import BaseHead from "./BaseHead";

interface Params {
  title?: string;
  description?: string;
  children?: any;
}

const defaultTitle = "Titulo por default";
const defaultDescription = "Descripción por default";
const BasePage = ({
  title = defaultTitle,
  description = defaultDescription,
  children = null,
}: Params) => {
  return (
    <>
      <BaseHead title={title} description={description}></BaseHead>
      <main>
        <Navbar id={3} />
        <NavbarM id={2} />
        <div className="initial-container">{children}</div>
        <Footer />
      </main>
    </>
  );
};

export default BasePage;
