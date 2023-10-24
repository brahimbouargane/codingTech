import layout from "./layout";
import auth from "./reducers/authSlice"
import message from "./reducers/messageSlice"
import promotions from "./reducers/promotionSlice"
import developers from "./reducers/developerSlice"


const rootReducer = {
  layout,
  auth,
  developers,
  promotions,
  message,
};
export default rootReducer;
