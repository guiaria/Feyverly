import React from 'react';
import { LongdoMap, map, longdo }  from '../LongdoMap';
import './Map.css';

const Map = ({ username, onLogout }) => {
    const mapKey='fda7d0a8f7552338ba422e3b13b5ab49'

    const initMap = () => {
        map.Layers.setBase(longdo.Layers.GRAY);
    }
    const addMarker = () => {
        let marker = new longdo.Marker({  lon: 100.56, lat: 13.74 },)
        map.Overlays.add(marker)
    }
    const removeMarker = () => {
        map.Overlays.clear();
    }
    return (
        
        <div className='container'>
            <h2>Welcome, {username}!</h2>
            <button onClick={onLogout}>Logout</button>
            <button onClick={addMarker}>Add Marker</button>
            <button onClick={removeMarker}>Remove Marker</button>
            

            <LongdoMap id="longdo-map" mapKey={mapKey} callback={initMap} />
        </div>
    );
};

export default Map;
