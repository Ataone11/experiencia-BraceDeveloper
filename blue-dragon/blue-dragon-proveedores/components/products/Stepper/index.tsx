import { useRouter } from 'next/router';
import React from 'react'
import { ProductModel } from '../../../src/models/ProductModel';
import { CheckIcon } from '@heroicons/react/solid';
import { useTranslation } from 'next-i18next';

interface StepperProps {
    currentStep: number
    editing: boolean
    setCurrentStep: (step: PRODUCT_CREATION_STEPS) => void
    basicInformation: ProductModel | null
}

export enum PRODUCT_CREATION_STEPS {
    BASIC_INFORMATION = 1,
    SALES_INFORMATION = 2,
};

const Stepper = ({ editing, setCurrentStep, basicInformation, currentStep }: StepperProps) => {
    const { t } = useTranslation();
    const router = useRouter();
    return (
        <>
            {
                !editing &&
                <div className='rounded-[10px] bg-white pt-[20x] md:pt-[45px] pb-[60px] md:pb-[80px] px-[50px] md:px-[100px] relative flex items-center select-none md:border-[1px] md:border-[#EEEEEE]'>
                    <div className='flex w-full relative justify-between items-center max-w-[500px] mx-auto'>
                        <div
                            className={`flex flex-col relative items-center`}>
                            {
                                !editing &&
                                <div className={`box-border w-[35px] h-[35px] text-white rounded-full flex justify-center items-center z-10 ring-[6.5px] p-2 ${(editing ? PRODUCT_CREATION_STEPS.BASIC_INFORMATION === currentStep : PRODUCT_CREATION_STEPS.BASIC_INFORMATION <= currentStep) ? "bg-primary ring-[#92CAFF]" : "bg-[#C4C4C4] ring-[#E5E5E5]"}`}>
                                    {
                                        currentStep > PRODUCT_CREATION_STEPS.BASIC_INFORMATION && !editing ?
                                            <CheckIcon /> :
                                            PRODUCT_CREATION_STEPS.BASIC_INFORMATION
                                    }
                                </div>
                            }
                            <div className={`absolute top-[140%] text-center self-center text-[13px] ${(editing ? PRODUCT_CREATION_STEPS.BASIC_INFORMATION === currentStep : PRODUCT_CREATION_STEPS.BASIC_INFORMATION <= currentStep) ? "text-primary font-bold" : "text-[#868686]"}`}>
                            {t("products:basic-information")}
                            </div>
                        </div>
                        <div
                            onClick={() => editing && setCurrentStep(PRODUCT_CREATION_STEPS.SALES_INFORMATION)}
                            className={`flex flex-col relative items-center ${editing ? "cursor-pointer" : ""}`}>
                            {
                                !editing &&
                                <div className={`box-border w-[35px] h-[35px] text-white rounded-full flex justify-center items-center z-10 ring-[6.5px] p-2 ${PRODUCT_CREATION_STEPS.SALES_INFORMATION === currentStep ? "bg-primary ring-[#92CAFF]" : "bg-[#C4C4C4] ring-[#E5E5E5]"}`}>
                                    2
                                </div>
                            }
                            <div className={`absolute top-[140%] text-center self-center text-[13px] ${PRODUCT_CREATION_STEPS.SALES_INFORMATION === currentStep ? "text-primary font-bold" : "text-[#868686]"}`}>
                            {t("products:sale-information")}
                            </div>
                        </div>
                        <div style={{ display: editing ? "none" : "auto" }} className='absolute h-[3px] bg-[#E5E5E5] w-full' />
                    </div>

                </div>
            }
            {
                editing &&
                <div className='rounded-[10px] relative flex items-center select-none md:border-[1px] md:border-[#EEEEEE] overflow-hidden flex-col md:flex-row shadow-thru'>
                    <div
                        onClick={() => setCurrentStep(PRODUCT_CREATION_STEPS.BASIC_INFORMATION)}
                        className={`w-full flex flex-col relative items-center cursor-pointer py-6 ${PRODUCT_CREATION_STEPS.BASIC_INFORMATION === currentStep ? "bg-primary" : "bg-white"}`}>
                        <div className={`text-center self-center text-[16px] transition-all ease-out ${PRODUCT_CREATION_STEPS.BASIC_INFORMATION === currentStep ? "text-white font-bold" : "text-[#868686]"}`}>
                        {t("products:basic-information")}
                        </div>
                    </div>
                    <div
                        onClick={() => setCurrentStep(PRODUCT_CREATION_STEPS.SALES_INFORMATION)}
                        className={`w-full flex flex-col relative items-center cursor-pointer py-6 ${PRODUCT_CREATION_STEPS.SALES_INFORMATION === currentStep ? "bg-primary" : "bg-white"}`}>
                        <div className={`text-center self-center text-[16px] transition-all ease-out ${PRODUCT_CREATION_STEPS.SALES_INFORMATION === currentStep ? "text-white font-bold" : "text-[#868686]"}`}>
                        {t("products:sale-information")}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Stepper