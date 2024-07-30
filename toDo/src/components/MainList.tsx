import React, {useEffect, useState} from 'react';
import ListItem from "./ListItem.tsx";
import {ToDoItem} from "../types/ToDoItem.ts";


interface MainListProps {
    className?: string;
}

const MainList = ({className}: MainListProps) => {
    const [items, setItems] = useState<ToDoItem[]>([]);

    useEffect(() => {
        const tasksJSON = localStorage.getItem('tasks');
        const tasks = tasksJSON ? JSON.parse(tasksJSON) : [];
        setItems(tasks);
    }, []);

    return (
        <div className={className}>
            {items.map((item) => (
                <ListItem item={item}/>
            ))}
        </div>
    );
};

export default MainList;