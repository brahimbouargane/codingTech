import layout from "./layout";
import auth from "./reducers/authSlice"
import message from "./reducers/messageSlice"
import promotions from "./reducers/promotionSlice"


const rootReducer = {
  layout,
  auth,
  promotions,
  message,
};
export default rootReducer;
