import {combineReducers} from "redux";
import MapReducer from "../../modules/floorMap/reducers/mapReducer"
import RangeReducer from "../../modules/scanner/reducers/RangeReducer"
//import RangeReducer from "../../modules/beaconDetector/reducers/RangeReducer";

export const todoApp = combineReducers({
    MapReducer,
    RangeReducer
});

