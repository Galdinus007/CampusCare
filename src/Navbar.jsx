
const Navbar = ({ brand = 'CampusCare', links = null }) => {
  const [user, setUser] = React.useState(null);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const u = sessionStorage.getItem('campus_user_auth');
    const adminAuth = sessionStorage.getItem('campus_admin_auth');
    setUser(u || null);
    setIsAdmin(adminAuth === '1');
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('campus_user_auth');
    sessionStorage.removeItem('campus_admin_auth');
    window.location.href = '/signin';
  };

  const navLinks = links || [
    { text: 'Home', href: '/home' },
    { text: 'Report', href: '/report' },
    { text: 'Contact', href: '/contact' }
  ];

  return (
    
    <header className="navbar">
      
      <div className="container nav-inner">
      <img className="image" src="./srm.png" alt="logo"  style={{ width: "70px", height: "auto" }}/>

        <a className="brand" href="#">{brand}</a>

        
        <nav className="nav-links" aria-label="Main navigation">
          {navLinks.map((l, i) => (
            <a key={i} className="nav-link" href={l.href}>{l.text}</a>
          ))}
        </nav>
        <div className="nav-actions">
          {user || isAdmin ? (
            <div className="user-badge" style={{display:'flex', gap:'1rem', alignItems:'center'}}>
              <span className="username">{user || 'Admin'}</span>
              <button className="btn-outline" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div style={{display:'flex', gap:'0.5rem'}}>
              <a className="btn-outline" href="/signin">Sign in</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Expose for debugging if needed
window.Navbar = Navbar;
