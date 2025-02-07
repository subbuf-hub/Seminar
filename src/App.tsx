import { useEffect, useState } from 'react'

import './App.css';
import Seminar from './models/Seminar';
import SeminarItem from './Seminar';
import EditSeminar from './EditSeminar';
import Modal from 'react-modal';



function App() {
const [seminars , setSeminars] = useState<Seminar[]>([]); //для списка семинаров
const [loading, setLoading] = useState(true);//пока список загружается
const [error, setError] = useState<Error | null>(null); //ошибка
const [isModalOpen, setModalOpen] = useState(false); //открытие модального окна
const [selectedSeminar, setSelectedSeminar] = useState<Seminar | null>(null); //для редактирования


//функция загрузки данных, можно через axios
const fetchSeminars = async () => {
  try {
      const response = await fetch('http://localhost:3000/seminars');
      if (!response.ok) {
          throw new Error('Что-то пошло не так');
      }
      const data: Seminar[] = await response.json();
      setSeminars(data);
  } catch (error) {
      setError(error as Error);
  } finally {
      setLoading(false);
  }
};

//при обновлении формы будем запрашивать данные
useEffect(() => {
  fetchSeminars();
}, []);

//удаляем позицию из seminars
const handleDeleteSeminar = (id: number) => {
  setSeminars(seminars.filter(seminar => seminar.id !== id));
};

//вызывае цепь действий при нажатии кнопки редактировать
const handleEditSeminar = (seminar: Seminar) => {
  Modal.setAppElement('#rootElForModal');
  setSelectedSeminar(seminar);
  setModalOpen(true);
};

//изменяем позицию из seminars
const handleupdateSeminar = (seminarUpd: Seminar) => {

  setSeminars((seminars) =>
    seminars.map((seminar) =>
      seminar.id === seminarUpd.id ? seminarUpd : seminar
    )
  );
  setSelectedSeminar(null);
  setModalOpen(false);
}

//закрываем модальное окно без изменений
const closeModal = () => {
  setModalOpen(false);
};

//пока не получили данные
if (loading) {
  return <div>Загрузка...</div>;
}

//получили ошибку
if (error) {
  return <div>Ошибка: {error.message}</div>;
}


  return (
    <div id="rootElForModal">
      <h1>Список семинаров</h1>
      
      <div className="row justify-content-center">
        {seminars.map(seminar => (
          <SeminarItem key={seminar.id} seminar={seminar} onDelete={handleDeleteSeminar} onEdit={handleEditSeminar}/>
        ))}
      </div>
      {selectedSeminar && (
        <EditSeminar
          isOpen={isModalOpen} onRequestClose={closeModal}  seminar={selectedSeminar} onUpdate={handleupdateSeminar}
        />
      )}
    </div>
  )
}

export default App
