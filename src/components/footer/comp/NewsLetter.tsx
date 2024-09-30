import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function NewsLetter() {
  return (
    <div className="">
      <h2 className="text-xl-semi-darker mb-2">Sign up for our Newsletter</h2>

      <div className="flex mb-2">
        <Input
          type="email"
          placeholder="Your Email Address"
          className="flex-1 rounded-r-none"
        />
        <Button className="rounded-l-none">Subscribe</Button>
      </div>

      <p className="text-sm-dark">
        By clicking the SUBSCRIBE button, you are agreeing to our{" "}
        <Link href="/privacy-policy" className="text-blue-500">
          Privacy & Cookie Policy
        </Link>
      </p>

      <div className="mt-4">
        <h2 className="text-xl-semi-darker mb-2">We Accept</h2>

        <div className="flex mt-2 space-x-4">
          <img src="/images/payment/visa.webp" alt="Visa" className="h-8" />
          <img
            src="/images/payment/mastercard.webp"
            alt="MasterCard"
            className="h-8"
          />
          <img src="/images/payment/paypal.webp" alt="PayPal" className="h-8" />
        </div>
      </div>
    </div>
  );
}
