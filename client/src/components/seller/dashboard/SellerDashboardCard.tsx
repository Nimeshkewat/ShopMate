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
      className={cn("rounded-2xl border bg-card p-5 shadow-sm", className)}
    >
      <h2 className="font-semibold">{title}</h2>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      <div className="mt-4">{children}</div>
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
