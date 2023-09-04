
export const RenderIntercal = (props: any) => { //alternar orden de componente

  if (props.toggle == true) {
    return (
      <div className="hidden overflow-hidden bg-inset w-full md:h-rifa rounded-rifa md:flex md:mb-9">
        {props.img}
        {props.description}
      </div>
    )
  }
  else {
    return (
      <div className="hidden overflow-hidden bg-inset w-full md:h-rifa rounded-rifa md:flex md:mb-9">
        {props.description}
        {props.img}
      </div>
    )
  }


}

export default RenderIntercal