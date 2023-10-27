import layout from "./layout";
import auth from "./reducers/authSlice"
import message from "./reducers/messageSlice"
import promotion from "./reducers/promotionSlice"
import developer from "./reducers/developerSlice"
import recruiter from "./reducers/recruiterSlice"
import former from "./reducers/formerSlice"


const rootReducer = {
  layout,
  auth,
  developer,
  promotion,
  recruiter,
  former,
  message,
};
export default rootReducer;
