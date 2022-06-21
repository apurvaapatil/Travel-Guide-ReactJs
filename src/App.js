import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from '@material-ui/core';

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData } from "./api";

const App = () => {
    const [places, setPlaces] = useState([]);

    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const [coordinates, setCoords] = useState({});
    const [bounds, setBounds] = useState({});
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    const [childClicked, setChildClicked] = useState();
    const [isLoading, setIsLoading] = useState(false);

    // get current user location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((coordinates) => {
            setCoords({ lat: coordinates.coords.latitude, lng: coordinates.coords.longitude });
        })
    }, []);

    // update list whenever 'rating' changes
    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating);
        setFilteredPlaces(filteredPlaces);
    }, [rating]);

    // changes whenever type filter changes or map is changed
    useEffect(() => {
        if (bounds.sw && bounds.ne) {
            setIsLoading(true);

            getPlacesData(type, bounds)
                .then((data) => {
                    setPlaces(data.data?.filter((place) => place.name && place.num_reviews > 0));
                    setFilteredPlaces([]);
                    setIsLoading(false);
                });
        }

    }, [type, coordinates, bounds]);


    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoords} />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}></List>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map setCoords={setCoords}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default App;