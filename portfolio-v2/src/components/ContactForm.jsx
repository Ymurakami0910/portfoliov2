import React, { useRef, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './ContactForm.css';

const ContactForm = () => {
  const form = useRef();
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs.sendForm(
      'service_lilyzvillage',
      'template_wog790s',
      form.current,
      'GpwstzwdSptbEcud7'
    ).then(
      () => { setStatus('sent'); e.target.reset(); },
      () => setStatus('error')
    );
  };



  return (
    <div className="contact-form" id="email">
      <div className="contact-form__header">
        <p className="label contact-form__label">Get in touch</p>
        <h2 className="contact-form__title">Let's work together</h2>
        <p className="contact-form__sub">
          Have a project in mind or want to connect? Send me a message —
          I'd love to hear from you.
        </p>
        <div className="contact-form__links">
          <a href="https://www.linkedin.com/in/yurino-murakami-047175318" target="_blank" rel="noopener noreferrer" className="contact-form__link">LinkedIn ↗</a>
          <a href="https://www.instagram.com/lilyzvillage.design/" target="_blank" rel="noopener noreferrer" className="contact-form__link">Instagram ↗</a>
          <a href="/portfoliov2/Yurino-Murakami-Resume[Creative].pdf" target="_blank" rel="noopener noreferrer" className="contact-form__link">Resume ↗</a>
        </div>
      </div>

      <div className="contact-form__paper">
        <form ref={form} onSubmit={sendEmail} className="contact-form__form">
          <div className="contact-form__field">
            <label className="contact-form__field-label">Name</label>
            <input type="text" name="name" required placeholder="Your name" />
          </div>

          <div className="contact-form__field">
            <label className="contact-form__field-label">Email</label>
            <input type="email" name="email" required placeholder="your@email.com" />
          </div>

          <div className="contact-form__field">
            <label className="contact-form__field-label">Message</label>
            <textarea name="message" required placeholder="Tell me about your project..." />
          </div>

          <button
            type="submit"
            className="contact-form__btn"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send Message →'}
          </button>

          {status === 'sent'  && <p className="contact-form__success">Message sent! I'll get back to you soon 🦝</p>}
          {status === 'error' && <p className="contact-form__error">Something went wrong. Please try again.</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
