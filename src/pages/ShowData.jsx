import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const ShowData = () => {
    const dataFromArray = useSelector((state) => state.arrayReducer.value)
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/GetData')
            .then((res) => {
                const filtered = res.data.filter((item) => dataFromArray.includes(item._id))
                setFilteredData(filtered)
            }).catch((err) => {
                console.log(err)
            })
    }, [filteredData])


    return (
        <div className='showData'>
            {filteredData.map((item) => (
                <div className="showDataItem" key={item._id}>
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
