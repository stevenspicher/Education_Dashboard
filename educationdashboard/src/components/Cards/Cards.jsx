import {Card} from "react-bootstrap";


export const climateCard = (school, subject) => {
    ///Formating

    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    let cardData = school[subject]
    let cardTitle;
    switch (subject) {
        case "bullyAndHarass":
            cardTitle = "Number of incidents of bullying or harassment"
            break;
        case "avgTeacherSalaryLastYr":
            cardTitle = "Average teacher pay"
            cardData = USDollar.format(cardData)
            break;
        case "parentFeelsSafe":
            cardTitle = "Parents who agree \"my child feels safe at school\""
            cardData = cardData + "%"
            break;
        case "teacherFeelsSafe":
            cardTitle = "Teachers who agree \"I feel safe at my school\""
            cardData = cardData + "%"
            break;
        case "violentAssaults":
            cardTitle = "Number of violent assaults"
            break;

    }
            return (
        <Card
            className={"card-graphic-style card-width"}
            style={{height:"175px", margin:"20px"}}
        >
            <Card.Body>
                <Card.Title className="card-total">{cardData}</Card.Title>
                <Card.Text>
                    {cardTitle}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}