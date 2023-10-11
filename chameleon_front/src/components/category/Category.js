/** @jsxImportSource @emotion/react */
import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import * as s from './CategoryStyle';

const Category = ({ setGetVideosData, setCategoryId, setGetVideosRefresh}) => {
    
    const [ getCategoryRefresh, setGetCategoryRefresh ] = useState(true);
    const [ categoryData, setCategoryData ] = useState([])
    const [ currentCategory, setCurrentCategory ] = useState(5); 
    
    const getCategories = useQuery(["getCategory"], async() => {
        const response = await axios.get("http://localhost:8080/categories")

        return response;
    },{
        enabled: getCategoryRefresh,
        onSuccess: (response) => {
            setGetCategoryRefresh(false);
            setCategoryData(response.data)
        }
    });

    const categoryClickHandle = (categoryId) => {
        setGetVideosData({page: 1 });
        setCategoryId(categoryId)
        setGetVideosRefresh(true)
        setCurrentCategory(categoryId)
    }
    
    
    return (
        <div css={s.categoryBox}>
        {getCategories.isLoading ? (<div>로딩중</div>) : categoryData !== undefined ? categoryData.map((category, index) => (
            <div css={s.categoryButton(currentCategory, category.categoryId)} key={category.categoryId} onClick={() => categoryClickHandle(category.categoryId)}>{category.categoryName}</div>
        )) : "찾을 수 없음"}
        </div>
    );
};
export default Category;