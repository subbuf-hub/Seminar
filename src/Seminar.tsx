import SeminarModel  from './models/Seminar';
import './Seminar.css';
import NoImg from './imgs/nophoto.png';

// Определение интерфейса SeminarProps
interface SeminarProps {
    seminar: SeminarModel ; 
    onDelete: (id: number) => void;
    onEdit:(seminar: SeminarModel)=>void;
}

const Seminar: React.FC<SeminarProps> = ({ seminar, onEdit, onDelete }) => {

    //если в seminar.photo не рабочаяя ссылк => заменяем картинку
    const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
        event.currentTarget.src= NoImg; 
    };

    //удаление записи
    const handleDelete = () => {
        const confirmation = window.confirm("Вы уверены, что хотите удалить семинар?");
           if (confirmation) {
               fetch(`http://localhost:3000/seminars/${seminar.id}`, {
                   method: 'DELETE',
               })
               .then(response => {
                   if (response.ok) {
                       alert("Семинар успешно удален.");
                       onDelete(seminar.id); // Удаление семинара из списка
                   } else {
                       alert("Ошибка при удалении семинара. Попробуйте снова.");
                   }
               })
               .catch(error => {
                   console.error('Ошибка:', error);
                   alert("Произошла ошибка. Попробуйте снова.");
               });
           }
    };

    return (
        <div className='card col-12 col-sm-6 col-md-4 col-lg-3 position-relative' style={{height: "580px"}}>
            <img src={seminar.photo} className="card-img-top seminar-photo" alt={`Фото семинара: ${seminar.title}`} onError={handleError} />
            <h3 className="card-title">{seminar.title}</h3>
          
            <div className='seminar_desc' >{seminar.description}</div>
           
            <div className="mb-3">
                <label htmlFor="dateseminar" className="form-label">Дата проведения:</label>
                <span id="dateseminar" className="card-text">
                    <b>{" "+seminar.date.toString()}</b>
                </span>
            </div>
            <div className="mb-3">
                <label htmlFor="timeseminar" className="form-label"> Начало:</label>
                <span id="timeseminar" className="card-text">
                   <b>{" "+seminar.time}</b>
                </span>
            </div>
            {seminar.location && (
                        <div className="mb-3">
                           <label htmlFor="locationseminar" className="form-label">
                            Место: 
                            </label>
                           <span id="locationseminar" className="card-text">
                                <b>{" "+seminar.location}</b>
                           </span>
                        </div>)
            }
    <div className="position-absolute bottom-0 start-0 p-2">
        <button className='btn btn-primary' onClick={() => onEdit(seminar)}>Изменить</button>
    </div>
    
    <div className="position-absolute bottom-0 end-0 p-2">
        <button className='btn btn-danger' onClick={handleDelete}>Удалить</button>
    </div>
</div>
    );
}

 
export default Seminar;