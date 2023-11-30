import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {changeBookmarkStatus, getBookmarks} from "../api/helper.ts";

const intialState: {bookmarks: number[]} = {
    bookmarks: await getBookmarks()
}

const bookmarkSlice = createSlice({
    name: 'bookmark',
    initialState: intialState,
    reducers: {
        changeBookmark: (state, action: PayloadAction<number>) => {
            if (state.bookmarks.includes(action.payload)) {
                state.bookmarks = state.bookmarks.filter((bookmark) => bookmark !== action.payload);
                changeBookmarkStatus(action.payload, false)
            } else {
                state.bookmarks.push(action.payload);
                changeBookmarkStatus(action.payload, true)
            }
        }
    }
})

export const {
    changeBookmark
} = bookmarkSlice.actions

export default bookmarkSlice.reducer