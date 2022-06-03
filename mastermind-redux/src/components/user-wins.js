import CardTitle from "./card_title";
import {Link} from "react-router-dom";

export default function UserWins(props){
    return(
        <div className="card">
            <CardTitle title="Tebrikler!" />
            <div className="card-body">
                <h1>Tebrikler! Oyunu Kazandınız!</h1>
                <p></p>
            </div>
            <Link to="/">Yeniden oynamak ister misin?</Link>
        </div>
    )
}