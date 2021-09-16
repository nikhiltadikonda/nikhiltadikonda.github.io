import React from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

function QuoteCard() {

    const [quote, setQuote] = React.useState(null);
    const [spinner, setSpinner] = React.useState(false);
    const [card, showCard] = React.useState(false);

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_QUOTES_API_URL}`).then((response) => {
            setSpinner(response.status !== 200);
            setQuote(response.data);
        });
    }, []);

    if (!quote) return null;


    return (
        <div>
            {!card ? <Alert variant= "success">
                        <Alert.Heading>Quote of the Moment</Alert.Heading>
                        <hr />
                        {spinner ? <Spinner animation="border" variant="success" /> : quote.content}
                        <p className = "quote-author"> - {quote.author}</p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => showCard(!card)} variant="outline-success">
                                Close Quote
                            </Button>
                        </div>
                    </Alert> : null}
            <div className = "quote-button">
                {card && <Button variant = "outline-success" onClick={() => showCard(!card)}>Show Quote</Button>}
            </div>
        </div>
    );
}

export default QuoteCard;