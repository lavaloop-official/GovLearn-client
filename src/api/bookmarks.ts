import {Course} from "../interfaces.ts";
import {fetchWrapper} from "./helper.ts";

export function changeBookmarkStatus(id: number, status: boolean) {
    if (status)
        fetchWrapper.post(`api/v1/bookmarks/${id}`)
    else
        fetchWrapper.delete(`api/v1/bookmarks/${id}`)
}

export async function getBookmarks(): Promise<Course[]> {
    const bookmarks = await fetchWrapper.get("api/v1/bookmarks")
    return bookmarks && bookmarks.payload ? bookmarks.payload : []
}