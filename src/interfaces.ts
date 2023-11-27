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
    "domainSpecific": boolean | undefined
}

export interface Review {
    "feedbackID": number | undefined,
    "title": string | undefined,
    "description": string | undefined,
    "rating": number | undefined,
    "courseID": number | undefined,
    "userID": number | undefined,
}