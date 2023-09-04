
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { CombinationModel, IncotermModel, ProductDetailModel, ProductIncotermModel, ProductModel } from '../../../src/models/ProductModel';
import { callUpdateCombinations, callCreateProduct, callProductById, callUpdateProduct, callCreateProductDetail, callCategoryById } from '../../../src/redux/actions/productsActions';
import { getUser } from '../../../src/redux/reducers/authReducer';
import BasePage from '../../../src/screens/general/base/BasePage';
import { HTTP_STATUSES } from '../../../src/utils/requestStatuses';
import Button from '../../Button';
import ProductBasicInformation from '../ProductBasicInformation';
import ProductSaleInformation from '../ProductSaleInformation';
import BackIcon from '../../../src/assets/profile/back.svg'
import colores from '../../../src/utils/colores';
import { VariantModel, VariantValueModel } from '../../../src/models/CategoryModel';
import Stepper, { PRODUCT_CREATION_STEPS } from '../Stepper';
import { INCOTERMS, PRODUCT_STATUS } from '../../../src/utils/constants';
import { ProductCategoryFeatureModel } from '../../../src/models/ProductCategoryFeatureModel';
import { useTranslation } from 'next-i18next';

const CreateEditProduct = () => {
    const router = useRouter();
    const user = useSelector(getUser);
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState<PRODUCT_CREATION_STEPS>(PRODUCT_CREATION_STEPS.BASIC_INFORMATION);
    const [basicInformation, setBasicInformation] = useState<ProductModel | null>(null);
    const editing = !!router.query.id;
    const [productDetail, setProductDetail] = useState<ProductDetailModel | null>({
        has_discount: false,
        sku: null,
        infoEXW: null,
        infoFOB: null,
        productIncotermsIdsToDelete: []
    });
    const [categoryFeatures, setCategoryFeatures] = useState<ProductCategoryFeatureModel[] | null>(null);

    // Product sale information
    const [categoryVariants, setCategoryVariants] = useState<any>(null);
    const selectedVariants: VariantModel[] = categoryVariants && Object.values(categoryVariants).filter((variant: any) => variant.selected);
    const [combinations, setCombinations] = useState<CombinationModel[] | null>(null);
    const [combinationsIdsToDelete, setCombinationsIdsToDelete] = useState<number[]>([]);
    const [hasVariants, setHasVariants] = useState(false);
    const [hasEXW, setHasEXW] = useState(false);
    const [hasFOB, setHasFOB] = useState(false);

    const loadProduct = async () => {
        if (typeof router.query.id === "string") {
            setLoading(true);
            const res = await callProductById(parseInt(router.query.id));
            setBasicInformation(res);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (router.query.id) {
            loadProduct();
        } else {
            setBasicInformation({
                name: null,
                moq: null,
                unit: null,
                hs_code: null,
                sends_samples: false,
                description: null,
                custom_properties: [],
                photos: [],
                category: null,
                status: PRODUCT_STATUS[2].value,
                category_features_values: []
            });
        }
    }, [router.query.id]);


    const renderStep = () => {
        if (basicInformation) {
            if (currentStep === PRODUCT_CREATION_STEPS.BASIC_INFORMATION)
                return <ProductBasicInformation
                    editing={editing}
                    basicInformation={basicInformation}
                    setBasicInformation={setBasicInformation}
                    hasVariants={hasVariants}
                    setHasVariants={setHasVariants}
                    categoryVariants={categoryVariants}
                    setCategoryVariants={setCategoryVariants}
                    combinations={combinations}
                    setCombinations={setCombinations}
                    combinationsIdsToDelete={combinationsIdsToDelete}
                    setCombinationsIdsToDelete={setCombinationsIdsToDelete}
                    setProductDetail={setProductDetail}
                    categoryFeatures={categoryFeatures} />
            else if (currentStep === PRODUCT_CREATION_STEPS.SALES_INFORMATION)
                return <ProductSaleInformation
                    hasVariants={hasVariants}
                    basicInformation={basicInformation}
                    combinations={combinations}
                    setCombinations={setCombinations}
                    combinationsIdsToDelete={combinationsIdsToDelete}
                    setCombinationsIdsToDelete={setCombinationsIdsToDelete}
                    categoryVariants={categoryVariants}
                    setCategoryVariants={setCategoryVariants}
                    selectedVariants={selectedVariants}
                    hasEXW={hasEXW}
                    setHasEXW={setHasEXW}
                    hasFOB={hasFOB}
                    setHasFOB={setHasFOB}
                    productDetail={productDetail}
                    setProductDetail={setProductDetail}
                />
        }
    }

    const createProductBasicInformation = async () => {
        if (user && basicInformation) {
            if (basicInformation.hs_code && basicInformation.hs_code.toString().length !== 10) {
                toast.error(t("products:HS"))
                return
            }

            setLoading(true);
            const res = await callCreateProduct(basicInformation, user.id);
            setLoading(false);

            if (res.statusCode === HTTP_STATUSES.CREATED) {
                setBasicInformation({
                    ...basicInformation,
                    id: res.data.id,
                });
                setCurrentStep(PRODUCT_CREATION_STEPS.SALES_INFORMATION);
                toast.success(t("products:the-basic-information-of-your-product-has-already-been-saved"))
            } else if (res.response.data.message) {
                toast.error(res.response.data.message)
                return false;
            } else {
                toast.error(t("products:an-error-occurred-trying-to-create-the-product,-please-try again"))
            }
        }
    }

    const updateProductBasicInformation = async () => {
        if (user && basicInformation) {
            if (basicInformation.hs_code && basicInformation.hs_code.toString().length !== 10) {
                toast.error(t("products:HS"))
                return
            }
            setLoading(true);
            const res = await callUpdateProduct(basicInformation, parseInt(router.query.id as string));
            setLoading(false);

            if (res.statusCode === HTTP_STATUSES.SUCCESS) {
                setBasicInformation(res.data);
                return true;
            } else if (res.response.data.message) {
                toast.error(res.response.data.message)
                return false;
            } else {
                toast.error(t("products:an-error-occurred-updating-the-product,-please-try-again-later"))
                return false;
            }
        }
    }

    const updateProductCombinations = async () => {
        if (router.query?.id && combinations) {
            let allVariantsFilledForAllCombinations = true;
            let allIncotermsPricesFilled = true;

            combinations?.forEach((combination: CombinationModel) => {
                selectedVariants.forEach((variant: VariantModel) => {
                    const variantInCombination = combination.variants.find((combVariant: VariantModel) => combVariant.id === variant.id);
                    allVariantsFilledForAllCombinations = allVariantsFilledForAllCombinations && !!variantInCombination?.selectedVariantValueId;
                });

                if (hasEXW) {
                    allIncotermsPricesFilled = allIncotermsPricesFilled && !!combination.infoEXW?.price;
                    if (combination.has_discount) {
                        allIncotermsPricesFilled = allIncotermsPricesFilled && !!combination.infoEXW?.discount_price;
                    }
                }

                if (hasFOB) {
                    allIncotermsPricesFilled = allIncotermsPricesFilled && !!combination.infoFOB?.price;
                    if (combination.has_discount) {
                        allIncotermsPricesFilled = allIncotermsPricesFilled && !!combination.infoFOB?.discount_price;
                    }
                }
            });


            if (!allVariantsFilledForAllCombinations) {
                toast.error("Por favor seleccione el valor de las variantes en todas las combinaciones.");
                return false;
            } else if (!allIncotermsPricesFilled) {
                toast.error("Por favor agregue todos los precios en todos los incoterms");
                return false;
            }
            await callUpdateCombinations(combinations, parseInt(router.query.id as string), combinationsIdsToDelete);
            return true;
        } else if (combinations) {
            await callUpdateCombinations(combinations, basicInformation?.id as number, []);
            return true;
        }
    }

    const updateProductDetail = async () => {
        if (!hasEXW && !hasFOB) {
            toast.error("Debe seleccionar al menos uno de los incoterms");
            return false
        }

        if (
            (hasEXW && productDetail?.has_discount && productDetail?.infoEXW?.price && productDetail?.infoEXW?.discount_price && (productDetail.infoEXW.discount_price >= productDetail.infoEXW.price)) ||
            (hasFOB && productDetail?.has_discount && productDetail?.infoFOB?.price && productDetail?.infoFOB?.discount_price && (productDetail.infoFOB.discount_price >= productDetail.infoFOB.price))
        ) {
            toast.error("Los precios en descuento deben ser menores a los estandar");
            return false
        }

        if (productDetail && basicInformation?.id) {
            await callCreateProductDetail(productDetail, basicInformation.id, combinationsIdsToDelete);
            return true
        }

    }

    const createProductSaleInformation = async () => {
        if (hasVariants) {
            return await updateProductCombinations()
        } else {
            return await updateProductDetail();
        }
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (!editing) {
            if (currentStep === PRODUCT_CREATION_STEPS.BASIC_INFORMATION) {
                await createProductBasicInformation();
            } else if (currentStep === PRODUCT_CREATION_STEPS.SALES_INFORMATION) {
                const successSale = await createProductSaleInformation()
                if (successSale) {
                    toast.success("Información de venta creada, busca tu producto, completa su información y activalo en la plataforma");
                    router.push("/");
                }
            }
        } else {
            const successBasic = await updateProductBasicInformation();
            if (successBasic) {
                const successSale = await createProductSaleInformation();
                if (successSale) {
                    toast.success("Producto actualizado");
                    router.push("/");
                }
            }
        }
    }

    // Product Sale info

    const loadCategoryVariants = async () => {
        if (basicInformation?.category?.id) {
            const res = await callCategoryById(basicInformation?.category.id);
            let loadedVariants = {};
            res.variants.forEach((variant: any) => {
                loadedVariants = {
                    ...loadedVariants,
                    [variant.id]: variant
                }
            })
            setCategoryVariants(loadedVariants)
            setCategoryFeatures(res.features)
        } else {
            setCategoryVariants([])
        }
    }

    useEffect(() => {
        if (categoryVariants && basicInformation && !combinations) {
            prepareCurrentCombinationsData();
        }
    }, [categoryVariants, basicInformation]);

    useEffect(() => {
        if (basicInformation?.category?.id) {
            loadCategoryVariants()
        }
    }, [basicInformation?.category?.id]);

    const prepareCurrentCombinationsData = () => {
        if (basicInformation?.product_details && categoryVariants) {
            // Revisar si el producto tiene variantes
            const currentHasVariants = !!basicInformation?.product_details[0]?.variant_values && basicInformation?.product_details[0]?.variant_values?.length > 0;
            setHasVariants(currentHasVariants);

            if (currentHasVariants) {
                const currentSelectedVariants: VariantModel[] = [];
                basicInformation?.product_details[0].variant_values?.forEach((variantValue: VariantValueModel) => {
                    if (!currentSelectedVariants.includes(variantValue.variant)) {
                        currentSelectedVariants.push(variantValue.variant);
                    }
                });

                const newCategoryVariants = {
                    ...categoryVariants
                };
                currentSelectedVariants.forEach((variant: VariantModel) => {
                    newCategoryVariants[variant.id] = {
                        ...categoryVariants[variant.id],
                        selected: !categoryVariants[variant.id]?.selected
                    }
                });
                setCategoryVariants(newCategoryVariants);

                const currentHasEXW = basicInformation?.product_details[0].product_incoterms?.find((productIncoterm: ProductIncotermModel) => (productIncoterm?.incoterm as IncotermModel)?.id === INCOTERMS.EXW);
                const currentHasFOB = basicInformation?.product_details[0].product_incoterms?.find((productIncoterm: ProductIncotermModel) => (productIncoterm?.incoterm as IncotermModel)?.id === INCOTERMS.FOB);

                setHasEXW(!!currentHasEXW);
                setHasFOB(!!currentHasFOB);

                const newCombinations = basicInformation?.product_details.map((productDetail: ProductDetailModel) => {
                    const combination: CombinationModel = {
                        id: productDetail.id,
                        photo: productDetail.photo,
                        sku: productDetail.sku || null,
                        variants: currentSelectedVariants,
                        has_discount: !!(productDetail?.product_incoterms && productDetail?.product_incoterms[0].has_discount)
                    };

                    productDetail.product_incoterms?.forEach((productIncoterm: ProductIncotermModel) => {
                        if ((productIncoterm?.incoterm as IncotermModel)?.id === INCOTERMS.EXW) {
                            combination.infoEXW = {
                                id: productIncoterm.id,
                                price: productIncoterm?.price,
                                discount_price: productIncoterm?.discount_price,
                                has_discount: productIncoterm?.has_discount,
                            };
                        }
                        else if ((productIncoterm?.incoterm as IncotermModel)?.id === INCOTERMS.FOB) {
                            combination.infoFOB = {
                                id: productIncoterm.id,
                                price: productIncoterm?.price,
                                discount_price: productIncoterm?.discount_price,
                                has_discount: productIncoterm?.has_discount,
                            };
                        }
                    });

                    combination.variants = combination.variants.map((combinationVariant: any) => {
                        const currentVariantValue: VariantValueModel | undefined = productDetail.variant_values?.find((variantValue: VariantValueModel) => combinationVariant.id === variantValue.variant.id);

                        if (currentVariantValue) {
                            return {
                                ...combinationVariant,
                                selectedVariantValueId: currentVariantValue.id
                            }
                        } else {
                            return combinationVariant;
                        }
                    });

                    return combination;
                });
                setCombinations(newCombinations);
            } else if (basicInformation?.product_details[0]) {
                const infoEXW = basicInformation?.product_details[0].product_incoterms?.find((productIncoterm: ProductIncotermModel) => (productIncoterm?.incoterm as IncotermModel)?.id === INCOTERMS.EXW)
                const infoFOB = basicInformation?.product_details[0].product_incoterms?.find((productIncoterm: ProductIncotermModel) => (productIncoterm?.incoterm as IncotermModel)?.id === INCOTERMS.FOB)
                setProductDetail({
                    id: basicInformation?.product_details[0].id,
                    infoEXW,
                    infoFOB,
                    sku: basicInformation?.product_details[0].sku,
                    has_discount: !!infoEXW?.discount_price || !!infoFOB?.discount_price
                });
                setHasEXW(!!infoEXW);
                setHasFOB(!!infoFOB);
                setCombinations([]);
            }
        }
    }
    
    const { t } = useTranslation();

    return (
        <BasePage title={router.query.id ? (basicInformation?.name || "Editando producto") : 'Nuevo producto'}>
            {
                loading && <div className='flex justify-center items-center px-10 h-full'>
                    <PulseLoader color={colores.primary}></PulseLoader>
                </div>
            }
            {
                !loading &&
                <form id="product-form" onSubmit={onSubmit} className='w-full flex flex-col max-w-[1100px] mx-auto px-5'>
                    <div className='flex flex-col md:flex-row justify-between items-center pb-[2rem]'>
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => router.push("/")}
                        >
                            <Image alt="" src={BackIcon} />
                            <p className="text-[1.2rem] text-dark-blue ml-[1rem] font-semibold">
                            {t("products:back-to-products")}
                            </p>
                        </div>
                        <div className='flex mt-5 md:mt-0'>
                            <Button onClick={() => router.push("/")} text='Cancelar' color="secondary" />
                            <Button type='submit' text={editing ? "Guardar" :t("products:next")} className='ml-[30px]' />
                        </div>
                    </div>
                    <Stepper {...{ basicInformation, currentStep, editing, setCurrentStep }} />
                    {renderStep()}
                    <div className='flex mt-5 mx-auto lg:mr-0 lg:ml-auto'>
                        <Button onClick={() => router.push("/")} text={t("products:cancel")} color="secondary" />
                        <Button type='submit' text={editing ? t("products:save") : t("products:next")} className='ml-[30px]' />
                    </div>
                </form>
            }
        </BasePage>
    )
}

export default CreateEditProduct;