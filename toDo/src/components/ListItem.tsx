import React, {MouseEventHandler, useEffect, useState} from 'react';
import './../styles/list.css';
import {ExtraItem, ToDoItem} from "../types/ToDoItem.ts";

interface ActionsProps {
    closeButton?: boolean
    isDone: boolean
    changeIsDone?: MouseEventHandler<HTMLElement>
    isLarge?: boolean
    isHidden?: boolean
    changeIsHidden?: MouseEventHandler<HTMLElement>
}

const Actions = ({
                     closeButton = true,
                     isDone,
                     changeIsDone,
                     isLarge = false,
                     isHidden,
                     changeIsHidden
                 }: ActionsProps) => {
    return (
        <div className='actions'>
            {isDone ?
                <i className="bi bi-check-circle-fill" onClick={changeIsDone}></i>
                : <i className="bi bi-check-circle" onClick={changeIsDone}></i>}
            {isLarge && (isHidden &&
                <i className="bi bi-arrow-bar-down" onClick={changeIsHidden}></i> ||
                <i className="bi bi-arrow-bar-up" onClick={changeIsHidden}></i>)}
            {closeButton && <i className="bi bi-x-circle"></i>}
        </div>
    )
}

interface ExtraItemsProps {
    extraItems: ExtraItem[];
    changeExtraItem: Function;
    deleteExtraItem: Function;
}

const ExtraItems = ({extraItems, changeExtraItem, deleteExtraItem}: ExtraItemsProps) => {
    return (
        <div className='extra-items'>
            {extraItems.map(item => {
                const {name, isDone} = item;
                return (
                    <div className="extra_item_list">
                        <div style={{display: 'flex', gap: '16px'}}>
                            <Actions closeButton={false} isDone={isDone} changeIsDone={() => changeExtraItem(item.id)}/>
                            <h6 style={{margin: 0}}>
                                {name}
                            </h6>
                        </div>
                        <i className="bi bi-x-circle" onClick={() => deleteExtraItem(item.id)}></i>
                    </div>)
            })}
        </div>
    )
}

interface ListItemProps {
    item: ToDoItem;
}

const ListItem = ({item}: ListItemProps) => {
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const [currentItem, setCurrentItem] = useState<ToDoItem>(item);
    const {name, isLarge, extraItems} = currentItem;

    function changeIsDone() {
        if (!currentItem.isDone) {
            const extraItems = currentItem.extraItems.map(item => {
                item.isDone = true;
                return item;
            })
            setCurrentItem({...currentItem, extraItems, isDone: true})
        } else {
            setCurrentItem({...currentItem, isDone: false})
        }
    }

    function changeIsHidden() {
        setIsHidden(!isHidden)
    }

    function changeExtraItem(id: number) {
        setCurrentItem({
            ...currentItem, extraItems: currentItem.extraItems.map(item => {
                if (item.id === id) {
                    item.isDone = !item.isDone;
                }
                return item;
            })
        })
    }

    function deleteExtraItem(id: number) {
        let countExtraItem = 0;
        const array = currentItem.extraItems.filter(item => {
            if (item.id !== id) {
                countExtraItem++;
                return item;
            }
        });
        setCurrentItem({
            ...currentItem, extraItems: array, isLarge: array.length !== 0
        })
    }

    useEffect(() => {
        const tasksJSON = localStorage.getItem('tasks');
        let tasks = tasksJSON ? JSON.parse(tasksJSON) : [];
        tasks = tasks.map((task: ToDoItem) => {
            if (task.id === currentItem.id) {
                return  currentItem;
            }
            return task;
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [currentItem]);
    return (
        <>
            <div className="item_list">
                <h5>
                    {name}
                </h5>
                <Actions isDone={currentItem.isDone} changeIsDone={changeIsDone} isLarge={isLarge} isHidden={isHidden}
                         changeIsHidden={changeIsHidden}/>
            </div>
            {!isHidden && <ExtraItems extraItems={extraItems} changeExtraItem={changeExtraItem}
                                      deleteExtraItem={deleteExtraItem}/>}
        </>
    );
};

export default ListItem;