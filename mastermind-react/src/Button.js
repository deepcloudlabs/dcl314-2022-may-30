import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Button extends Component {
    render() {
        return (
            <div className="form-group">
                <button ref={ (btn) => {this.btn = btn;} }
                        onClick={this.props.doClick}
                        className="btn btn-success">{this.props.label}
                </button>
            </div>
        )
    }
}

export default Button;
