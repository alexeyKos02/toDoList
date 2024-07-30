import {useState} from 'react'
import './App.css'
import MainList from "./components/MainList.tsx";
import CreateItemPage from "./components/CreateItemPage.tsx";
import {ToDoItem} from "./types/ToDoItem.ts";

function App() {
    const [hidden, setHidden] = useState<boolean>(false);
    const [isMainPage, setIsMainPage] = useState<boolean>(true);

    function changeBackground() {
        setHidden(true)
    }

    function changePages() {
        setIsMainPage(!isMainPage)
    }

    return (
        <>
            <div className='main_module' onClick={changeBackground}>
                <div className={`glass ${hidden ? 'hidden_glass' : ''}`}>
                    <h2 style={{color: "white"}}>ЗАДАЧИ</h2>
                </div>
                {isMainPage &&
                    <i className="bi bi-plus-circle-dotted right_top_button" onClick={changePages}/> ||
                    <i className="bi bi-card-list right_top_button" onClick={changePages}/>
                }
                {isMainPage &&
                    <MainList className='main_list'/> ||
                    <CreateItemPage className="create_item_page"/>}
            </div>
        </>
    )
}

export default App
