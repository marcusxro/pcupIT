import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { Auth } from '../Auth'


const ShowData = () => {
    const dataFromArray = useSelector((state) => state.arrayReducer.value)
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        axios.get('https://pcupitserver.onrender.com/GetData')
            .then((res) => {
                const filtered = res.data.filter((item) => dataFromArray.includes(item._id))
                setFilteredData(filtered)
            }).catch((err) => {
                console.log(err)
            })
    }, [filteredData])
    const nav = useNavigate()
    useEffect(() => {
        const unsub = onAuthStateChanged(Auth, (acc) => {
            if (!acc) {
                nav("/")
            } else {
                nav('/toPrint')
            }
        })
        return () => { unsub() }
    }, [])
    return (
        <div className='showData'>
            {dataFromArray.length === 0 ? "No data" : ""}
            {filteredData.map((item) => (
                <div className="showDataItem" key={item._id}>
                    <table>
                        <thead>
                            <tr>
                                <th>Received From</th>
                                <th>Department</th>
                                <th>Inventory Tag No.</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Actual End User</th>
                            </tr>
                        </thead>
                        <tbody className='dataBody'>
                            {filteredData.map((item) => (
                                <tr key={item._id}>
                                    <td data-label="Received From">
                                        <div> {item.RecFrom} </div>
                                    </td>
                                    <td data-label="Department">
                                        <div> {item.Department} </div>
                                    </td>
                                    <td data-label="Inventory Tag No.">
                                        <div> {item.InvenTag} </div>
                                    </td>
                                    <td className='desc' data-label="Description">
                                        <div className='desc'> {item.Desc} </div>
                                    </td>
                                    <td className='desc' data-label="Status">
                                        <div className='desc'> {item.Status} </div>
                                    </td>
                                    <td data-label="Quantity">
                                        <div> {item.Quantity} </div>
                                    </td>
                                    <td data-label="Unit">
                                        <div> {item.Unit} </div>
                                    </td>
                                    <td data-label="Amount">
                                        <div> {item.Amount} </div>
                                    </td>
                                    <td>{item.Date}</td>
                                    <td data-label="Actual End User">
                                        <div> {item.EndUser} </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    )
}

export default ShowData
