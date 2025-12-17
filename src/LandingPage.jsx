const LandingPage = () => {
  return (
    <div className="landing-root">
      <Navbar />
      <main className="hero">
        <div className="container hero-inner">
          <h1>Welcome to CampusCare</h1>
          <p className="lead">Connect, care and thrive — tools that help your campus community stay informed and supported.</p>
          <div className="hero-ctas">
            <a className="btn-primary large" href="#signup">Sign up</a>
            <a className="btn-outline" href="#learn">Learn more</a>
          </div>
        </div>
      </main>

      <section id="features" className="features container">
        <div className="feature">
          <h3>Events</h3>
          <p>Find and manage campus events in one place.</p>
        </div>
        <div className="feature">
          <h3>Support</h3>
          <p>Access resources and peer-support networks.</p>
        </div>
        <div className="feature">
          <h3>Announcements</h3>
          <p>Receive timely updates from your campus community.</p>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} CampusCare — Built with care.</p>
        </div>
      </footer>
    </div>
  );
};

window.LandingPage = LandingPage;
