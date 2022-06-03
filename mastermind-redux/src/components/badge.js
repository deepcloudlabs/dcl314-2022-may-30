import React from "react";

export default function Badge(props){
    return (
        <div className="form-group">
            <label htmlFor="gamelevel">{props.label}: </label>
            <span className="badge alert-warning">{props.value}</span>
        </div>
    );
}