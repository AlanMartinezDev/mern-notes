import authStore from "../stores/authStore";

export default function SignupForm() {
  const store = authStore();

  const handleSignup = (e) => {
    e.preventDefault();
    store.signup();
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <input
          onChange={store.updateSignupForm}
          value={store.signupForm.email}
          type="email"
          name="email"
        />
        <input
          onChange={store.updateSignupForm}
          value={store.signupForm.password}
          type="password"
          name="password"
        />
        <input type="submit" />
      </form>
    </div>
  );
}
