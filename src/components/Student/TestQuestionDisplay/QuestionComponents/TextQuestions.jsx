import { Grid, TextField } from "@material-ui/core";
import React from "react";
import QuestionMedia from "./QuestionMedia";

const TextQuestions = ( {
    type,
    question,
    index,
    answers,
    setAnswers
} ) => {
    const handleAnswerChange = ( e ) => {
        const curr = JSON.parse( JSON.stringify( answers ) );

        curr.submissions[ index ].answers[ 0 ] = e.target.value;

        setAnswers( curr );
    };

    const isMedia = question.media;

    return (
        <div>
            <div className="single-correct-question">
                <Grid container
                    spacing={0}>
                    <Grid item
                        xs={1}>
                        <span style={
                            { marginRight: "30px" }
                        }>
                            Q. {
                            index + 1
                        } </span>
                    </Grid>
                    <Grid item
                        xs={
                            isMedia ? 6 : 11
                    }>
                        <div className="question-description"
                            style={
                                { whiteSpace: "pre-wrap" }
                        }>
                            {
                            question.description
                        } </div>

                        <div className="question-input">
                            <TextField placeholder="Enter your answer here" name="password" variant="outlined" autoComplete="off"
                                multiline={
                                    type === "longAnswer"
                                }
                                rows={6}
                                value={
                                    answers.submissions[ index ].answers[ 0 ]
                                }
                                style={
                                    { width: "100%" }
                                }
                                onChange={handleAnswerChange}/>
                        </div>
                    </Grid>
                    <Grid item
                        xs={5}>
                        <QuestionMedia question={question}/>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default TextQuestions;
