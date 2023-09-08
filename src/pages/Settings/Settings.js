import Container from "../../components/Container/Container";
import Divider from "../../components/Divider/Divider";
import Category from "./Components/Category/CategoryMain";

function Settings() {
    return (
        <Container customClass="column">
            <Category />
            <Divider />
        </Container>
    );
}

export default Settings;