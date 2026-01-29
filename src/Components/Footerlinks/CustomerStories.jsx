import React from "react";
const CustomerStories = () => {
  return (
    <section className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Customer Success Stories
        </h1>

        <p className="text-gray-600 mb-10 text-lg">
          See how H-Tech Solutions has helped businesses achieve digital
          transformation and operational excellence.
        </p>

        <div className="space-y-8">
          <div className="p-6 rounded-xl shadow border">
            <h3 className="text-xl font-semibold mb-2">
              🏢 Manufacturing Company
            </h3>
            <p className="text-gray-600">
              We built a custom inventory & automation system that reduced
              manual work by 40% and improved reporting accuracy.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow border">
            <h3 className="text-xl font-semibold mb-2">
              🏫 Education Institute
            </h3>
            <p className="text-gray-600">
              Delivered a modern web portal for students and staff, improving
              engagement and digital accessibility.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow border">
            <h3 className="text-xl font-semibold mb-2">
              💼 Startup Business
            </h3>
            <p className="text-gray-600">
              Developed a scalable web application that helped the startup
              onboard 10,000+ users within the first year.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerStories;
