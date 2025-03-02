import React, { useState } from 'react';

const App: React.FC = () => {
  const [name, setName] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    if (name) {
      alert(`Вы ввели имя: ${name}`);
      // Здесь можно отправить данные на сервер или выполнить другие действия
    } else {
      alert('Пожалуйста, введите имя.');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Введите ваше имя</h1>
      <input
        type="text"
        value={name}
        onChange={handleInputChange}
        placeholder="Ваше имя"
        style={styles.input}
      />
      <button onClick={handleSubmit} style={styles.button}>
        Подтвердить
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    width: '200px',
  },
  button: {
    padding: '10px 20px',
  },
};

export default App;
