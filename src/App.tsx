import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [todoListId: string]: Array<TaskType>
}

function App() {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "CSS & SCSS", isDone: true},
            {id: v1(), title: "Angular", isDone: true},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "WATER", isDone: true},
            {id: v1(), title: "BREAD", isDone: true},
            {id: v1(), title: "SALT", isDone: true},
            {id: v1(), title: "BEER", isDone: false},
        ]
    })

    const removeTask = (tasksId: string, todoListId: string) => {
        const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        const resultOfUpdate: Array<TaskType> = tasksForUpdate.filter((task) => task.id !== tasksId)
        const copyTasks = {...tasks}
        copyTasks[todoListId] = resultOfUpdate
        setTasks(copyTasks)
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter((task) => task.id !== tasksId)})
    }

    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        const resultOfUpdate: Array<TaskType> = [newTask, ...tasksForUpdate]
        const copyTasks = {...tasks}
        copyTasks[todoListId] = resultOfUpdate
        setTasks(copyTasks)

        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)})
    }
    const changeTodolistFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }
    const removeTodolist = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }

    const getFilteredTaskForRender = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasksList.filter(t => !t.isDone)
            case "completed":
                return tasksList.filter(t => t.isDone)
            default:
                return tasksList
        }
    }

    const todoListsComponents = todoLists.map(tl => {
        let tasksForRender: Array<TaskType> = getFilteredTaskForRender(tasks[tl.id], tl.filter)
        return (
            <TodoList
                key={tl.id}
                todolistId={tl.id}
                removeTask={removeTask}
                title={tl.title}
                tasks={tasksForRender}
                filter={tl.filter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodolist={removeTodolist}
                changeTodolistFilter={changeTodolistFilter}
            />
        )
    })

    return (
        <div className="App">
            {todoListsComponents}
        </div>
    );
}

export default App;
