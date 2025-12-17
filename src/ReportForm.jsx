const ReportForm = () => {
  const [form, setForm] = React.useState({ reg: '', type: '', description: '', location: '', photo: '', contact: '' });
  const [msg, setMsg] = React.useState('');
  const [error, setError] = React.useState('');

  const handleChange = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const canSubmit = () => {
    if (!form.reg) return false;
    if (!form.type) return false;
    if (!form.description) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e && e.preventDefault();
    setError('');
    if (!canSubmit()) {
      setError('Please fill reg number, type and description.');
      return;
    }
    const reports = JSON.parse(localStorage.getItem('campus_reports') || '[]');
    const item = {
      id: Date.now().toString(),
      regNumber: form.reg,
      type: form.type,
      description: form.description,
      location: form.location,
      photo: form.photo,
      contact: form.contact,
      status: 'open',
      assignedStaffId: null,
      createdAt: new Date().toISOString()
    };
    reports.push(item);
    localStorage.setItem('campus_reports', JSON.stringify(reports));
    setMsg('Report filed successfully. Your report id: ' + item.id);
    setForm({ reg: '', type: '', description: '', location: '', photo: '', contact: '' });
  };

  // Check reports by registration number
  const [lookupReg, setLookupReg] = React.useState('');
  const [found, setFound] = React.useState([]);

  const lookup = (e) => {
    e && e.preventDefault();
    const reports = JSON.parse(localStorage.getItem('campus_reports') || '[]');
    const staff = JSON.parse(localStorage.getItem('campus_staffs') || '[]');
    const matches = reports.filter(r => r.regNumber && r.regNumber.toLowerCase() === (lookupReg || '').toLowerCase());
    // enrich with staff info
    const enriched = matches.map(r => ({ ...r, assignedStaff: staff.find(s => s.id === r.assignedStaffId) || null }));
    setFound(enriched);
  };

  return (
    <div className="container" style={{paddingTop:'2rem'}}>
      <div className="admin-card" style={{padding:'2rem', borderRadius:8}}>
        <h2>File a maintenance report</h2>
        <p>Enter your registration number to file a complaint. We will store it locally for admin assignment (demo).</p>
        <form onSubmit={handleSubmit} className="report-form">
          <label className="form-field">
            <div>Registration number</div>
            <input className="input" value={form.reg} onChange={(e) => handleChange('reg', e.target.value)} placeholder="e.g. REG2023-001" />
          </label>

          <label className="form-field">
            <div>Issue type</div>
            <select className="input" value={form.type} onChange={(e) => handleChange('type', e.target.value)}>
              <option value="">Select type</option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label className="form-field">
            <div>Description</div>
            <textarea className="input" rows={4} value={form.description} onChange={(e) => handleChange('description', e.target.value)} />
          </label>

          <label className="form-field">
            <div>Location (room / block)</div>
            <input className="input" value={form.location} onChange={(e) => handleChange('location', e.target.value)} />
          </label>

          <label className="form-field">
            <div>Photo URL (optional)</div>
            <input className="input" value={form.photo} onChange={(e) => handleChange('photo', e.target.value)} placeholder="https://" />
          </label>

          <label className="form-field">
            <div>Contact (optional)</div>
            <input className="input" value={form.contact} onChange={(e) => handleChange('contact', e.target.value)} placeholder="Phone or email (optional)" />
          </label>

          {error && <div className="error">{error}</div>}
          {msg && <div className="success">{msg}</div>}

          <div style={{marginTop:'1rem'}}>
            <button className="btn-primary" type="submit" disabled={!canSubmit()}>Submit Report</button>
          </div>
        </form>
        
        <hr style={{margin:'1.5rem 0', borderColor: 'rgba(255,255,255,0.04)'}} />
        <div style={{textAlign:'left'}}>
          <h3>Check my reports</h3>
          <form onSubmit={lookup} style={{display:'flex', gap:8, alignItems:'center'}}>
            <input className="input" placeholder="Enter your registration number" value={lookupReg} onChange={(e) => setLookupReg(e.target.value)} />
            <button className="btn-primary" onClick={lookup} type="button">Lookup</button>
          </form>
          <div style={{marginTop:12}}>
            {found.length === 0 ? <div style={{color:'rgba(255,255,255,0.7)'}}>No reports found for that reg number.</div> : (
              <div className="reports-list">
                {found.map(r => (
                  <div key={r.id} className="report-card">
                    <div className="report-id">#{r.id} • {new Date(r.createdAt).toLocaleString()}</div>
                    <div className="report-meta">Type: {r.type} • Status: <strong>{r.status}</strong></div>
                    <div className="report-desc">{r.description}</div>
                    <div className="report-location">Location: {r.location}</div>
                    {r.photo ? <div style={{marginTop:8}}><img src={r.photo} style={{maxWidth:200, borderRadius:6}} alt="report" /></div> : null}
                    <div style={{marginTop:8}}>
                      {r.assignedStaff ? (
                        <div>Assigned: <strong>{r.assignedStaff.name}</strong> — {r.assignedStaff.role} • <a className="btn-outline" href={`tel:${r.assignedStaff.number}`}>Call {r.assignedStaff.number || 'n/a'}</a></div>
                      ) : (
                        <div style={{color:'rgba(255,255,255,0.7)'}}>Not yet assigned</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

window.ReportForm = ReportForm;
