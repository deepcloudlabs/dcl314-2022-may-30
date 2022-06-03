import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Alert extends Component {

    render() {
        return (
            <div> {this.props.valid &&
            <div className="alert alert-danger" role="alert">
                {this.props.message}
            </div>
            } </div>
        )
    }
}

export default Alert;
