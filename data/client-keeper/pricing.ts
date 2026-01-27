export interface PricingTier {
  name: string;
  description: string;
  price: number;
  period: string;
  features: string[];
  cta: string;
  featured: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    description: "Perfect for new agents",
    price: 29,
    period: "month",
    features: [
      "Up to 100 contacts",
      "Basic pipeline view",
      "Email templates",
      "Mobile app access",
      "Email support",
    ],
    cta: "Start Free Trial",
    featured: false,
  },
  {
    name: "Professional",
    description: "For growing agents",
    price: 49,
    period: "month",
    features: [
      "Unlimited contacts",
      "Advanced pipeline",
      "Automated follow-ups",
      "MLS integration",
      "Priority support",
      "Custom branding",
    ],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    name: "Team",
    description: "For brokerages & teams",
    price: 99,
    period: "month",
    features: [
      "Everything in Professional",
      "Up to 10 users",
      "Team dashboards",
      "Lead routing",
      "Admin controls",
      "Dedicated success manager",
    ],
    cta: "Contact Sales",
    featured: false,
  },
];
