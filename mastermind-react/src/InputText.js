import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class InputText extends Component {

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.htmlFor}>{this.props.label}</label>
                <input type="text"
                       ref={(input) => { this.textInput = input; }}
                       value={this.props.value}
                       onChange={this.props.onChange}
                       className="form-control"/>
            </div>
        )
    }
}

export default InputText;
