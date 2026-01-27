import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Client Keeper CRM',
  description: 'Learn how Client Keeper protects your privacy and handles your personal information.',
}

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="mt-4 text-muted-foreground">
              Last Updated: December 18, 2025
            </p>
          </div>
        </header>

        {/* Content */}
        <div className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-3xl mx-auto prose prose-lg prose-purple">

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-outfit)] mb-4">
                Information We Collect
              </h2>
              <p className="text-muted-foreground mb-4">
                We collect the following types of personal information from users of the Client Keeper app:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Payment information (collected through our website for subscription processing)</li>
                <li>Photos</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                This information is collected to help users manage their data within the app and facilitate app functionalities.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-outfit)] mb-4">
                Use of Information
              </h2>
              <p className="text-muted-foreground mb-4">
                We collect user data for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>For the user&apos;s benefit, data is extracted and entered into the app to support its core functionality.</li>
                <li>To provide personalized recommendations.</li>
                <li>To improve app functionality and offer better communication.</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We do not use personal data for marketing purposes unless explicitly stated or agreed upon by the user.
              </p>
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
                We do not sell user data to third parties for marketing purposes.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-outfit)] mb-4">
                Storage and Security
              </h2>
              <p className="text-muted-foreground mb-4">
                We prioritize the security of your data. All personal information is securely stored using database backups. We also implement measures such as encryption and secure servers to protect your data from unauthorized access.
              </p>
              <p className="text-muted-foreground">
                We retain personal data for 30 days after a subscription has ended. After this period, the data will be permanently deleted from our systems.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-outfit)] mb-4">
                User Rights
              </h2>
              <p className="text-muted-foreground">
                Users have the right to request the deletion of their personal data. If you wish to delete your data, please contact us at{' '}
                <a href="mailto:support@clientkeepercrm.com" className="text-accent hover:text-accent/80 underline">
                  support@clientkeepercrm.com
                </a>
                . We will process your request in accordance with applicable laws and within a reasonable timeframe.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-outfit)] mb-4">
                Third-Party Services
              </h2>
              <p className="text-muted-foreground">
                We may utilize third-party services (e.g., for analytics, payment processing) that may process your personal data. We ensure that these services adhere to stringent data protection standards.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-outfit)] mb-4">
                Data Processing Location
              </h2>
              <p className="text-muted-foreground">
                Your data is processed in the United States of America and is handled with care, no matter where it is processed.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-outfit)] mb-4">
                Children&apos;s Privacy
              </h2>
              <p className="text-muted-foreground">
                Client Keeper is not intended for individuals under the age of 13. We do not knowingly collect personal data from children under 13 without parental consent. If you believe we have unintentionally collected such data, please contact us immediately at{' '}
                <a href="mailto:support@clientkeepercrm.com" className="text-accent hover:text-accent/80 underline">
                  support@clientkeepercrm.com
                </a>
                .
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-outfit)] mb-4">
                Policy Updates
              </h2>
              <p className="text-muted-foreground">
                We may update this privacy policy from time to time. Users will be notified of significant changes through email or via the app. Continued use of the app after the updates signifies acceptance of the new terms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-outfit)] mb-4">
                Contact Us
              </h2>
              <p className="text-muted-foreground">
                For any questions or concerns about this privacy policy or your personal data, please contact us at:
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
