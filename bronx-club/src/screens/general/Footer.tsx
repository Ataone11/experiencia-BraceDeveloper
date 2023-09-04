import foo from "../recursos/prueba daniel/footer/facebook.svg";
import foo2 from "../recursos/prueba daniel/footer/instagram.svg";
import foo3 from "../recursos/prueba daniel/footer/twitter.svg";
function Footer() {
  return (
    <div>
      <div className="bg-black w-full">
        <div className="grid grid-cols-1  md:grid-cols-2 md:gap-4 md:p-36">
          <div className="p-5 md:pl-24">
            <h1 className="font-serif font-bold text-white text-2xl">
              Working Hours
            </h1>
            <h2 className="font-serif font-extrabold text-white text-lgxl pt-5">
              Monday - Friday 5:00 AM - 12:00 AM
            </h2>
            <h2 className="font-serif font-extrabold text-white text-lgxl">
              Sunday - Saturday 8:00 AM - 10:00 PM
            </h2>
          
          </div>
          <div className="p-5">
            <h1 className="font-serif font-bold text-white text-2xl">
              Address
            </h1>
            <h2 className="font-serif font-extrabold text-white text-lgxl pt-5">
              661 Sulphur Springs Ave.
            </h2>
            <h2 className="font-serif font-extrabold text-white text-lgxl">
              Bronx, NY 10465
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
