import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {changeBookmarkStatus, getBookmarks} from "../api/bookmarks.ts";
import {Course} from "../constants/interfaces.ts";

const intialState: { bookmarks: number[] } = {
    bookmarks: await getBookmarks().then((bookmarks: Course[]) => bookmarks.map((bookmark) => bookmark.id) as number[])
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
        },
        initBookmarks: (state, action: PayloadAction<number[]>) => {
            state.bookmarks = action.payload
        }
    }
})

export const {
    changeBookmark,
    initBookmarks,
} = bookmarkSlice.actions

export default bookmarkSlice.reducer