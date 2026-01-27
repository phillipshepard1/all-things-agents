export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "I've tried other CRMs but this is one I'll actually use. It doesn't overwhelm me with unnecessary features, and I find myself staying organized without even thinking about it.",
    name: "Danielle J",
    title: "Senior Property Manager",
    company: "",
    initials: "DJ",
  },
  {
    quote:
      "So easy and mobile friendly! Finally a way to follow up with clients and organize data without the tech overwhelm. I can update everything on the go between showings.",
    name: "Amanda W",
    title: "Real Estate Broker",
    company: "",
    initials: "AW",
  },
  {
    quote:
      "The follow up is fantastic. Goodbye to Excel spreadsheets and missed important dates! With MYRA and Client Keeper's simple follow-up system, managing real estate has become so much easier!",
    name: "Tyler B",
    title: "Real Estate Broker",
    company: "",
    initials: "TB",
  },
  {
    quote:
      "MYRA is like having a personal assistant who never sleeps. She handles all my data entry and follow-up reminders behind the scenes so I can actually be present with my kids after work.",
    name: "Jessica M",
    title: "Realtor",
    company: "Century 21",
    initials: "JM",
  },
  {
    quote:
      "I was spending hours every week on admin tasks. Now MYRA takes care of it all automatically. I've gained back my evenings with my family and my business is thriving more than ever.",
    name: "Marcus T",
    title: "Broker Associate",
    company: "",
    initials: "MT",
  },
  {
    quote:
      "As a mom of three, I needed a CRM that works for me, not the other way around. MYRA handles the busywork while I focus on clients and still make it to soccer practice.",
    name: "Rachel K",
    title: "Real Estate Agent",
    company: "Coldwell Banker",
    initials: "RK",
  },
];
