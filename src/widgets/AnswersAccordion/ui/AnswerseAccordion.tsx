import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AnswerItem from "../../../entities/answer/ui/AnswerItem";
import { useAnswers } from "../../../features/answer/model/useAnswers";
import { useAppSelector } from "../../../shared/lib/hooks/storeHooks";
import { selectUser } from "../../../entities/user/model/selectors";
import Spinner from "../../../shared/ui/Spinner/Spinner";

import "./AnswerseAccordion.scss";
import { NavLink } from "react-router-dom";
import type { Answer } from "../../../features/question/types";

interface AnswerseAccordionProps {
  answers: Answer[];
  deleteAnswer: (answerId: number | string) => void;
}

const AnswerseAccordion = ({ answers, deleteAnswer }: AnswerseAccordionProps) => {
  const user = useAppSelector(selectUser);

  return (
    <>
      {user.isAuth ? (
        <Accordion sx={{ background: "#f8f9fa", borderRadius: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
            <Typography component="span">Answers</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <div className="answers">
              {answers.map((answer) => (
                <AnswerItem deleteAnswer={deleteAnswer} key={answer.id} answer={answer} />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ) : (
        <div className="answers__info">
          Please{" "}
          <NavLink className="link" to={"/login"}>
            log in
          </NavLink>{" "}
          to view answers.
        </div>
      )}
    </>
  );
};

export default AnswerseAccordion;
