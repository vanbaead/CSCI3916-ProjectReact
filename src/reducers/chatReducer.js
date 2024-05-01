import constants from "../constants/actionTypes";

let initialState = {
    chats: []
}

const chatReducer = (state = initialState, action) => {
    var updated = Object.assign({}, state);

    switch(action.type) {
        case constants.UPDATE_CHATS:
            updated['chats'] = action.chats;
            return updated;
        
        default:
            return state;
    }
}

export default chatReducer