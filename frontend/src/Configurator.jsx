import { useMemo, useState } from "react";
import "./Configurator.css";

const pricing = {
  triple: {
    white: {
      "24x48": 394.88,
      "24x60": 433.09,
      "24x72": 468.95,
      "36x48": 456.87,
      "36x60": 505.82,
      "36x72": 552.41,
    },
    black: {
      "24x48": 418.7,
      "24x60": 461.2,
      "24x72": 501.35,
      "36x48": 484.97,
      "36x60": 538.2,
      "36x72": 589.09,
    },
    wood: {
      "24x48": 452.95,
      "24x60": 500.12,
      "24x72": 544.94,
      "36x48": 523.87,
      "36x60": 581.78,
      "36x72": 637.34,
    },
  },
  double: {
    white: {
      "24x48": 382.8,
      "24x60": 415.74,
      "24x72": 451.8,
      "36x48": 427.26,
      "36x60": 467.36,
      "36x72": 509.14,
    },
    black: {
      "24x48": 410.89,
      "24x60": 448.97,
      "24x72": 485.42,
      "36x48": 460.46,
      "36x60": 505.7,
      "36x72": 547.88,
    },
    wood: {
      "24x48": 445.92,
      "24x60": 488.87,
      "24x72": 530.19,
      "36x48": 500.35,
      "36x60": 550.46,
      "36x72": 597.51,
    },
  },
};

const finishLabels = {
  white: "White",
  black: "Black Exterior",
  wood: "Woodgrain",
};

const handingLabels = {
  RH: "Right Hand",
  LH: "Left Hand",
};

