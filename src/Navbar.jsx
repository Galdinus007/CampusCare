// Navbar.jsx - simple responsive navbar component (in-browser JSX)
// global React
const Navbar = ({ brand = 'CampusCare', links = null }) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const u = sessionStorage.getItem('campus_user_auth');
    setUser(u || null);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('campus_user_auth');
    // reload to root
    window.location.href = '/';
  };

  const navLinks = links || [
  { text: 'Home', href: '/' },
  { text: 'Features', href: '#features' },
  { text: 'Report', href: '/report' },
  { text: 'Contact', href: '#contact' },
  { text: 'Admin', href: '/admin' }
  ];

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <a className="brand" href="#">{brand}</a>
        <nav className="nav-links" aria-label="Main navigation">
          {navLinks.map((l, i) => (
            <a key={i} className="nav-link" href={l.href}>{l.text}</a>
          ))}
        </nav>
        <div className="nav-actions">
          {user ? (
            <div className="user-badge">
              <span className="username">{user}</span>
              <button className="btn-outline" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div style={{display:'flex', gap:'0.5rem'}}>
              <a className="btn-outline" href="/signin">Sign in</a>
              <a className="btn-primary" href="/signup">Sign up</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Expose for debugging if needed
window.Navbar = Navbar;
