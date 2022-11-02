import React, { useEffect, useState } from 'react'

import randomGifts from '../randomGifts'
import api from '../service/api'

import styles from './FormToAdd.module.css'

const FormToAdd = ({ setShowForm, edit, gift, setEdit, duplicate }) => {
  const [giftName, setGiftName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [imgUrl, setImgUrl] = useState('')
  const [namePerson, setNamePerson] = useState('')
  const [price, setPrice] = useState(0)

  useEffect(() => {
    if (edit || duplicate) {
      setGiftName(gift.name)
      setQuantity(gift.quantity)
      setImgUrl(gift.img)
      setPrice(gift.price)
      setNamePerson(gift.namePerson)
    }
  }, [edit, gift, duplicate])

  const handleChange = event => {
    const { value, name } = event.target

    if (name === 'giftName') {
      setGiftName(value)
    } else if (name === 'quantity') {
      setQuantity(value)
    } else if (name === 'imgUrl') {
      setImgUrl(value)
    } else if (name === 'namePerson') {
      setNamePerson(value)
    } else {
      setPrice(value)
    }
  }

  const handleClick = async () => {
    const newName = giftName.trim()

    const giftsLocalStorage = await api.getGifts()

    const gift = {
      id: Date.now(),
      name: newName,
      namePerson,
      quantity,
      price: price * quantity,
      img: imgUrl
    }

    if (newName.length > 0 && !giftsLocalStorage.some(gift => gift.name === newName)) {
      api.postGifts([...giftsLocalStorage, gift])
      setGiftName('')
      setImgUrl('')
      setPrice(0)
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
        giftNew.price = price * quantity
        giftNew.img = imgUrl
      }
    })

    localStorage.setItem('gifts', JSON.stringify(temporalGifts))
    setGiftName('')
    setImgUrl('')
    setPrice(0)
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
    setPrice(randomGift.price)
  }

  const handleCancel = () => {
    setShowForm(lastState => !lastState)
    setGiftName('')
    setImgUrl('')
    setQuantity(1)
    setPrice(0)
    setShowForm(false)
    setEdit(false)
  }

  return (
    <form className={styles.mainForm} onSubmit={handleSubmit}>
      <input
        autoFocus
        className={styles.mainInput}
        name="giftName"
        placeholder="Nombre del regalo"
        type="text"
        value={giftName}
        onChange={handleChange}
      />
      <button
        className="mainButton"
        onClick={handleRandom}
      >
        Regalo Aleatorio
      </button>
      <input
        className={styles.mainInput}
        name="imgUrl"
        placeholder="URL de la imagen"
        type="text"
        value={imgUrl}
        onChange={handleChange}
      />
      <input
        className={styles.mainInput}
        name="price"
        placeholder="Precio por unidad"
        type="number"
        value={price}
        onChange={handleChange}
      />
      <input
        className={styles.mainInput}
        name="namePerson"
        placeholder="¿Para quién?"
        type="text"
        value={namePerson}
        onChange={handleChange}
      />
      <input
        className={styles.mainInputNumber}
        name="quantity"
        type="number"
        value={quantity}
        onChange={handleChange}
      />
      <div>
        {edit
          ? <button className="mainButton" onClick={handleEdit}>Editar</button>
          : <button className="mainButton" onClick={handleClick}>Agregar</button>
        }
        <button
          className="deleteButton"
          type="button"
          onClick={handleCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default FormToAdd
