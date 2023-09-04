import { PlusIcon } from '@heroicons/react/solid'
import { useTranslation } from 'next-i18next'
import React from 'react'
import ReactTooltip from 'react-tooltip'
import DeleteIcon from '../../../src/assets/general/DeleteIcon'
import TootltipIcon from '../../../src/assets/TooltipIcon'
import { CustomPropertyModel, ProductModel } from '../../../src/models/ProductModel'
import NormalInput from '../../../src/screens/general/inputs/NormalInput'

interface CustomPropertiesProps {
    basicInformation: ProductModel
    setBasicInformation: (basicInformation: ProductModel) => void
}

const CustomProperties = ({ basicInformation, setBasicInformation }: CustomPropertiesProps) => {
    const customProperties = basicInformation.custom_properties;
    const setCustomProperties = (newCustomProperties: any[]) => setBasicInformation({ ...basicInformation, custom_properties: newCustomProperties });
    const customPropertiesToDelete = basicInformation.delete_custom_properties;

    const handleCustomPropertyChange = (e: any, index: number) => {
        const newCustomProperties = customProperties.map((custom_property: any, currentIndex: number) => {
            if (currentIndex === index) {
                return {
                    ...custom_property,
                    [e.target.name]: e.target.value
                }
            } else {
                return custom_property
            }
        })

        setCustomProperties(
            newCustomProperties
        )
    }

    const addCustomProperty = () => {
        setCustomProperties([...customProperties, { name: null, value: null }])
    }

    const deleteCustomProperty = (customProperty: CustomPropertyModel, indexToDelete: number) => {
        // Se utiliza para actualizar de manera grafica las propiedades que salen y en caso de que se elimine una 
        // propiedad que se acaba de agregar, ya no se tendra en cuenta en la actualizacion
        const newCustomProperties = [...customProperties].filter((_, index: number) => index !== indexToDelete);

        const newBasicInformation: ProductModel = {
            ...basicInformation,
            custom_properties: newCustomProperties
        };

        // Se van guardando las propiedades que ya existian previamente y que se deben borrar en el llamado REST
        if (customProperty.id) {
            newBasicInformation.delete_custom_properties = [
                ...(customPropertiesToDelete || []),
                customProperty.id
            ];
        }

        setBasicInformation(newBasicInformation);
    }
    const { t } = useTranslation();
    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-[0.9rem] text-primary font-bold mt-5 pb-[0.5rem]">
                    Especificaciones técnicas:
                </h2>
                <div data-tip={"Agrega cada una de las características técnicas más relevantes para tu producto."} data-for={`ficha-tecnica__tooltip`}><TootltipIcon size={20} /></div>
            </div>
            <ReactTooltip effect="solid" id={`ficha-tecnica__tooltip`} />
            <div className='overflow-x-scroll lg:overflow-x-auto'>
                {
                    customProperties?.map((customProperty: CustomPropertyModel, index: number) => <div className='flex gap-5 min-w-[500px]' key={index}>
                        {/* Si tiene id significa que se creo previamente y esta en la base de datos, por lo tanto solo se permite eliminarla */}
                        <NormalInput disabled={!!customProperty.id} value={customProperty.name} optional={false} onChange={(e: any) => handleCustomPropertyChange(e, index)} inputName="name" fieldName="Nombre de la característica" type='text' width='w-1/2' />
                        <NormalInput disabled={!!customProperty.id} value={customProperty.value} optional={false} onChange={(e: any) => handleCustomPropertyChange(e, index)} inputName="value" fieldName="Detalle" type='text' width='w-1/2' />
                        <button
                            type='button'
                            className='bg-[#ED5A51] py-[10px] px-[20px] rounded-[6px] self-end flex items-center justify-center my-[0.5rem]'
                            onClick={() => deleteCustomProperty(customProperty, index)}>
                            <DeleteIcon />
                        </button>
                    </div>)
                }
            </div>
            <div className='flex text-[13px] text-primary font-normal items-center cursor-pointer mt-2' onClick={addCustomProperty}>
                <PlusIcon width={15} className="mt-[-2.5px]" />
                <span className='ml-2'>{ t("products:add-feature")}</span>
            </div>
        </>
    )
}

export default CustomProperties