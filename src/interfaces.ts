import { Format, Skilllevel } from "./Enum"

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
    "link": string | undefined,
    "ratingAverage": number | undefined,
    "ratingAmount": number | undefined,
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
    "id": number | undefined,
    "name": string | undefined,
}

export interface Coursetag {
    "id": number | undefined,
    "name": string | undefined,
    "categoryID": number | undefined,
    "category": string | undefined,
}

export interface CourseFilterWsTo {
    "tagIDs": Array<number> | undefined,
    "anbieter": Array<string> | undefined,
    "wissensbezug": Array<string> | undefined,
    "verwaltungsspezifisch": boolean | undefined,
    "zertifikat": boolean | undefined,
    "kompetenzstufe": Array<Skilllevel> | undefined,
    "dauer": Array<string> | undefined,
    "format": Array<Format> | undefined,
    "startdatum": Date | undefined,
    "kosten": boolean | undefined,
    "sonstiges": Array<string> | undefined
}

export interface Group {
    "id": number | undefined,
    "name": string | undefined,
    "description": string | undefined,
}