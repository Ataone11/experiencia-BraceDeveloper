import { useState } from "react";
import { HelpBoxContainerModel } from "../../interfaces";
import Flecha from "../../src/assets/general/Flecha";
import colores from "../../src/utils/colores";

export const QuestionBoxContainer = ({
  questionBody,
}: {
  questionBody: HelpBoxContainerModel;
}) => {
  const { id, question, answer } = questionBody;
  const [showAnswer, setShowAnswer] = useState<Boolean>(false);

  return (
    <div
      onClick={() => setShowAnswer(!showAnswer)}
      className={`flex flex-col gap-y-4 border py-6 px-11 border-gray-page rounded-md cursor-pointer transition-all duration-1000 ease-in-out overflow-hidden`}
    >
      <div className="flex gap-x-3">
        <span className="w-[calc(100%-44px)] font-bold text-sm">
          {question}
        </span>
        <span
          className={`w-8 grid place-content-center transition-all duration-500 ease-in-out ${
            showAnswer ? "-rotate-180" : "-rotate-0"
          }`}
        >
          <Flecha color={colores.primary} />
        </span>
      </div>

      {showAnswer && (
        <article
          className={`font-normal text-sm overflow-hidden transition-all duration-1000 ease-in-out`}
        >
          {answer}
        </article>
      )}
    </div>
  );
};

export default QuestionBoxContainer;
