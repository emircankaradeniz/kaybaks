type ProcessStep = {
  number: string;
  title: string;
  body: string;
};

type ProcessTimelineProps = {
  steps: ProcessStep[];
};

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="industrial-card rounded-[1.8rem] p-6 sm:p-8">
      <div className="space-y-5 lg:space-y-0">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="relative grid gap-4 pb-6 pl-8 last:pb-0 sm:grid-cols-[72px_1fr]"
          >
            {index !== steps.length - 1 ? (
              <span className="absolute left-[15px] top-10 h-[calc(100%-1.25rem)] w-px bg-white/10" />
            ) : null}
            <span className="absolute left-0 top-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/35 bg-amber-300/10 text-xs font-bold tracking-[0.15em] text-amber-200">
              {step.number}
            </span>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-200/85">
              Adım {step.number}
            </div>
            <div>
              <h3 className="heading-display text-3xl uppercase text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-stone-300/76">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
