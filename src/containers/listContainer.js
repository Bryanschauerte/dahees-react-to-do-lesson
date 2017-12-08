import React, { Component } from 'react';
import './list-container.css';
import ToDoItem from '../stateless/to-do-item'


class ListContainer extends Component {

    constructor(){
        super();
        this.state = {
            toDos: [],
            addingNewToDo: false,
            text: ''
        };
        this.makeToDo = this.makeToDo.bind(this);
        this.renderToDos = this.renderToDos.bind(this);
        this.showInput = this.showInput.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.deleteByIndex = this.deleteByIndex.bind(this);
        this.markCheckbox = this.markCheckbox.bind(this);
    }

    markCheckbox(indexOfToDoToDelete){
        let oldToDo = this.state.toDos[indexOfToDoToDelete]; // {isDone: false, lable:'blblblblb'}
        oldToDo.isDone = !oldToDo.isDone;
        let newState = this.state.toDos;
        newState[indexOfToDoToDelete] = oldToDo;

        this.setState({
            toDos: newState
        })
        console.log(this.state.toDos, 'markCHECKbox fun')
        localStorage.setItem('toDos', JSON.stringify(this.state));

    }

    componentDidMount(){
        let old = localStorage.getItem('toDos');
        if(old){
            old = JSON.parse(old);
            this.setState(old);
        }
    }

    deleteByIndex(indexOfToDoToDelete){
        let oldToDos = this.state.toDos;
        oldToDos.splice(indexOfToDoToDelete, 1);
        console.log(oldToDos, 'oldToDOOOOSss');
        this.setState(
            {
                toDos: oldToDos
            }
        )
        localStorage.setItem('toDos', JSON.stringify(this.state));
    }

    onChangeHandler(e){

        this.setState({
            text: e.target.value })
    }

    showInput(){
        this.setState({
            addingNewToDo: !this.state.addingNewToDo
        })
    }

    makeToDo(){
        const toDo = {
            label: this.state.text,
            isDone: false
        };
        let currentToDos = this.state.toDos;
        console.log('old todos', currentToDos);
        currentToDos.push(toDo);
        this.setState({
            toDos: currentToDos,
            addingNewToDo: false
        });
        console.log(this.state, 'updated state');
        localStorage.setItem('toDos', JSON.stringify(this.state));
    }

    renderToDos(){
        return this.state.toDos.map(
            (aToDo, index) => {
                const setCheckbox = () => this.markCheckbox(index);
                const deleteToDo = () => this.deleteByIndex(index);
                return (
                    <ToDoItem
                        info={aToDo}
                        deleteFunction={deleteToDo}
                        setCheckboxFunction={setCheckbox}
                        key={Math.random()}
                        />
                    );
        }
        )
    }

    render() {
        return (
            <div className="list-container">

                <button onClick={this.showInput}>Add Task</button>
                {
                    this.state.addingNewToDo && <div className="add-label">
                <h3>
                    To-do Label
                </h3>
                <input className="label-input-text" onChange={this.onChangeHandler} type='text'/>
                        <button onClick={this.makeToDo}>Save</button>
            </div>
                }



                {
                    this.renderToDos()
                }
            </div>
        );
    }
}

export default ListContainer;
