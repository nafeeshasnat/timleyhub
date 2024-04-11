const HowWorks = () => {
  return(
    <section id="how-it-works" className="py-12 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1: Sign Up */}
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-blue-500 text-white text-3xl flex items-center justify-center w-16 h-16 mb-4">1</div>
            <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
            <p className="text-center text-gray-700">Create your account and start your journey with our time tracking app. It only takes a few seconds! Join Us Now.</p>
            <a href="/login" class="text-blue-500 hover:underline mt-2">Join Us Now</a>
          </div>
          
          {/* Step 2: Track Time */}
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-blue-500 text-white text-3xl flex items-center justify-center w-16 h-16 mb-4">2</div>
            <h3 className="text-xl font-semibold mb-2">Track Time</h3>
            <p className="text-center text-gray-700">Effortlessly track your time spent on tasks and projects using our intuitive interface. Stay organized and productive!</p>
          </div>
          
          {/* Step 3: Manage Tasks */}
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-blue-500 text-white text-3xl flex items-center justify-center w-16 h-16 mb-4">3</div>
            <h3 className="text-xl font-semibold mb-2">Manage Tasks</h3>
            <p className="text-center text-gray-700">Stay on top of your tasks and projects by organizing them into categories and assigning priorities. Collaborate with your team seamlessly!</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowWorks;