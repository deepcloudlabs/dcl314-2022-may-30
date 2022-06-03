import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Badge extends Component {

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.value}>{this.props.label}</label>
                <span id={this.props.value} className="badge">
                    {this.props.value}
                </span>
            </div>
        )
    }
}

export default Badge;
