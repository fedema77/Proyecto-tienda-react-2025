export default function Header({ title = "Tienda React" }) {
  return (
    <header className="header">
      <h1 className="header__title">{title}</h1>
      <nav className="nav">
        <a href="/">Home</a>
      </nav>
    </header>
  );
}
