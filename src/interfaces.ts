export interface Course {
    "id": number | undefined,
    "name": string | undefined,
    "image": string | undefined,
    "description": string | undefined,
    "createdAt": string | undefined,
    "provider": string | undefined,
    "instructor": string | undefined,
    "certificate": string | undefined,
    "skilllevel": string | undefined,
    "durationInHours": string | undefined,
    "format": string | undefined,
    "startDate": string | undefined,
    "costFree": boolean | undefined,
    "domainSpecific": boolean | undefined,
    "link": string | undefined
}

export interface Review {
    "feedbackID": number | undefined,
    "title": string | undefined,
    "description": string | undefined,
    "rating": number | undefined,
    "courseID": number | undefined,
    "userID": number | undefined,
    "username": string | undefined,
}

export interface Category {
    "categoryID": number | undefined,
    "name": string | undefined,
}

export interface TreeInterface {
    "title": string | undefined,
    "value": string | undefined,
    "key": string | undefined,
    "children": Array<TreeInterface> |undefined
}