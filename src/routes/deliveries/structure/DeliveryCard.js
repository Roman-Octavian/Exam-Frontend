import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "../../../common/themes/DarkTheme";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useNavigate } from "react-router-dom";

import DeliveryCardDelete from "../dialogs/DeliveryCardDelete";
import DeliveryCardEdit from "../dialogs/DeliveryCardEdit";

export default function ProjectCard({ delivery, deliveries, setDeliveries }) {

    let navigate = useNavigate();

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Container sx={{py: 1}} maxWidth="md">
                <Grid container spacing={4} columns={1}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className="card"
                                sx={{width: '100%', display: 'flex', flexDirection: 'row'}}>
                                <CardContent sx={{flexGrow: 1}}>
                                    <Typography gutterBottom variant="h5" component="h2" >
                                        {delivery.date}
                                    </Typography>
                                    <Typography component={'span'} paragraph={true} >
                                        <div >
                                            <p>
                                                Origin: {delivery.warehouse} <br></br>
                                                Destination: {delivery.destination}
                                            </p>
                                        </div>
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <DeliveryCardEdit
                                        delivery={delivery}
                                        deliveries={deliveries}
                                        setDeliveries={setDeliveries}
/>
                                    <DeliveryCardDelete 
                                        delivery={delivery}
                                        setDeliveries={setDeliveries}
                                    />
                                </CardActions>
                            </Card>
                        </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}