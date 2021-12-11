import styles from './App.module.css';
import {useEffect, useState} from "react";
import FormToAdd from "./components/FormToAdd";

function App() {

  let [gifts, setGifts] = useState([])
  let [showForm, setShowForm] = useState(false)

  useEffect(() => {
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

  return (
    <main className={styles.main}>
      {showForm && <>
        <div className={styles.mainShadow}> </div>
        <FormToAdd setShowForm={setShowForm}/>
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
