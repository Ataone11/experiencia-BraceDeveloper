import { PlusIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import DeleteIcon from '../../../src/assets/general/DeleteIcon'
import TootltipIcon from '../../../src/assets/TooltipIcon'
import { FEATURE_TYPE, ProductCategoryFeatureModel } from '../../../src/models/ProductCategoryFeatureModel'
import { CreateFeatureValueDto } from '../../../src/models/ProductDto'
import { CustomPropertyModel, ProductModel } from '../../../src/models/ProductModel'
import InputSelect from '../../../src/screens/general/inputs/InputSelect'
import NormalInput from '../../../src/screens/general/inputs/NormalInput'

interface categoryFeaturesProps {
    basicInformation: ProductModel
    setBasicInformation: (basicInformation: ProductModel) => void
    categoryFeatures: ProductCategoryFeatureModel[] | null
    categoryFeatureValues: CreateFeatureValueDto[]
    setCategoryFeatureValues: (newCategoryFeatureValues: CreateFeatureValueDto[]) => void
}

const ProductCategoryFeatures = ({ basicInformation, setBasicInformation, categoryFeatures, categoryFeatureValues, setCategoryFeatureValues }: categoryFeaturesProps) => {
    const setcategoryFeatures = (newcategoryFeatures: any[]) => setBasicInformation({ ...basicInformation, custom_properties: newcategoryFeatures });
    const categoryFeaturesToDelete = basicInformation.delete_custom_properties;
    const [setupReady, setSetupReady] = useState(false);

    useEffect(() => {
        if (categoryFeatures && categoryFeatureValues && !categoryFeatureValues[0]?.featureData) {
            setCategoryFeatureValues(categoryFeatures.map((categoryFeature: ProductCategoryFeatureModel) => {
                const featureValue: any = categoryFeatureValues.find((featureValue: CreateFeatureValueDto) => (featureValue.feature as ProductCategoryFeatureModel).id === categoryFeature.id)
                return ({
                    value: featureValue?.value || null,
                    feature: categoryFeature.id,
                    featureData: categoryFeature,
                    discrete_value: featureValue?.discrete_value?.id || null
                })
            }))
            setSetupReady(true);
        }
    }, [categoryFeatures, categoryFeatureValues])


    const getInputType = (inputType: FEATURE_TYPE) => {
        switch (inputType) {
            case FEATURE_TYPE.TEXT:
                return "text";
            case FEATURE_TYPE.NUMBER:
                return "number";
            default:
                return "text";
        }

    }

    const handleChange = (e: any, position: number) => {
        setCategoryFeatureValues(categoryFeatureValues.map((categoryFeatureValue: CreateFeatureValueDto, index: number) => {
            if (position === index) {
                return {
                    ...categoryFeatureValue,
                    value: e.target.value
                }
            } else
                return categoryFeatureValue
        }))
    }

    const handleChangeDiscrete = (option: any, position: number) => {
        setCategoryFeatureValues(categoryFeatureValues.map((categoryFeatureValue: CreateFeatureValueDto, index: number) => {
            if (position === index) {
                return {
                    ...categoryFeatureValue,
                    discrete_value: option.value
                }
            } else
                return categoryFeatureValue
        }))
    }

    return (
        setupReady && categoryFeatureValues.length > 0 ?
        <>
            <h2 className="text-[0.9rem] text-primary font-bold mt-5 pb-[0.5rem]">
                Especificaciones técnicas de la categoría:
            </h2>
            {
                basicInformation.category ?
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                        {
                            categoryFeatureValues?.map((categoryFeatureValue: CreateFeatureValueDto, index: number) => {
                                const options: any = categoryFeatureValue.featureData?.discrete_values?.map((discreteValue: any) => ({ label: discreteValue.value, value: discreteValue.id }));

                                return <div className='flex gap-5' key={index}>
                                    {/* Si tiene id significa que se creo previamente y esta en la base de datos, por lo tanto solo se permite eliminarla */}
                                    {
                                        categoryFeatureValue.featureData?.type === FEATURE_TYPE.DISCRETE ? <>
                                            <InputSelect value={options.find((option: any) => option.value === categoryFeatureValue.discrete_value)} onChange={(option: any) => handleChangeDiscrete(option, index)} fieldName={categoryFeatureValue.featureData?.name} options={options} />
                                        </> :
                                            <NormalInput
                                                required={categoryFeatureValue.featureData?.required}
                                                optional={!categoryFeatureValue.featureData?.required}
                                                onChange={(e: any) => handleChange(e, index)}
                                                value={categoryFeatureValue.value}
                                                fieldName={categoryFeatureValue.featureData?.name || ""}
                                                type={getInputType(categoryFeatureValue.featureData?.type || 1)}
                                                width='w-full'
                                            />
                                    }
                                </div>
                            })
                        }
                    </div> :
                    <span className='text-xs text-black-page'>Por favor selecciona primero una categoría</span>
            }
        </>:
        <></>
    )
}

export default ProductCategoryFeatures