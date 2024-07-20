import React from "react";

function Warranty() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <p className="text-3xl font-bold mb-8 text-center text-gray-800">
        Understanding the Warranty Options at Our Store
      </p>
      <p className="mb-8 text-gray-700 leading-relaxed">
        When purchasing a product, one of the most important considerations is
        the warranty. A good warranty can provide peace of mind, ensuring that
        you are protected against any unforeseen issues with your purchase. At
        our store, we offer three main types of warranties: Product Warranty,
        Extended Warranty, and Lifetime Warranty. Each of these warranties comes
        with its own set of benefits and coverage limits.
      </p>

      <div className="mt-8">
        <p className="text-2xl font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-4 rounded-md">
          Jewelry Types
        </p>

        <div className="mb-6">
          <div className="mb-4 pl-4 border-l-4 border-gray-400 bg-gray-50 p-4 rounded-md">
            <p className="text-lg font-semibold mb-1 text-gray-800">
              1. Wedding Rings
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                Ensures the gold quality as stated on the invoice and guarantee
                certificate.
              </li>
              <li>
                Free ultrasonic cleaning, polishing, and plating for the
                lifetime of the product.
              </li>
              <li>
                Free engraving services for names and patterns on the product.
              </li>
              <li>
                Free size adjustment. Customers pay for resizing if additional
                gold is required, based on the listed gold price at the time of
                payment.
              </li>
              <li>
                Warranty does not cover products that are broken, deformed, or
                heavily damaged.
              </li>
              <li>No repair or plating services for silver products.</li>
            </ul>
          </div>

          <div className="mb-4 pl-4 border-l-4 border-gray-400 bg-gray-50 p-4 rounded-md">
            <p className="text-lg font-semibold mb-1 text-gray-800">
              2. Other Jewelry (Diamond Jewelry, Setting Jewelry, Premium
              Jewelry, Colored Stone & Pearl Jewelry, Young Jewelry, Italian and
              Korean Designed Jewelry)
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                Ensures the gold quality as stated on the invoice and guarantee
                certificate.
              </li>
              <li>
                Free refurbishment and polishing for the lifetime of the
                product. Free initial plating; subsequent plating services are
                chargeable as per company rates at the time of payment.
              </li>
              <li>Free resizing, engraving, and stone setting services.</li>
              <li>
                Free stone setting for customers who purchase only settings or
                stones and bring their own stones or settings.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-2xl font-semibold mb-2 text-gray-800 border-l-4 border-blue-500 pl-4  rounded-md">
          1. Product Warranty
        </p>
        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-md">
          Our standard Product Warranty covers your purchase for 1 year. This
          warranty ensures that any manufacturing defects or issues that arise
          within the first year of purchase will be addressed. It’s a great
          basic level of protection to ensure your product works as expected.
        </p>
      </div>

      <div className="mb-6">
        <p className="text-2xl font-semibold mb-2 text-gray-800 border-l-4 border-blue-500 pl-4  rounded-md">
          2. Extended Warranty
        </p>
        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-md">
          For those looking for additional peace of mind, we offer an Extended
          Warranty that covers your purchase for 2 years. This warranty extends
          the coverage of the Product Warranty, offering protection against any
          defects or issues for an additional year.
        </p>
      </div>

      <div className="mb-6">
        <p className="text-2xl font-semibold mb-2 text-gray-800 border-l-4 border-blue-500 pl-4  rounded-md">
          3. Lifetime Warranty
        </p>
        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-md">
          Our Lifetime Warranty provides the ultimate level of protection,
          covering your purchase for 3 years. With this warranty, you can rest
          assured that your product is protected for a significant period,
          offering the longest duration of coverage available.
        </p>
      </div>

      <div className="mt-8 p-4 border-t border-gray-300 bg-gray-50 rounded-md">
        <p className="text-xl font-semibold mb-2 text-gray-800">
          Important Notes:
        </p>
        <p className="text-gray-700 mb-2 leading-relaxed">
          Please note that our warranties do not cover products that have been
          excessively deformed or damaged beyond normal wear and tear.
          Additionally, we provide services such as receiving products,
          refurbishing them, and making them look like new again.
        </p>
        <p className="text-gray-700 mb-2 leading-relaxed">
          For jewelry items, the following conditions are not covered under our
          warranty:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-2 space-y-2">
          <li>Chains and bracelets that have been broken or damaged.</li>
          <li>
            Products that have been damaged due to external impact, improper
            use, or misuse leading to deformation or damage.
          </li>
          <li>
            Items such as gold bangles, 22K and 24K jewelry, chains, and
            custom-made bracelets that have been broken or damaged.
          </li>
          <li>
            Customer provides incorrect invoice information for tracking
            purposes.
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions regarding the warranties or need support,
          please do not hesitate to contact our customer service team.
        </p>
      </div>
    </div>
  );
}

export default Warranty;
