import { Link,useNavigate } from 'react-router-dom';



export default function Nav() {
    const navigation = useNavigate()
    return(
        <div>
            <button onClick={() => navigation("/Menu")}>I am text</button>
        </div>
    );
}

