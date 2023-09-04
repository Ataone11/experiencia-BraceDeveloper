import React from 'react';
import Image from "next/image";
import Link from "next/link";
import arrow from '../../src/screens/general/login/arrowGradient.svg'

const TermsConditions = ({setShowTerms}: any) => {

    function closeTerms(){
        setShowTerms(false)
    }

    return (
        <div className="fixed top-0 bottom-0 z-20 w-screen h-screen overflow-scroll bg-white p-5 lg:flex lg:justify-center h-screen">
            <div className="lg:w-3/4">

                <div onClick={closeTerms} className="flex flex-row justify-between">
                    <Image src={arrow}/>
                    <h2 className="text-[25px] text-[#425AC5]">Terminos y condiciones</h2>
                </div>

                <>
                    <h6 className="mt-10">Termino 1</h6>
                    <div className="h-[1px] w-3/12 border-transparent bg-gradient-to-r from-[#9955D4] to-[#425AC5]"/>
                    <p className="text-justify mt-4 text-[12px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra diam gravida quam massa. Condimentum facilisi quisque vel sit nulla eu dui. Turpis scelerisque est integer auctor odio mattis quis. Faucibus id turpis tellus gravida mauris. Molestie viverra odio diam etiam nisl, posuere nunc. Pretium aliquet sed ac vitae. Ligula id cum adipiscing auctor at id. Arcu consectetur massa, molestie libero, risus dis sed. Faucibus senectus viverra placerat amet tempus facilisis rhoncus, interdum. Placerat ac et sit dictum vitae sapien, ipsum. Velit sit at arcu nisl neque. Curabitur mattis amet a in odio amet. Placerat cursus lorem nulla placerat. Sed nec eu netus eu arcu at nisl. Nec, urna, ultrices consectetur pulvinar purus. </p>
                </>

                <>
                    <h6 className="mt-10">Termino 2</h6>
                    <div className="h-[1px] w-3/12 border-transparent bg-gradient-to-r from-[#9955D4] to-[#425AC5]"/>
                    <p className="text-justify mt-4 text-[12px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra diam gravida quam massa. Condimentum facilisi quisque vel sit nulla eu dui. Turpis scelerisque est integer auctor odio mattis quis. Faucibus id turpis tellus gravida mauris. Molestie viverra odio diam etiam nisl, posuere nunc. Pretium aliquet sed ac vitae. Ligula id cum adipiscing auctor at id. Arcu consectetur massa, molestie libero, risus dis sed. Faucibus senectus viverra placerat amet tempus facilisis rhoncus, interdum. Placerat ac et sit dictum vitae sapien, ipsum. Velit sit at arcu nisl neque.  </p>
                </>

                <>
                    <h6 className="mt-10">Termino 3</h6>
                    <div className="h-[1px] w-3/12 border-transparent bg-gradient-to-r from-[#9955D4] to-[#425AC5]"/>
                    <p className="text-justify mt-4 text-[12px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra diam gravida quam massa. Condimentum facilisi quisque vel sit nulla eu dui. Turpis scelerisque est integer auctor odio mattis quis. Faucibus id turpis tellus gravida mauris. Molestie viverra odio diam etiam nisl, posuere nunc. Pretium aliquet sed ac vitae. Ligula id cum adipiscing auctor at id. Arcu consectetur massa, molestie libero, risus dis sed. Faucibus senectus viverra placerat amet tempus facilisis rhoncus, interdum. Placerat ac et sit dictum vitae sapien, ipsum. Velit sit at arcu nisl neque.  </p>
                </>


                <div className="flex justify-center items-center pb-9 lg:pb-0 mt-10">
                    <button onClick={closeTerms} className="bg-primary text-white w-[166px] h-[33px] rounded-[5px]">
                        Regresar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TermsConditions;