function getMargin(size) {
  const [w, h] = size.split("x").map(Number);
  const area = w * h;

  if (area > 2000) return 800;
  if (area > 1500) return 600;
  if (area > 1000) return 400;
  return 300;
}

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function SelectionCard({ title, description, active, onClick }) {
  return (
    <button
      type="button"
      className={`selection-card ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <span className="selection-title">{title}</span>
      <span className="selection-description">{description}</span>
    </button>
  );
}

export default function Configurator() {
  const [pane, setPane] = useState("triple");
  const [finish, setFinish] = useState("white");
  const [size, setSize] = useState("24x48");
  const [handing, setHanding] = useState("RH");
  const [quantity, setQuantity] = useState(1);
  const [connectors, setConnectors] = useState(0);

  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingZip, setShippingZip] = useState("");

  const availableSizes = useMemo(
    () => Object.keys(pricing[pane][finish]),
    [pane, finish]
  );

  const baseCost = pricing[pane][finish][size];
  const unitPrice = Math.round(baseCost + getMargin(size));
  const windowsSubtotal = unitPrice * quantity;
  const connectorSubtotal = windowsSubtotal >= 5000 ? 0 : connectors * 20;
  const orderSubtotal = windowsSubtotal + connectorSubtotal;

  const fullPaySavings = orderSubtotal > 0 ? orderSubtotal * 0.03 : 0;

  const normalizedState = shippingState.trim().toUpperCase();
  const isVirginia = normalizedState === "VA" || normalizedState === "VIRGINIA";

  const estimatedTax = isVirginia ? (orderSubtotal - fullPaySavings) * 0.053 : 0;
  const fullPayTotal = orderSubtotal - fullPaySavings + estimatedTax;
  const depositDueNow = orderSubtotal * 0.5 + estimatedTax;

  return (
    <section className="configurator-wrap">
      <div className="configurator-shell">
        <div className="configurator-main">
          <div className="configurator-intro">
            <p className="configurator-eyebrow">Standard-size pricing tool</p>
            <h2 className="configurator-title">Configure Your Window</h2>
            <p className="configurator-subtitle">
              Choose your glass package, finish, size, opening direction, and project
              quantities to see live pricing for standard units. Insect screens are
              included, and shipping is built into pricing.
            </p>
          </div>

          <div className="config-step">
            <div className="step-header">
              <span className="step-number">01</span>
              <div>
                <h3>Choose Performance</h3>
                <p>Select the glazing package that best fits the project.</p>
              </div>
            </div>

            <div className="selection-grid two-up">
              <SelectionCard
                title="Triple Pane"
                description="Higher thermal performance for colder climates and more premium projects."
                active={pane === "triple"}
                onClick={() => {
                  setPane("triple");
                  if (!pricing.triple[finish][size]) {
                    setSize(Object.keys(pricing.triple[finish])[0]);
                  }
                }}
              />
              <SelectionCard
                title="Double Pane"
                description="A lower-entry option with the same clean European operating style."
                active={pane === "double"}
                onClick={() => {
                  setPane("double");
                  if (!pricing.double[finish][size]) {
                    setSize(Object.keys(pricing.double[finish])[0]);
                  }
                }}
              />
            </div>
          </div>

          <div className="config-step">
            <div className="step-header">
              <span className="step-number">02</span>
              <div>
                <h3>Choose Finish</h3>
                <p>Start with the finish that best fits the exterior and interior palette.</p>
              </div>
            </div>

            <div className="selection-grid three-up">
              <SelectionCard
                title="White"
                description="Clean, versatile, and broadly compatible with modern and transitional projects."
                active={finish === "white"}
                onClick={() => {
                  setFinish("white");
                  if (!pricing[pane].white[size]) {
                    setSize(Object.keys(pricing[pane].white)[0]);
                  }
                }}
              />
              <SelectionCard
                title="Black Exterior"
                description="A stronger architectural look with a darker exterior-facing presence."
                active={finish === "black"}
                onClick={() => {
                  setFinish("black");
                  if (!pricing[pane].black[size]) {
                    setSize(Object.keys(pricing[pane].black)[0]);
                  }
                }}
              />
              <SelectionCard
                title="Woodgrain"
                description="A warmer premium presentation for homes needing more natural visual character."
                active={finish === "wood"}
                onClick={() => {
                  setFinish("wood");
                  if (!pricing[pane].wood[size]) {
                    setSize(Object.keys(pricing[pane].wood)[0]);
                  }
                }}
              />
            </div>
          </div>

          <div className="config-step">
            <div className="step-header">
              <span className="step-number">03</span>
              <div>
                <h3>Choose Size</h3>
                <p>Standard-size pricing is shown here. Larger project layouts can be quoted separately.</p>
              </div>
            </div>

            <div className="field-row">
              <div className="field-group">
                <label htmlFor="size">Standard Size</label>
                <select
                  id="size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  {availableSizes.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="config-step">
            <div className="step-header">
              <span className="step-number">04</span>
              <div>
                <h3>Choose Opening Direction</h3>
                <p>Handing should be understood from the exterior view unless otherwise noted.</p>
              </div>
            </div>

            <div className="selection-grid two-up">
              {Object.entries(handingLabels).map(([key, label]) => (
                <SelectionCard
                  key={key}
                  title={label}
                  description={
                    key === "RH"
                      ? "Hinged to open as a right-hand unit when viewed from the exterior."
                      : "Hinged to open as a left-hand unit when viewed from the exterior."
                  }
                  active={handing === key}
                  onClick={() => setHanding(key)}
                />
              ))}
            </div>

            <div className="handing-guide">
              <div className="handing-guide-header">
                <h4>RH / LH Guide</h4>
                <span>Viewed from exterior</span>
              </div>

              <div className="handing-visuals">
                <div className={`handing-visual ${handing === "RH" ? "active" : ""}`}>
                  <div className="diagram-frame">
                    <div className="diagram-sash sash-right" />
                  </div>
                  <strong>Right Hand</strong>
                  <p>Use this when the sash opens as a right-hand unit from the exterior view.</p>
                </div>

                <div className={`handing-visual ${handing === "LH" ? "active" : ""}`}>
                  <div className="diagram-frame">
                    <div className="diagram-sash sash-left" />
                  </div>
                  <strong>Left Hand</strong>
                  <p>Use this when the sash opens as a left-hand unit from the exterior view.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="config-step">
            <div className="step-header">
              <span className="step-number">05</span>
              <div>
                <h3>Project Quantities</h3>
                <p>Adjust quantity and connector count for multi-unit assemblies.</p>
              </div>
            </div>

            <div className="field-row two-up-fields">
              <div className="field-group">
                <label htmlFor="quantity">Window Quantity</label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value) || 1))
                  }
                />
              </div>

              <div className="field-group">
                <label htmlFor="connectors">Connector Quantity</label>
                <input
                  id="connectors"
                  type="number"
                  min="0"
                  value={connectors}
                  onChange={(e) =>
                    setConnectors(Math.max(0, Number(e.target.value) || 0))
                  }
                />
              </div>
            </div>

            <div className="connector-note">
              <h4>Connector Guidance</h4>
              <ul className="clean-list">
                <li>$20 per connector on smaller orders</li>
                <li>Free connectors over $5,000 subtotal</li>
                <li>Useful for wider modular openings using standard-size units</li>
              </ul>
            </div>
          </div>

          <div className="config-step">
            <div className="step-header">
              <span className="step-number">06</span>
              <div>
                <h3>Shipping Destination</h3>
                <p>Shipping is built into pricing. Estimated tax will be refined before final checkout.</p>
              </div>
            </div>

            <div className="shipping-grid">
              <div className="field-group field-span-2">
                <label htmlFor="shippingAddress">Street Address</label>
                <input
                  id="shippingAddress"
                  type="text"
                  placeholder="Street address"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                />
              </div>

              <div className="field-group">
                <label htmlFor="shippingCity">City</label>
                <input
                  id="shippingCity"
                  type="text"
                  placeholder="City"
                  value={shippingCity}
                  onChange={(e) => setShippingCity(e.target.value)}
                />
              </div>

              <div className="field-group">
                <label htmlFor="shippingState">State</label>
                <input
                  id="shippingState"
                  type="text"
                  placeholder="State / Abbreviation"
                  value={shippingState}
                  onChange={(e) => setShippingState(e.target.value)}
                />
              </div>

              <div className="field-group field-span-2">
                <label htmlFor="shippingZip">ZIP Code</label>
                <input
                  id="shippingZip"
                  type="text"
                  placeholder="ZIP Code"
                  value={shippingZip}
                  onChange={(e) => setShippingZip(e.target.value)}
                />
                <small>
                  Estimated tax is shown for planning purposes and will be confirmed
                  before final payment.
                </small>
              </div>
            </div>
          </div>
        </div>

        <aside className="summary-panel">
          <div className="summary-card">
            <div className="summary-top">
              <div className="summary-label">Estimated unit price</div>
              <div className="summary-price">{money(unitPrice)}</div>
              <div className="summary-meta">
                {pane === "triple" ? "Triple Pane" : "Double Pane"} ·{" "}
                {finishLabels[finish]} · {size}
              </div>
            </div>

            <div className="selection-summary">
              <div className="summary-row">
                <span>Glass package</span>
                <strong>{pane === "triple" ? "Triple Pane" : "Double Pane"}</strong>
              </div>
              <div className="summary-row">
                <span>Finish</span>
                <strong>{finishLabels[finish]}</strong>
              </div>
              <div className="summary-row">
                <span>Size</span>
                <strong>{size}</strong>
              </div>
              <div className="summary-row">
                <span>Opening direction</span>
                <strong>{handingLabels[handing]}</strong>
              </div>
              <div className="summary-row">
                <span>Quantity</span>
                <strong>{quantity}</strong>
              </div>
              <div className="summary-row">
                <span>Connectors</span>
                <strong>{connectors}</strong>
              </div>
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Window subtotal</span>
                <strong>{money(windowsSubtotal)}</strong>
              </div>

              <div className="summary-row">
                <span>Connectors</span>
                <strong>{money(connectorSubtotal)}</strong>
              </div>

              <div className="summary-row border-top">
                <span>Subtotal</span>
                <strong>{money(orderSubtotal)}</strong>
              </div>

              <div className="summary-row">
                <span>Pay-in-full savings</span>
                <strong>-{money(fullPaySavings)}</strong>
              </div>

              <div className="summary-row">
                <span>Estimated tax</span>
                <strong>{money(estimatedTax)}</strong>
              </div>
            </div>

            <div className="payment-boxes">
              <div className="payment-box payment-primary">
                <div className="payment-label">Pay in full</div>
                <div className="payment-amount">{money(fullPayTotal)}</div>
                <div className="payment-copy">
                  Includes estimated tax and upfront-payment savings where applicable.
                </div>
              </div>

              <div className="payment-box">
                <div className="payment-label">50% deposit due now</div>
                <div className="payment-amount">{money(depositDueNow)}</div>
                <div className="payment-copy">
                  Reserve the order now and complete the remaining balance later.
                </div>
              </div>

              <div className="payment-box">
                <div className="payment-label">Project financing</div>
                <div className="payment-copy">
                  Financing options can be explored for larger multi-window projects.
                </div>
              </div>
            </div>

            <div className="summary-note">
              Final tax, lead time, and order totals will be confirmed before checkout.
            </div>

            <div className="summary-actions">
              <button type="button" className="btn btn-dark">
                Start Your Order
              </button>
              <button type="button" className="btn btn-light">
                Request a Project Quote
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
