import React from 'react'

export default function CardDetail({ data }: { data: any }) {
  const content = [
    {
      title: 'Orden',
      value: data?.order
    },
    {
      title: 'Tomador',
      value: data?.tomador
    },
    {
      title: 'Póliza',
      value: data?.poliza
    },
    {
      title: 'Sucursal',
      value: data?.sucursal
    },
    {
      title: 'Cantidad',
      value: data?.cantidad
    }
  ]
  return (
    <article className="border grid grid-cols-3 shadow-sm border-neutral-100 w-full rounded-[8px] text-textSize7">
      {content.map(({ title, value }, index) => (
        <React.Fragment key={index + title}>
          <p className="grid place-content-center font-bold p-[8px] text-azulPrimary900 bg-azulPrimary100 text-center first:rounded-tl-[8px] orders-list">
            {title}
          </p>
          <p className="grid place-content-center p-[8px] text-neutral-900 text-center col-span-2">
            {value}
          </p>
        </React.Fragment>
      ))}
    </article>
  )
}
