import { useState } from "react";
import "./QuoteForm.css";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  projectType: "custom",
  address: "",
  city: "",
  state: "",
  zip: "",
  width: "",
  height: "",
  quantity: "1",
  room: "",
  facingDirection: "",
  measurementMethod: "",
  notes: "",
};

export default function QuoteForm() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  function updateField(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/quote-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus({
        type: "success",
        message: "Thanks — your quote request was received. We’ll review it and follow up shortly.",
      });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Unable to submit your request right now.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <div className="quote-form-grid">
        <div className="quote-field">
          <label htmlFor="name">Full Name *</label>
          <input id="name" name="name" value={form.name} onChange={updateField} required />
        </div>

        <div className="quote-field">
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" value={form.email} onChange={updateField} required />
        </div>

        <div className="quote-field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" value={form.phone} onChange={updateField} />
        </div>

        <div className="quote-field">
          <label htmlFor="projectType">Project Type *</label>
          <select id="projectType" name="projectType" value={form.projectType} onChange={updateField} required>
            <option value="custom">Custom Size Quote</option>
            <option value="standard">Standard Size Quote</option>
            <option value="multi-unit">Multi-Unit / Project Quote</option>
          </select>
        </div>

        <div className="quote-field quote-span-2">
          <label htmlFor="address">Project Address</label>
          <input id="address" name="address" value={form.address} onChange={updateField} />
        </div>

        <div className="quote-field">
          <label htmlFor="city">City</label>
          <input id="city" name="city" value={form.city} onChange={updateField} />
        </div>

        <div className="quote-field">
          <label htmlFor="state">State</label>
          <input id="state" name="state" value={form.state} onChange={updateField} />
        </div>

        <div className="quote-field">
          <label htmlFor="zip">ZIP</label>
          <input id="zip" name="zip" value={form.zip} onChange={updateField} />
        </div>

        <div className="quote-field">
          <label htmlFor="width">Width</label>
          <input id="width" name="width" placeholder='e.g. 36"' value={form.width} onChange={updateField} />
        </div>

        <div className="quote-field">
          <label htmlFor="height">Height</label>
          <input id="height" name="height" placeholder='e.g. 60"' value={form.height} onChange={updateField} />
        </div>

        <div className="quote-field">
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            value={form.quantity}
            onChange={updateField}
          />
        </div>

        <div className="quote-field">
          <label htmlFor="room">Room / Location</label>
          <input id="room" name="room" value={form.room} onChange={updateField} />
        </div>

        <div className="quote-field">
          <label htmlFor="facingDirection">Facing Direction</label>
          <input id="facingDirection" name="facingDirection" placeholder="North, South, etc." value={form.facingDirection} onChange={updateField} />
        </div>

        <div className="quote-field">
          <label htmlFor="measurementMethod">How Measured</label>
          <input id="measurementMethod" name="measurementMethod" placeholder="Rough opening, existing unit, etc." value={form.measurementMethod} onChange={updateField} />
        </div>

        <div className="quote-field quote-span-2">
          <label htmlFor="notes">Project Notes</label>
          <textarea
            id="notes"
            name="notes"
            rows="5"
            placeholder="Tell us about the project, special requirements, or anything you'd like reviewed."
            value={form.notes}
            onChange={updateField}
          />
        </div>
      </div>

      {status.message ? (
        <div className={`quote-status ${status.type}`}>
          {status.message}
        </div>
      ) : null}

      <div className="quote-form-actions">
        <button type="submit" className="btn btn-dark" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Quote Request"}
        </button>
      </div>
    </form>
  );
}
