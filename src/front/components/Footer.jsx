import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container py-5">

        <div className="row gy-4 align-items-start">

          <div className="col-lg-4">
            <h2 className="footer-logo">4Tickets</h2>
            <p className="footer-text">
              Buy and sell tickets safely for concerts, festivals, sports and theatre events.
            </p>

            <div className="footer-social">
              <i className="bi bi-facebook"> </i>
              <i className="bi bi-instagram"> </i>
              <i className="bi bi-twitter-x"> </i>
              <i className="bi bi-linkedin"> </i>
            </div>
          </div>

          <div className="col-lg-3">
            <h5>Stay updated</h5>

            <p className="footer-text">
              Get the latest events and ticket offers.
            </p>

            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
              />

              <button className="btn btn-warning">
                Subscribe
              </button>
            </div>
          </div>

          <div className="col-lg-2">
            <h5>Support</h5>

            <ul className="footer-links">
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/terms">Terms</Link></li>
              <li><Link to="/privacy">Privacy</Link></li>
            </ul>
          </div>

          <div className="col-lg-3">
            <h5>Payments</h5>

            <p className="footer-text">
              Secure payments powered by Stripe.
            </p>

            <div className="footer-payments">
              <span>Visa</span>
              <span>Mastercard</span>
              <span>Stripe</span>
            </div>
          </div>

        </div>

        <hr />

        <div className="footer-bottom">
          <span>© 2026 4Tickets. All rights reserved.</span>

          <div>
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};