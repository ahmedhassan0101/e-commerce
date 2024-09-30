"use client";
import React, { Fragment, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Check, X } from "lucide-react";

// Types
type Plan = {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyDiscount: number;
  isPopular?: boolean;
  features: Record<string, string | boolean>;
};

type FeatureGroup = {
  label: string;
  features: string[];
};

// Data
const pricingData: {
  plans: Plan[];
  featureGroups: FeatureGroup[];
} = {
  plans: [
    {
      name: "Essential",
      monthlyPrice: 35,
      yearlyDiscount: 20,
      description: "Unlimited placeholder texts.",
      isPopular: false,
      features: {
        "Account Access": "400",
        "Custom Domains": "4",
        "Receipts Forward": true,
        "Supplier Management": "1",
        "Generate Public URLs": true,
        "API Integrations": true,
        "Extra Add-ons": true,
        "Admin Roles": false,
        "Enterprise Add-ons": false,
        "Custom Connection": false,
      },
    },
    {
      name: "Perform",
      monthlyPrice: 54,
      yearlyDiscount: 20,
      description: "Unlimited placeholder texts.",
      isPopular: true,
      features: {
        "Account Access": "800",
        "Custom Domains": "10",
        "Receipts Forward": true,
        "Supplier Management": "10",
        "Generate Public URLs": true,
        "API Integrations": true,
        "Extra Add-ons": true,
        "Admin Roles": false,
        "Enterprise Add-ons": false,
        "Custom Connection": false,
      },
    },
    {
      name: "Enterprise",
      monthlyPrice: 85,
      yearlyDiscount: 20,
      description: "Unlimited placeholder texts.",
      isPopular: false,
      features: {
        "Account Access": "Unlimited",
        "Custom Domains": "Unlimited",
        "Receipts Forward": true,
        "Supplier Management": "Unlimited",
        "Generate Public URLs": true,
        "API Integrations": true,
        "Extra Add-ons": true,
        "Admin Roles": true,
        "Enterprise Add-ons": true,
        "Custom Connection": true,
      },
    },
    {
      name: "Pro",
      monthlyPrice: 120,
      yearlyDiscount: 20,
      description: "Unlimited placeholder texts.",
      isPopular: false,
      features: {
        "Account Access": "1000",
        "Custom Domains": "20",
        "Receipts Forward": true,
        "Supplier Management": "20",
        "Generate Public URLs": true,
        "API Integrations": true,
        "Extra Add-ons": true,
        "Admin Roles": true,
        "Enterprise Add-ons": true,
        "Custom Connection": true,
      },
    },
  ],
  featureGroups: [
    {
      label: "Platform",
      features: [
        "Account Access",
        "Custom Domains",
        "Receipts Forward",
        "Supplier Management",
      ],
    },
    {
      label: "Features",
      features: [
        "Generate Public URLs",
        "API Integrations",
        "Extra Add-ons",
        "Admin Roles",
        "Enterprise Add-ons",
      ],
    },
    {
      label: "Support",
      features: ["Custom Connection"],
    },
  ],
};

// Components
const FeatureCard: React.FC<{ feature: string | boolean }> = ({ feature }) => {
  if (!feature)
    return (
      <div className="flex items-center justify-start h-9 gap-2">
        <X className="w-5 h-5 text-red-500" />
      </div>
    );
  return (
    <div className="flex items-center justify-start h-9 gap-2">
      <Check className="w-5 h-5 text-green-500" />
      {typeof feature === "string" && <span>{feature}</span>}
    </div>
  );
};
// const PlanCard: React.FC<{ plan: Plan; isYearly: boolean }> = ({
//   plan,
//   isYearly,
// }) => {
//   const price = isYearly
//     ? ((plan.monthlyPrice * (100 - plan.yearlyDiscount)) / 100).toFixed(2)
//     : plan.monthlyPrice.toFixed(2);



//   return (
//     <div
//       className={`flex flex-col  justify-center p-4  rounded-3xl  ${
//         plan.isPopular
//           ? "bg-slate-900 text-white "
//           : "bg-white text-black "
//       }`}
//     >
//       <div className="grid gap-1 items-end h-40 mb-4">
//         <h3 className="text-xl font-bold">{plan.name}</h3>
//         <div className="text-2xl font-bold">
//           ${price}
//           <span className="text-sm font-normal">/mo</span>
//         </div>
//         <p className="mb-4">{plan.description}</p>
//         <button className="w-full bg-blue-500 text-white py-2 rounded-md">
//           Get Started
//         </button>
//       </div>
//       <hr />
//       {pricingData.featureGroups.map((group) => (
//         <div key={group.label}>
//           <div className="h-12 flex items-center pt-2" />
//           {group.features.map((feature) => (
//             <Fragment key={feature}>
//               <FeatureCard key={feature} feature={plan.features[feature]} />
//               <hr />
//             </Fragment>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };


// const CompareColumn: React.FC<{
//   isYearly: boolean;
//   setIsYearly: (value: boolean) => void;
// }> = ({ isYearly, setIsYearly }) => (
//   <div className="flex flex-col p-5 ">
//     <div className="flex gap-1 items-end mb-4 h-40">
//       <span>Monthly</span>
//       <Switch checked={isYearly} onCheckedChange={setIsYearly} />
//       <span>Yearly ({pricingData.plans[0].yearlyDiscount}% off)</span>
//     </div>

//     <hr />
//     {pricingData.featureGroups.map((group) => (
//       <div key={group.label}>
//         <div className="h-12 flex items-center pt-2">
//           <h4 className="font-bold">{group.label}</h4>
//         </div>
//         {group.features.map((feature) => (
//           <Fragment key={feature}>
//             <p className="flex items-center h-9 justify-start">{feature}</p>
//             <hr />
//           </Fragment>
//         ))}
//       </div>
//     ))}
//   </div>
// );

// const PricingPlans: React.FC = () => {
//   const [isYearly, setIsYearly] = useState(false);

//   return (
//     <div className=" p-3 text-sm">
//       <div className="grid grid-cols-[repeat(5,1fr)] gap-4 ">
//         <CompareColumn isYearly={isYearly} setIsYearly={setIsYearly} />
//         {pricingData.plans.map((plan) => (
//           <PlanCard key={plan.name} plan={plan} isYearly={isYearly} />
//         ))}
//       </div>
//     </div>
//   );
// };

const PlanCard: React.FC<{ plan: Plan; isYearly: boolean }> = ({
  plan,
  isYearly,
}) => {
  const price = isYearly
    ? ((plan.monthlyPrice * (100 - plan.yearlyDiscount)) / 100).toFixed(2)
    : plan.monthlyPrice.toFixed(2);

  return (
    <div
      className={`flex flex-col justify-center p-4 rounded-3xl w-[280px] ${
        plan.isPopular
          ? "bg-slate-900 text-white"
          : "bg-white text-black"
      }`}
    >
      <div className="grid gap-1 items-end h-40 mb-4">
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <div className="text-2xl font-bold">
          ${price}
          <span className="text-sm font-normal">/mo</span>
        </div>
        <p className="mb-4">{plan.description}</p>
        <button className="w-full bg-blue-500 text-white py-2 rounded-md">
          Get Started
        </button>
      </div>
      <hr />
      {pricingData.featureGroups.map((group) => (
        <div key={group.label}>
          <div className="h-12 flex items-center pt-2" />
          {group.features.map((feature) => (
            <Fragment key={feature}>
              <FeatureCard key={feature} feature={plan.features[feature]} />
              <hr />
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};

const CompareColumn: React.FC<{
  isYearly: boolean;
  setIsYearly: (value: boolean) => void;
}> = ({ isYearly, setIsYearly }) => (
  <div className="flex flex-col p-5 bg-white z-10">
    <div className="flex gap-1 items-end mb-4 h-40">
      <span>Monthly</span>
      <Switch checked={isYearly} onCheckedChange={setIsYearly} />
      <span>Yearly ({pricingData.plans[0].yearlyDiscount}% off)</span>
    </div>
    <hr />
    {pricingData.featureGroups.map((group) => (
      <div key={group.label}>
        <div className="h-12 flex items-center pt-2">
          <h4 className="font-bold">{group.label}</h4>
        </div>
        {group.features.map((feature) => (
          <Fragment key={feature}>
            <p className="flex items-center h-9 justify-start">{feature}</p>
            <hr />
          </Fragment>
        ))}
      </div>
    ))}
  </div>
);

const PricingPlans: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="p-3 text-sm">
      <div className="flex">
        <CompareColumn isYearly={isYearly} setIsYearly={setIsYearly} />
        <div className="flex  gap-4 overflow-x-auto">
          {pricingData.plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} isYearly={isYearly} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default PricingPlans;
