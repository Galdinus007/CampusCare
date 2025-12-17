// SignIn.jsx - demo client-side sign in using localStorage
// global React
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
    window.location.href = '/';
  };

  return (
    <div className="container">
      <div className="login-card" style={{margin: '3rem auto', maxWidth: 420}}>
        <h2>Sign in</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <div>Username or Email</div>
            <input className="input" value={user} onChange={(e) => setUser(e.target.value)} />
          </label>
          <label className="form-field">
            <div>Password</div>
            <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {error && <div className="error">{error}</div>}
          <div style={{display:'flex', gap: '0.5rem', marginTop: '1rem'}}>
            <button className="btn-primary" type="submit">Sign in</button>
            <a className="btn-outline" href="/signup">Create an account</a>
          </div>
        </form>
      </div>
    </div>
  );
};

window.SignIn = SignIn;
