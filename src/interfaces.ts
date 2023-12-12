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
    "Anbieter": Array<string> | undefined,
    "Wissensbezug": Array<string> | undefined,
    "Verwaltungsspezifisch": boolean | undefined,
    "Zertifikat": boolean | undefined,
    "Kompetenzstufe": Array<Skilllevel> | undefined,
    "Dauer": Array<string> | undefined,
    "Format": Array<Format> | undefined,
    "Startdatum": Date | undefined,
    "Kosten": boolean | undefined,
    "Sonstiges": Array<string> | undefined
}

export enum Skilllevel{
    Anfaenger,
    Fortgeschritten,
    Experte
}

export enum Format{
    Praesenz,
    OnlineLive,
    OnlineSelbstorganisiert,
    Hybrid
}