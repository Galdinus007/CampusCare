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
    // pick the page component based on pathname
    let Page = LandingPage;

    if (isAdminCreate) {
      Page = AdminCreate;
    } else if (isAdminStaff) {
      Page = isAuth ? AdminStaff : AdminLogin;
    } else if (isAdminReports) {
      Page = isAuth ? AdminReports : AdminLogin;
    } else if (isReport) {
      Page = ReportForm;
    } else if (isAdminPath) {
      Page = isAuth ? AdminDashboard : AdminLogin;
    } else if (isSignIn) {
      Page = SignIn;
    } else if (isSignUp) {
      Page = SignUp;
    }

    // Render Navbar on all pages and the selected Page below it
    return (
      <>
        <Navbar />
        <div style={{marginTop: '1rem'}}>
          <Page />
        </div>
      </>
    );
  };

  if (ReactDOM.createRoot) {
    ReactDOM.createRoot(rootEl).render(<App />);
  } else {
    ReactDOM.render(<App />, rootEl);
  }
}
