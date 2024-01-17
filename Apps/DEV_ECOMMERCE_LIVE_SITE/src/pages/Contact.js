import React from "react";

const Contact = () => {
  return (
    <div className="space">
      <div className="container">
        <h2 class="main-title">Contact us</h2>
      </div>
      <iframe
        className="map-ifram"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229.39127141790595!2d72.5502379918256!3d23.08756367163685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8313f5a15db3%3A0xd87f843747a57915!2s8%2C%20Gayatri%20Nagar%2C%20Chandlodiya%2C%20Ahmedabad%2C%20Gujarat%20382481!5e0!3m2!1sen!2sin!4v1705392216606!5m2!1sen!2sin"
      ></iframe>
      <div className="space">
        <form className="contact-form">
          <div className="single-field">
            <input
              type="text"
              placeholder="Username"
              className="form-control"
            />
          </div>
          <div className="single-field">
            <input type="text" placeholder="Email" className="form-control" />
          </div>
          <div className="single-field">
            <textarea
              type="text"
              placeholder="Enter your message"
              className="form-control"
            ></textarea>
          </div>
          <div className="single-field">
            <button className="button-style" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
