import Image from "next/image";
import Link from "next/link";
import React from "react";
import SocialMedia from "./SocialMedia";

const links = [
  {
    name: "About us",
    link: "/",
  },
  {
    name: "Contact us",
    link: "/",
  },
  {
    name: "Social Responsibility",
    link: "/",
  },
];
export default function AboutUs() {
  return (
    <div>
      <Image className="mb-3" src="/logo.png" alt="logo" width="150" height="0" priority />
      <ul className="text-sm-semi-dark col-flex mb-4">
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.link}>{link.name}</Link>
          </li>
        ))}
      </ul>
      <SocialMedia/>
    </div>
  );
}
