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
    <article className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 gap-4">
          {seller.shopImage ? (
            <img
              src={seller.shopImage}
              alt=""
              className="size-16 shrink-0 rounded-xl object-cover"
            />
          ) : (
            <span className="grid size-16 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
              <Store className="size-7" />
            </span>
          )}
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold">
              {seller.shopName}
            </h2>
            {seller.createdAt && (
              <p className="text-sm text-muted-foreground">
                Applied on {new Date(seller.createdAt).toLocaleDateString()}
              </p>
            )}
            <dl className="mt-3 grid gap-x-8 gap-y-1.5 text-sm sm:grid-cols-2">
              {details.map(({ label, value }) => (
                <div key={label} className="flex gap-2">
                  <dt className="shrink-0 font-medium">{label}:</dt>
                  <dd className="min-w-0 wrap-break-word text-muted-foreground">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="flex shrink-0 gap-3">
          <Button onClick={() => onApprove(seller)} disabled={disabled}>
            <Check className="size-4" />
            {isApproving ? "Approving..." : "Approve"}
          </Button>
          <Button
            variant="outline"
            className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => onReject(seller)}
            disabled={disabled}
          >
            <X className="size-4" />
            Reject
          </Button>
        </div>
      </div>
    </article>
  );
}

export default SellerApplicationCard;
