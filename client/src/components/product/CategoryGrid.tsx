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
        <h2 className="text-3xl font-bold sm:text-4xl">Shop by Category</h2>
        <p className="mt-3 text-muted-foreground">
          Discover our wide range of products across different categories
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {CATEGORIES.map((category) => (
          <Link
            key={category.name}
            to={`/products?category=${encodeURIComponent(category.name)}`}
            className="group rounded-xl border border-primary/15 bg-primary/10 p-3 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 sm:p-6"
          >
            <div className="flex aspect-2/1 items-center justify-center overflow-hidden rounded-lg bg-primary/10 text-4xl transition-transform duration-300 group-hover:scale-105">
              {category.icon}
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
