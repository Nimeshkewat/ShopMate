import { Link } from "react-router-dom";
import { Hourglass } from "lucide-react";
import { Button } from "@/components/ui/button";

function ApprovalPending() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center gap-3 text-center">
      <span className="grid size-16 place-items-center rounded-full bg-amber-500/15 text-amber-500">
        <Hourglass className="size-8" />
      </span>
      <h1 className="text-2xl font-bold">Your shop is awaiting approval</h1>
      <p className="text-muted-foreground">
        An admin reviews every new shop. You'll be able to use your dashboard
        and manage orders as soon as it's approved.
      </p>
      <Button variant="outline" className="mt-2">
        <Link to="/">Back to store</Link>
      </Button>
    </div>
  );
}

export default ApprovalPending;
