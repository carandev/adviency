import React, {useState} from 'react';
import styles from "./FormToAdd.module.css";

const FormToAdd = ({setShowForm}) => {

  let [giftName, setGiftName] = useState('')
  let [quantity, setQuantity] = useState(1)
  let [imgUrl, setImgUrl] = useState('')

  const handleChange = (event) => {
    const {value, name} = event.target
    if (name === 'giftName') {
      setGiftName(value)
    } else if (name === 'quantity') {
      setQuantity(value)
    } else if (name === 'imgUrl') {
      setImgUrl(value)
    }
  }

  const handleClick = () => {
    let newName = giftName.trim()

    const giftsLocalStorage = JSON.parse(localStorage.getItem('gifts'))

    const gift = {
      name: newName,
      quantity,
      img: imgUrl
    }

    if (newName.length > 0 && !giftsLocalStorage.some(gift => gift.name === newName)) {
      localStorage.setItem('gifts', JSON.stringify([...giftsLocalStorage, gift]))
      setGiftName('')
      setImgUrl('')
      setQuantity(1)
      setShowForm(false)
    }

  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className={styles.mainForm}>
      <input
        type="text"
        name="giftName"
        value={giftName}
        onChange={handleChange}
        className={styles.mainInput}
        placeholder="Nombre del regalo"
      />
      <input
        type="text"
        name="imgUrl"
        value={imgUrl}
        onChange={handleChange}
        className={styles.mainInput}
        placeholder="URL de la imagen"
      />
      <input
        type="number"
        name="quantity"
        className={styles.mainInputNumber}
        value={quantity}
        onChange={handleChange}
      />
      <div>
        <button
          onClick={handleClick}
          className={styles.mainButton}
        >
          Agregar
        </button>
        <button
          onClick={() => setShowForm(lastState => !lastState)}
          className={styles.mainButton}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormToAdd;
