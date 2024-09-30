import React from "react";
import IconWithBadge from "../../g/IconWithBadge";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";

export default function NavCart() {
  return (
    <Button asChild variant="ghost" size="icon">
      <Link href="/cart">
        <IconWithBadge
          icon={<ShoppingCart className="icon" />}
          itemsLength={5}
        />
      </Link>
    </Button>
  );
}
