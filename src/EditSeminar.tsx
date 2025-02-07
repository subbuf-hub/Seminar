import Modal from 'react-modal';
import Seminar from './models/Seminar';
import { useState } from 'react';

interface EditSeminarProps {
    isOpen: boolean;
    onRequestClose:()=>void;
    seminar: Seminar,
    onUpdate:(seminar:Seminar)=>void;
    
  }
 
const EditSeminar :React.FC<EditSeminarProps> = ({isOpen, onRequestClose, seminar, onUpdate}) => {

    const [SeminarItem , setSeminar] = useState<Seminar>(seminar);

    //т.е. дата прихит в формате dd:mm:YYYY, преобразуем в YYYY-mm-dd
    const parseDate =(dateString: string): string => {
        if (dateString.toString().concat("."))
        {
            const [day, month, year] = dateString.toString().split('.');
            return `${year}-${month}-${day}`; 
        }
        else
        {
            return dateString;
        }
        
    }

    //обратное преобразования, а то может сервер не принять
    const parseDateBack =(dateString: string): string => {
        
        if (dateString.toString().concat("-"))
        {
            const [year, month, day] = dateString.toString().split('-');
            return `${day}.${month}.${year}`; 
        }
        else
        {
            return dateString;
        }
        
    }

    //Даем Modal головной элемент, а иначе много ошибок
    const appElement = document.getElementById('rootElForModal');

    if (!appElement) {
        console.error("Главный модуль не найден");
        return null; 
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
       const { name, value } = e.target;
       setSeminar({ ...SeminarItem, [name]: value });
    };

    const handleSubmit = () => {
        SeminarItem.date = parseDateBack( SeminarItem.date);
        onUpdate(SeminarItem);
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} appElement={appElement}>
           <h1>Редактировать семинар</h1>
           <form >
                    <div className="mb-3">
                        <label className="form-label">Название:</label>
                        <input type="text" className="form-control" name='title' defaultValue={seminar.title} onChange={handleInputChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Описание:</label>
                        <textarea className="form-control" name='description' defaultValue={seminar.description} onChange={handleInputChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Дата:</label>
                        <input type="date" className="form-control"  name='date' defaultValue={parseDate(seminar.date)}  onChange={handleInputChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Время:</label>
                        <input type="time" className="form-control" name='time' defaultValue={seminar.time} onChange={handleInputChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Локация:</label>
                        <input type="text" className="form-control" name='location' defaultValue={seminar.location} onChange={handleInputChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Фото URL:</label>
                        <input type="text" className="form-control" name='photo' defaultValue={seminar.photo} onChange={handleInputChange}/>
                    </div>
                    <div className="d-flex justify-content-between">
                    <button type="button" className='btn btn-success' onClick={handleSubmit} >Сохранить</button>
                    <button type="button" onClick={onRequestClose} className='btn btn-secondary'>Закрыть</button>
                       
                    </div>
                </form>
            </Modal>
    );
}
 
export default EditSeminar;