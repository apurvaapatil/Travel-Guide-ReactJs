import React from "react";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from "@material-ui/core";

const PlaceDetails = (props) => {
    const classes = useStyles();


    if (props.selected) {
        console.log(props.refProp);
        props.refProp?.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }

    return (
        <Card elevation={4}>
            <CardMedia
                style={{ height: 200 }}
                image={props.place.photo ? props.place.photo.images.large.url : 'https://caravanserai.restaurant/wp-content/uploads/2018/11/open.jpg'}
                title={props.place.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">{props.place.name}</Typography>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">Price</Typography>
                    <Typography gutterBottom variant="subtitle2">{props.place.price}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Rating value={Number(props.place.rating)} readOnly></Rating>
                    <Typography gutterBottom variant="subtitle2">out of {props.place.num_reviews} reviews</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle2">{props.place.ranking}</Typography>
                </Box>
                {props.place.awards?.map((award) => (
                    <Box display="flex" justifyContent="space-between" my={1} alignItems="center">
                        <img src={award.images.small} />
                        <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                    </Box>
                ))}
                {props.place.cuisine?.map((cru) => (
                    <Chip key={cru.key} size="small" label={cru.name} className={classes.chip}></Chip>
                ))}
                {props.place.address && (
                    <Typography gutterBottom variant="subtitle" color="textSecondary" className={classes.subtitle}>
                        <LocationOnIcon></LocationOnIcon>
                        {props.place.address}
                    </Typography>
                )}
                {props.place.phone && (
                    <Typography gutterBottom variant="subtitle" color="textSecondary" className={classes.subtitle}>
                        <PhoneIcon></PhoneIcon>
                        {props.place.phone}
                    </Typography>
                )}
                <CardActions>
                    <Button size="small" color="primary" onClick={() => window.open(props.place.web_url, '_blank')}>TripAdvisor</Button>
                    <Button size="small" color="primary" onClick={() => window.open(props.place.website, '_blank')}>Website</Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default PlaceDetails;