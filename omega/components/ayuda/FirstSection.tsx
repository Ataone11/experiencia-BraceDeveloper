import Questions from "./Questions"

const FirstSection = ({ questions }: any) => {
  return (
    <div className="container w-full mx-auto space-y-5 px-6">
      <h1 className="text-large lg:text-extraLarge text-redOmega tracking-[0.2em] font-semibold text-center uppercase">
        Preguntas Frecuentes
      </h1>
      <Questions questions={questions} />
    </div>
  )
}

export default FirstSection
