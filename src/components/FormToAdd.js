import React, {useEffect, useState} from 'react';
import styles from "./FormToAdd.module.css";
import randomGifts from "../randomGifts";
import api from "../service/api";

const FormToAdd = ({setShowForm, edit, gift, setEdit}) => {

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

  const handleClick = async () => {
    let newName = giftName.trim()

    let giftsLocalStorage = await api.getGifts()

    const gift = {
      id: Date.now(),
      name: newName,
      namePerson,
      quantity,
      img: imgUrl
    }

    if (newName.length > 0 && !giftsLocalStorage.some(gift => gift.name === newName)) {
      api.postGifts([...giftsLocalStorage, gift])
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
    setGiftName('')
    setImgUrl('')
    setQuantity(1)
    setShowForm(false)
    setEdit(false)
  }

  const handleRandom = () => {
   const randomGift = randomGifts[Math.floor(Math.random() * randomGifts.length)]
    setGiftName(randomGift.name)
    setNamePerson(randomGift.namePerson)
    setImgUrl(randomGift.img)
    setQuantity(randomGift.quantity)
  }

  const handleCancel = event => {
    setShowForm(lastState => !lastState)
    setGiftName('')
    setImgUrl('')
    setQuantity(1)
    setShowForm(false)
    setEdit(false)
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
      <button
        onClick={handleRandom}
        className="mainButton"
      >
        Regalo Aleatorio
      </button>
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
          <button className="mainButton" onClick={handleEdit}>Editar</button>
          :
          <button className="mainButton" onClick={handleClick}>Agregar</button>
        }
        <button
          onClick={handleCancel}
          className="deleteButton"
          type="button"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormToAdd;
