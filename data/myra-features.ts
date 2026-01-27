import { Calendar, Database, Brain, Search, ListTodo, Heart } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface MyraFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const myraFeatures: MyraFeature[] = [
  {
    title: "Schedule Follow Ups",
    description: "Send MYRA a voice note saying \"check in with the Millers every 6 months\" and she'll notify you perfectly on schedule.",
    icon: Calendar,
  },
  {
    title: "Capture Client Data",
    description: "Voice memos, sticky notes, napkin scribbles - Myra organizes it all perfectly.",
    icon: Database,
  },
  {
    title: "Remember Client Details",
    description: "When clients say \"we loved the kitchen but hated the bathroom,\" let Myra know, and she'll add that note to their profile.",
    icon: Brain,
  },
  {
    title: "Record Property Searches",
    description: "When the Smiths say \"looking for 2500 sq ft, 4-bed in good school district,\" Myra logs their property requirements.",
    icon: Search,
  },
  {
    title: "Plan Your To-Dos",
    description: "Morning thoughts, car ramblings, task overload - Myra enters every to-do perfectly for you.",
    icon: ListTodo,
  },
  {
    title: "Important Dates",
    description: "Birthdays, anniversaries, closing dates - MYRA tracks all custom date follow-ups to show you care.",
    icon: Heart,
  },
];

export const myraTagline = "My Real Estate Assistant";
export const myraDescription = "MYRA is there to help you streamline data entry and schedule follow-ups so you stay organized, build better relationships, and close more deals (without the overwhelm).";
