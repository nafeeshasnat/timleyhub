import React from 'react';
import budgetLogo from '../images/logo/budget-cost-svgrepo-com.svg';

const Features = () => {
  return(
    <section id='features-section' className='scroll-mt-20'>
    <div className="features-section container mx-auto px-4 mb-16">
     <h2 className='text-center font-bold text-3xl mb-16'>Features</h2>
      <div className="feature-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        
        {/* Feature 1: Time Tracking */}
        <div className="feature-item text-center p-6 bg-white rounded-lg shadow">
          {/* Replace 'time-icon.svg' with the actual path to your SVG icon */}
          <svg fill="#000000" className='max-w-16 mx-auto my-8' viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"><path d="M14,18a3.009,3.009,0,0,0-1,.171V18a1,1,0,0,1,1-1,.985.985,0,0,1,.75.339,1,1,0,1,0,1.5-1.322A3,3,0,0,0,11,18v3a3,3,0,0,0,5.544,1.589,3.054,3.054,0,0,0,.121-3.009A2.942,2.942,0,0,0,14,18Zm.849,3.529A1,1,0,1,1,14,20a.954.954,0,0,1,.866.455A1.068,1.068,0,0,1,14.849,21.529ZM21,15a3,3,0,0,0-3,3v3a3,3,0,0,0,6,0V18A3,3,0,0,0,21,15Zm1,6a1,1,0,0,1-2,0V18a1,1,0,0,1,2,0ZM12,13H8a1,1,0,0,1,0-2h3V7a1,1,0,0,1,2,0v5A1,1,0,0,1,12,13ZM24,3V6a3,3,0,0,1-3,3H18a1,1,0,0,1,0-2h2.637A9.991,9.991,0,1,0,8.364,21.318a1,1,0,0,1-.728,1.864A12,12,0,1,1,22,5.374V3a1,1,0,0,1,2,0Z"/></svg>
          <h3 className="feature-title font-bold text-lg text-center mb-4">Precise Time Logging</h3>
          <p className="feature-desc">Effortlessly track study sessions or work hours with a single click. Perfect for keeping student projects and startup tasks on track.</p>
        </div>
        
        {/* Feature 2: Project Management */}
        <div className="feature-item text-center p-6 bg-white rounded-lg shadow">
        <svg className='max-w-16 mx-auto my-8' viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="icon" fill="#000000" transform="translate(42.666667, 42.666667)">
                      <path d="M277.333333,234.666667 L277.333,255.999667 L298.666667,256 L298.666667,298.666667 L277.333,298.666667 L277.333333,426.666667 L256,426.666667 L256,298.666667 L234.666667,298.666667 L234.666667,256 L256,255.999667 L256,234.666667 L277.333333,234.666667 Z M341.333333,234.666667 L341.333,341.332667 L362.666667,341.333333 L362.666667,384 L341.333,383.999667 L341.333333,426.666667 L320,426.666667 L320,383.999667 L298.666667,384 L298.666667,341.333333 L320,341.332667 L320,234.666667 L341.333333,234.666667 Z M405.333333,234.666667 L405.333,277.332667 L426.666667,277.333333 L426.666667,320 L405.333,319.999667 L405.333333,426.666667 L384,426.666667 L384,319.999667 L362.666667,320 L362.666667,277.333333 L384,277.332667 L384,234.666667 L405.333333,234.666667 Z M170.666667,7.10542736e-15 L341.333333,96 L341.333,213.333 L298.666,213.333 L298.666,138.747 L192,200.331 L192,323.018 L213.333,311.018 L213.333333,320 L234.666667,320 L234.666,348 L170.666667,384 L3.55271368e-14,288 L3.55271368e-14,96 L170.666667,7.10542736e-15 Z M42.666,139.913 L42.6666667,263.04 L149.333,323.022 L149.333,201.497 L42.666,139.913 Z M170.666667,48.96 L69.246,105.991 L169.656,163.963 L271.048,105.424 L170.666667,48.96 Z" id="Combined-Shape">

          </path>
                  </g>
              </g>
          </svg>
          <h3 className="feature-title font-bold text-lg text-center mb-4">Streamlined Projects</h3>
          <p className="feature-desc">Coordinate all your tasks with our intuitive dashboard, making it easier to navigate the complexities of academic group projects and startup collaborations.</p>
        </div>
        
        {/* Feature 3: Insightful Reports */}
        <div className="feature-item text-center p-6 bg-white rounded-lg shadow">
        <svg className='max-w-16 mx-auto my-8' viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="add" fill="#000000" transform="translate(42.666667, 85.333333)">
                      <path d="M341.333333,1.42108547e-14 L426.666667,85.3333333 L426.666667,341.333333 L3.55271368e-14,341.333333 L3.55271368e-14,1.42108547e-14 L341.333333,1.42108547e-14 Z M330.666667,42.6666667 L42.6666667,42.6666667 L42.6666667,298.666667 L384,298.666667 L384,96 L330.666667,42.6666667 Z M106.666667,85.3333333 L106.666333,217.591333 L167.724208,141.269742 L232.938667,173.866667 L280.864376,130.738196 L295.135624,146.595138 L236.398693,199.458376 L173.589333,168.064 L120.324333,234.666333 L341.333333,234.666667 L341.333333,256 L85.3333333,256 L85.3333333,85.3333333 L106.666667,85.3333333 Z" id="Combined-Shape">

          </path>
                  </g>
              </g>
          </svg>
          <h3 className="feature-title font-bold text-lg text-center mb-4">Actionable Insights</h3>
          <p className="feature-desc">Transform data into visual reports to understand your study patterns or business trends, aiding in better decision-making and growth.</p>
        </div>
        
        {/* Feature 4: Budget Tracking */}
        <div className="feature-item text-center p-6 bg-white rounded-lg shadow">
          <img src={budgetLogo} alt="Budget Tracking" className="svg-icon max-w-16 mx-auto my-8" />
          <h3 className="feature-title font-bold text-lg text-center mb-4">Budget at a Glance</h3>
          <p className="feature-desc">Monitor your project expenses and manage your resources effectively. Ideal for students managing project costs and startups watching their burn rate.</p>
        </div>
        
      </div>
    </div>
    </section>
  )
}

export default Features;