import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { stringify } from 'query-string';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PulseLoader } from 'react-spinners';
import { CategoryModel } from '../../../src/models/CategoryModel';
import { callCategories } from '../../../src/redux/actions/productsActions';
import { selectCategories } from '../../../src/redux/reducers/productsReducer';
import colores from '../../../src/utils/colores';
import Button from '../../Button';
import ItemCategory from './ItemCategory';

interface SelectProductCategoryProps {
  closeDialogue: () => void
  changeCategory: (category: CategoryModel) => void
}

const SelectProductCategory = ({ closeDialogue, changeCategory }: SelectProductCategoryProps) => {
  const { t } = useTranslation();
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!categories)
      callCategories(dispatch);
  }, [categories])
  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 z-[70] flex justify-center p-5 overflow-y-scroll'>
      <div className='bg-white py-[22px] px-[28px] rounded-[6px] md:min-w-[356px] w-full md:w-auto min-h-[300px] max-h-[700px] overflow-y-scroll my-auto'>
        <h2 className='text-[20px] text-primary font-bold text-center'>{t("products:select-category")}</h2>
        {
          categories ?
            categories.map((category: CategoryModel) => <ItemCategory
              key={category.id}
              changeCategory={changeCategory}
              category={category}
              depth={0}
            />) :
            <div className='mt-[2rem] w-full mx-auto flex justify-center'>
              <PulseLoader color={colores.primary}></PulseLoader>
            </div>
        }
        <div className='flex mt-[24px] w-full justify-around'>
          <Button onClick={closeDialogue} text={t("products:cancel")} color="secondary" />
        </div>
      </div>
    </div>
  )
}

export default SelectProductCategory