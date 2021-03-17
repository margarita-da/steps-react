import React, {useState,useCallback} from 'react'

function Form() {
    const [training, setTraining]= useState([])
    const [input, setInput]= useState('')
    
    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault()
            let result = training.findIndex(item => item.id === input.id);
            if(result > -1) {
                let newTraining = training
                newTraining[result] = input
                setTraining(newTraining)
            }
            else{
                setTraining(prevState=>([...prevState, {...input,id:new Date().getMilliseconds()}]))
            }
            setInput('')
        
        },
        [input,training],
    ) 
    const handleDateChange = e => {
        setInput({ ...input, [e.target.name]: e.target.value });

    }
    const handleRemove = e => {
        let idList = e.target.dataset.id
        let newTraining = training.filter(item => item.id !== +idList)
        setTraining(newTraining)
    }
    const handleEdit = e => {
        let idList = e.target.dataset.id;
        let editLine = training.filter(item => item.id === +idList)
        setInput(editLine[0])
    }
    return (
        <div className="wrapper">
            <div className="line title">
                <div className="block">Дата(ДД.ММ.ГГ)</div>
                <div className="block">Пройдено км</div>
            </div>
            <form className="line" onSubmit={handleSubmit}>
                <input className="block form-area" name="date" type="text" onChange={handleDateChange} value={input.date? input.date: ''} />
                <input className="block form-area" type="text" name="distance" onChange={handleDateChange} value={input.distance? input.distance: ''}/>
                <button className="block-m form-area" >ok</button>
            </form>
            <div className={training.length>0 ? "line title" : "dnone"}>
                <div className="block">Дата(ДД.ММ.ГГ)</div>
                <div className="block">Пройдено км</div>
                <div className="block-m">Действия</div>
            </div>
            <div className={training.length>0 ? "block-read" : "dnone"}>
            { training && training.map((item)=>(
                <div className="block-read__list">
                    <div className="line">
                        <div className="block block-read__elem" type="text">{item.date}</div>
                        <div className="block block-read__elem" type="text">{item.distance}</div>
                        <button className="block-read__elem" data-id={item.id} onClick={handleEdit}>Редакт.</button>
                        <button className="block-read__elem" data-id={item.id} onClick={handleRemove}>Удалить</button>
                    </div>
                </div>    

           ))}
            </div>
        </div>
    )
}


export default Form

