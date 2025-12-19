
const SignIn = () => {
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!user || !password) return setError('Please fill both fields');

    const users = JSON.parse(localStorage.getItem('campus_users') || '[]');
    const found = users.find(u => (u.username === user || u.email === user) && u.password === password);
    if (!found) {
      setError('Invalid credentials');
      return;
    }

    sessionStorage.setItem('campus_user_auth', found.username);
    window.location.href = '/home';
  };

  return (
    <div className="container">
      <div className="login-card" style={{margin: '3rem auto', maxWidth: 480}}>
        {/* Student Login Section */}
        <div>
          <h2>Student Sign In</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label className="form-field">
              <div>Username or Email</div>
              <input className="input" value={user} onChange={(e) => setUser(e.target.value)} placeholder="Enter your username or email" />
            </label>
            <label className="form-field">
              <div>Password</div>
              <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            </label>
            {error && <div className="error">{error}</div>}
            <div style={{display:'flex', gap: '0.5rem', marginTop: '1.5rem', flexDirection: 'column'}}>
              <button className="btn-primary" type="submit">Sign In</button>
              <a className="btn-outline" href="/signup">Create Student Account</a>
            </div>
          </form>
        </div>

        {/* Divider */}
        <div style={{margin: '2.5rem 0', display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <div style={{flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)'}}></div>
          <span style={{color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem'}}>OR</span>
          <div style={{flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)'}}></div>
        </div>

        {/* Admin Login Section */}
        <div style={{textAlign: 'center'}}>
          <h3 style={{marginBottom: '1rem'}}>Administrator Access</h3>
          <p style={{marginBottom: '1.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem'}}>
            Log in to the admin panel to manage reports, staff, and campus operations.
          </p>
          <a className="btn-primary" href="/admin" style={{display: 'block', width: '100%', textAlign: 'center', padding: '0.75rem'}}>
            Go to Admin Login
          </a>
        </div>
      </div>
    </div>
  );
};

window.SignIn = SignIn;
