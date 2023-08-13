import { Link } from "react-router-dom"
import Container from '../Container/Container'
import styles from './Header.module.css'
import logo from '../../../img/costs_logo.png'
function Header() {
    return (
        <nav className={styles.header}>
            <Container>
                <Link to="/"><img src={logo} /></Link>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/">Home</Link>

                    </li>
                    <li className={styles.item}>
                        <Link to="/contact">Contato</Link>

                    </li>
                    <li className={styles.item}>
                        <Link to="/company">Sobre a Empresa</Link>

                    </li>
                </ul>
            </Container>
        </nav>

    );
}
export default Header