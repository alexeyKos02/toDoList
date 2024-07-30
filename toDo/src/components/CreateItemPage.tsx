import React, {useState} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import {Button, ButtonGroup, Form} from "react-bootstrap";
import {ToDoItem} from "../types/ToDoItem.ts";
import './../styles/createItemPage.css';

interface CreateItemPageProps {
    className?: string;
}

const CreateItemPage = ({className}: CreateItemPageProps) => {
    const [task, setTask] = useState<ToDoItem>({
        id: 0,
        name: '',
        description: '',
        isDone: false,
        isLarge: false,
        extraItems: [],
    });
    const [currentExtraId, setCurrentExtraId] = useState<number>(0);

    function changeTask(event: React.ChangeEvent<HTMLInputElement>) {
        let attribute = event.target.id
        switch (attribute) {
            case 'name':
                setTask({...task, name: event.target.value});
                break;
            case 'description' :
                setTask({...task, description: event.target.value});
                break;
        }
    }

    function addExtraTask() {
        setCurrentExtraId(currentExtraId + 1)
        setTask({
            ...task, extraItems: [...task.extraItems, {
                id: currentExtraId,
                name: '',
                isDone: false,
            }]
        });
    }

    function addTask() {
        const tasksJSON = localStorage.getItem('tasks');
        const tasks = tasksJSON ? JSON.parse(tasksJSON) : [];
        const currentId: number = Number(localStorage.getItem('currentId')) || 0;
        tasks.push({...task, id: currentId + 1});
        localStorage.setItem('currentId', JSON.stringify(currentId + 1));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    interface ExtraTaskProps {
        id: number,
        nameTask: string
    }

    const ExtraTask = ({id, nameTask}: ExtraTaskProps) => {
        const [name, setName] = useState<string>(nameTask);

        function saveExtraTask() {
            setTask({
                ...task, extraItems: task.extraItems.map(extraTask => {
                    if (extraTask.id === id) {
                        extraTask.name = name;
                    }
                    return extraTask;
                }), isLarge: true
            })
        }

        function deleteExtraTask() {
            setTask({
                ...task, extraItems: task.extraItems.filter(extraTask => {
                    if (extraTask.id !== id) {
                        return extraTask;
                    }
                })
            })
        }

        return (
            <>
                <Form style={{display: 'flex', flexDirection: 'row', width: '100%', gap: '16px'}}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{width: '100%'}}>
                        <Form.Control type="email" placeholder="Название задачи" value={name}
                                      onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="secondary" style={{padding: 0, height: '2.4rem'}} onClick={saveExtraTask}>
                            <i className="bi bi-check-lg"/>
                        </Button>
                        <Button variant="secondary" style={{fontSize: '1.3rem', padding: 0, height: '2.4rem'}}
                                onClick={deleteExtraTask}>
                            <i className="bi bi-x"></i>
                        </Button>
                    </ButtonGroup>
                </Form>
            </>
        )
    }

    return (
        <>
            <i className="bi bi-clipboard2-check-fill left_top_button" onClick={addTask}></i>
            <div className={className}>
                <Form>
                    <Form.Group className="mb-3" controlId="name" style={{textAlign: 'left'}}>
                        <Form.Label style={{color: 'white'}}>Название задачи</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Название"
                                      onChange={changeTask}
                                      value={task.name}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description" style={{textAlign: 'left'}}>
                        <Form.Label style={{color: 'white'}}>Описание задачи</Form.Label>
                        <Form.Control as="textarea"
                                      placeholder="Описание"
                                      type="text" rows={3}
                                      value={task.description}
                                      onChange={changeTask}/>
                    </Form.Group>
                </Form>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Подзадачи</Accordion.Header>
                        <Accordion.Body className='extra_container'>
                            <i className="bi bi-plus-circle-dotted extra_plus_button" onClick={addExtraTask}></i>
                            <div className="extra_tasks_container">
                                {task.extraItems.map(task => <ExtraTask id={task.id} nameTask={task.name}/>)}
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </>
    );
};

export default CreateItemPage;