  import './App.css'

function App() {
  return (
    <main className="auth-page">
      <header className="topbar" aria-label="Utility navigation">
        <span className="language">◎ &nbsp; EN⌄</span>
        <span>◉ &nbsp; HELP</span>
      </header>

      <div className="auth-layout">
        <div className="brand-lockup" aria-label="Meridian">
          <span className="brand-mark">M</span>
          <span className="brand-name">Meridian</span>
        </div>

        <div className="auth-panels">
          <section className="auth-panel sign-in-panel" aria-labelledby="sign-in-title">
            <div className="panel-heading">
              <p className="eyebrow">WELCOME BACK</p>
              <h1 id="sign-in-title">Sign in to Meridian</h1>
              <p className="subtitle">Use your work account to continue.</p>
            </div>

            <SocialButtons />
            <Divider />
            <SignInForm />
            <p className="panel-switch">New to Meridian? <a href="#create-account">Create an account</a></p>
          </section>

          <section className="auth-panel sign-up-panel" id="create-account" aria-labelledby="sign-up-title">
            <div className="panel-heading">
              <p className="eyebrow">GET STARTED</p>
              <h2 id="sign-up-title">Create your account</h2>
              <p className="subtitle">A clearer way to keep work moving.</p>
            </div>

            <SignUpForm />
            <p className="panel-switch">Already have an account? <a href="#sign-in-title">Sign in</a></p>
          </section>
        </div>

        <p className="legal-copy">By continuing, you agree to our <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.</p>
      </div>
    </main>
  )
}

function SocialButtons() {
  return (
    <div className="social-buttons" aria-label="Social sign in options">
      <button type="button"><span className="google-icon">G</span> Google</button>
      <button type="button"><span className="github-icon">◒</span> GitHub</button>
      <button type="button"><span className="apple-icon">●</span> Apple</button>
    </div>
  )
}

function Divider() {
  return <div className="divider"><span>OR</span></div>
}

function SignInForm() {
  return (
    <form className="auth-form">
      <label htmlFor="sign-in-email">Email</label>
      <input id="sign-in-email" type="email" placeholder="you@company.com" />
      <label htmlFor="sign-in-password">Password</label>
      <div className="password-field">
        <input id="sign-in-password" type="password" placeholder="Enter your password" />
        <button type="button" className="show-password">SHOW</button>
      </div>
      <div className="form-options">
        <label className="check-label"><input type="checkbox" /> <span>Remember me</span></label>
        <a href="#forgot-password">Forgot password?</a>
      </div>
      <button type="submit" className="primary-button">SIGN IN</button>
    </form>
  )
}

function SignUpForm() {
  return (
    <form className="auth-form">
      <label htmlFor="sign-up-name">Full name</label>
      <input id="sign-up-name" type="text" placeholder="Alex Morgan" />
      <label htmlFor="sign-up-email">Work email</label>
      <input id="sign-up-email" type="email" placeholder="you@company.com" />
      <label htmlFor="sign-up-password">Password</label>
      <input id="sign-up-password" type="password" placeholder="Create a password" />
      <p className="field-hint">Use 8 or more characters with a mix of letters and numbers.</p>
      <button type="submit" className="primary-button">CREATE ACCOUNT</button>
    </form>
  )
}

export default App
