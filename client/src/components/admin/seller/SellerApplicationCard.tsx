import { Check, Store, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PendingSeller } from "@/types/admin";

interface Props {
  seller: PendingSeller;
  onApprove: (seller: PendingSeller) => void;
  onReject: (seller: PendingSeller) => void;
  isApproving?: boolean;
  disabled?: boolean;
}

function SellerApplicationCard({
  seller,
  onApprove,
  onReject,
  isApproving,
  disabled,
}: Props) {
  const ownerName = seller.userId?.username || "N/A";
  const ownerEmail = seller.userId?.email || "N/A";
  const bankName = seller.payoutBankDetails?.bankName;

  const details = [
    { label: "Owner", value: ownerName },
    { label: "Email", value: ownerEmail },
    { label: "Phone", value: seller.businessPhone },
    { label: "Tax ID", value: seller.taxId },
    { label: "Bank", value: bankName },
  ].filter((d) => Boolean(d.value));

  return (
    <article className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/60 transition-all sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 gap-4">
          {seller.shopImage ? (
            <img
              src={seller.shopImage}
              alt=""
              className="size-16 shrink-0 rounded-xl object-cover ring-1 ring-border/50"
            />
          ) : (
            <span className="grid size-16 shrink-0 place-items-center rounded-xl bg-secondary text-primary ring-1 ring-border/50">
              <Store className="size-6" />
            </span>
          )}
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold text-foreground">
              {seller.shopName}
            </h2>
            {seller.createdAt && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                Applied on {new Date(seller.createdAt).toLocaleDateString()}
              </p>
            )}
            <dl className="mt-3.5 grid gap-x-8 gap-y-1.5 text-xs sm:grid-cols-2">
              {details.map(({ label, value }) => (
                <div key={label} className="flex gap-2">
                  <dt className="shrink-0 font-medium text-foreground">{label}:</dt>
                  <dd className="min-w-0 wrap-break-word text-muted-foreground">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            size="sm"
            onClick={() => onApprove(seller)}
            disabled={disabled}
            className="h-9 px-4 font-medium"
          >
            <Check className="size-3.5 mr-1.5" />
            {isApproving ? "Approving..." : "Approve"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 border-destructive/30 bg-destructive/5 px-4 text-destructive hover:bg-destructive/15 hover:border-destructive/50"
            onClick={() => onReject(seller)}
            disabled={disabled}
          >
            <X className="size-3.5 mr-1.5" />
            Reject
          </Button>
        </div>
      </div>
    </article>
  );
}

export default SellerApplicationCard;
