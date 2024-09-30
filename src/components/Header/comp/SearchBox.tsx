import { Search } from "lucide-react";
import React from "react";
import { Button } from "../../ui/button";
import { Input } from "@/components/ui/input";

export default function SearchBox() {
  // const [query, setQuery] = useState(router.query.search || "");
  return (
    <form className="mx-auto  lg:flex  hidden ">
      <Input type="email" placeholder="Search..." className=" rounded-r-none" />
      <Button type="submit" asChild className="rounded-l-none w-16 flex-none">
        <Search className="" size={15} />
      </Button>
    </form>
  );
}
