interface HeaderProps {
  text: String;
}
const Header = (props: HeaderProps) => {
  return <h1>{props.text}</h1>;
};

export default Header;
