import { BrowserRouter as Link } from "react-router-dom"
function Header() {
    return (<div>
        <Link to="/">Home</Link>
        <Link to="/contact">Contato</Link>
        <Link to="/company">Sobre a Empresa</Link>
        <Link to="/newproject">Novo Projeto</Link>
    </div>);
}
export default Header