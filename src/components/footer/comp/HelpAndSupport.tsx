import Link from "next/link";
const links = [
  {
    name: "Shipping Info",
    link: "",
  },
  {
    name: "Returns",
    link: "",
  },
  {
    name: "How To Order",
    link: "",
  },
  {
    name: "How To Track",
    link: "",
  },
  {
    name: "Size Guide",
    link: "",
  },
];
export default function HelpAndSupport() {
  return (
    <div>
      <h2 className="text-xl-semi-darker mb-2">Help & Support</h2>
      <ul className="text-sm-semi-dark col-flex">
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.link}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
