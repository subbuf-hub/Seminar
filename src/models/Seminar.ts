interface Seminar {
    id: number; //идентификатор
    title: string; // название
    description: string; // описание
    date: string; // дата проведения
    time: string; // время  налала
    location?: string; // локация
    photo: string; // фото
}

export default Seminar;