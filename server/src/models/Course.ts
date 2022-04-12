import { IUser } from "./User";
import mongoose from 'mongoose';
const { model, Schema } = mongoose;

// taken from dept. spreadsheet tracking courses, https://docs.google.com/spreadsheets/d/1NT5l7zAqlXDCivZXcTdsdceSnMD5v28ke6550tnBrnE/edit?usp=sharing
export const GEO_REGIONS = Object.freeze(["Africa", "East Asia", "Europe", "Latin America", "MESA", "North America", "Global"]);
export const SEMESTERS = Object.freeze(["Fall", "Spring", "Winter", "Summer"]);
export const TIMES = Object.freeze(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "T"]);
export const PROPOSAL_STATUS = Object.freeze({
    // initial/default status
    DIRECTOR_REVIEW: "under review by director",
    // undergraduate or graduate director accepts
    DIRECTOR_ACCEPTED: "accepted by director",
    // undergraduate or graduate director rejects
    DIRECTOR_REJECTED: "rejected by director",
    // THIS IS NOT USED YET - manually triggered by manager???
    // CCC_REVIEW: "under review by CCC",
    // manager accepts, reflecting CCC decision
    CCC_ACCEPTED: "accepted by CCC",
    // manager rejects, reflecting CCC decision
    CCC_REJECTED: "rejected by CCC",
});
export const COURSE_STATUS = Object.freeze({
    NEW: "new",
    REVISED: "revised",
    EXISTING: "existing",
});

// do we think my designation of optional variables is fair? Might be something to run by the client,
// not sure whether more/less of these are optional than I might think
export interface ICourse {
    _id?: string, 
    created_at?: Date,
    // core attributes
    course_number: string,
    // crn?: number,
    course_title: string,
    description: string,
    professors: IUser[] | string[],
    // boolean designations
    is_undergrad: boolean, // if false, then grad
    is_DIAP: boolean,
    is_WRIT: boolean,
    is_Premodern: boolean,
    is_FYS: boolean,
    is_SYS: boolean,
    is_capstone: boolean,
    is_lecture: boolean,
    is_intro: boolean,
    is_remote: boolean,
    // enumerated designations
    semester: string,
    year: number,
    // final_time: string, // A,B... hour, so a string of this character
    time_ranking: string[], // array of strings, e.g. [A, C, E]
    geography?: string[], // has to be from geo_regions list -- this is optional b/c we're not sure if graduate courses use these
    // these are optional so that frontend can pass back proposed courses w/o them, but we always set them in submit
    proposal_status?: string,
    course_status?: string, // new, revised, or existing --> these are existing hist. dept. standards that we're replicating here
}

const courseSchema = new Schema<ICourse>({
    created_at: { type: Date, default: Date.now },
    // core attributes
    course_number: { type: String, required: true},
    // crn: {type: Number, required: false},
    course_title: { type: String, required: true},
    description: { type: String, required: true},
    professors: [{type: Schema.Types.ObjectId, ref: 'User'}],
    // boolean designations
    is_undergrad: {type: Boolean, required: true},
    is_DIAP: { type: Boolean, required: true},
    is_WRIT: { type: Boolean, required: true},
    is_Premodern: { type: Boolean, required: true},
    is_FYS: { type: Boolean, required: true},
    is_SYS: { type: Boolean, required: true},
    is_capstone: { type: Boolean, required: true},
    is_lecture: { type: Boolean, required: true},
    is_intro: {type: Boolean, required: true},
    is_remote: {type: Boolean, required: true},
    // enumerated designations
    semester: {type: String, enum: SEMESTERS, required: true},
    year: {type: Number, required: true},
    // final_time: { type: String, enum: TIMES, required: true}, // A,B... hour, so a string of this character
    time_ranking: {type: [String], enum: TIMES, required: true}, // array of strings, e.g. [A, C, E]
    geography: {type: [String], enum: GEO_REGIONS, required: false}, // has to be from geo_regions list
    proposal_status: {type: String, enum: Object.values(PROPOSAL_STATUS), required: false},
    course_status: {type: String, enum: Object.values(COURSE_STATUS), required: false},
});

const Course = model<ICourse>("Course", courseSchema);
export default Course;
