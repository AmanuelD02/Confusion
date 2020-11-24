import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId:dishId,
        rating:rating,
        author:author,
        comment:comment
    }
});


export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes))); 
}

export const dishesLoading=() => ({
    type:ActionTypes.DISHES_LOADING
});

export const addDishes = (dishes) =>({
    type:ActionTypes.ADD_DISHES,
    payload: dishes
});

export const dishesFailed = (err) =>({
    type:ActionTypes.DISHES_FAILED,
    payload: err
});

// COMMENTS

export const fetchComments = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'comments')
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments))); 
}

export const commentFailed = (err) => ({
    type:ActionTypes.COMMENTS_FAILED,
    payload: err
});

export const addComments = (comments) =>({
    type:ActionTypes.ADD_COMMENTS,
    payload: comments
});

// PROMOS

export const fetchPromos = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'promotions')
    .then(response => response.json())
    .then(Promos => dispatch(addPromos(Promos))); 
}

export const PromotFailed = (err) => ({
    type:ActionTypes.PROMOS_FAILED,
    payload: err
});

export const addPromos = (Promos) =>({
    type:ActionTypes.ADD_PROMOS,
    payload: Promos
});

export const promossLoading=() => ({
    type:ActionTypes.DISHES_LOADING
});