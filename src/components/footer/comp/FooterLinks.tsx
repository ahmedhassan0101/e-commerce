import { Copyright } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

type Link = {
  href: string;
  text: string;
};

const links: Link[] = [
  { href: "/about-us", text: "About Us" },
  { href: "/contact-us", text: "Contact Us" },
  { href: "/warranty-policy", text: "Warranty Policy" },
  { href: "/terms", text: "Terms of Use" },
  { href: "/privacy-policy", text: "Privacy Policy" },
];

export const currentYear = new Date().getFullYear();
// { country }
export default function FooterLinks() {
  return (
    <div className="">
      <section className="container mx-auto px-4 flex justify-center gap-4">
        {links.map((link, index) => (
          <Fragment key={index}>
            <Link
              href={link.href}
              className="text-sm-semi-darker hover:underline"
            >
              {link.text}
            </Link>
            {index < links.length - 1 && <span>-</span>}
          </Fragment>
        ))}
      </section>
      <hr className="hr" />
      <section className="container mx-auto px-4 flex justify-between text-sm-semi-darker">
        <div className="flex items-center gap-1">
          <Copyright size={18}/>
          <span>{currentYear} Merchant. All Rights Reserved.</span>
        </div>
        <span>Developed by Dookan.net</span>
      </section>
    </div>
  );
}
// const data = [
//   {
//     name: "Privacy Center",
//     link: "",
//   },
//   {
//     name: "Privacy & Cookie Policy",
//     link: "",
//   },
//   {
//     name: "Manage Cookies",
//     link: "",
//   },
//   {
//     name: "Terms & Conditions",
//     link: "",
//   },
//   {
//     name: "Copyright Notice",
//     link: "",
//   },
// ];
{
  /* <section>©2022 SHOPPAY All Rights Resereved.</section>
      <section>
        <ul>
          {data.map((link) => (
            <li>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
          <li>
            <a>
              <IoLocationSharp /> {country.name}
            </a>
          </li>
        </ul>
      </section> */
}
