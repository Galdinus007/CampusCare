// WelcomePage.jsx - Welcome/entry page with login/signup options
// global React
const WelcomePage = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const u = sessionStorage.getItem('campus_user_auth');
    setUser(u || null);
  }, []);

  if (user) {
    // If user is already logged in, redirect to landing page
    window.location.href = '/home';
    return null;
  }

  return (
    <div className="landing-root">
      <main className="hero">
        <div className="container hero-inner">
          <h1>CampusCare • வளாக கவனிப்பு</h1>
          <p className="lead">Connect, care and thrive — tools that help your campus community stay informed and supported.</p>
          
          <div className="hero-ctas" style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <a className="btn-primary large" href="/signin">Sign In</a>
            <a className="btn-outline large" href="/signup">Create Account</a>
          </div>
        </div>
      </main>

      <section id="features" className="features container">
        <div className="feature">
          <h3>For Students</h3>
          <p>Submit reports, stay updated with announcements, and access campus resources all in one place.</p>
        </div>
        <div className="feature">
          <h3>For Administrators</h3>
          <p>Manage staff, review reports, and oversee campus operations efficiently.</p>
        </div>
        <div className="feature">
          <h3>Support</h3>
          <p>Access resources and peer-support networks for your campus community.</p>
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

window.WelcomePage = WelcomePage;
