import React, {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {TodolistType} from "./AppWithRedux";
import {AppRootStateType} from "./state/store";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}

export function TodolistWithRedux({todolist}: PropsType) {
    const {id, filter, title} = todolist

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])

    const dispatch = useDispatch()

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, id))
    }

    const removeTodolist = () => {
        dispatch(removeTodolistAC(id))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    }

    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(id, "all"))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(id, "active"))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(id, "completed"))

    if (filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true)
    }

    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, id));
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, id));
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
}


