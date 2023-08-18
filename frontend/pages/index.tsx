import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Comfortaa, Questrial } from 'next/font/google';
import Task from '../components/Task';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import TaskBody from '../models/task';
import UpdateBody from '../models/update';

import axios from 'axios';

const comfortaa = Comfortaa({
    weight: '400',
    subsets: ['latin']
})

const questrial = Questrial({
    weight: '400',
    subsets: ['latin']
})

export default function Home(){
    const [csrfTokenState, setCsrfState] = useState(false);
    const [displayNewTaskMenu, setNewTaskMenuDisplayed] = useState(false);
    const [currentFilter, setCurrentFilter] = useState('default');

    axios.get('http://localhost:8080/token').then((response) => {
        axios.defaults.headers.common['csrf-token'] = response.data.token;
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.withCredentials = true
        setCsrfState(true)
    });

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if(!csrfTokenState) return
        getTasks()
    }, [csrfTokenState])
    
    useEffect(() => {
        filterTasks()
    }, [currentFilter])

    const [tasksElements, setTasksElements] = useState([]);

    useEffect(() => {
        if(!tasks) return
        const tasksEl: never[] | any = tasks.map((task: TaskBody, index) => (
            <Task
                key={task._id}
                _id={task._id}
                done={task.done}
                created_at={task.created_at}
                fontsClass={[comfortaa.className, questrial.className]}
                title={task.title}
                onDone={updateTask}
                onDelete={deleteTask}
            />
            ))
        setTasksElements(tasksEl)
    }, [tasks])

    async function filterTasks(ev? : FormEvent<HTMLElement> | Event) {
        var target: Element | HTMLElement | EventTarget | null = document.getElementById('search')
        if(ev){
            ev.preventDefault()
            target = document.querySelector('#search')
        }
        if(currentFilter === 'default') {
            setCurrentFilter('all')
        }

        let filtered : [] = []
        // @ts-ignore
        if (target.value === '') {filtered = tasks}
        switch(currentFilter) {
            case 'all' || 'default':
                // @ts-ignore
                filtered = tasks.filter((t: TaskBody) => t.title.toLowerCase().includes(target.value.toLowerCase()))
                break
            case 'pending':
                // @ts-ignore
                filtered = tasks.filter((t: TaskBody) => t.title.toLowerCase().includes(target.value.toLowerCase()) && !t.done)
                break
            case 'done':
                // @ts-ignore
                filtered = tasks.filter((t: TaskBody) => t.title.toLowerCase().includes(target.value.toLowerCase()) && t.done)
                break
            }
        const tasksEl: never[] | any = filtered.map((task: TaskBody, index) => (
            <Task
                key={task._id}
                _id={task._id}
                done={task.done}
                created_at={task.created_at}
                fontsClass={[comfortaa.className, questrial.className]}
                title={task.title}
                onDone={updateTask}
                onDelete={deleteTask}
            />
            ))
        setTasksElements(tasksEl)
    }

    async function createTask(ev: React.FormEvent) {
        ev.preventDefault();
        const title : HTMLElement | HTMLTextAreaElement | null = document.getElementById('newTaskTitle')

        // @ts-ignore
        if(!title || !title?.value) {
            return setNewTaskMenuDisplayed(false)
        }

        axios.post('http://localhost:8080/tasks/create', {
            // @ts-ignore
            title: title.value
        }).then(async () => await getTasks()).catch(() => {
            toast.error('Poxa! Ocorreu um erro ao criar a tarefa, tente novamente em alguns segundos...', {
                className: 'bg-black'
            })
        })

    }

    async function getTasks(ev?: React.MouseEvent) {
        setNewTaskMenuDisplayed(false)
        axios.get('http://localhost:8080/tasks').then((response) => {
            setTasks(response.data.tasks);
        }).catch(() => {
            toast.error('Poxa! Ocorreu um erro ao atualizar as tarefas, tente recarregar a página.', {
                className: 'bg-black'
            })
        });
    }

    async function updateTask(_id: string, done?: boolean, title?: string) {
        const toUpdate : UpdateBody = {
            title: title,
            done: done
        }

        await axios.put(`http://localhost:8080/tasks/update/${_id}`, toUpdate).then(() => getTasks()).catch(() => {
            toast.error('Poxa! Ocorreu um erro ao atualizar a tarefa, tente novamente em alguns segundos...', {
                className: 'bg-black'
            })
        })
    }

    async function deleteTask(_id: string) {
        await axios.delete(`http://localhost:8080/tasks/delete/${_id}`).then(() => getTasks()).catch(() => {
            toast.error('Poxa! Ocorreu um erro ao deletar a tarefa, tente novamente em alguns segundos...', {
                className: 'bg-black'
            })
        })
    }

    return (
        <main className="relative w-screen h-screen flex flex-col bg-neutral-800">
            <ToastContainer/>
            <header className="relative w-full h-16 flex justify-between bg-neutral-900">
                <div id='buttons' className='m-4 w-1/3 flex flex-row relative justify-between'> 
                    <div>
                        {
                            displayNewTaskMenu ? 
                                <>
                                <div id='newTaskMenu' className={`w-full overflow-hidden h-8 bg-neutral-600 rounded-full flex justify-center items-center transition-all duration-300`}>
                                    <form className='flex flex-row w-full h-full' onSubmit={createTask}>
                                        <input autoFocus maxLength={100} minLength={3} translate='no' autoComplete='off' id="newTaskTitle" className={`w-full mx-4 h-full rounded-full resize-none bg-transparent outline-none placeholder-black text-white text-center p-1 ${comfortaa.className}`} placeholder='Digite o título...'/>
                                        <label htmlFor="createNewTask">
                                            <CheckCircleRoundedIcon className='text-white w-8 h-full transition-all hover:opacity-50 cursor-pointer rounded-full'/>
                                        </label>
                                        <input type='submit' id='createNewTask' className='hidden'/>
                                    </form>
                                </div>
                                </>

                            :
                            <>
                                <label htmlFor="add_task" className='btn'>
                                    <AddRoundedIcon/>
                                    <h3 className={`${comfortaa.className} text-sm`} onClick={() => setNewTaskMenuDisplayed(!displayNewTaskMenu)}>Adicionar tarefa</h3>
                                </label>
                                <input disabled type="button" id='add_task'/>
                            </> 
                                
                            
                        }
                        
                    </div>
                </div>
                

                <div className='relative w-full h-full flex flex-row justify-end items-center'>
                    <div className='btn'>
                        <input type="checkbox" id="filters" className="hidden"/>
                        <label htmlFor="filters" className={`${comfortaa.className} text-sm select-none`}>
                            <FilterListRoundedIcon className="mx-2"/>
                            Filtros
                        </label>
                        <div id="filters_panel" className='hidden absolute top-14 z-10 w-24 h-28 bg-neutral-600 rounded flex items-center justify-center overflow-hidden'>
                            <form  className={`${comfortaa.className} text-sm w-full flex flex-col justify-center items-center`}>
                                <input type="radio" name="filter" id="filters_all" onClick={() => setCurrentFilter('all')} defaultChecked className="hidden"/>
                                <label htmlFor="filters_all">Todos</label>
                                <input type="radio" name="filter" id="filters_pending" onClick={() => setCurrentFilter('pending')} className="hidden"/>
                                <label htmlFor="filters_pending">Pendente</label>
                                <input type="radio" name="filter" id="filters_done" onClick={() => setCurrentFilter('done')} className="hidden"/>
                                <label htmlFor="filters_done">Feito</label>
                            </form>
                        </div>
                    </div>
                    <div className='w-42 h-1/2 bg-neutral-700 m-4 flex flex-row rounded-full'>
                        <form onSubmit={(ev) => filterTasks(ev)} className='w-full h-full flex flex-row'>
                            <input id='search' type='text' autoComplete='off' placeholder='Pesquise tarefas...' className={`mx-1 w-3/4 px-2 h-full bg-transparent outline-none text-md text-white ${comfortaa.className}`}/>
                            <label htmlFor="submit_search" className='btn w-1/4 rounded-full'>
                                <SearchRoundedIcon/>
                            </label>
                            <input type="button" id='submit_search'/>
                        </form>
                    </div>
                </div>
            </header>

            <section id='tasks_panel' className='relative flex flex-row flex-wrap w-full h-full overflow-y-auto justify-center'>
                {tasksElements.length !== 0 ? tasksElements 
                :
                <div className='text-white w-full h-full flex items-center justify-center'>
                    <h6 className={`${questrial.className} text-2xl opacity-30`}>{currentFilter === 'default' ? "Tudo está tão quieto..." : "Nenhum resultado..."}</h6>
                </div>
                }    
            </section>
            <footer className='px-4 w-screen h-6 bg-black text-white flex flex-row justify-between items-center bottom-0 text-center'>
                <h6 className={`text-sm ${questrial.className}`}>Total: {tasksElements.length}</h6>
                <h6 className={`text-sm ${questrial.className}`}>Feitas: {tasks.filter((t: TaskBody) => t.done).length}</h6>
                <h6 className={`text-sm ${questrial.className}`}>Pendentes: {tasks.filter((t: TaskBody) => !t.done).length}</h6>
            </footer>
        </main>
    )
}
