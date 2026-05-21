// src/pages/Contact.jsx
import ContactInfo from '../components/Contact/Sections/ContactInfo';
import ContactForm from '../components/Contact/Sections/ContactForm';

export default function Contact() {
  return (
    <section
      id="kontak"
      className="min-h-screen py-24 px-6 relative z-10 flex items-center justify-center bg-[#020b2d]"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020b2d] to-[#01040f] -z-20" />
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none -z-10" />

      <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
}