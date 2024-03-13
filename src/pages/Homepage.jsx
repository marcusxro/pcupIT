import React, { useState, useEffect } from 'react'
import Table from '../comp/Table'
import AddData from '../comp/AddData'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
    return (
        <div className='homepageCon'>
            <div className="upperContent">
                <h1>IT Equipment <span>{data.length}</span></h1>
                <div className="searchBar">
                    <input className='search' type="text" placeholder='Enter name to search 🔍' value={query} onChange={(e) => { setQuery(e.target.value) }} />
                </div>
                <div className="nav" onClick={() => {nav('/toPrint')}}>
                    Go to print
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