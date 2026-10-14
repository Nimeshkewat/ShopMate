import { Link } from "react-router-dom";
import { categories } from "@/mock/storeFront";

function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Shop by Category</h2>
        <p className="mt-3 text-muted-foreground">
          Discover our wide range of products across different categories
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/products?category=${encodeURIComponent(category.name)}`}
            className="group rounded-xl border border-primary/15 bg-primary/10 p-3 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 sm:p-6"
          >
            <div className="aspect-2/1 overflow-hidden rounded-lg">
              <img
                src={category.image}
                alt=""
                loading="lazy"
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="mt-3 text-sm font-medium transition-colors group-hover:text-primary sm:mt-4 sm:text-base">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoryGrid;
