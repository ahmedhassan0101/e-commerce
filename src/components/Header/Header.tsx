import Link from "next/link";
import Navbar from "./comp/Navbar";
export default function Header() {
  return (
    <header className="h-full">
      <Link href="/browse">
        <div className="h-[54px] w-full bg-[url('/images/ad.jpg')] bg-cover bg-no-repeat bg-center" />
      </Link>
      <Navbar />
    </header>
  );
}
