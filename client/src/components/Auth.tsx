import GoogleButton from 'react-google-button'

function Auth() {
  return (
    <GoogleButton
      onClick={() => { window.location.href = "http://localhost:4000/auth/google" }}
    />
  );
}

export default Auth;