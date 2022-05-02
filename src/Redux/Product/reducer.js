import { ADD_PRODUCTS,SORT } from "./actions";

const init = {orders:[]};

export const productReducer = (store = init, { type, payload }) => {
  switch (type) {
    case ADD_PRODUCTS:
      return {orders:payload}
      case SORT:
      console.log("rd",payload);
      console.log(store);
      const sortedOrders = store.orders.sort((a,b) => {
        if(a[payload] < b[payload]) return 1;
        else if(a[payload] > b[payload]) return -1;
        return 0;
      })
      console.log(sortedOrders);
      return {...store,orders: sortedOrders}
    default:
      return store;
  }
};
