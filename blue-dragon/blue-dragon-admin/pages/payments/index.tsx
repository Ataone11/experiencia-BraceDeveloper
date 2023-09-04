import { TablaDinamica } from '@brace-developers/react-components'
import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useContext, useState } from 'react'
import Layout from '../../components/Layout'
import TitlePage from '../../components/TitlePage'
import { PopUpContext } from '../../src/context/PopUpContext'
import BasePage from '../../src/screens/general/base/BasePage'
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["payments"])),
    },
  };
}

const Pagos: NextPage = () => {
  const { t } = useTranslation("");
  const [filterSelected, setFilterSelected] = useState<string>('provider')
  const [loading, setLoading] = useState(false)
  const [row, setRow] = useState(null)
  const setPopUp = useContext(PopUpContext) as any

  const Columns = [
    {
      key: 'concept',
      value: t("payments:status") 
    },
    {
      key: 'id',
      value: t("payments:reference-#") 
    },
    {
      key: 'provider',
      value: t("payments:supplier") 
    },
    {
      key: 'date',
      value: t("payments:date") 
    },
    {
      key: 'quantity',
      value: t("payments:quantity") 
    },
    {
      key: 'paymentMethod',
      value: t("payments:payment-method") 
    }
  ]

  const Rows = [
    {
      concept: 'Pedidos',
      id: '876525',
      provider: 'Sichuan, Guangxin',
      date: '02/12/2021',
      quantity: '10 USD',
      paymentMethod: 'Carta de crédito'
    },
    {
      concept: 'Pedidos',
      id: '876525',
      provider: 'Sichuan, Guangxin',
      date: '02/12/2021',
      quantity: '10 USD',
      paymentMethod: 'Carta de crédito'
    },
    {
      concept: 'Pedidos',
      id: '876525',
      provider: 'Sichuan, Guangxin',
      date: '02/12/2021',
      quantity: '10 USD',
      paymentMethod: 'Carta de crédito'
    },
    {
      concept: 'Pedidos',
      id: '876525',
      provider: 'Sichuan, Guangxin',
      date: '02/12/2021',
      quantity: '10 USD',
      paymentMethod: 'Carta de crédito'
    },
    {
      concept: 'Pedidos',
      id: '876525',
      provider: 'Sichuan, Guangxin',
      date: '02/12/2021',
      quantity: '10 USD',
      paymentMethod: 'Carta de crédito'
    },
    {
      concept: 'Pedidos',
      id: '876525',
      provider: 'Sichuan, Guangxin',
      date: '02/12/2021',
      quantity: '10 USD',
      paymentMethod: 'Carta de crédito'
    }
  ]

  const Filters = [
    {
      name: 'Todos',
      value: 'all'
    },
    {
      name: 'Pedidos',
      value: 'orders'
    },
    {
      name: 'Muestras',
      value: 'samples'
    },
    {
      name: 'Suscripciones',
      value: 'subscriptions'
    }
  ]

  const popUp = {
    title: 'Detalles de pagos',
    buttonAction: 'Cerrar',
    action: () => setPopUp(null),
    setPopUp: true,
    children: (
      <div className='grid gap-4'>
        <section className='grid gap-2'>
          <p className='text-base'>
            <strong>{t("payments:orders")} </strong>876525
          </p>
          <p className='text-base'>
            <strong>{t("payments:supplier")}: </strong>Sichuan Guangxin Machinery of Grain &
            Oil Processing Co., Ltd.
          </p>
          <p className='text-base'>
            <strong>{t("payments:date")}: </strong>15 feb 2022
          </p>
          <p className='text-base'>
            <strong>{t("payments:payment-method")}: </strong>Tarjeta de crédito
          </p>
        </section>
        <section className='bg-white rounded-lg w-full p-5 h-fit max-w-7xl mx-auto mb-[20px] shadow-md'>
          <section className='flex w-full justify-between border-b-2'>
            <p className='text-Principal'>{t("payments:pay")}</p>
            <span>
              <strong>649.967 USD</strong>
            </span>
          </section>
          <section className='flex w-full justify-between border-b-2'>
            <p className='text-Principal'>{t("payments:thru-gain")}</p>
            <span>
              <strong>649.967 USD</strong>
            </span>
          </section>
          <section className='flex w-full justify-between border-b-2'>
            <p className='text-Principal'>{t("payments:provider-profit")}</p>
            <span>
              <strong>649.967 USD</strong>
            </span>
          </section>
          <section className='flex w-full justify-between'>
            <p className='text-Principal'>{t("payments:gateway-commission")}</p>
            <span>
              <strong>649.967 USD</strong>
            </span>
          </section>
        </section>
      </div>
    )
  }

  async function functionRow(e: any) {
    setRow(e)
    setPopUp(popUp)
  }

  async function searchText(e: any) {}

  return (
    <Layout>
      <BasePage title='Pagos'>
        <TitlePage title={'Consolidado de pagos de proveedores'} />
        <section className='bg-white rounded-lg w-full p-5 h-fit max-w-7xl mx-auto mb-[20px]'>
          <div className='grid grid-rows-4 md:grid-rows-1 md:grid-cols-4'>
            <section className='border-b-2 md:border-r-2 md:border-b-0'>
              <section className='flex justify-between md:flex-col md:w-fit md:mx-auto py-2'>
                <p className='text-Principal font-semibold'>{t("payments:pay")}</p>
                <span className='font-bold text-[#303030] xl:text-xl'>
                  649,967 USD
                </span>
              </section>
            </section>
            <section className='border-b-2 md:border-r-2 md:border-b-0'>
              <section className='flex justify-between md:flex-col md:w-fit md:mx-auto py-2'>
                <p className='text-Principal font-semibold'>{t("payments:thru-gain")}</p>
                <span className='font-bold text-[#303030] xl:text-xl'>
                  200,00 USD
                </span>
              </section>
            </section>
            <section className='border-b-2 md:border-r-2 md:border-b-0'>
              <section className='flex justify-between md:flex-col md:w-fit md:mx-auto py-2'>
                <p className='text-Principal font-semibold '>
                {t("payments:provider-profit")}
                </p>
                <span className='font-bold text-[#303030] xl:text-xl'>
                  200,00 USD
                </span>
              </section>
            </section>
            <section className='border-b-2 md:border-r-2 md:border-b-0'>
              <section className='flex justify-between md:flex-col md:w-fit md:mx-auto py-2'>
                <p className='text-Principal font-semibold'>
                {t("payments:gateway-commission")}
                </p>
                <span className='font-bold text-[#303030] xl:text-xl'>
                  200,00 USD
                </span>
              </section>
            </section>
          </div>
        </section>
        <section className='bg-white rounded-lg w-full min-h-[calc(100vh-150px)] lg:min-h-[calc(100vh-202px)] p-5 max-w-7xl mx-auto'>
          <TablaDinamica
            columns={Columns}
            rows={Rows}
            filters={Filters}
            searchText={searchText}
            functionRow={functionRow}
            order={{ criteria: 'date', order: 'desc' }}
            filterSelected={filterSelected?.toString()}
            loading={loading}
          />
          <section className=' w-fit mx-auto md:mt-4'>
            <button className='bg-Principal text-white px-[14px] py-[10px] rounded-[8px] '>
            {t("payments:export")}
            </button>
          </section>
        </section>
      </BasePage>
    </Layout>
  )
}

export default Pagos
