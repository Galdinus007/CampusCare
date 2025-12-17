const AdminLogin = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const validUser = 'admin';
    const validPass = 'pas123';

    if (username === validUser && password === validPass) {
      // mark as authenticated (session only)
      sessionStorage.setItem('campus_admin_auth', '1');
      // navigate to dashboard
      window.location.href = '/admin';
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container">
      <div className="login-card" style={{margin: '3rem auto', maxWidth: 420}}>
        <h2>Admin Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <div>Username</div>
            <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label className="form-field">
            <div>Password</div>
            <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {error && <div className="error">{error}</div>}
          <div style={{display:'flex', gap: '0.5rem', marginTop: '1rem'}}>
            <button className="btn-primary" type="submit">Sign in</button>
            <a className="btn-outline" href="/">Back</a>
          </div>
        </form>
      </div>
    </div>
  );
};

window.AdminLogin = AdminLogin;
