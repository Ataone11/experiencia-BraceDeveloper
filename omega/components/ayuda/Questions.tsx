import { useState } from 'react'

const Questions = ({ questions }: any) => {
  const [selected, setSelected] = useState(null)

  const toggle = (i: any) => {
    if (selected === i) {
      return setSelected(null)
    }
    setSelected(i)
  }
  return (
    <div className="space-y-10 flex flex-col md:flex-row-reverse w-full mx-auto items-center justify-around">

        <div className="my-5 w-full grid lg:grid-cols-2 gap-x-5">
          {questions.map((question: any) => (
            <div
              key={question.id}
              className="border-b w-full md:w-[80%] mx-auto py-4 md:py-10 cursor-pointer hover:bg-gray-50 px-2 transition-all duration-500 space-y-5"
              onClick={() => toggle(question.id)}
            >
              <div className="flex  w-auto justify-between items-center gap-x-6">
                <h4 className={`${selected === question.id ? 'text-redOmega' : 'text-blackOmega'} text-sm md:text-medium font-semibold`}>{question.attributes.pregunta}</h4>
                <svg
                  width="18"
                  height="10"
                  viewBox="0 0 18 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    selected === question.id
                      ? 'rotate-180 transition-all duration-500'
                      : 'rotate-0 transition-all duration-500'
                  }
                >
                  <path
                    d="M1 1L9 9L17 1"
                    stroke={selected === question.id ? '#FF5A5F' : '#C4C4C4'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p
                className={` mx-auto text-left pt-2  text-small text-greyOmega
                  ${
                    selected === question.id
                      ? 'block h-auto max-h-[9999px] transition-all duration-500 opacity-100'
                      : 'hidden opacity-0 max-h-0 overflow-hidden transition-all duration-500'
                  }
                `}
              >
                {question.attributes.respuesta}
              </p>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Questions
