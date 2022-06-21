import React from "react";
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOutlineIcon from '@material-ui/icons/LocationOnOutlined';

import useStyles from './styles';
import Rating from "@material-ui/lab/Rating";

const Map = (props) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px');

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={props.coordinates}
                center={props.coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                onChange={(e) => {
                    props.setCoords({ lat: e.center.lat, lng: e.center.lng });
                    props.setBounds({ ne: e.marginBounds.ne, nw: e.marginBounds.nw, se: e.marginBounds.se, sw: e.marginBounds.sw });
                }}
                onChildClick={(child) =>
                    props.setChildClicked(child)
                }>

                {props.places?.map((place, i) => (
                    <div className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}>
                        {
                            !isDesktop ? (
                                <LocationOutlineIcon color="primary" fontSize="large"></LocationOutlineIcon>
                            ) :
                                (
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography className={classes.typography} variant="subtitle2">{place.name}</Typography>
                                        <img className={classes.pointer}
                                            src={place.photo ? place.photo.images.large.url : 'https://caravanserai.restaurant/wp-content/uploads/2018/11/open.jpg'}
                                            alt={place.name}>
                                        </img>
                                        <Rating size="small" value={Number(place.rating)} readOnly></Rating>
                                    </Paper>
                                )
                        }

                    </div>
                ))}
            </GoogleMapReact>
        </div >
    );
};

export default Map;