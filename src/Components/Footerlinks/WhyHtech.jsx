import React from "react";
const WhyHtech = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Why Choose H-Tech Solutions?
        </h1>

        <p className="text-gray-600 text-lg mb-10">
          At H-Tech Solutions, we combine innovation, technology, and expertise
          to deliver reliable software and hardware solutions that help
          businesses grow faster and smarter.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">
              🚀 Innovation-Driven
            </h3>
            <p className="text-gray-600">
              We use modern technologies like React, cloud platforms, and
              scalable architectures to build future-ready solutions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">
              🤝 Client-Focused Approach
            </h3>
            <p className="text-gray-600">
              Every solution is tailored to your business goals, ensuring
              maximum value and long-term success.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">
              🔒 Reliable & Secure
            </h3>
            <p className="text-gray-600">
              Security, performance, and reliability are at the core of
              everything we build.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">
              🛠 End-to-End Support
            </h3>
            <p className="text-gray-600">
              From planning to deployment and maintenance, we support you at
              every stage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyHtech;
