import {Card} from "react-bootstrap";
import {formatPercent, formatSalary, getSalary, isReported, NOT_REPORTED} from "../../utils/values.js";


export const climateCard = (school, subject) => {
    let cardData = isReported(school[subject]) ? school[subject] : NOT_REPORTED
    let cardTitle;
    switch (subject) {
        case "bullyAndHarass":
            cardTitle = "Number of incidents of bullying or harassment"
            break;
        case "avgTeacherSalaryLastYr":
            cardTitle = "Average teacher pay" + (getSalary(school).priorYear ? " (prior year)" : "")
            cardData = formatSalary(school).replace(" (prior year)", "")
            break;
        case "parentFeelsSafe":
            cardTitle = "Parents who agree \"my child feels safe at school\""
            cardData = formatPercent(school[subject])
            break;
        case "teacherFeelsSafe":
            cardTitle = "Teachers who agree \"I feel safe at my school\""
            cardData = formatPercent(school[subject])
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
