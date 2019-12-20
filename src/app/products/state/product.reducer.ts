import * as fromRoot from '../../state/app.state';
import { Product } from '../product';
import { InitialState } from '@ngrx/store/src/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActionTypes } from './product.actions';

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
};

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

        case ProductActionTypes.ToggleProductCode:

            return {
                ...state,
                showProductCode: action.payload
            };

        case ProductActionTypes.SetCurrentProduct:

            return {
                ...state,
                currentProduct: { ...action.payload }
            };

        case ProductActionTypes.ClearCurrentProduct:

            return {
                ...state,
                currentProduct: null
            };

        case ProductActionTypes.InitializeCurrentProduct:

            return {
                ...state,
                currentProduct: {
                    id: 0,
                    productName: '',
                    productCode: 'New',
                    description: '',
                    starRating: 0
                }
            };

        case ProductActionTypes.LoadSuccess:

        return {
          ...state,
          products: action.payload
        };

        default:
            return state;
    }
}
