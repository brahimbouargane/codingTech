import layout from "./layout";
import auth from "./reducers/authSlice"
import message from "./reducers/messageSlice"
import promotions from "./reducers/promotionSlice"
import developers from "./reducers/developerSlice"
import recuiters from "./reducers/recruiterSlice"


const rootReducer = {
  layout,
  auth,
  developers,
  recuiters,
  promotions,
  message,
};
export default rootReducer;
