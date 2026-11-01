import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
}

function SellerDashboardCard({
  title,
  description,
  className,
  children,
}: Props) {
  return (
    <section
      className={cn("rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/60", className)}
    >
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

export function EmptyChart() {
  return (
    <p className="grid h-60 place-items-center text-sm text-muted-foreground">
      No data yet
    </p>
  );
}

export default SellerDashboardCard;
