import React, { useState, useEffect } from 'react'
import Table from '../comp/Table'
import AddData from '../comp/AddData'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { Auth } from '../Auth'

const Homepage = () => {
    const [showModal, setShowModal] = useState(false)

    const showModalFunc = () => {
        setShowModal(!showModal)
    }
    const [query, setQuery] = useState('')
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('https://pcupitserver.onrender.com/GetData')
            .then((res) => {
                setData(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [data])



    const nav = useNavigate()

    useEffect(() => {
        const unsub = onAuthStateChanged(Auth, (acc) => {
            if (!acc) {
                nav("/")
            } else {
                nav('/System')
            }
        })
        return () => { unsub() }
    }, [])


    const signOutAcc = () => {
        signOut(Auth)
        .then(() => {
            console.log("Signed out")
            nav('/')
        }).catch((err) => {
            console.log()
        })
    }

    return (
        <div className='homepageCon'>
            <div className="upperContent">
                <h1>PCUP Inventory <span>{data.length}</span></h1>
                <div className="searchBar">
                    <input className='search' type="text" placeholder='Enter name to search 🔍' value={query} onChange={(e) => { setQuery(e.target.value) }} />
                </div>

                <div className="upperNav">
                    <div className="nav" onClick={() => { nav('/toPrint') }}>
                        Go to print
                    </div>
                    <div className="logOut" onClick={signOutAcc}>
                        Sign out
                    </div>
                </div>

            </div>
            <Table data={query} />
            {showModal === true ? <AddData /> : <></>}
            <div className="bottomNav">
                <button className={`btn ${showModal ? 'activeBtn' : ''}`} onClick={showModalFunc}>{showModal ? "Close Modal" : "Add Data"}</button>
            </div>
        </div>
    )
}

export default Homepage