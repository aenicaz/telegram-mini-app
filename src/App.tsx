import React, { useState, useEffect } from 'react';
import './styles/ContractForm.css';

type RoomType = 'Одноместный' | 'Двухместный' | 'Семейный' | 'Люкс';
const ContractForm: React.FC = () => {
  const [formData, setFormData] = useState({
    DogNumber: '1',
    DogDateFrom: '',
    Zakazchik: '',
    Email: '',
    Phone: '',
    Address: '',
    Guests: '',
    Children: 0,
    RoomType: '' as RoomType,
    CheckIn: '',
    CheckOut: '',
    Days: 0,
    RoomQuantity: 1,
    PricePerNight: 0,
    TotalPrice: 0,
    RoomDescription: '',
    TotalPriceInText: '',
  });

  const MIN_DAYS = 1;
  const MIN_ROOMS = 1;
  const MIN_GUESTS = 1;
  const MIN_CHILDRENS = 0;

  const roomPrices: Record<RoomType, number> = {
    Одноместный: 100,
    Двухместный: 150,
    Семейный: 200,
    Люкс: 300,
  };

  const roomDescription: Record<RoomType, string> = {
    Одноместный: "Одноместный номер идеально подходит для одиночных путешественников или командировок. Уютное пространство с одной кроватью, рабочим столом и всем необходимым для комфортного отдыха. В номере есть ванная комната, телевизор и доступ к Wi-Fi, что делает его отличным выбором для тех, кто ценит комфорт и уединение.",
    Двухместный: "Двухместный номер — это идеальный вариант для пар или друзей, путешествующих вместе. Номер оборудован двумя отдельными кроватями или одной большой кроватью, а также уютной зоной для отдыха. В номере есть ванная комната, телевизор и бесплатный Wi-Fi, что обеспечивает комфорт и удобство во время вашего пребывания.",
    Семейный: "Семейный номер создан для комфортного проживания с детьми или группой друзей. Просторный номер включает в себя несколько спальных мест, а также удобную зону для отдыха и семейных встреч. В номере есть ванная комната, телевизор и доступ к Wi-Fi, что делает его идеальным выбором для семейных поездок.",
    Люкс: "Люкс — это воплощение роскоши и комфорта. Этот номер предлагает просторную спальню с большой кроватью, отдельную гостиную зону и высококачественную отделку. В люксе есть ванная комната с ванной и душем, телевизор, мини-бар и бесплатный Wi-Fi. Идеальный выбор для тех, кто хочет насладиться максимальным комфортом и эксклюзивным обслуживанием во время своего пребывания.",
  };

  const [emailError, setEmailError] = useState<string>('');
  const [differenceInDays, setDifferenceInDays] = useState<number | null>(null);

  function getDateDifference(date1: Date, date2: Date): number {
    // Получаем разницу в миллисекундах
    const differenceInTime: number = date2.getTime() - date1.getTime();

    // Преобразуем миллисекунды в дни
    const differenceInDays: number = Math.floor(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays;
  }

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const price = roomPrices[formData.RoomType as RoomType] || 0; // Приводим к типу RoomType
    const description = roomDescription[formData.RoomType as RoomType] || "";
    setFormData((prevData) => ({
      ...prevData,
      PricePerNight: price,
      TotalPrice: price * prevData.Days * prevData.RoomQuantity,
      DogDateFrom: formattedDate,
      RoomDescription: description
    }));
  }, [formData.RoomType, formData.Days, formData.RoomQuantity, formData.RoomDescription]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Здесь можно добавить логику для отправки данных на сервер
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Проверка на корректность email
    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Регулярное выражение для проверки email
      if (!emailPattern.test(value)) {
        setEmailError('Введите корректный email'); // Устанавливаем сообщение об ошибке
      } else {
        setEmailError(''); // Сбрасываем сообщение об ошибке
      }
    }

    console.log(name)
    if (name === 'CheckIn' || name === 'CheckOut') {
      const checkInDate = new Date(name === 'CheckIn' ? value : formData.CheckIn);
      const checkOutDate = new Date(name === 'CheckOut' ? value : formData.CheckOut);
      // Проверяем, что обе даты заданы
      if (checkInDate && checkOutDate) {
        const difference = getDateDifference(checkInDate, checkOutDate);
        setFormData((prevData) => ({
          ...prevData,
          Days: difference, // Записываем разницу в Days
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          Days: 0, // Сбрасываем Days, если одна из дат не задана
        }));
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contract-form">
      <div>
        <label>
          Договор №: {formData.DogNumber} от {formData.DogDateFrom}
        </label>
      </div>
      <div>
        <label>
          ФИО клиента:
          <input
            type="text"
            name="Zakazchik"
            value={formData.Zakazchik}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Телефон:
          <input
            type="tel"
            name="Phone"
            value={formData.Phone}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Прописка как в паспорте:
          <input
            type="text"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Количество гостей:
          <input
            type="number"
            name="Guests"
            value={formData.Guests}
            onChange={handleChange}
            min={MIN_GUESTS}
          />
        </label>
      </div>
      <div>
        <label>
          Количество детей:
          <input
            type="number"
            name="Children"
            value={formData.Children}
            onChange={handleChange}
            min={MIN_CHILDRENS}
          />
        </label>
      </div>
      <div>
        <label>
          Тип номера:
          <select
            name="RoomType"
            value={formData.RoomType}
            onChange={handleChange}
            required
          >
            <option value="">Выберите тип номера</option>
            <option value="Одноместный">Одноместный</option>
            <option value="Двухместный">Двухместный</option>
            <option value="Семейный">Семейный</option>
            <option value="Люкс">Люкс</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Дата заезда:
          <input
            type="date"
            name="CheckIn"
            value={formData.CheckIn}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Дата выезда:
          <input
            type="date"
            name="CheckOut"
            value={formData.CheckOut}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Количество дней:
          <input
            type="number"
            name="Days"
            value={formData.Days}
            onChange={handleChange}
            min={MIN_DAYS}
            readOnly
          />
        </label>
      </div>
      <div>
        <label>
          Количество комнат:
          <input
            type="number"
            name="RoomQuantity"
            value={formData.RoomQuantity}
            onChange={handleChange}
            min={MIN_ROOMS}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Цена за ночь:
          <input
            name="PricePerNight"
            value={formData.PricePerNight}
            readOnly
          />
        </label>
      </div>
      <div>
        <label>
          Общая цена:
          <input
            name="TotalPrice"
            value={formData.TotalPrice}
            readOnly
          />
        </label>
      </div>
      <div>
        <label>
          Описание номера:
          <textarea
            name="RoomDescription"
            value={formData.RoomDescription}
            onChange={handleChange}
            readOnly
          />
        </label>
      </div>
      <button type="submit">Подтвердить</button>
    </form>
  );
};

export default ContractForm;
