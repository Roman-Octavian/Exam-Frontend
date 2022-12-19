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

import ProductCardDelete from "../dialogs/ProductCardDelete";

export default function ProjectCard({ product, products, setProducts }) {

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
                                        {product.name}
                                    </Typography>
                                    <Typography component={'span'} paragraph={true} >
                                        <div >
                                            <p>
                                                Price: {product.price.toFixed(2)} DKK <br></br>
                                                Weight: {product.weight} Grams
                                            </p>
                                        </div>
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <ProductCardDelete 
                                        product={product}
                                        products={products}
                                        setProducts={setProducts}
                                    />
                                </CardActions>
                            </Card>
                        </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}