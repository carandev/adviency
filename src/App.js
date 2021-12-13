import styles from './App.module.css';
import {useEffect, useState} from "react";
import FormToAdd from "./components/FormToAdd";

function App() {

  const [gifts, setGifts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [edit, setEdit] = useState(false)
  const [gift, setGift] = useState({})

  useEffect(() => {

    if(!localStorage.getItem('gifts')) {
      localStorage.setItem('gifts', JSON.stringify([]))
    }

    getGifts()

  }, [showForm])

  const getGifts = () => {
    setGifts(JSON.parse(localStorage.getItem('gifts')))
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

  const handleEdit = index => {
    setGift(gifts[index])
    setEdit(true)
    setShowForm(true)
  }

  return (
    <main className={styles.main}>
      {showForm && <>
        <div className={styles.mainShadow}> </div>
        <FormToAdd setShowForm={setShowForm} edit={edit} gift={gift}/>
      </>}
        <div className={styles.mainCard}>
          <h1 className={styles.mainH1}>Adviency</h1>
          <h3 className={styles.mainH3}>Lista de Regalos</h3>
          <button
            onClick={() => setShowForm((prevState => !prevState))}
            className={styles.mainButton}
          >
            Añadir Regalo
          </button>
          {gifts.length !== 0 && <ul className={styles.mainUl}>
            {gifts.map((gift, index) => (
              <li key={gift.id} className={styles.mainLi}>
                <div className={styles.liContainerData}>
                  <img
                    src={gift.img}
                    alt="Product"
                    className={styles.mainImg}
                  />
                  <span>
                    <p>{gift.name} x{gift.quantity}</p>
                    <small>Para: {gift.namePerson}</small>
                  </span>
                </div>
                <div>
                  <button
                    className={styles.mainButton}
                    onClick={() => handleEdit(index)}
                  >
                    E
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(index)}
                  >
                    X
                  </button>
                </div>
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
