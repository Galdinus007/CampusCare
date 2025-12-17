const rootEl = document.getElementById('app');
if (!rootEl) {
  console.error('No #app element found to mount the React app.');
} else {
  const pathname = window.location.pathname || '/';

  const isAdminPath = pathname.startsWith('/admin');
  const isAuth = sessionStorage.getItem('campus_admin_auth') === '1';
  const isSignIn = pathname.startsWith('/signin');
  const isSignUp = pathname.startsWith('/signup');
  const isAdminCreate = pathname.startsWith('/admin/create');
  const isAdminStaff = pathname.startsWith('/admin/staff');
  const isAdminReports = pathname.startsWith('/admin/reports');
  const isReport = pathname.startsWith('/report');

  const App = () => {
    if (isAdminCreate) {
      // admin create page — allow creation when correct code is provided in the form
      return <AdminCreate />;
    }
    if (isAdminStaff) {
      if (isAuth) return <AdminStaff />;
      return <AdminLogin />;
    }
    if (isAdminReports) {
      if (isAuth) return <AdminReports />;
      return <AdminLogin />;
    }
    if (isReport) return <ReportForm />;
    if (isAdminPath) {
      if (isAuth) {
        return <AdminDashboard />;
      }
      return <AdminLogin />;
    }
    if (isSignIn) return <SignIn />;
    if (isSignUp) return <SignUp />;
    return <LandingPage />;
  };

  if (ReactDOM.createRoot) {
    ReactDOM.createRoot(rootEl).render(<App />);
  } else {
    ReactDOM.render(<App />, rootEl);
  }
}
