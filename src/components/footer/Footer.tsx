import AboutUs from "./comp/AboutUs";
import FooterLinks from "./comp/FooterLinks";
import CustomerServices from "./comp/CustomerServices";
import HelpAndSupport from "./comp/HelpAndSupport";
import NewsLetter from "./comp/NewsLetter";
export default function Footer() {
  return (
    <footer className="container border-top py-5">
      <div className="grid">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <AboutUs />
          <HelpAndSupport />
          <CustomerServices />
          <NewsLetter />
        </div>
        <hr className="hr" />
        <FooterLinks />
      </div>
    </footer>
  );
}
