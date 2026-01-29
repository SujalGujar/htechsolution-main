import React from "react";
const SoftwareSolutions = () => {
  return (
    <section className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Software Solutions
        </h1>

        <p className="text-gray-600 text-lg mb-10">
          Our software solutions are designed to be scalable, secure, and
          performance-driven for modern businesses.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 border rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">
              🌐 Web Applications
            </h3>
            <p className="text-gray-600">
              Custom web apps using React, modern UI frameworks, and scalable
              backend technologies.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">
              📱 Mobile Applications
            </h3>
            <p className="text-gray-600">
              Android & cross-platform mobile apps built for performance and
              usability.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">
              ☁ Cloud Solutions
            </h3>
            <p className="text-gray-600">
              Cloud-based systems for scalability, data security, and cost
              efficiency.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">
              🔧 Maintenance & Support
            </h3>
            <p className="text-gray-600">
              Continuous support, updates, and optimization for long-term
              success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoftwareSolutions;
