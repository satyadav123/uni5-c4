// action types
export const ADD_PRODUCTS = "ADD_PRODUCTS";
export const CHANGE_STATUS = "CHANGE_STATUS";
export const SORT = "SORT";

// Action Creators
const addProducts = (orders) =>{
    // console.log(orders)
    return {
        type:ADD_PRODUCTS,
        payload:orders
    }
}

const sort = (sortBy) => {
    return {
        type: SORT,
        payload: sortBy
    }
}

export {addProducts,sort};