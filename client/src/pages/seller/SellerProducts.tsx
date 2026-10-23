import { useState } from "react";
import { ImageOff, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getErrorMessage } from "@/api/apiClient";
import { useSellerProducts } from "@/hooks/seller/useSellerProducts";
import {
  useCreateProduct,
  useDeleteProduct,
  useUpdateProduct,
} from "@/hooks/seller/useSellerProductMutations";
import type { Product } from "@/types/product";
import type { ProductValues } from "@/schema/product";
import ProductForm from "../../components/seller/ProductForm";
import ProductRow from "../../components/seller/ProductRow";
import DeleteProductDialog from "../../components/seller/DeleteProductDialog";

function SellerProducts() {
  const { data, isLoading, isError } = useSellerProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const products = data?.products ?? [];

  const handleCreate = async (values: ProductValues, images: File[]) => {
    const res = await createProduct.mutateAsync({ ...values, images });
    toast.success(res.message || "Product created");
    setAddOpen(false);
  };

  const handleUpdate = async (values: ProductValues) => {
    if (!editTarget) return;
    const res = await updateProduct.mutateAsync({ id: editTarget._id, values });
    toast.success(res.message || "Product updated");
    setEditTarget(null);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await deleteProduct.mutateAsync(deleteTarget._id);
      toast.success(res.message || "Product deleted");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold sm:text-2xl">
            My Products
          </h1>
          {!isLoading && (
            <p className="mt-0.5 text-sm text-muted-foreground">
              {products.length} {products.length === 1 ? "product" : "products"}{" "}
              listed
            </p>
          )}
        </div>
        <Button onClick={() => setAddOpen(true)} className="shrink-0">
          <Plus className="size-4 sm:mr-2" />
          <span className="hidden sm:inline">Add product</span>
        </Button>
      </div>

      {/* Product list */}
      <div className="mt-6 space-y-3">
        {isLoading &&
          Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-xl border border-primary/15 bg-primary/10"
              aria-hidden
            />
          ))}

        {isError && (
          <p role="alert" className="mt-6 text-center text-destructive">
            Couldn't load products. Please try again.
          </p>
        )}

        {!isLoading && !isError && products.length === 0 && (
          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <ImageOff className="size-10 text-muted-foreground" />
            <p className="font-medium">No products yet</p>
            <p className="text-sm text-muted-foreground">
              Click "Add product" to list your first item.
            </p>
          </div>
        )}

        {products.map((product) => (
          <ProductRow
            key={product._id}
            product={product}
            onEdit={setEditTarget}
            onDelete={setDeleteTarget}
          />
        ))}
      </div>

      {/* Add product dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add product</DialogTitle>
          </DialogHeader>
          <ProductForm
            onSubmit={handleCreate}
            isPending={createProduct.isPending}
          />
          {createProduct.error && (
            <p
              role="alert"
              className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {getErrorMessage(createProduct.error)}
            </p>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit product dialog */}
      <Dialog open={!!editTarget} onOpenChange={() => setEditTarget(null)}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit product</DialogTitle>
          </DialogHeader>
          {editTarget && (
            <ProductForm
              isEdit
              defaultValues={{
                name: editTarget.name,
                description: editTarget.description,
                price: editTarget.price,
                category: editTarget.category,
                stock: editTarget.stock,
              }}
              onSubmit={(values) => handleUpdate(values)}
              isPending={updateProduct.isPending}
            />
          )}
          {updateProduct.error && (
            <p
              role="alert"
              className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {getErrorMessage(updateProduct.error)}
            </p>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <DeleteProductDialog
        product={deleteTarget}
        isPending={deleteProduct.isPending}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export default SellerProducts;
