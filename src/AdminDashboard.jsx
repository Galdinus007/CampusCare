const AdminDashboard = () => {
  const handleLogout = () => {
    sessionStorage.removeItem('campus_admin_auth');
    window.location.href = '/';
  };

  const [admins, setAdmins] = React.useState([]);

  React.useEffect(() => {
    const users = JSON.parse(localStorage.getItem('campus_users') || '[]');
    const adm = users.filter(u => u.isAdmin);
    setAdmins(adm);
  }, []);

  return (
    <div className="container" style={{paddingTop:'2rem'}}>
      <div className="admin-card" style={{background:'rgba(255,255,255,0.02)', padding:'5rem', borderRadius:8}}>
        <h2>Admin Dashboard</h2>
        <p>Welcome, admin.</p>
        <br />
        <div style={{display:'flex', gap:'5rem', marginBottom: '3rem'}}>
          <button className="btn-primary" onClick={() => alert('No real admin actions implemented')}>Perform Action</button>
          <button className="btn-primary" onClick={handleLogout}>Logout</button>
          <a className="btn-primary" href="/admin/create">Create admin</a>
          <a className="btn-primary" href="/admin/staff">Manage staff</a>
          <a className="btn-primary" href="/admin/reports">Manage reports</a>
        </div>

        <section>
          <h3>Administrators</h3>
          {admins.length === 0 ? (
            <p>No administrators found.</p>
          ) : (
            <ul>
              {admins.map((a, i) => (
                <li key={i}><strong>{a.username}</strong> — {a.email}</li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

window.AdminDashboard = AdminDashboard;
