import React, { useEffect, useState } from 'react';

const PerformanceMatrix = () => {
    const [searchId, setSearchId] = useState("");
    const [vendorData, setVendorData] = useState({});
    const handleSearchVendorPerformance = async  () => {
        console.log(searchId)
        const URL = `${process.env.REACT_APP_API_URL}/api/vendors/${searchId}`
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`
            }
        });
        const result = await response.json();
        console.log(result)
        if(result['success'])
            setVendorData(result['success'])
        else
            setVendorData({})
    }
    // useEffect(() => {
     
    // }, [vendorData]);
    return (
        <>
            <div className=' m-auto p-4' >
                <div className="mb-1 px-5">
                    <label htmlFor="orderID" className="form-label"> <b>Enter Vendor ID</b></label>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            min="1"
                            placeholder="Enter vendor Id "
                            id="orderID"
                            aria-describedby="button-addon2"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            required
                        />
                        <button
                            className="btn btn-primary px-3"
                            type="button"
                            id="button-addon2"
                            onClick={handleSearchVendorPerformance}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <table className="mt-3 table table-hover table-responsive">
                <thead className='bg-light text-center' >
                    <tr>
                        <th>Avg. Response Time</th>
                        <th>Avg. Quality Rating</th>
                        <th>Fulfillment Rate</th>
                        <th>On Time Delivery Rate</th>
                    </tr>
                    {
                        Object.keys(vendorData).length > 0 ? <tr>
                            <td>{vendorData.average_response_time}</td>
                            <td>{vendorData.quality_rating_avg}</td>
                            <td>{vendorData.fulfillment_rate}</td>
                            <td>{vendorData.on_time_delivery_rate}</td>
                        </tr>
                        : <tr>
                            <td colSpan={4}> No Records </td>
                         </tr>
                    }
                </thead>
            </table>
        </>
    );
}

export default PerformanceMatrix;
