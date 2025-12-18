const rootEl = document.getElementById('app');
if (!rootEl) {
  console.error('No #app element found to mount the React app.');
} else {
  const pathname = window.location.pathname || '/';
  const isLoggedIn = sessionStorage.getItem('campus_user_auth') !== null;

  // Redirect unauthenticated users to sign in when accessing protected routes
  if (!isLoggedIn && pathname === '/' && !pathname.startsWith('/signin') && !pathname.startsWith('/signup') && !pathname.startsWith('/admin/create')) {
    window.location.href = '/signin';
  }

  const isSignIn = pathname.startsWith('/signin');
  const isSignUp = pathname.startsWith('/signup');
  const isAdminCreate = pathname.startsWith('/admin/create');
  const isAuth = sessionStorage.getItem('campus_admin_auth') === '1';
  const isAdminPath = pathname.startsWith('/admin');
  const isAdminStaff = pathname.startsWith('/admin/staff');
  const isAdminReports = pathname.startsWith('/admin/reports');
  const isReport = pathname.startsWith('/report');
  const isContact = pathname.startsWith('/contact');
  const isHome = pathname.startsWith('/home');
  const showNavbar = !isSignIn && !isSignUp && !isAdminCreate;

  const App = () => {
    let Page = null;

    if (isSignIn) {
      Page = SignIn;
    } else if (isSignUp) {
      Page = SignUp;
    } else if (isAdminCreate) {
      Page = AdminCreate;
    } else if (isAdminStaff) {
      Page = isAuth ? AdminStaff : AdminLogin;
    } else if (isAdminReports) {
      Page = isAuth ? AdminReports : AdminLogin;
    } else if (isAdminPath) {
      Page = isAuth ? AdminDashboard : AdminLogin;
    } else if (isReport) {
      Page = ReportForm;
    } else if (isContact) {
      Page = Contact;
    } else if (isHome || isLoggedIn) {
      Page = LandingPage;
    } else {
      Page = LandingPage;
    }

    return (
      <>
        {showNavbar && <Navbar />}
        <div style={{marginTop: showNavbar ? '1rem' : 0}}>
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
