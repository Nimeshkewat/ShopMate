import { Link, Navigate } from "react-router-dom";
import { ClipboardList, ShieldCheck, Store } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/api/apiClient";
import { useBecomeSeller } from "@/hooks/seller/useBecomeSeller";
import { useProfile } from "@/hooks/user/useProfile";
import BecomeSellerForm from "@/components/seller/BecomeSellerForm";
import type { BecomeSellerPayload } from "@/types/seller";

const steps = [
  {
    icon: ClipboardList,
    title: "Submit your details",
    text: "Tell us about your shop and payout account.",
  },
  {
    icon: ShieldCheck,
    title: "Admin review",
    text: "We verify your application before you go live.",
  },
  {
    icon: Store,
    title: "Start selling",
    text: "List products and manage orders from your dashboard.",
  },
];

function BecomeSeller() {
  const { data } = useProfile();
  const becomeSeller = useBecomeSeller();
  const role = data?.user.role;

  if (role === "admin") return <Navigate to="/" replace />;

  // already a seller (including right after submitting): show where to go next
  if (role === "seller") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
        <span className="grid size-16 place-items-center rounded-2xl bg-secondary text-primary ring-1 ring-border/50">
          <Store className="size-8" />
        </span>
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">You're registered as a seller</h1>
        <p className="text-sm text-muted-foreground">
          New shops need admin approval before products can go live. You can
          check your status from your seller dashboard.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button>
            <Link to="/seller">Go to Seller Dashboard</Link>
          </Button>
          <Button variant="outline">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (payload: BecomeSellerPayload) => {
    const res = await becomeSeller.mutateAsync(payload);
    toast.success(res?.message || "Application submitted");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Become a Seller</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Tell us about your shop. An admin reviews every application before you
        can start selling.
      </p>

      <ol className="mt-6 grid gap-3 sm:grid-cols-3">
        {steps.map(({ icon: Icon, title, text }, i) => (
          <li
            key={title}
            className="rounded-xl bg-card p-4 shadow-sm ring-1 ring-border/60"
          >
            <span className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <span className="grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {i + 1}
              </span>
              <Icon className="size-3.5 text-primary" />
              {title}
            </span>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-xl bg-card p-6 shadow-sm ring-1 ring-border/60">
        <BecomeSellerForm
          onSubmit={handleSubmit}
          isPending={becomeSeller.isPending}
          serverError={
            becomeSeller.error ? getErrorMessage(becomeSeller.error) : undefined
          }
        />
      </div>
    </div>
  );
}

export default BecomeSeller;
