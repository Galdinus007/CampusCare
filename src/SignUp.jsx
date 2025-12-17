// SignUp.jsx - demo client-side sign up using localStorage
// global React
const SignUp = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username || !email || !password) {
      setError('Please fill all fields');
      return;
    }

    const users = JSON.parse(localStorage.getItem('campus_users') || '[]');
    const exists = users.find(u => u.username === username || u.email === email);
    if (exists) {
      setError('A user with that username or email already exists');
      return;
    }

    const user = { username, email, password };
    users.push(user);
    localStorage.setItem('campus_users', JSON.stringify(users));

    // auto-sign in
    sessionStorage.setItem('campus_user_auth', username);
    setSuccess('Account created. Redirecting...');
    setTimeout(() => { window.location.href = '/'; }, 800);
  };

  return (
    <div className="container">
      <div className="login-card" style={{margin: '3rem auto', maxWidth: 480}}>
        <h2>Create an account</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <div>Username</div>
            <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label className="form-field">
            <div>Email</div>
            <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="form-field">
            <div>Password</div>
            <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
          <div style={{display:'flex', gap: '0.5rem', marginTop: '1rem'}}>
            <button className="btn-primary" type="submit">Create account</button>
            <a className="btn-outline" href="/signin">Already have an account?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

window.SignUp = SignUp;
