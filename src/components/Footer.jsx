export default function Footer({ year = new Date().getFullYear() }) {
  return (
    <footer className="footer">
      <span>© {year} - Mi tienda React</span>
    </footer>
  );
}
