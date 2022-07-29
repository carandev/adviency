import {useEffect, useState} from "react";
import styles from './App.module.css';
import FormToAdd from "./components/FormToAdd.jsx";
import api from "./service/api"
import Gift from "./components/Gift.jsx";

function App() {

  const [gifts, setGifts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [edit, setEdit] = useState(false)
  const [gift, setGift] = useState({})
  const [loading, setLoading] = useState(true)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {

    if(!localStorage.getItem('gifts')) {
      api.postGifts([])
    }

    api.getGifts().then(newGifts => {
      setLoading(false)
      setGifts(newGifts)
    })

  }, [showForm])

  useEffect(() => {
    let sumPrice = 0
    gifts.forEach(currentGift => sumPrice += currentGift.price);

    setTotalPrice(sumPrice)
  })

  const handleDelete = (index) => {
    const newGifts = [...gifts]
    newGifts.splice(index, 1)

    localStorage.setItem('gifts', JSON.stringify(newGifts))
    api.getGifts().then(newGifts => {
      setGifts(newGifts)
    })
  }

  const deleteAll = () => {
    localStorage.setItem('gifts', JSON.stringify([]))
    api.getGifts().then(newGifts => {
      setGifts(newGifts)
    })
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
        <FormToAdd setShowForm={setShowForm} edit={edit} setEdit={setEdit} gift={gift}/>
      </>}
      {loading ? 'cargando' :
        <div className={styles.mainCard}>
          <h1 className={styles.mainH1}>Adviency</h1>
          <h3 className={styles.mainH3}>Lista de Regalos</h3>
          <button
            onClick={() => setShowForm((prevState => !prevState))}
            className="mainButton"
          >
            Añadir Regalo
          </button>
          {gifts.length !== 0 && <ul className={styles.mainUl}>
            {gifts.map((gift, index) => (
              <Gift
                key={index}
                gift={gift}
                index={index}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </ul>}
          {
            totalPrice !== 0 && <p>Total: ${totalPrice}</p>
          }
          {gifts.length === 0 && (
            <p className={styles.mainP}>No seas tacaño, regala algo!!</p>
          )}
          <button
            onClick={deleteAll}
            className="deleteButton"
          >
            Borrar lista
          </button>

      </div>
      }
    </main>
  );
}

export default App;

