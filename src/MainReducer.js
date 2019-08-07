const initState = {
  blogLikes: {}
}

export const mainReducer = (state=initState, action) => {
  if (action.type === "update" && action.blogId) {
    let blogLikes = {...state.blogLikes};
    let currentCount = blogLikes[action.blogId] || 0;
    blogLikes[action.blogId] = currentCount + action.change;
    return {...state, blogLikes};
  } else {
    return {...state};
  }
}