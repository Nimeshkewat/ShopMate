import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product } from "../../types/product";
import ReviewsTab from "../review/ReviewsTab";

const triggerClass =
  "flex-none rounded-none border-b-2 border-transparent bg-transparent px-2 pb-3 pt-1 text-xs font-semibold text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none";

export default function ProductTabs({ product }: { product: Product }) {
  return (
    <Tabs
      defaultValue="description"
      className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/60 sm:p-6"
    >
      <TabsList className="h-auto w-full justify-start gap-6 rounded-none border-b border-border/60 bg-transparent p-0">
        <TabsTrigger value="description" className={triggerClass}>
          Description
        </TabsTrigger>
        <TabsTrigger value="reviews" className={triggerClass}>
          Reviews
          {product.reviewCount !== undefined && ` (${product.reviewCount})`}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="pt-6">
        <h2 className="text-base font-semibold text-foreground">Product Description</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
      </TabsContent>

      <TabsContent value="reviews" className="pt-6">
        <ReviewsTab productId={product._id} />
      </TabsContent>
    </Tabs>
  );
}
