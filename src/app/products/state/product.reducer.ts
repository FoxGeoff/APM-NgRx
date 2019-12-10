import * as fromRoot from '../../state/app.state';
import { Product } from '../product';
import { InitialState } from '@ngrx/store/src/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

/* Lazy loading of global state */
export interface State extends fromRoot.State {
    products: ProductState;
}
/* Lazy loading */
export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
}

/* Initialization */
const initialState: ProductState = {
    showProductCode: true,
    currentProduct: null,
    products: []
}

/* Feature Selector */
const getProductFeatureState =
    createFeatureSelector<ProductState>('products');

/* Compose Selector(s) - export */
export const getShowProductCode =
    createSelector(
        getProductFeatureState,
        state => state.showProductCode
    );
export const getCurrentProduct =
    createSelector(
        getProductFeatureState,
        state => state.currentProduct
    );
export const getProducts =
    createSelector(
        getProductFeatureState,
        state => state.products
    );

export function reducer(state = initialState, action): ProductState {
    switch (action.type) {

        case 'TOGGLE_PRODUCT_CODE':

            console.log('existing state: ' + JSON.stringify(state));
            console.log('payload ToggelProductLoad: ' + action.payload);

            return {
                ...state,
                showProductCode: action.payload
            };

        default:
            return state;
    }
}
