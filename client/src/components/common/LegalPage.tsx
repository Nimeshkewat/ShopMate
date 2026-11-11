interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface Props {
  title: string;
  summary: string;
  sections: LegalSection[];
}

function LegalPage({ title, summary, sections }: Props) {
  return (
    <article className="min-h-screen bg-background px-4 py-16 text-foreground">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <header className="space-y-3 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            {summary}
          </p>
          <p className="text-xs text-muted-foreground">
            Last updated November 11, 2026
          </p>
        </header>

        <div className="space-y-6">
          {sections.map((section) => (
            <section
              key={section.heading}
              className="space-y-2 rounded-xl border border-border/80 bg-card/50 p-6"
            >
              <h2 className="text-lg font-semibold">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}

export default LegalPage;
