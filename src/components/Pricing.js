const Pricing = () => {
  return(
    <section id="pricing" className="py-12 bg-gray-100 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Pricing Plans</h2>
        <div className="flex flex-wrap justify-center gap-4 items-center">

          {/* Free Plan */}
          <div className="w-full md:w-1/4 bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden max-h-full h-full">
            <div className="bg-green-500 p-5">
              <h3 className="text-2xl font-semibold text-white mb-4">Free</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">Perfect for individuals or small teams getting started with time tracking.</p>
              <ul className="text-sm text-gray-600 mb-6 list-disc list-inside font-bold">
                <li>Up to 5 projects</li>
                <li>Up to 20 collaborators</li>
                <li>Basic time tracking features</li>
              </ul>
              <a href="/login" className="text-center block w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition ease-in-out duration-150">Get Started</a>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="w-full md:w-1/4 bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden max-h-full h-full">
            <div className="bg-blue-500 p-5">
              <h3 className="text-2xl font-semibold text-white mb-4">Pro</h3>
              <span className="text-lg text-white">$50 Per Month</span>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">Ideal for freelancers and professionals who need advanced time tracking capabilities.</p>
              <ul className="text-sm text-gray-600 mb-6 list-disc list-inside font-bold">
                <li>60 projects</li>
                <li>Unlimited Users</li>
                <li>Advanced time tracking features</li>
                <li>Premium support</li>
              </ul>
              <a className="text-center block w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition ease-in-out duration-150 cursor-not-allowed">Coming Soon</a>
            </div>
          </div>

          {/* Corporate Plan */}
          <div className="w-full md:w-1/4 bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden max-h-full h-full">
            <div className="bg-gray-800 p-5">
              <h3 className="text-2xl font-semibold text-white mb-4">Corporate</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">Tailored solutions for businesses with complex time tracking needs.</p>
              <ul className="text-sm text-gray-600 mb-6 list-disc list-inside font-bold">
                <li>Custom pricing</li>
                <li>Unlimited Projects</li>
                <li>Unlimited Users</li>
                <li>Enterprise-level features</li>
                <li>Integration with enterprise systems</li>
                <li>Custom reporting system</li>
              </ul>
              <a className="text-center block w-full bg-gray-900 text-white py-3 rounded hover:bg-black transition ease-in-out duration-150 cursor-not-allowed">Coming Soon</a>
            </div>
          </div>

        </div>
      </div>
    </section>

  )
}

export default Pricing;