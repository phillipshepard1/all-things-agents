import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Terms of Service | Client Keeper CRM',
  description: 'Read the terms and conditions for using Client Keeper CRM.',
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <header className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary to-background">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-[family-name:var(--font-outfit)]">
              Terms of Service
            </h1>
            <p className="mt-4 text-muted-foreground">
              Last Updated: December 18, 2025
            </p>
            <p className="mt-4 text-muted-foreground">
              Welcome to Client Keeper! By using our services, you agree to the following terms and conditions (&quot;Terms&quot;). Please read them carefully before using the app.
            </p>
          </div>
        </header>

        {/* Content */}
        <div className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-3xl mx-auto prose prose-lg prose-purple">

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-outfit)] mb-4">
                Acceptance of Terms
              </h2>
              <p className="text-muted-foreground">
                By downloading, accessing, or using Client Keeper (the &quot;App&quot;), you agree to be bound by these Terms of Service and all applicable laws. If you do not agree with these Terms, please do not use the App.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-outfit)] mb-4">
                Eligibility
              </h2>
              <p className="text-muted-foreground">
                You must be at least 13 years old to use Client Keeper. By using the App, you represent that you meet this age requirement and have the legal capacity to agree to these Terms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-outfit)] mb-4">
                Account Registration
              </h2>
              <p className="text-muted-foreground">
                To use certain features of the App, you are required to create an account. You agree to provide accurate and complete information during registration and to update your information as necessary. You are responsible for maintaining the confidentiality of your account and password and accept responsibility for all activities that occur under your account.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-outfit)] mb-4">
                Payments
              </h2>
              <p className="text-muted-foreground">
                Client Keeper subscriptions are purchased exclusively through our website at clientkeepercrm.com. The mobile app is a free companion that provides access to your existing subscription. There are no payments or purchases within the mobile app.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-outfit)] mb-4">
                Data Accuracy and Review
              </h2>
              <p className="text-muted-foreground">
                The App may utilize virtual assistants to review and ensure the accuracy of data entered. However, Client Keeper is not responsible for the accuracy of the data or for any decisions made based on the data entered or reviewed within the app.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-outfit)] mb-4">
                Use of the App
              </h2>
              <p className="text-muted-foreground mb-4">
                You agree to use the App only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Use the App in any way that violates any applicable laws or regulations.</li>
                <li>Interfere with or disrupt the operation of the App.</li>
                <li>Attempt to gain unauthorized access to the App, accounts, or networks connected to the App.</li>
                <li>Use the App to distribute spam, viruses, or other harmful material.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-outfit)] mb-4">
                Sharing of Information
              </h2>
              <p className="text-muted-foreground mb-4">
                We may share your personal data with:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Virtual assistants and other industry-related individuals to assist with the app&apos;s operations.</li>
                <li>Authorities, if required, to comply with legal obligations.</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We do not sell user data to third parties for marketing purposes. You are responsible for maintaining the confidentiality of your account and password and accept responsibility for all activities that occur under your account.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-outfit)] mb-4">
                Limitation of Liability
              </h2>
              <p className="text-muted-foreground">
                Client Keeper does not guarantee the accuracy of the data entered or processed through the App. The App is provided &quot;as is,&quot; and we are not responsible for any loss or damage resulting from your use of the App, including but not limited to inaccuracies in data or any decisions made based on the information within the App.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-outfit)] mb-4">
                Geographical Availability
              </h2>
              <p className="text-muted-foreground">
                Client Keeper is currently available for use in the United States only.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-outfit)] mb-4">
                Contact Us
              </h2>
              <p className="text-muted-foreground">
                For any questions or concerns about these Terms of Service, please contact us at:
              </p>
              <p className="text-muted-foreground mt-2">
                Email:{' '}
                <a href="mailto:support@clientkeepercrm.com" className="text-accent hover:text-accent/80 underline">
                  support@clientkeepercrm.com
                </a>
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
