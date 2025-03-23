// src/reducers/employeeReducer.js

import {
  ADD_EMPLOYEE_FAILURE,
  ADD_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAILURE,
  DELETE_EMPLOYEE_SUCCESS,
  FETCH_EMPLOYEES_FAILURE,
  FETCH_EMPLOYEES_SUCCESS,
  UPDATE_EMPLOYEE_FAILURE,
  UPDATE_EMPLOYEE_SUCCESS,
} from "../actions/employeeActions";

const initialState = {
  employees: [],
  total: 0,
  loading: false,
  error: null,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: action.payload.employees,
        total: action.payload.total,
        loading: false,
        error: null,
      };
    case FETCH_EMPLOYEES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: [...state.employees, action.payload],
        error: null,
      };
    case ADD_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: state.employees.map((emp) =>
          emp._id === action.payload._id ? action.payload : emp
        ),
        error: null,
      };
    case UPDATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: state.employees.filter((emp) => emp._id !== action.payload),
        error: null,
      };
    case DELETE_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default employeeReducer;
