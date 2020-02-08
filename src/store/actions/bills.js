import {
    BILL_INDEX_REQUEST,
    BILL_INDEX_FAILURE,
    BILL_INDEX_SUCCESS,
    BILL_INDEX_META
} from '../types/bills';
import {INDEX_PAGE_SIZE_DEFAULT, INDEX_PAGE_SIZE_OPTIONS} from '../../constants/pagination';
import { showNotification } from './errors';
import { getBillsDataAPI, requestAdmin } from '../../api';
import {errorCodes} from "../../constants/errorMessages";


const fetchIndexRequest = () => {
  return {
    type: BILL_INDEX_REQUEST,
  };
};
const fetchIndexSuccess = ({payload, meta}) => {
  return {
    type: BILL_INDEX_SUCCESS,
    payload,
    meta,
  };
};
const fetchIndexFailure = () => {
  return {
    type: BILL_INDEX_FAILURE,
  };
};
export const changePageSize = (pageSize = INDEX_PAGE_SIZE_DEFAULT) => {
    if (pageSize < 1) {
        pageSize = 10;
    }

    if (pageSize > 100) {
        pageSize = 100;
    }

    return {
        type: BILL_INDEX_META,
        meta: {
            pageSize,
            page: 1,
        },
    };
}

export const goToPage = (page = 1) => {
    return (dispatch, getState) => {
        const { meta } = getState().bills;

        if (page < 1) {
            page = 1;
        }

        if (page > meta.pageTotal) {
            page = meta.pageTotal - 1;
        }

        dispatch({
            type: BILL_INDEX_META,
            meta: {
                page,
            },
        });
    };
}

export const changeFilter = (filter) =>   ({
            type: BILL_INDEX_META,
            meta: {
                filter,
            },
        })


export function getBillsData() {
  return async (dispatch, getState) => {
    const { meta } = getState().bills;

    dispatch(fetchIndexRequest());

    let payload = [];
    const response = await requestAdmin(getBillsDataAPI, {
        limit: meta.pageSize,
        page: meta.page - 1,
        filter: meta.filter
    });

    if (!response || response.error) {
      // if response.code is <some value> ... then type = errorTypes.NO_RESPONSE!!!
      dispatch(
          showNotification({
              code: response && response.code || errorCodes.UNEXPECTED_ERROR,
              message: response && response.message || '',
          })
      );
      dispatch(fetchIndexFailure());
      return;
    }

    if (response) {
      payload = response.data.result.data;
    }

    let paging = response.data.result.meta || {};
    dispatch(fetchIndexSuccess({
        payload,
        meta: {
          page: 1 + paging.offset / paging.limit,
          pageSize: paging.limit,
          pageTotal: Math.ceil(paging.total / paging.limit),
          total: paging.total,
        },
    }));
  };
}
