const Contact = () => {
  return (
    <div className="contact-page">
      <section className="contact-section container">
        <h2>Contact Our Team</h2>
        <p className="contact-intro">Get in touch with our dedicated team members. We're here to help!</p>
        <div className="employees-grid">
          <div className="employee-card">
            <h4>Galaxy</h4>
            <p className="role">Campus Director</p>
            <a href="tel:+919876543210" className="btn-outline">📞 +91 98765 43210</a>
          </div>
          <div className="employee-card">
            <h4>Harish SJVH</h4>
            <p className="role">Support Coordinator</p>
            <a href="tel:+919876543211" className="btn-outline">📞 +91 98765 43211</a>
          </div>
          <div className="employee-card">
            <h4>Shreeyaas makkan</h4>
            <p className="role">Health & Wellness Officer</p>
            <a href="tel:+919876543212" className="btn-outline">📞 +91 98765 43212</a>
          </div>
          <div className="employee-card">
            <h4>Vigneshwaran </h4>
            <p className="role">Student Services Manager</p>
            <a href="tel:+919876543213" className="btn-outline">📞 +91 98765 43213</a>
          </div>
        </div>
      </section>
    </div>
  );
};

window.Contact = Contact;
