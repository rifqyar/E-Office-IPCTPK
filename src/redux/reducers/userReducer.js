const initialState = {
    user: 'TESTING'
}

const userReducer = (state = initialState, action) => {
    const { type, payload} = action;
    switch(type){
        default:
        return {
          ...state
        }
    }
}

export default userReducer;