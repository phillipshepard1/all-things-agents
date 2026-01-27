export const metadata = {
  title: 'Contact Us | All Things Agents',
  description: 'Get in touch with the All Things Agents team',
};

export default function ContactPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <h1 className="font-display text-4xl md:text-5xl font-bold text-hub-foreground mb-4">
        Contact Us
      </h1>
      <p className="text-lg text-hub-muted-foreground mb-8 text-center max-w-md">
        Have questions? We&apos;d love to hear from you.
      </p>
      <p className="text-hub-muted-foreground text-center">
        Contact form coming soon.
      </p>
    </div>
  );
}
