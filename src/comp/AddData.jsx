import React, { useState } from 'react'
import axios from 'axios'
const AddData = () => {
    const [Rec, setRec] = useState('')
    const [IntTag, setInven] = useState('')
    const [Desc, setDesc] = useState('')
    const [Quan, setQuan] = useState(0)
    const [Unit, setUnit] = useState('')
    const [Depart, setDepart] = useState('')
    const [Amount, setAmount] = useState(0)
    const [EndUser, setEndUser] = useState('')

    const sendData = () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        axios.post('http://localhost:8080/sendData', {
            RecFrom: Rec,
            Department: Depart,
            InvenTag: IntTag,
            Quantity: Quan,
            Desc: Desc,
            Unit: Unit,
            Amount: Amount,
            EndUser: EndUser,
            Date: formattedDate
        }).then(() => {
            console.log("data sent!")
            setRec('')
            setInven('')
            setQuan('')
            setDepart('')
            setDesc('')
            setUnit('')
            setAmount('')
            setEndUser('')
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className='addDataCon'>
            <div className="addDataContent">
                <table>
                    <thead>
                        <tr>
                            <th>Received From</th>
                            <th>Department</th>
                            <th>Inventory Tag No.</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Amount</th>
                            <th>Actual End User</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="Received From">
                                <input type="text" placeholder="Enter Received From" value={Rec} onChange={(e) => { setRec(e.target.value) }} />
                            </td>
                            <td data-label="Department">
                                <input type="text" placeholder="Enter Department" value={Depart} onChange={(e) => { setDepart(e.target.value) }} />
                            </td>
                            <td data-label="Inventory Tag No.">
                                <input type="text" placeholder="Enter Inventory Tag No." value={IntTag} onChange={(e) => { setInven(e.target.value) }} />
                            </td>
                            <td data-label="Description">
                                <input type="text" placeholder="Enter Description" value={Desc} onChange={(e) => { setDesc(e.target.value) }} />
                            </td>
                            <td data-label="Quantity">
                                <input type="number" placeholder="Enter Quantity" value={Quan} onChange={(e) => { setQuan(e.target.value) }} />
                            </td>
                            <td data-label="Unit">
                                <input type="text" placeholder="Enter Unit" value={Unit} onChange={(e) => { setUnit(e.target.value) }} />
                            </td>
                            <td data-label="Amount">
                                <input type="number" placeholder="Enter Amount" value={Amount} onChange={(e) => { setAmount(e.target.value) }} />
                            </td>
                            <td data-label="Actual End User">
                                <input type="text" placeholder="Enter Actual End User" value={EndUser} onChange={(e) => { setEndUser(e.target.value) }} />
                            </td>
                        </tr>

                    </tbody>
                </table>
                <div className="SendCon">
                    <button className='Send' onClick={() => { sendData() }}>SEND DATA</button>
                </div>
            </div>
        </div>
    )
}

export default AddData