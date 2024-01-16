import {Format, Skilllevel} from "./Enum"

export interface Course {
    "id": number | undefined,
    "name": string | undefined,
    "image": string | undefined,
    "description": string | undefined,
    "createdAt": string | undefined,
    "provider": string | undefined,
    "instructor": string | undefined,
    "certificate": string | boolean | undefined,
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

export interface CreateCourse {
    "name": string | undefined,
    "image": string | undefined,
    "description": string | undefined,
    "createdAt": string | undefined,
    "provider": string | undefined,
    "instructor": string | undefined,
    "certificate": string | boolean | undefined,
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
    "format": Array<Format> | undefined,
    "dauerInMinLaengerAls": number | undefined,
    "verwaltungsspezifisch": boolean | undefined,
    "dauerInMinKuerzerAls": number | undefined,
    "anbieter": Array<string> | undefined,
    "startdatum": Date | undefined,
    "kompetenzstufe": Array<Skilllevel> | undefined,
    "zertifikat": boolean | undefined,
    "kostenlos": boolean | undefined
}

export interface Role {
    id: number,
    name: string,
    description: string,
    verantwortungsbereich: string,
    roleTagWsTos: Array<RoleTag>
}

export interface RoleTag {
    ID: number,
    tagID: number,
    rating: number,
    tagName: string
}

export interface Competences {
    normal: Array<RoleTag>,
    advanced: Array<RoleTag>
}