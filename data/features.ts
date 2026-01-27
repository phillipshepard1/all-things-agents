import {
  Users,
  Calendar,
  BarChart3,
  Mail,
  Bell,
  FileText,
  UserPlus,
  Clock,
  TrendingUp,
  PieChart,
  Sparkles,
  RefreshCw,
  DollarSign,
  type LucideIcon,
} from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: Users,
    title: "Contact Management",
    description:
      "Keep all your client information organized in one place. Never lose track of a lead again.",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description:
      "Never miss a showing or follow-up with automated reminders and calendar sync.",
  },
  {
    icon: BarChart3,
    title: "Pipeline Tracking",
    description:
      "Visualize your deals from first contact to closing. See your progress at a glance.",
  },
  {
    icon: Mail,
    title: "Email Campaigns",
    description:
      "Stay top-of-mind with automated drip campaigns tailored for real estate.",
  },
  {
    icon: Bell,
    title: "Task Reminders",
    description:
      "Get notified about important follow-ups, birthdays, and closing anniversaries.",
  },
  {
    icon: FileText,
    title: "Document Storage",
    description:
      "Store contracts, photos, and documents securely. Access them anywhere.",
  },
];

export interface DetailedFeature {
  id: string;
  icon: LucideIcon;
  title: string;
  shortTitle: string;
  description: string;
  bullets: string[];
}

export const detailedFeatures: DetailedFeature[] = [
  {
    id: "myra",
    icon: Sparkles,
    title: "MYRA AI Assistant",
    shortTitle: "MYRA AI",
    description:
      "Meet MYRA — your AI assistant that enters data for you. Just talk or type naturally, and MYRA handles the rest. It's like having a personal assistant who never sleeps.",
    bullets: [
      "Voice memos that automatically become CRM entries",
      "Natural language — just describe what happened",
      "Auto-fills contact info, notes, and follow-ups",
      "Works from anywhere — phone, tablet, or desktop",
    ],
  },
  {
    id: "followups",
    icon: RefreshCw,
    title: "Repeating Follow-Ups",
    shortTitle: "Follow-Ups",
    description:
      "Set it once, stay connected forever. Automated repeating follow-ups ensure you never lose touch with past clients or let hot leads go cold.",
    bullets: [
      "Automatic reminders on your schedule",
      "Birthday, anniversary, and closing date alerts",
      "Customizable follow-up sequences",
      "Mark complete or snooze with one tap",
    ],
  },
  {
    id: "contacts",
    icon: Users,
    title: "Contact Management",
    shortTitle: "Contacts",
    description:
      "All your clients, leads, and relationships in one organized place. Powerful search, smart tags, and detailed history at your fingertips.",
    bullets: [
      "Complete history for every contact",
      "Smart tags and custom categories",
      "Notes, documents, and photos attached",
      "Free migration from your current system",
    ],
  },
  {
    id: "transactions",
    icon: DollarSign,
    title: "Transaction Tracking",
    shortTitle: "Transactions",
    description:
      "Track every deal from listing to closing. See your pipeline at a glance and never miss a deadline or important milestone.",
    bullets: [
      "Visual pipeline with drag-and-drop",
      "Key dates and milestone tracking",
      "Commission calculations built-in",
      "Document storage for each deal",
    ],
  },
];

export const benefits: string[] = [
  "Increase client retention by 40%",
  "Close x2 deals with automatic follow-up reminders",
  "Never miss a birthday, anniversary, or closing date",
  "Access your CRM from anywhere - fully mobile ready",
  "Import your existing contacts in seconds",
];
