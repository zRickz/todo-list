import React, { FC } from 'react';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import TimeConverter from '../utils/time_converter';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import { useState, useEffect } from 'react';

interface TaskProps {
  title: string;
  done: boolean;
  created_at: Date;
  fontsClass: Array<string>;
  onDone: Function;
  onDelete: Function;
  _id: string;
}

const Task: FC<TaskProps> = ({ title, done, created_at, fontsClass, onDone, onDelete, _id }) => {
    const [editPanelDisplayed, setEditPanelDisplayed] = useState(false)
    useEffect(() => {
        if (done) {
            setEditPanelDisplayed(false)
        }
    }, [done])

    async function Check(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if(!editPanelDisplayed) {
            await onDone(_id, done=true)
        }else{
            const new_title = document.querySelector(`#new_title_${_id}`)
            // @ts-ignore
            if (new_title.value.replace(' ', '') === ''){
                return setEditPanelDisplayed(false)
            };
            // @ts-ignore
            await onDone(_id, done=done, title=new_title.value)
            setEditPanelDisplayed(false)
        }
    }

    return (
        <div data-done={done} data-title={title} className='task relative w-64 my-2 mx-2 h-64 bg-neutral-300 rounded shadow-md shadow-black cursor-pointer transition-all duration-500 hover:scale-105'>
                        <div className='w-full h-max flex row items-center'>
                            <div className={`rounded-full w-4 h-4 ${done ? 'bg-green-600' : 'bg-red-600'} m-2`}></div>
                            <h3 className={`${fontsClass[0]} mt-1 text-sm text-gray-500`}><b>{done ? 'Feito' : 'Pendente'}</b></h3>
                            {
                                done ? null : 
                                <div role='button' onClick={() => setEditPanelDisplayed(true)}>
                                    { editPanelDisplayed? null : 
                                    <BorderColorRoundedIcon className='text-neutral-900 absolute right-2 top-2 w-4 h-4 opacity-0 transition-all duration-300 hover:text-blue-600'/>
                                    }
                                </div>
                                }
                            </div>
                        <div className='w-full h-full max-h-36 text-center break-words text-ellipsis overflow-hidden hover:overflow-auto'>
                            {
                                editPanelDisplayed ? 
                                    <div className='h-28 m-4'>
                                        <textarea id={`new_title_${_id}`} autoFocus className={`${fontsClass[1]} text-center w-full h-full text-2xl outline-none bg-transparent resize-none`}></textarea>
                                    </div>

                                : <h1 className={`${fontsClass[1]} text-neutral-700 text-2xl m-4`}>{title}</h1>
                            }
                            
                        </div>
                        <div className='absolute flex flex-row bottom-0 w-full'>
                            {done ? null : 
                                <h6 className={`relative s${fontsClass[0]} text-gray-500 text-xs m-2 w-1/2`}>Criado em: {`${TimeConverter(created_at)}`}</h6>
                            }
                            <div className={`btns h-14 flex flex-row rounded items-center ${editPanelDisplayed ? 'p-1 justify-end' : 'justify-center'} ${done ? 'w-full' : 'w-1/2'}`}>
                                { editPanelDisplayed ? null :
                                    <div role='button' onClick={async () => await onDelete(_id)} className='relative w-11 h-11 bg-neutral-900 rounded-full m-1 hover:bg-red-500 duration-300 transition-all flex justify-center items-center'>
                                        <DeleteOutlineRoundedIcon className='text-white'/>
                                    </div>
                                }
                                {done ? null : (
                                    <div role='button' onClick={async (ev) => Check(ev)} className='relative w-11 h-11 bg-neutral-900 rounded-full m-1 hover:bg-green-700 duration-300 transition-all flex justify-center items-center'>
                                        {
                                            !editPanelDisplayed ? <CheckRoundedIcon className='text-white'/> : <SaveAsRoundedIcon className='text-white'/>
                                        }
                                        
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
  );
};

export default Task;
