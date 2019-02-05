
const initialState = {
  login: null,
  datas: [],
  imgFile: [],
  detailData: null,
  searchText: "",
  category: "",
  subCategory: "",
  condition: "",
  commission: "",
  location: "",
  date: "",
  method: "",
  price: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        login: true,
      };
    case "ALL_DATAS":
      return {
        ...state,
        datas: action.payload,
      };
    case "ADD_STATE":
      {
        const { payload, meta } = action;
        const imgFile = state.imgFile.concat();
        imgFile[meta] = payload;
        return {
          ...state,
          imgFile: imgFile
        };
      }
    case "DETAIL":
      return {
        ...state,
        detailData: action.payload,
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };
    case "ADD_SUB_CATEGORY":
      return {
        ...state,
        subCategory: action.payload,
      };
    case "ADD_CONDITION":
      return {
        ...state,
        condition: action.payload,
      };
    case "ADD_COMMISSION":
      return {
        ...state,
        commission: action.payload,
      };
    case "ADD_LOCATION":
      return {
        ...state,
        location: action.payload,
      };
    case "ADD_DATE":
      return {
        ...state,
        date: action.payload,
      };
    case "ADD_METHOD":
      return {
        ...state,
        method: action.payload,
      };
    case "ADD_PRICE":
      return {
        ...state,
        price: action.payload,
      };
    case "INITIAL_STATE":
      return {
        ...state,
        imgFile: [],
        category: "",
        subCategory: "",
        condition: "",
        commission: "",
        location: "",
        date: "",
        method: "",
        price: ""
      };
    case "SEARCH_TEXT":
      return {
        ...state,
        searchText: action.payload,
      };
    default:
      return state;
  }
}