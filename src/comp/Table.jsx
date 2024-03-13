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
        setDepart(item.Department)
        setAmount(item.Amount)
        setEndUser(item.EndUser)
    }
    useEffect(() => {
        axios.get('http://localhost:8080/GetData')
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
        axios.delete(`http://localhost:8080/item/${item}`)
            .then((res) => {
                console.log("deleted")
            }).catch((err) => {
                console.log(err)
            })
    }

    const editItem = (item) => {
        axios.put(`http://localhost:8080/edit/${item}`, {
            RecFrom: Rec,
            InvenTag: IntTag,
            Quantity: Quan,
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
        // Dispatch action to remove itemId from Redux state
        dispatch(DecArray(itemId));
    
        // Update local state to remove itemId from printIds
        setPrintIds(prevIds => prevIds.filter(id => id !== itemId));
    };
    

    const handleAddToPrint = (itemId) => {
        dispatch(AddArray([itemId])); // Wrap itemId in an array before passing it to AddArray action
        setPrintIds(prevIds => [...new Set([...prevIds, itemId])]); // Ensure uniqueness of itemId in printIds array
    };

    return (
        <div className='tableCon'>
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
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className='dataBody'>
                    {loading === true ? (
                        finalizedData.map((item) => (
                            <tr key={item._id}>
                                <td data-label="Received From">
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