import './App.css'
import Configurator from "./Configurator";

function App() {
  return (
    <div className="site">
      <header className="header">
        <div className="brand">
          <div className="brand-mark">KHS</div>
          <div>
            <div className="brand-name">Kaden Home Supply</div>
            <div className="brand-subtitle">Premium Tilt & Turn Windows</div>
          </div>
        </div>

        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#windows">Tilt & Turn Windows</a>
          <a href="#builders">For Builders / Architects</a>
          <a href="#homeowners">Homeowners</a>
          <a href="#future">Future Products</a>
          <a href="#contact">Contact / Request Quote</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Modern European Window Supply</p>
            <h1>Cleaner design, stronger performance, and a smarter way to buy windows online.</h1>
            <p className="hero-text">
              Kaden Home Supply helps homeowners, builders, and remodelers source premium
              European tilt & turn windows with online pricing, flexible payment options,
              and project-ready support.
            </p>

            <div className="hero-actions">
              <a className="btn btn-dark" href="#windows">Shop Standard Sizes</a>
              <a className="btn btn-light" href="#contact">Upload Plans / Request Quote</a>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-placeholder">
              Window / lifestyle imagery goes here
            </div>
          </div>
        </section>

        <section id="windows" className="section">
          <div className="section-header">
            <p className="eyebrow">Phase 1 product focus</p>
            <h2>Tilt & Turn Windows</h2>
            <p>
              Start with standard-size double-pane and triple-pane window options in
              white, black exterior, and woodgrain finishes. Sliders stay hidden for now.
            </p>
          </div>

          <div className="grid three">
            <div className="card">
              <h3>Triple Pane</h3>
              <p>Premium thermal performance and premium positioning for colder climates and higher-end projects.</p>
            </div>
            <div className="card">
              <h3>Double Pane</h3>
              <p>Value-oriented option for customers who want the European aesthetic and operation at a lower entry point.</p>
            </div>
            <div className="card">
              <h3>Connector-Friendly</h3>
              <p>Use slim connectors to combine standard windows into wider visual openings without defaulting to oversized single units.</p>
            </div>
          </div>
          <Configurator />
        </section>

        <section id="builders" className="section alt">
          <div className="grid two">
            <div className="card">
              <h3>For Builders / Architects</h3>
              <p>
                Upload plans, compare assemblies, and simplify sourcing for custom homes,
                additions, and remodels.
              </p>
            </div>

            <div id="homeowners" className="card">
              <h3>For Homeowners</h3>
              <p>
                Browse standard sizes online, understand handing more clearly, and request
                help when your project needs more guidance.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="grid three">
            <div className="card">
              <h3>Included</h3>
              <ul>
                <li>Free insect screens</li>
                <li>Free shipping built into pricing</li>
                <li>Connector fees waived over $5,000</li>
              </ul>
            </div>

            <div className="card">
              <h3>Payment Options</h3>
              <ul>
                <li>3% discount for paying in full</li>
                <li>50% deposit option</li>
                <li>Financing options coming next</li>
              </ul>
            </div>

            <div id="future" className="card">
              <h3>Future Products</h3>
              <p>
                The site is structured to expand into additional categories later without
                needing a full redesign.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="section-header">
            <p className="eyebrow">Next action</p>
            <h2>Request a Quote or Upload Plans</h2>
            <p>
              This first version focuses on premium positioning and product clarity.
              Next, we’ll add the real configurator and order logic.
            </p>
          </div>

          <div className="contact-box">
            <p>Placeholder contact flow for now</p>
            <div className="hero-actions">
              <button className="btn btn-dark">Request Quote</button>
              <button className="btn btn-light">Upload Plans</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
