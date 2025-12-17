const AdminStaff = () => {
    const [staff, setStaff] = React.useState([]);
    const [editing, setEditing] = React.useState(null);
  const [form, setForm] = React.useState({ name: '', role: '', customRole: '', email: '', number: '' });
    const [error, setError] = React.useState('');

    React.useEffect(() => {
      load();
    }, []);

    const load = () => {
      const list = JSON.parse(localStorage.getItem('campus_staffs') || '[]');
      setStaff(list);
    };

    const saveAll = (list) => {
      localStorage.setItem('campus_staffs', JSON.stringify(list));
      setStaff(list);
    };

    const handleChange = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

    // helper to get only digits from phone input
    const digitsOnly = (s) => (s + '').replace(/\D/g, '');

    // called for each field change; adds live validation for phone
    const handleFieldChange = (k, v) => {
      handleChange(k, v);
      if (k === 'number') {
        const d = digitsOnly(v);
        if (d.length > 0 && d.length !== 10) {
          setError('Phone number must contain exactly 10 digits');
        } else {
          setError('');
        }
      } else if (error) {
        setError('');
      }
    };

    const handleCreate = (e) => {
      e && e.preventDefault();
      if (!form.name || !form.role) return;
      // validate phone number: if provided, must be 10 digits
      if (form.number) {
        const digits = digitsOnly(form.number);
        if (digits.length !== 10) {
          setError('Phone number must contain exactly 10 digits');
          return;
        }
      }
  const roleValue = form.role === 'Other' ? (form.customRole || 'Other') : form.role;
  const item = { id: Date.now().toString(), name: form.name, role: roleValue, email: form.email, number: form.number };
      const newList = [...staff, item];
      saveAll(newList);
  setForm({ name: '', role: '', customRole: '', email: '', number: '' });
      setError('');
    };

    const startEdit = (s) => {
      setEditing(s.id);
      const predefined = ['Electrician','Plumber','Carpenter'];
      const preRole = predefined.includes(s.role) ? s.role : (s.role ? 'Other' : '');
      setForm({ name: s.name, role: preRole, customRole: preRole === 'Other' ? s.role : '', email: s.email, number: s.number || '' });
    };

    const applyEdit = (e) => {
      e && e.preventDefault();
      if (!editing) return;
      // validate phone number on edit as well
      if (form.number) {
        const digits = digitsOnly(form.number);
        if (digits.length !== 10) {
          setError('Phone number must contain exactly 10 digits');
          return;
        }
      }
  const roleValue = form.role === 'Other' ? (form.customRole || 'Other') : form.role;
  const newList = staff.map(s => s.id === editing ? { ...s, ...{ name: form.name, role: roleValue, email: form.email, number: form.number } } : s);
      saveAll(newList);
      setEditing(null);
  setForm({ name: '', role: '', customRole: '', email: '', number: '' });
      setError('');
    };

    const cancelEdit = () => {
      setEditing(null);
      setForm({ name: '', role: '', email: '', number: '' });
      setError('');
    };

    const remove = (id) => {
      if (!confirm('Delete this staff member?')) return;
      const newList = staff.filter(s => s.id !== id);
      saveAll(newList);
    };

    const canSubmit = () => {
      if (!form.name) return false;
      if (!form.role) return false;
      if (form.role === 'Other' && !form.customRole) return false;
      if (form.number) {
        return digitsOnly(form.number).length === 10;
      }
      return true;
    };

    return (
      <div className="container" style={{paddingTop:'2rem'}}>
        <div className="admin-card" style={{background:'rgba(255,255,255,0.02)', padding:'3rem', borderRadius:8}}>
          <h2>Staff Management</h2>

          <section style={{marginBottom:'2rem'}}>
            <h3>{editing ? 'Edit staff' : 'Add staff'}</h3>
            <form className="staff-form" onSubmit={editing ? applyEdit : handleCreate}>
              <label className="form-field">
                <div>Name</div>
                <input className="input" value={form.name} onChange={(e) => handleFieldChange('name', e.target.value)} />
              </label>
              <label className="form-field">
                <div>Role</div>
                <select className="input" value={form.role} onChange={(e) => handleFieldChange('role', e.target.value)}>
                  <option value="">Select role</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Other">Other</option>
                </select>
                {form.role === 'Other' ? (
                  <input className="input" placeholder="Specify role" style={{marginTop:'0.5rem'}} value={form.customRole} onChange={(e) => handleFieldChange('customRole', e.target.value)} />
                ) : null}
              </label>
              <label className="form-field">
                <div>Email</div>
                <input type="email" className="input" value={form.email} onChange={(e) => handleFieldChange('email', e.target.value)} />
              </label>
              <label className="form-field">
                <div>Phone Number</div>
                <input type="tel" placeholder="0123456789" className="input" value={form.number} onChange={(e) => handleFieldChange('number', e.target.value)} />
              </label>
              {error && <div className="error" style={{marginTop: '0.5rem'}}>{error}</div>}
              <div style={{display:'flex', gap:'5rem', marginTop:'2rem'}}>
                <button className="btn-primary" type="submit" disabled={!canSubmit()}>{editing ? 'Save' : 'Add'}</button>
                {editing ? <button type="button" className="btn-outline" onClick={cancelEdit}>Cancel</button> : null}
              </div>
            </form>
          </section>

          <section>
            <h3>Staff list</h3>
            {staff.length === 0 ? (
              <p>No staff added yet.</p>
            ) : (
              <div className="staff-list">
                {staff.map(s => (
                  <div className="staff-item" key={s.id}>
                    <div className="staff-meta">
                      <div className="staff-name">{s.name}</div>
                      <div className="staff-role">{s.role}</div>
                      <div className="staff-email">{s.email}</div>
                      <div className="staff-number">{s.number}</div>
                    </div>
                    <div className="staff-actions">
                      <button className="btn-outline" onClick={() => startEdit(s)}>Edit</button>
                      <button className="btn-outline" onClick={() => remove(s.id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    );

  };

  window.AdminStaff = AdminStaff;
