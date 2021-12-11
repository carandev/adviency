import styles from './App.module.css';
import {useEffect, useState} from "react";

function App() {

  const localStorage = window.localStorage;

  let [gifts, setGifts] = useState([])
  let [giftName, setGiftName] = useState('')
  let [quantity, setQuantity] = useState(1)
  let [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    getGifts()
  }, [])

  const getGifts = () => {
    if (localStorage.getItem('gifts')) {
      setGifts(JSON.parse(localStorage.getItem('gifts')))
    }
  }

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

    const gift = {
      name: newName,
      quantity,
      img: imgUrl
    }

    if (newName.length > 0 && !gifts.some(gift => gift.name === newName)) {
      localStorage.setItem('gifts', JSON.stringify([...gifts, gift]))
      getGifts()
      setGiftName('')
      setImgUrl('')
      setQuantity(1)
    }

  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const handleDelete = (index) => {
    const newGifts = [...gifts]
    newGifts.splice(index, 1)

    localStorage.setItem('gifts', JSON.stringify(newGifts))
    getGifts()
  }

  const deleteAll = () => {
    localStorage.setItem('gifts', JSON.stringify([]))
    getGifts()
  }

  return (
    <main className={styles.main}>
      <div className={styles.mainCard}>
        <h1 className={styles.mainH1}>Adviency</h1>
        <h3 className={styles.mainH3}>Lista de Regalos</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="giftName"
            value={giftName}
            onChange={handleChange}
            className={styles.mainInput}
          />
          <input
            type="text"
            name="imgUrl"
            value={imgUrl}
            onChange={handleChange}
            className={styles.mainInput}
          />
          <input
            type="number"
            name="quantity"
            className={styles.mainInputNumber}
            value={quantity}
            onChange={handleChange}
          />
          <button
            onClick={handleClick}
            className={styles.mainButton}
          >
            Agregar
          </button>
        </form>
        {gifts.length !== 0 && <ul className={styles.mainUl}>
          {gifts.map((gift, index) => (
            <li className={styles.mainLi}>
              <div className={styles.liContainerImg}>
                <img
                  src={gift.img}
                  alt="Product image"
                  className={styles.mainImg}
                />
                {gift.name} x{gift.quantity}
              </div>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(index)}
              >
                X
              </button>
            </li>
          ))}
        </ul>}
        {gifts.length === 0 && (
          <p className={styles.mainP}>No seas tacaño, regala algo!!</p>
        )}
        <button
          onClick={deleteAll}
          className={styles.deleteButton}
        >
          Borrar lista
        </button>
      </div>
    </main>
  );
}

export default App;
