import React from 'react';
import ContactForm from '../components/ContactForm';
import './About.css';

function About() {
  return (
    <div className="about">
      <section className="about__contact">
        <div className="container">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

export default About;
