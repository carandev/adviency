import React, {useEffect, useState} from 'react';
import styles from "./FormToAdd.module.css";

const FormToAdd = ({setShowForm, edit, gift}) => {

  const [giftName, setGiftName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [imgUrl, setImgUrl] = useState('')
  const [namePerson, setNamePerson] = useState('')

  useEffect(() => {
    if (edit) {
      setGiftName(gift.name)
      setQuantity(gift.quantity)
      setImgUrl(gift.img)
      setNamePerson(gift.namePerson)
    }

  }, [edit, gift])

  const handleChange = (event) => {
    const {value, name} = event.target
    if (name === 'giftName') {
      setGiftName(value)
    } else if (name === 'quantity') {
      setQuantity(value)
    } else if (name === 'imgUrl') {
      setImgUrl(value)
    } else {
      setNamePerson(value)
    }
  }

  const handleClick = () => {
    let newName = giftName.trim()

    const giftsLocalStorage = JSON.parse(localStorage.getItem('gifts'))

    const gift = {
      id: Date.now(),
      name: newName,
      namePerson,
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

  const handleEdit = () => {
    const temporalGifts = JSON.parse(localStorage.getItem('gifts'))

    temporalGifts.forEach(giftNew => {
      if (giftNew.id === gift.id) {
        giftNew.name = giftName
        giftNew.namePerson = namePerson
        giftNew.quantity = quantity
        giftNew.img = imgUrl
      }
    })

    localStorage.setItem('gifts', JSON.stringify(temporalGifts))
    setShowForm(false)
  }

  const handleRandom = () => {
      
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
        autoFocus
      />
      <button onClick={handleRandom}>random</button>
      <input
        type="text"
        name="imgUrl"
        value={imgUrl}
        onChange={handleChange}
        className={styles.mainInput}
        placeholder="URL de la imagen"
      />
      <input
        type="text"
        name="namePerson"
        value={namePerson}
        onChange={handleChange}
        className={styles.mainInput}
        placeholder="¿Para quién?"
      />
      <input
        type="number"
        name="quantity"
        className={styles.mainInputNumber}
        value={quantity}
        onChange={handleChange}
      />
      <div>
        {edit ?
          <button className={styles.mainButton} onClick={handleEdit}>Editar</button>
          :
          <button className={styles.mainButton} onClick={handleClick}>Agregar</button>
        }
        <button
          onClick={event => {setShowForm(lastState => !lastState)}}
          className={styles.mainButton}
          type="button"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormToAdd;
