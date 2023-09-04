import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import NormalInput from '../../src/screens/general/inputs/NormalInput';
import CancelSaveButtons from '../../src/screens/profile/profileCompanyInformation/CancelSaveButtons';
import { ScaleLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { callAddPaymentMethod } from '../../src/redux/actions/paymentsActions';
import { ResponseType } from '../../src/proxy/responseData';

interface AddPaymentMethod {
    onCancel: () => void,
    loadPaymentMethods: () => void
}

const AddPaymentMethod = ({ onCancel, loadPaymentMethods }: AddPaymentMethod) => {
    const [formData, setFormData] = useState({
        name: "ADSDSA",
        card: "234#@$#@",
        email: "hola@hola.com",
        number: "4151611527583283",
        cvc: "123",
        exp_month: "12",
        exp_year: "27"
    });
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState<"name" | "number" | "expiry" | "cvc">("number");
    useEffect(() => {
        (window as any).ePayco.setPublicKey('85f17d3ce6be91ee866495d3ee42fa26');
        (window as any).$ = $;
    }, []);

    const onSubmit = (e: any) => {
        //detiene el evento automático del formulario
        e.preventDefault();
        //hace el llamado al servicio de tokenización
        setLoading(true);
        (window as any).ePayco.token.create({
            card: formData
        }, async function (error: any, token: any) {
            if (!error) {
                // TODO: Guardar el token en el back
                const res = await callAddPaymentMethod(token);
                console.log(res);
                if(res.status === ResponseType.ERROR) {
                    toast.error(res.data?.response?.data?.message);
                    setLoading(false);
                    return
                }
                await loadPaymentMethods();
                onCancel();
            } else {
                //muestra errores que hayan sucedido en la transacción
                toast.error(error.data.description || error);
            }
            setLoading(false);
        });
    }

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleInputFocus = (e: any, fromTarget: boolean = true) => {
        setFocused(fromTarget ? e.target.name : e);
    }


    return (
        <div
            className="fixed top-0 z-50 left-0 bg-black bg-opacity-30 flex justify-center items-center h-screen w-screen">
            <div
                className="w-screen shadow-2xl lg:w-[513px] lg:h-auto lg:rounded-[0.5rem] lg:p-6 h-screen z-50 bg-white p-5 flex flex-col items-center justify-center">
                <h2 className="text-[20px] font-bold text-primary mb-5">Agregar método de pago</h2>
                <Cards
                    cvc={formData.cvc}
                    expiry={`${formData.exp_month}/${formData.exp_year}`}
                    focused={focused}
                    name={formData.name}
                    number={formData.number}
                />
                <form onSubmit={onSubmit} id="customer-form" className='flex flex-col items-center mt-2'>
                    <div className='grid grid-cols-2 w-full gap-2'>
                        {/* <!-- datos necesarios para tokenizar --> */}
                        <NormalInput onFocus={handleInputFocus} fieldName='Nombre del usuario de tarjeta' type="text" inputName="name" value={formData.name} onChange={handleChange} />
                        <NormalInput fieldName='Email' type="text" inputName="email" value={formData.email} onChange={handleChange} />
                        <NormalInput onFocus={handleInputFocus} fieldName='Número de la tarjeta de crédito' type="text" inputName="number" value={formData.number} onChange={handleChange} />
                        <NormalInput onFocus={handleInputFocus} fieldName='CVC' type="text" minLength={3} max-length={3} inputName="cvc" value={formData.cvc} onChange={handleChange} />
                        <NormalInput onFocus={() => handleInputFocus("expiry", false)} fieldName='Mes de expiración(MM)' type="text" inputName="exp_month" value={formData.exp_month} onChange={handleChange} />
                        <NormalInput onFocus={() => handleInputFocus("expiry", false)} fieldName='Año de expiración(AAAA)' type="text" inputName="exp_year" value={formData.exp_year} onChange={handleChange} />
                    </div>
                    {/* <!-- botón con la acción para enviar el formulario --> */}
                    <div className='mt-[2rem] '>
                        {
                            !loading ?
                                <CancelSaveButtons onCancel={onCancel} /> :
                                <ScaleLoader color="#005C90" />
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPaymentMethod