"use client";

import { useApp } from "@/contexts/AppContext";

interface SocialProofProps {
  productId: string;
  productName: string;
}

export default function SocialProof({ productId }: SocialProofProps) {
  const { experimentVariant } = useApp();
  // Generate consistent but different social proof data for each product
  const generateSocialProofData = (id: string) => {
    const seed = parseInt(id) || 1;

    // Generate consistent random numbers based on product ID
    const viewersCount = Math.floor((seed * 17) % 8) + 3; // 3-10 viewers
    const purchasesCount = Math.floor((seed * 23) % 15) + 10; // 10-24 purchases

    // Return specific social proof based on experiment variant
    if (experimentVariant === "v1") {
      // V1: Show viewers social proof only
      return [
        {
          type: "viewers",
          text: `👁️ ${viewersCount} people viewing this`,
          color: "bg-orange-100 text-orange-700 border-orange-200",
        },
      ];
    } else if (experimentVariant === "v2") {
      // V2: Show sales social proof only
      return [
        {
          type: "purchases",
          text: `🔥 ${purchasesCount} sold this week`,
          color: "bg-red-100 text-red-700 border-red-200",
        },
      ];
    }

    // Control: Show no social proof (baseline)
    return [];
  };

  const socialProofs = generateSocialProofData(productId);

  return (
    <div className="space-y-1">
      {socialProofs.map((proof, index) => (
        <div
          key={`${productId}-${proof.type}-${index}`}
          className={`text-xs px-2 py-1 rounded border ${proof.color} font-medium flex items-center justify-center`}
        >
          {proof.text}
        </div>
      ))}
    </div>
  );
}
