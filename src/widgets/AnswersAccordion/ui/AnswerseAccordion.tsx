import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import type { Answer } from "../../../features/question/types";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./AnswerseAccordion.scss";

interface AnswerseAccordionProps {
  answers: Answer[];
}

const AnswerseAccordion = ({ answers }: AnswerseAccordionProps) => {
  return (
    <Accordion sx={{ background: "#f8f9fa", borderRadius: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
        <Typography component="span">Answers</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="answers">
          {answers.map((answer) => (
            <div className="answer-item" key={answer.id}>
              <p className="answer-item__content">{answer.content}</p>
              {answer.isCorrect && <span className="answer-item__correct-badge">Correct</span>}
            </div>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default AnswerseAccordion;
