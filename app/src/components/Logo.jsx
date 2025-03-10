import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <div
      className="logo container text-center mt-3"
      style={{ height: "5%", width: "10%" }}
    >
      <img className="img-fluid img-thumbnail" src={logo} alt="Logo" />
    </div>
  );
};

export default Logo;
