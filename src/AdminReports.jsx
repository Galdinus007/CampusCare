const AdminReports = () => {
  const [reports, setReports] = React.useState([]);
  const [staff, setStaff] = React.useState([]);

  React.useEffect(() => { load(); }, []);

  const load = () => {
    const r = JSON.parse(localStorage.getItem('campus_reports') || '[]');
    const s = JSON.parse(localStorage.getItem('campus_staffs') || '[]');
    setReports(r);
    setStaff(s);
  };

  const saveReports = (r) => {
    localStorage.setItem('campus_reports', JSON.stringify(r));
    setReports(r);
  };

  const getStaffById = (id) => staff.find(x => x.id === id) || null;

  const assignStaff = (reportId, staffId) => {
    const newList = reports.map(rep => rep.id === reportId ? { ...rep, assignedStaffId: staffId, status: staffId ? 'in-progress' : rep.status } : rep);
    saveReports(newList);
  };

  const changeStatus = (reportId, status) => {
    const newList = reports.map(rep => rep.id === reportId ? { ...rep, status } : rep);
    saveReports(newList);
  };

  const removeReport = (id) => {
    if (!confirm('Delete this report?')) return;
    const newList = reports.filter(r => r.id !== id);
    saveReports(newList);
  };

  return (
    <div className="container" style={{paddingTop:'2rem'}}>
      <div className="admin-card" style={{padding:'1.5rem', borderRadius:8}}>
        <h2>Reports</h2>
        {reports.length === 0 ? (
          <p>No reports yet.</p>
        ) : (
          <div className="reports-list">
            {reports.map(r => {
              const assigned = getStaffById(r.assignedStaffId);
              // build staff options: prefer staff matching type
              const matched = staff.filter(s => {
                if (!r.type) return true;
                const t = r.type.toLowerCase();
                return s.role && s.role.toLowerCase().includes(t.toLowerCase());
              });
              return (
                <div className="report-card" key={r.id}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div>
                      <div className="report-id">#{r.id}</div>
                      <div className="report-meta">Reg: {r.regNumber} • Type: {r.type} • Status: <strong>{r.status}</strong></div>
                      <div className="report-desc">{r.description}</div>
                      <div className="report-location">Location: {r.location}</div>
                      {r.photo ? <div style={{marginTop:8}}><img src={r.photo} style={{maxWidth:240, borderRadius:6}} alt="report" /></div> : null}
                    </div>
                    <div style={{minWidth:220, marginLeft:20}}>
                      <div style={{marginBottom:8}}>
                        <label style={{fontSize:12}}>Assign staff</label>
                        <select className="input" value={r.assignedStaffId || ''} onChange={(e) => assignStaff(r.id, e.target.value)}>
                          <option value="">-- unassigned --</option>
                          {matched.map(s => (
                            <option key={s.id} value={s.id}>{s.name} — {s.role}</option>
                          ))}
                          {staff.filter(s=>!matched.includes(s)).map(s => (
                            <option key={s.id+"-other"} value={s.id}>{s.name} — {s.role}</option>
                          ))}
                        </select>
                      </div>

                      <div style={{marginBottom:8}}>
                        <label style={{fontSize:12}}>Status</label>
                        <select className="input" value={r.status} onChange={(e) => changeStatus(r.id, e.target.value)}>
                          <option value="open">open</option>
                          <option value="in-progress">in-progress</option>
                          <option value="resolved">resolved</option>
                        </select>
                      </div>

                      <div style={{display:'flex', gap:8}}>
                        {assigned ? (
                          <div>
                            <div style={{fontSize:12}}>Assigned</div>
                            <div style={{fontWeight:700}}>{assigned.name}</div>
                            <div>{assigned.role}</div>
                            <div style={{marginTop:6}}>{assigned.number ? (
                              <a href={`tel:${assigned.number}`} className="btn-outline">Call {assigned.number}</a>
                            ) : <div style={{fontSize:12}}>No phone</div>}</div>
                          </div>
                        ) : (
                          <div style={{fontSize:12, color:'#999'}}>No staff assigned</div>
                        )}
                      </div>

                      <div style={{marginTop:10}}>
                        <button className="btn-outline" onClick={() => removeReport(r.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

window.AdminReports = AdminReports;
