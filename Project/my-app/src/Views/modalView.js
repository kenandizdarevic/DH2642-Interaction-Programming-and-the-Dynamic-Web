import Button from '@mui/material/Button'
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom'

function MyVerticallyCenteredModal(props) {
    const navigation = useNavigate()
    
    function menuClicked() {
        navigation("/Menu")
    }

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Body>
            <p>
            You will lose your score if you continue to menu, do you want to proceed?
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={menuClicked}>Yes</Button>
            <Button variant="contained" onClick={props.onHide}>No</Button>
        </Modal.Footer>
        </Modal>
    );
    }

export default MyVerticallyCenteredModal;