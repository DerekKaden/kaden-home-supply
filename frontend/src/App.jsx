import "./App.css";
import Configurator from "./Configurator";

function App() {
  return (
    <div className="site">
      <header className="header">
        <a href="#top" className="brand brand-link">
          <div className="brand-mark">KHS</div>
          <div className="brand-copy">
            <div className="brand-name">Kaden Home Supply</div>
            <div className="brand-subtitle">Premium European Windows & Doors</div>
          </div>
        </a>

        <nav className="nav">
          <a href="#products">Products</a>
          <a href="#configurator">Configurator</a>
          <a href="#gallery">Gallery</a>
          <a href="#process">Process</a>
          <a href="#quote" className="nav-cta">
            Request Quote
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Architectural Window Supply</p>
            <h1>
              Premium European windows designed for cleaner lines, stronger
              performance, and a more refined home.
            </h1>
            <p className="hero-text">
              Kaden Home Supply helps homeowners, builders, and remodelers source
              premium tilt &amp; turn window systems with clearer pricing, project-ready
              guidance, and a more polished buying experience.
            </p>

            <div className="hero-actions">
              <a className="btn btn-dark" href="#configurator">
                Start Your Configuration
              </a>
              <a className="btn btn-light" href="#quote">
                Request a Project Quote
              </a>
            </div>

            <div className="hero-trust-row">
              <span>Premium finishes</span>
              <span>Standard-size pricing</span>
              <span>Project-ready support</span>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-image-shell">
              <div className="hero-placeholder premium-placeholder">
                Premium architectural imagery
              </div>
            </div>

            <div className="hero-spec-strip">
              <div>
                <strong>Double &amp; Triple Pane</strong>
                <span>Performance-focused options</span>
              </div>
              <div>
                <strong>Modern Operation</strong>
                <span>Tilt &amp; turn functionality</span>
              </div>
              <div>
                <strong>Custom Project Support</strong>
                <span>Quotes for larger assemblies</span>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="section">
          <div className="section-header narrow">
            <p className="eyebrow">Product focus</p>
            <h2>Designed around premium tilt &amp; turn systems</h2>
            <p>
              The first release is centered on standard-size tilt &amp; turn windows in
              the most important performance and finish combinations, with a structure
              that can expand into larger product categories later.
            </p>
          </div>

          <div className="grid three premium-grid">
            <article className="card feature-card">
              <span className="card-kicker">Performance</span>
              <h3>Triple Pane</h3>
              <p>
                A premium option for colder climates, quieter interiors, and
                higher-end projects where thermal performance matters.
              </p>
            </article>

            <article className="card feature-card">
              <span className="card-kicker">Value</span>
              <h3>Double Pane</h3>
              <p>
                A more accessible path into the European aesthetic and operation
                without sacrificing the clean architectural feel.
              </p>
            </article>

            <article className="card feature-card">
              <span className="card-kicker">Flexibility</span>
              <h3>Connector-Friendly Layouts</h3>
              <p>
                Combine standard units into wider visual openings with slim
                connectors instead of defaulting immediately to oversized custom units.
              </p>
            </article>
          </div>
        </section>

        <section className="section alt">
          <div className="split-section">
            <div className="split-copy">
              <p className="eyebrow">Why Kaden Home Supply</p>
              <h2>A more guided, design-conscious buying experience</h2>
              <p>
                We are building the site to make window selection clearer for serious
                renovation and new-build customers who want better aesthetics, better
                performance, and more confidence before ordering.
              </p>
            </div>

            <div className="grid two">
              <article className="card soft-card">
                <h3>For Homeowners</h3>
                <p>
                  Understand sizes, finishes, and handing more clearly before requesting
                  a quote or moving into ordering.
                </p>
              </article>

              <article className="card soft-card">
                <h3>For Builders &amp; Architects</h3>
                <p>
                  Use the configurator as a starting point, then send plans for larger
                  layouts, connector assemblies, and more customized project pricing.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="gallery" className="section">
          <div className="section-header narrow">
            <p className="eyebrow">Visual direction</p>
            <h2>Gallery and media presentation</h2>
            <p>
              This section should evolve into finished project photography, close-up
              hardware imagery, interior/exterior views, and before-and-after examples.
            </p>
          </div>

          <div className="gallery-grid">
            <div className="gallery-tile large">Installed project photography</div>
            <div className="gallery-tile">Interior lifestyle image</div>
            <div className="gallery-tile">Exterior elevation image</div>
            <div className="gallery-tile">Hardware / finish detail</div>
          </div>
        </section>

        <section id="process" className="section alt">
          <div className="section-header narrow">
            <p className="eyebrow">Ordering process</p>
            <h2>Simple enough for online discovery, structured enough for real projects</h2>
          </div>

          <div className="grid four process-grid">
            <article className="card process-card">
              <span className="process-number">01</span>
              <h3>Configure</h3>
              <p>Choose glass type, finish, size, handing, and quantity.</p>
            </article>

            <article className="card process-card">
              <span className="process-number">02</span>
              <h3>Review Pricing</h3>
              <p>See live pricing, connector costs, and payment path options.</p>
            </article>

            <article className="card process-card">
              <span className="process-number">03</span>
              <h3>Send Project Details</h3>
              <p>Upload plans or request a quote when the project needs more support.</p>
            </article>

            <article className="card process-card">
              <span className="process-number">04</span>
              <h3>Finalize Order</h3>
              <p>Confirm final details, shipping destination, and next ordering steps.</p>
            </article>
          </div>
        </section>

        <section id="configurator" className="section configurator-section">
          <div className="section-header narrow">
            <p className="eyebrow">Live pricing tool</p>
            <h2>Configure a standard unit and review live pricing</h2>
            <p>
              This premium configurator is designed to feel more like a guided product
              selection experience than a generic form.
            </p>
          </div>

          <Configurator />
        </section>

        <section id="quote" className="section quote-section">
          <div className="quote-panel">
            <div>
              <p className="eyebrow">Next step</p>
              <h2>Have plans, rough openings, or a larger project?</h2>
              <p>
                Request a quote for custom layouts, multi-window assemblies, or projects
                that need more detailed review before ordering.
              </p>
            </div>

            <div className="hero-actions">
              <button className="btn btn-dark">Request a Quote</button>
              <button className="btn btn-light">Upload Plans</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
