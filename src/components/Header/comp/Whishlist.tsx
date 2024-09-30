import { Heart } from "lucide-react";
import React from "react";
import { Button } from "../../ui/button";

export default function Whishlist() {
  return (
    <Button variant="ghost" size="icon">
      <Heart className="icon" />
    </Button>
  );
}
// href="/profile/whishlist"
