// AdminCreate.jsx - create an admin user (demo only)
// global React
const AdminCreate = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [code, setCode] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  // Demo admin creation code - change for your environment
  const ADMIN_CREATE_CODE = 'admincode123';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!username || !email || !password || !code) {
      setError('Please fill all fields');
      return;
    }
    if (code !== ADMIN_CREATE_CODE) {
      setError('Invalid admin creation code');
      return;
    }

    const users = JSON.parse(localStorage.getItem('campus_users') || '[]');
    const exists = users.find(u => u.username === username || u.email === email);
    if (exists) {
      setError('A user with that username or email already exists');
      return;
    }

    const user = { username, email, password, isAdmin: true };
    users.push(user);
    localStorage.setItem('campus_users', JSON.stringify(users));

    // sign in as admin
    sessionStorage.setItem('campus_admin_auth', '1');
    sessionStorage.setItem('campus_user_auth', username);
    setSuccess('Admin account created. Redirecting to dashboard...');
    setTimeout(() => { window.location.href = '/admin'; }, 900);
  };

  return (
    <div className="container">
      <div className="login-card" style={{margin: '3rem auto', maxWidth: 520}}>
        <h2>Create Admin Account</h2>
        <p style={{color:'rgba(255,255,255,0.8)'}}>Enter the admin creation code to create a new administrator for CampusCare.</p>
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
          <label className="form-field">
            <div>Admin creation code</div>
            <input className="input" value={code} onChange={(e) => setCode(e.target.value)} />
          </label>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
          <div style={{display:'flex', gap: '0.5rem', marginTop: '1rem'}}>
            <button className="btn-primary" type="submit">Create admin</button>
            <a className="btn-outline" href="/admin">Back</a>
          </div>
        </form>
      </div>
    </div>
  );
};

window.AdminCreate = AdminCreate;
