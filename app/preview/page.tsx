"use client";

import { MorphingText } from "@/components/ui/morphing-text";
import { WordRotate } from "@/components/ui/word-rotate";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { TextAnimate } from "@/components/ui/text-animate";

const endings = ["Easy.", "Fun.", "Life Changing."];
const fullPhrases = [
  "Real Estate Should Be Easy.",
  "Real Estate Should Be Fun.",
  "Real Estate Should Be Life Changing.",
];

function SectionDivider({ label, description }: { label: string; description: string }) {
  return (
    <div className="border-b border-hub-border pb-4 mb-12">
      <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-hub-accent text-hub-accent-foreground rounded-full">
        {label}
      </span>
      <p className="mt-2 text-sm text-hub-muted-foreground">{description}</p>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-hub-background text-hub-foreground font-display">
      {/* Header */}
      <div className="border-b border-hub-border bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-lg font-semibold">Philosophy Section Preview</h1>
          <p className="text-sm text-hub-muted-foreground">
            Scroll to compare all 5 animation styles
          </p>
        </div>
      </div>

      {/* Option A: Morphing Text */}
      <section className="py-20 md:py-28 bg-hub-muted/30">
        <div className="container mx-auto px-4">
          <SectionDivider
            label="Option A"
            description='Morphing Text — Static prefix + morphing ending word with blur/dissolve transition'
          />
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              Real Estate Should Be
            </p>
            <MorphingText
              texts={endings}
              className="text-3xl md:text-4xl lg:text-5xl font-semibold"
            />
          </div>
        </div>
      </section>

      {/* Option B: Word Rotate */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <SectionDivider
            label="Option B"
            description='Word Rotate — Static prefix + vertical slide animation on the ending word (accent color)'
          />
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-3xl md:text-4xl lg:text-5xl font-semibold">
              Real Estate Should Be{" "}
              <WordRotate
                words={endings}
                className="text-hub-accent font-bold"
                duration={2500}
                inline
              />
            </p>
          </div>
        </div>
      </section>

      {/* Option C: Typing Animation */}
      <section className="py-20 md:py-28 bg-hub-muted/30">
        <div className="container mx-auto px-4">
          <SectionDivider
            label="Option C"
            description='Typing Animation — Full phrases typed out with cursor, delete & retype loop'
          />
          <div className="max-w-4xl mx-auto text-center">
            <TypingAnimation
              words={fullPhrases}
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-hub-foreground"
              typeSpeed={60}
              deleteSpeed={30}
              pauseDelay={1500}
              loop
              as="p"
              startOnView
              showCursor
              cursorStyle="line"
            />
          </div>
        </div>
      </section>

      {/* Option D: Staggered Blur-In */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <SectionDivider
            label="Option D"
            description='Staggered Blur-In — All 3 statements visible, each animates in with blurInUp on scroll'
          />
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {fullPhrases.map((phrase, index) => (
              <TextAnimate
                key={phrase}
                animation="blurInUp"
                by="word"
                as="p"
                className="text-3xl md:text-4xl lg:text-5xl font-semibold text-hub-foreground"
                delay={index * 0.3}
                startOnView
                once
              >
                {phrase}
              </TextAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* Option E: 3D Flip Roll */}
      <section className="py-20 md:py-28 bg-hub-muted/30">
        <div className="container mx-auto px-4">
          <SectionDivider
            label="Option E"
            description='3D Flip Roll — Static prefix + ending word flips/rolls to the next with perspective transform'
          />
          <div className="max-w-4xl mx-auto text-center" style={{ perspective: "600px" }}>
            <p className="text-3xl md:text-4xl lg:text-5xl font-semibold">
              Real Estate Should Be{" "}
              <WordRotate
                words={endings}
                className="font-bold text-hub-accent"
                duration={2500}
                inline
                motionProps={{
                  initial: { rotateX: 90, opacity: 0, filter: "blur(4px)" },
                  animate: { rotateX: 0, opacity: 1, filter: "blur(0px)" },
                  exit: { rotateX: -90, opacity: 0, filter: "blur(4px)" },
                  transition: { duration: 0.4, ease: "easeOut" },
                }}
              />
            </p>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <div className="py-8 border-t border-hub-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-hub-muted-foreground">
            Pick your favorite and it will replace the current philosophy section.
          </p>
        </div>
      </div>
    </div>
  );
}
