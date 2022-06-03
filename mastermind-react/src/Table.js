import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Table extends Component {

    render() {
        return (
            <div className="panel panel-success" data-bind="visible: moves().length > 0">
                <div className="panel-heading">
                    <h3 className="panel-title">{this.props.title}</h3>
                </div>
                <div className="panel-body">
                    <table className="table-responsive table table-striped">
                        <thead>
                        <tr>
                            {this.props.columns.split(',').map(
                                (col, index) =>
                                    <th key={index}>{col}</th>
                            )
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.values.map(
                            (val, i1) =>
                                <tr key={i1}>
                                    {this.props.properties.split(",").map(
                                        (p, i2) =>
                                            <th key={i2}>{val[p]}</th>
                                    )
                                    }
                                </tr>
                        )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Table;
