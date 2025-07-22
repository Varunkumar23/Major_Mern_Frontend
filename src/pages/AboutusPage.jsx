import { Navbar } from "../components/Navbar";

const AboutusPage = () => {
  return (
    <div className="bg-cyan-100 text-gray-800">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">About Us</h1>

        {/* Section: Our Story */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
          <img
            src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad"
            alt="Shopping Online"
            className="rounded-2xl shadow-xl w-full"
          />
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Founded with a passion for bringing the best products to your fingertips, our e-commerce store is dedicated to delivering a seamless shopping experience. We combine quality, affordability, and style in everything we offer.
            </p>
          </div>
        </div>

        {/* Section: What We Offer */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
          <div>
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <ul className="list-disc pl-5 text-lg text-gray-700 space-y-2">
              <li>Curated fashion and lifestyle products</li>
              <li>Fast and secure delivery</li>
              <li>Easy returns and 24/7 customer support</li>
              <li>Exciting discounts and seasonal offers</li>
            </ul>
          </div>
          <img
            src="https://53.fs1.hubspotusercontent-na1.net/hubfs/53/ecommerce-1.png"
            alt="Products"
            className="rounded-2xl shadow-xl w-full"
          />
        </div>

        {/* Section: Our Mission */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
          <img
            src="https://images.unsplash.com/photo-1549924231-f129b911e442"
            alt="Mission"
            className="rounded-2xl shadow-xl w-full"
          />
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              To redefine online shopping by offering handpicked products that elevate your lifestyle, all while ensuring a safe, fast, and user-friendly experience.
            </p>
          </div>
        </div>

        {/* Section: Why Choose Us */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality Products",
                desc: "Only the best handpicked products, reviewed for quality and performance.",
                icon: "🛍️",
              },
              {
                title: "Secure Payments",
                desc: "Safe and trusted payment options with end-to-end encryption.",
                icon: "🔒",
              },
              {
                title: "Customer Support",
                desc: "Friendly and fast support to solve all your queries and concerns.",
                icon: "📞",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AboutusPage };
