import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const MapShow = (props) => {
  const [erros, setErrors] = useState([])
  const [map, setMap] = useState({})

  const { id } = useParams()

  const getMap = async () => {
    try {
      const response = await fetch(`/api/v1/my-map/${id}`)
      
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`
        const error = new Error(errorMessage);
        throw (error)
      }
      const mapBody = await response.json()
      setMap(mapBody.map)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getMap()
  }, [])

  function initMap() {
    const myLatLng = { lat: -25.363, lng: 131.044 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: myLatLng,
    });
    new google.maps.Marker({
      position: myLatLng,
      map,
      title: "Hello World!",
    });
    const joshLatLng = { lat: -24.400, lng: 130 };
    new google.maps.Marker({
      position: joshLatLng,
      map,
      title: "Hello World!",
    });
    const geocoder = new google.maps.Geocoder();
    document.getElementById("submit").addEventListener("click", () => {
      geocodeAddress(geocoder, map);
    });

    let infoWindow = new google.maps.InfoWindow({
      content: "Click the map to get Lat/Lng!",
      position: myLatLng,
    });
    infoWindow.open(map);
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
      // Close the current InfoWindow.
      infoWindow.close();
      // Create a new InfoWindow.
      infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      });
      infoWindow.setContent(
        JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      );
      infoWindow.open(map);
    });
  }

  function geocodeAddress(geocoder, resultsMap) {
    const address = document.getElementById("address").value;
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        resultsMap.setCenter(results[0].geometry.location);
        new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location,
        });
        debugger
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }


  useEffect(() => {
    initMap()
  }, []);

  return (
    <div>
      <div id="map">


      </div>
    </div>
  )
}

export default MapShow