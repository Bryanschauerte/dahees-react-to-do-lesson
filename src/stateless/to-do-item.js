import React, { Component } from 'react';

const ToDoItem = ({ info, deleteFunction, setCheckboxFunction}) => {
    return (
        <div className="to-do-item">
            <input
            onChange={setCheckboxFunction}
            checked={info.isDone}
            className="check-box"
            type="checkbox"/>
            <h1>Task: {info.label}</h1>
            <button onClick={deleteFunction}>DELETE</button>
        </div>
    );
};

export default ToDoItem;