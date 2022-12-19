// Stylesheet
import './ErrorPage.css';
// React router navigation
import { useNavigate } from "react-router-dom";
// MUI elements
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function ErrorPage() {

    let navigate = useNavigate();

    return (
        <div id="error-page">
            <Typography variant="h1">
                Ooops!
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Something went wrong.
            </Typography>
            <Link
                component="button"
                variant="h5"
                onClick={() => {
                    navigate("/");
                }}
                >
                    Homepage
            </Link>
        </div>
    );
}