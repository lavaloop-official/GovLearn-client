import {Format, Role, Skilllevel} from "./Enum"

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
    "anbieter": Array<string> | undefined,
    "wissensbezug": Array<string> | undefined,
    "verwaltungsspezifisch": boolean | undefined,
    "zertifikat": boolean | undefined,
    "kompetenzstufe": Array<Skilllevel> | undefined,
    "dauer": Array<string> | undefined,
    "format": Array<Format> | undefined,
    "startdatum": Date | undefined,
    "kostenlos": boolean | undefined,
    "sonstiges": Array<string> | undefined
}

export interface Group {
    "groupId": number | undefined,
    "groupName": string | undefined,
    "groupDescription": string | undefined,
    "role": Role | undefined,
}

export interface GroupCreationWsTo {
    "groupName": string | undefined,
    "groupDescription": string | undefined,
}

export interface GroupEditWsTo {
    "groupId": number | undefined,
    "groupName": string | undefined,
    "groupDescription": string | undefined,
}

export interface GroupInvitationWsTo {
    "groupId": number | undefined,
    "groupName": string | undefined,
    "groupDescription": string | undefined,
    "invitationId": number | undefined,
}

export interface SendInvitationWsTo {
    "userEmail": string | undefined,
    "groupId": number | undefined,
}

export interface Groupmember {
    "memberId": number | undefined,
    "email": string | undefined,
    "name": string | undefined,
    "memberSince": string | undefined,
    "role": Role | undefined,
}

export interface User {
    "email": string | undefined,
    "name": string | undefined,
}