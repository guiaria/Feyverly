import React, { useState } from 'react';

const AddMarker = () => {
    const [shopName, setShopName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [pictureFile, setPictureFile] = useState(null);
    const [refreshState, setRefreshState] = useState(false);

    const handleShopNameChange = (e) => {
        setShopName(e.target.value);
    };

    const handleLatitudeChange = (e) => {
        setLatitude(e.target.value);
    };

    const handleLongitudeChange = (e) => {
        setLongitude(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!shopName || !latitude || !longitude) {
            alert('Please fill in all fields.');
            return;
        }
    
        const formData = new FormData();
        formData.append('shopName', shopName);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);


        const addData = async () => {
            const result = await fetch('http://localhost:8800/AddData', {
                method: 'POST',
                body: formData,
            });
            return result
        }

        try {

            addData().then((res) => {
                if (res.ok) {

                    console.log('Add data successfully');
                } else {
                    console.error('Failed to create marker:', res.statusText);
                }
                setRefreshState(!refreshState);
            })

        } catch (error) {
            console.error('Error creating marker:', error.message);
        }

        setShopName('');
        setLatitude('');
        setLongitude('');
        setPictureFile(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Shop Name:
                <input type="text" value={shopName} onChange={handleShopNameChange} />
            </label>
            <br />
            <label>
                Latitude:
                <input type="text" value={latitude} onChange={handleLatitudeChange} />
            </label>
            <br />
            <label>
                Longitude:
                <input type="text" value={longitude} onChange={handleLongitudeChange} />
            </label>
            <br />
            <button type="submit">Create Marker</button>
        </form>
    );
};

export default AddMarker;
