export default function Header({ title = "Mi tienda React"}) {
    return (
        <header style={{ padding: 12, borderBottom: "1px solid #eee" }}>
            <h1>{title}</h1>
        </header>
    );
}