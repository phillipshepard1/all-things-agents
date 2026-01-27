export const metadata = {
  title: 'About Us | All Things Agents',
  description: 'Learn about All Things Agents and our mission to simplify real estate software',
};

export default function AboutPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <h1 className="font-display text-4xl md:text-5xl font-bold text-hub-foreground mb-4">
        About Us
      </h1>
      <p className="text-lg text-hub-muted-foreground mb-8 text-center max-w-2xl">
        We believe real estate software should be simple, powerful, and actually enjoyable to use.
        That&apos;s why we&apos;re building tools that let agents focus on what matters most—showing homes and building relationships.
      </p>
      <p className="text-hub-muted-foreground text-center">
        More coming soon.
      </p>
    </div>
  );
}
