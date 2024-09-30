import {
  CreditCard,
  Ellipsis,
  Headset,
  LifeBuoy,
  Settings,
  ShieldBan,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../../ui/button";

export default function NavMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Ellipsis className="h-4 w-4 icon" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <ShieldBan className="mr-2 h-4 w-4 icon" />
            <span>Buyer Protection</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Headset className="mr-2 h-4 w-4 icon" />
            <span>Customer Service</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4 icon" />
            <span>Help</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
