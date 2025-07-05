import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-6">
        Terms and Conditions
      </h1>

      <p className="text-sm text-center text-gray-500 mb-10">
    Welcome to BeginYatra! These Terms and Conditions govern your use of our website, <a href="https://www.beginyatra.com/" className="text-blue-500 link"> www.beginyatra.com</a> , and our services, including lead generation and delivery for travel agents and travel planning facilitation for travelers.
      </p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-blue-500 mb-2">
           1. Definitions
          </h2>
        <li>
              <strong>Traveler:</strong> refers to an individual or group seeking travel services.
            </li>
             <li>
              <strong>Travel Agent:</strong> refers to a business or individual providing travel services.
            </li> <li>
              <strong>Subscription:</strong> refers to the payment plan chosen by Travel Agents to access our leads.
            </li>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-500 mb-2">
            2. Use of Services
          </h2>
          <p>
            We provide travel-related services including holiday packages, hotel bookings, and more. All services are subject to availability and may be modified without prior notice.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-500 mb-2">
            3. User Responsibilities
          </h2>
          <p>
            Users must provide accurate information while using our services. Any misuse, fraudulent activity, or abuse of the platform may lead to account termination.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-500 mb-2">
            4. Payments & Refunds
          </h2>
          <p>
            All payments must be made in full at the time of booking. Refunds (if applicable) will be processed according to our cancellation policy outlined on the specific product or service page.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-500 mb-2">
            5. Intellectual Property
          </h2>
          <p>
            All content on this website (text, images, branding) is owned or licensed by TripClap. Unauthorized use is strictly prohibited.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-500 mb-2">
            6. Limitation of Liability
          </h2>
          <p>
            TripClap is not responsible for any direct or indirect loss due to service interruptions, cancellations, or third-party actions. We strive to provide accurate information but do not guarantee its completeness or timeliness.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-500 mb-2">
            7. Changes to Terms
          </h2>
          <p>
            We may update these terms from time to time. Any changes will be posted on this page with a revised "Last Updated" date.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-500 mb-2">
            8. Contact Us
          </h2>
          <p>
            If you have any questions or concerns about these terms, please contact us at <a href="mailto:help@tripclap.com" className="text-blue-600 underline">help@tripclap.com</a>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;