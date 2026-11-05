import { Link } from "react-router-dom";

const CATEGORIES = [
  { name: "Electronics", icon: "💻" },
  { name: "Fashion", icon: "👗" },
  { name: "Home & Garden", icon: "🏡" },
  { name: "Sports", icon: "⚽" },
  { name: "Books", icon: "📚" },
  { name: "Beauty", icon: "💄" },
  { name: "Automotive", icon: "🚗" },
  { name: "Kids & Baby", icon: "🧸" },
];

function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Shop by Category
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Discover our wide range of products across different categories
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {CATEGORIES.map((category) => (
          <Link
            key={category.name}
            to={`/products?category=${encodeURIComponent(category.name)}`}
            className="group rounded-xl bg-card p-3 text-center shadow-sm ring-1 ring-border/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/30 sm:p-5"
          >
            <div className="flex aspect-2/1 items-center justify-center overflow-hidden rounded-lg bg-secondary/60 text-3xl transition-transform duration-300 group-hover:scale-105">
              {category.icon}
            </div>
            <p className="mt-3 text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary sm:mt-3.5 sm:text-sm">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoryGrid;
