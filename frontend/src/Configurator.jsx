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
      <div className="configurator-card">
        <div className="configurator-top">
          <div>
            <p className="configurator-eyebrow">Standard-size pricing tool</p>
            <h2 className="configurator-title">Window Configurator</h2>
            <p className="configurator-subtitle">
              Configure pane type, finish, size, handing, quantity, connector count,
              and shipping destination. Insect screens are included. Shipping is built
              into pricing.
            </p>
          </div>

          <div className="configurator-price-card">
            <div className="configurator-price-label">Estimated price</div>
            <div className="configurator-price">{money(unitPrice)}</div>
            <div className="configurator-price-meta">
              per window · {pane === "triple" ? "Triple Pane" : "Double Pane"} ·{" "}
              {finishLabels[finish]}
            </div>
          </div>
        </div>

        <div className="configurator-grid">
          <div className="field-group centered-group">
            <label>Glass Type</label>
            <div className="pill-row centered-pills">
              <button
                type="button"
                className={`pill ${pane === "triple" ? "active" : ""}`}
                onClick={() => {
                  setPane("triple");
                  if (!pricing.triple[finish][size]) {
                    setSize(Object.keys(pricing.triple[finish])[0]);
                  }
                }}
              >
                Triple Pane
              </button>
              <button
                type="button"
                className={`pill ${pane === "double" ? "active" : ""}`}
                onClick={() => {
                  setPane("double");
                  if (!pricing.double[finish][size]) {
                    setSize(Object.keys(pricing.double[finish])[0]);
                  }
                }}
              >
                Double Pane
              </button>
            </div>
          </div>

          <div className="field-group centered-group">
            <label>Finish</label>
            <div className="pill-row centered-pills">
              {Object.entries(finishLabels).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  className={`pill ${finish === key ? "active" : ""}`}
                  onClick={() => {
                    setFinish(key);
                    if (!pricing[pane][key][size]) {
                      setSize(Object.keys(pricing[pane][key])[0]);
                    }
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="field-group centered-group">
            <label htmlFor="size">Size</label>
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

          <div className="field-group centered-group">
            <label>Opening Direction</label>
            <div className="pill-row centered-pills">
              {Object.entries(handingLabels).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  className={`pill ${handing === key ? "active" : ""}`}
                  onClick={() => setHanding(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="field-group centered-group">
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

          <div className="field-group centered-group">
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

          <div className="field-group field-span-2">
            <label htmlFor="shippingAddress">Shipping Address</label>
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
              Estimated tax is calculated from the shipping destination and will be finalized at checkout.
            </small>
          </div>
        </div>

        <div className="configurator-lower">
          <div className="info-card">
            <h3>Handing Guide</h3>
            <p>
              Add RH / LH diagrams or animation here so buyers clearly understand how
              the unit opens before ordering.
            </p>
            <div className="mini-guides">
              <div className="mini-guide">RH visual</div>
              <div className="mini-guide">LH visual</div>
            </div>
          </div>

          <div className="info-card">
            <h3>Connector Guidance</h3>
            <p>
              Use slim connectors to combine multiple standard windows into one larger
              visual opening, often at a lower cost than ordering one oversized custom
              unit.
            </p>
            <ul className="clean-list">
              <li>$20 per connector on smaller orders</li>
              <li>Free connectors over $5,000 subtotal</li>
              <li>Great for wider modular assemblies</li>
            </ul>
          </div>

          <div className="summary-card">
            <h3>Order Summary</h3>

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
              <span>Estimated tax</span>
              <strong>{money(estimatedTax)}</strong>
            </div>

            <div className="summary-note">
              Final tax and order totals will be confirmed based on the shipping address entered at checkout.
            </div>

            <div className="payment-boxes">
              <div className="payment-box payment-primary">
                <div className="payment-label">Pay in full</div>
                <div className="payment-amount">{money(fullPayTotal)}</div>
                <div className="payment-copy">
                  A lower total may be available when the full balance is paid upfront.
                </div>
              </div>

              <div className="payment-box">
                <div className="payment-label">50% deposit due now</div>
                <div className="payment-amount">{money(depositDueNow)}</div>
                <div className="payment-copy">
                  Reserve the order now and pay the remaining balance later.
                </div>
              </div>

              <div className="payment-box">
                <div className="payment-label">Financing options</div>
                <div className="payment-copy">
                  Financing can be offered for larger projects to help spread out the
                  cost of multi-window orders.
                </div>
              </div>
            </div>

            <div className="summary-actions">
              <button type="button" className="btn btn-dark">
                Start Order
              </button>
              <button type="button" className="btn btn-light">
                Request Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
