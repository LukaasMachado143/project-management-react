import styles from './Home.module.css'
import savings from '../../../img/savings.svg'
function Home() {
    return (
        <section className={styles.homeContainer}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece  gerenciar seus projetps agora mesmo</p>
            <img src={savings}></img>
        </section>
    )
}
export default Home