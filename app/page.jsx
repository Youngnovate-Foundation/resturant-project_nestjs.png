import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center pt-20">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 py-10">
          Ceccy Ann Restaurant
        </h1>
        <p className="max-w-2xl text-gray-600 text-lg mb-8">
          We serve freshly prepared meals, refreshing drinks, and delightful treats.
          Order with ease, track your meals, and enjoy quality service.
        </p>

        <div className="flex gap-4">
          <Link
            href="/auth/login"
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Login
          </Link>

          <Link
            href="/auth/signup"
            className="px-6 py-3 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50"
          >
            Sign Up
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <Service title="Quality Meals" desc="Freshly prepared dishes daily." />
          <Service title="Fast Ordering" desc="Order from anywhere with ease." />
          <Service title="Reliable Service" desc="Your satisfaction is our priority." />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Ceccy Ann Restaurant
      </footer>
    </div>
  );
}

function Service({ title, desc }) {
  return (
    <div className="p-6 rounded-xl shadow-sm bg-gray-50 text-center">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
