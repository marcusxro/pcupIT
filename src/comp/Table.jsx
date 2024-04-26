import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { AddArray, DecArray } from '../redux/ArrayData'
import ShowData from '../pages/ShowData'



const Table = (query) => {
    const [data, setData] = useState([])
    const [Rec, setRec] = useState('')
    const [IntTag, setInven] = useState('')
    const [Desc, setDesc] = useState('')
    const [Quan, setQuan] = useState(0)
    const [Unit, setUnit] = useState('')
    const [Amount, setAmount] = useState(0)
    const [EndUser, setEndUser] = useState('')
    const [Depart, setDepart] = useState('')

    const [printIds, setPrintIds] = useState([]);
    const [loading, setLoading] = useState(false)
    const [StatusItem, setStats] = useState("")

    const arrayData = useSelector((item) => item.arrayReducer.value)
    useEffect(() => {
        console.log(printIds)
    }, [printIds])

    const dispatch = useDispatch()
    const setEdit = (item) => {
        setRec(item.RecFrom)
        setInven(item.InvenTag)
        setQuan(item.Quantity)
        setDesc(item.Desc)
        setUnit(item.Unit)
        setStats(item.Status)
        setDepart(item.Department)
        setAmount(item.Amount)
        setEndUser(item.EndUser)
    }
    useEffect(() => {
        axios.get('https://pcupitserver.onrender.com/GetData')
            .then((res) => {
                setData(res.data)
                setLoading(true)
            }).catch((err) => {
                console.log(err)
            })
    }, [data])

    const [isEdit, setIsEdit] = useState('')
    const [finalizedData, setFinalized] = useState([])

    useEffect(() => {
        const filteredData = data.filter(item => item.RecFrom.toLowerCase().includes(query.data.toLowerCase()))
        setFinalized(filteredData)
    }, [query, data])
    const [deleteItem, setDelete] = useState('')


    const deleteItemFromDb = (item) => {
        axios.delete(`https://pcupitserver.onrender.com/item/${item}`)
            .then((res) => {
                console.log("deleted")
            }).catch((err) => {
                console.log(err)
            })
    }

    const editItem = (item) => {
        axios.put(`https://pcupitserver.onrender.com/edit/${item}`, {
            RecFrom: Rec,
            InvenTag: IntTag,
            Quantity: Quan,
            Department: Depart,
            Status: StatusItem,
            Desc: Desc,
            Unit: Unit,
            Amount: Amount,
            EndUser: EndUser,
        }).then(() => {
            console.log("edited!")
        }).catch((err) => {
            console.log(err)
        })
    }
    const handleRemoveFromPrint = (itemId) => {
        dispatch(DecArray(itemId));
        setPrintIds(prevIds => prevIds.filter(id => id !== itemId));
    };


    const handleAddToPrint = (itemId) => {
        dispatch(AddArray([itemId]));
        setPrintIds(prevIds => [...new Set([...prevIds, itemId])]);
    };

    const calculateStatus = (text) => {
        switch (text) {
            case "Working":
                return "WorkingStatus"
            case "Disposal":
                return "DisposalStatus"
            case "Defective":
                return "DefectiveStatus"
        }
    }
    return (
        <div className='tableCon'>
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className='dataBody'>
                    {loading === true ? (
                        finalizedData.slice().reverse().map((item) => (
                            <tr key={item._id}>
                                <td className='recFromName' data-label="Received From">
                                    {isEdit === item._id ? <input className='isEdit' type='text' value={Rec} onChange={(e) => { setRec(e.target.value) }} /> : <div> {item.RecFrom} </div>}
                                </td>
                                <td data-label="Department">
                                    {isEdit === item._id ? <input className='isEdit' type='text' value={Depart} onChange={(e) => { setDepart(e.target.value) }} /> : <div> {item.Department} </div>}
                                </td>
                                <td data-label="Inventory Tag No.">
                                    {isEdit === item._id ? <input className='isEdit' type='text' value={IntTag} onChange={(e) => { setInven(e.target.value) }} /> : <div> {item.InvenTag} </div>}
                                </td>
                                <td data-label="Description">
                                    {isEdit === item._id ? <input className='isEdit' type='text' value={Desc} onChange={(e) => { setDesc(e.target.value) }} /> : <div className='desc'> {item.Desc} </div>}
                                </td>

                                <td className={`${calculateStatus(item.Status)}`} data-label={`Status ${calculateStatus(item.Status)}`}>
                                    {isEdit === item._id ?
                                        <select name="Status" id="" value={StatusItem ? StatusItem : item.Status} onChange={(e) => { setStats(e.target.value) }} >
                                            <option value="">Select Status</option>
                                            <option value="Defective">Defective</option>
                                            <option value="Working">Working</option>
                                            <option value="Disposal">Disposal</option>
                                        </select> : <div className='desc'> {item.Status ? item.Status : "No Status"} </div>}
                                </td>

                                <td data-label="Quantity">
                                    {isEdit === item._id ? <input className='isEdit' type='number' value={Quan} onChange={(e) => { setQuan(e.target.value) }} /> : <div> {item.Quantity} </div>}
                                </td>
                                <td data-label="Unit">
                                    {isEdit === item._id ? <input className='isEdit' type='text' value={Unit} onChange={(e) => { setUnit(e.target.value) }} /> : <div> {item.Unit} </div>}
                                </td>
                                <td data-label="Amount">
                                    {isEdit === item._id ? <input className='isEdit' type='number' value={Amount} onChange={(e) => { setAmount(e.target.value) }} /> : <div> {item.Amount} </div>}
                                </td>
                                <td><input type="date" name="" id="" value={item.Date} /></td>
                                <td data-label="Actual End User">
                                    {isEdit === item._id ? <input className='isEdit' type='text' value={EndUser} onChange={(e) => { setEndUser(e.target.value) }} /> : <div> {item.EndUser} </div>}
                                </td>
                                {isEdit === item._id ? (
                                    <div className="confirmCon">
                                        <button className='confirm' onClick={() => { setIsEdit(null); editItem(item._id) }}>Confirm</button>
                                        <button onClick={() => { setIsEdit(null) }}>Cancel</button>
                                    </div>
                                ) : deleteItem === item._id ? (
                                    <div className="confirmCon">
                                        <button onClick={() => { setDelete(null); deleteItemFromDb(item._id) }}>Confirm</button>
                                        <button onClick={() => { setDelete(null) }}>Cancel</button>
                                    </div>
                                ) :

                                    (
                                        <td className='actions'>
                                            <button onClick={() => { setIsEdit(item._id); setEdit(item) }}>Edit</button>
                                            <button onClick={() => { setDelete(item._id) }}>Delete</button>
                                            {arrayData.includes(item._id) ? (
                                                <button onClick={() => { handleRemoveFromPrint(item._id) }}>Remove</button>
                                            ) : (
                                                <button onClick={() => { handleAddToPrint(item._id) }}>Add</button>
                                            )}


                                        </td>
                                    )}


                            </tr>
                        ))
                    ) : (<>Loading... please wait</>)}

                </tbody>
            </table>
        </div>
    )
}

export default Table