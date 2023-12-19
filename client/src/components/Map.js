import React, { useEffect, useState } from 'react';
import { LongdoMap, map, longdo } from '../LongdoMap';
import Table from 'react-bootstrap/Table';
import './Map.css';
import AddMarker from './AddMarker';

const Map = ({ username, onLogout }) => {
    const [data, setData] = useState([]);
    const [displayAddMarker, setDisplayAddMarker] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetch('http://localhost:8800/data').then((res) => res.json()).then((data) => setData(data));
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData();
    }, []);

    const mapKey = 'fda7d0a8f7552338ba422e3b13b5ab49'
    const initMap = () => {
        map.Layers.setBase(longdo.Layers.GRAY);
    }

    const handleRemove = async (index) => {
        // Create a copy of the data array
        const newData = [...data];
        // Remove the item at the specified index
        newData.splice(index, 1);

        try {
            await fetch('http://localhost:8800/deleteData', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    shopName: data[index].name
                })
            }).then((res) => res.json()).then(() => setData(newData))

        } catch (err) {
            console.error('Error:', err);
        }
      };

    const removeMarker = () => {
        map.Overlays.clear();
    }
    return (
        <>
        <div className='container'>
            <h2>Welcome, {username}!</h2>
            <button onClick={onLogout}>Logout</button>
            <button onClick={() => setDisplayAddMarker(!displayAddMarker)}>Add Marker</button>
            <button onClick={removeMarker}>Remove Marker</button>
            {displayAddMarker && <AddMarker />}


            <LongdoMap id="longdo-map" mapKey={mapKey} callback={initMap} />
            {/* <Table></Table> */}
            {data.length > 0 && <Table className="custom-table" striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}
                            onMouseEnter={() => {
                                let popup = new longdo.Popup({ lon: item.lon, lat: item.lat },
                                    {
                                      title: item.name
                                    });

                                map.Overlays.add(popup)
                            }}
                            onMouseLeave={() => {
                                map.Overlays.clear();
                            }}>
                            <td>{item.name}</td>
                            <td>{item.lat}</td>
                            <td>{item.lon}</td>
                            <td><button onClick={e => {
                                e.preventDefault();
                                handleRemove(index)
                            }}>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            }
        </div>

        </>
    );
};

export default Map;
