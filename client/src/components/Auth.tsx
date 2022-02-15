import GoogleButton from 'react-google-button'

function Auth() {
  const handleLoginClick = () => {
    window.open(`${process.env.REACT_APP_SERVER_URL}/auth/google`, "_self");
  }
  return (
    <GoogleButton onClick={handleLoginClick}/>
  );
}

export default Auth;
