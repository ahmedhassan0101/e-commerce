import { Badge } from "@/components/ui/badge";
import React from "react";

interface IconWithBadgeProps {
  itemsLength: number;
  icon: React.ReactNode;
}
export default function IconWithBadge({
  itemsLength,
  icon,
}: IconWithBadgeProps) {
  return (
    <div className="relative">
      {icon}
      {itemsLength > 0 && (
        <Badge
          text={itemsLength}
          variant="circle"
          className="absolute -top-2 -right-2"
        />
      )}
    </div>
  );
}
