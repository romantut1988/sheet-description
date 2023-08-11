import React from "react";

type PropsType = {
    truck: string
    tasks: Task[]
}

type Task = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {
    return (
        <div>
            <h3>{props.truck}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {
                    return (
                        <li key={el.id}><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span></li>
                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}
