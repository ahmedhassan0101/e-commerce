import Link from "next/link";
const links = [
  {
    name: "Customer service",
    link: "",
  },
  {
    name: "Terms and Conditions",
    link: "",
  },
  {
    name: "Consumers (Transactions)",
    link: "",
  },
  {
    name: "Take our feedback survey",
    link: "",
  },
];
export default function CustomerServices() {
  return (
    <div>
      {" "}
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
    </div>
  );
}
