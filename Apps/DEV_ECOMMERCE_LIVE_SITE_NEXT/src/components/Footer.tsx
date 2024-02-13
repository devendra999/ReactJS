import React from "react";

const Footer = () => {
  return (
    <>
      <footer id="footer-3" className="pt-100 footer bg-gray">
        <div className="container">
          <div className="row">
            <div className="col-xl-3">
              <div className="footer-info">
                <img className="footer-logo" src="logo.png" alt="footer-logo" />
              </div>
            </div>

            <div className="col-sm-4 col-md-3 col-xl-2">
              <div className="footer-links fl-1">
                <h6 className="s-17 w-700">Company</h6>

                <ul className="foo-links clearfix">
                  <li>
                    <p>
                      <a href="about.html">About Us</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <a href="careers.html">Careers</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <a href="blog-listing.html">Our Blog</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <a href="contacts.html">Contact Us</a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-sm-4 col-md-3 col-xl-2">
              <div className="footer-links fl-2">
                <h6 className="s-17 w-700">Product</h6>

                <ul className="foo-links clearfix">
                  <li>
                    <p>
                      <a href="features.html">Integration</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <a href="reviews.html">Customers</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <a href="pricing-1.html">Pricing</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <a href="help-center.html">Help Center</a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-sm-4 col-md-3 col-xl-2">
              <div className="footer-links fl-3">
                <h6 className="s-17 w-700">Legal</h6>

                <ul className="foo-links clearfix">
                  <li>
                    <p>
                      <a href="terms.html">Terms of Use</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <a href="privacy.html">Privacy Policy</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <a href="cookies.html">Cookie Policy</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <a href="#">Site Map</a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-sm-6 col-md-3">
              <div className="footer-links fl-4">
                <h6 className="s-17 w-700">Connect With Us</h6>

                <p className="footer-mail-link ico-25">
                  <a href="mailto:yourdomain@mail.com">hello@yourdomain.com</a>
                </p>

                <ul className="footer-socials ico-25 text-center clearfix">
                  <li>
                    <a href="#">
                      <span className="flaticon-facebook"></span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="flaticon-twitter"></span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="flaticon-github"></span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="flaticon-dribbble"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr />

          <div className="bottom-footer">
            <div className="d-flex justify-content-between d-flex align-items-center">
              <div className="col">
                <div className="footer-copyright">
                  <p className="p-sm">
                    © 2023 Amazon. <span>All Rights Reserved</span>
                  </p>
                </div>
              </div>

              <div className="col">
                <div className="bottom-secondary-link ico-15 text-end">
                  <p className="p-sm">
                    <a href="https://themeforest.net/user/dsathemes/portfolio">
                      Made with
                      <span className="flaticon-heart"></span> by @Devendra
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
