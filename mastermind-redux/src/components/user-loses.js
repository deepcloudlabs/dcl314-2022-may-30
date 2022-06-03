import CardTitle from "./card_title";
import {Link} from "react-router-dom";

export default function UserLoses(props){
    return(
        <div className="card">
            <CardTitle title="Mastermind" />
            <div className="card-body">
                <h1>Oyunu Kaybettiniz!</h1>
                <p></p>
            </div>
            <Link to="/">Yeniden oynamak ister misin?</Link>
        </div>
    )
}