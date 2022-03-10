import { IUser } from "./User";
import mongoose from 'mongoose';
const { model, Schema } = mongoose;

export const GEO_REGIONS = ["Africa", "East Asia", "Europe", "Latin America", "MESA", "North America", "Global"]; // taken from dept. spreadsheet tracking courses, https://docs.google.com/spreadsheets/d/1NT5l7zAqlXDCivZXcTdsdceSnMD5v28ke6550tnBrnE/edit?usp=sharing
export const COURSE_TYPES = ["FYS", "SYS", "Seminar", "Lecture"];
export const SEMESTERS = ["Fall", "Spring", "Winter", "Summer"];
export const TIMES = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q"];
export const PROPOSAL_STATUSES = ["under review by director", "accepted by director", "rejected by director", "under review by CCC", "accepted by CCC", "rejected by CCC"];
export const COURSE_STATUSES = ["new", "revised", "existing"];

// do we think my designation of optional variables is fair? Might be something to run by the client,
// not sure whether more/less of these are optional than I might think
export interface ICourse {
    _id?: String, // assigned by MongoDB
    created_at?: Date,
    course_number: String,
    crn?: Number,
    course_title: String,
    semester: String,
    year: Number,
    final_time: String, // A,B... hour, so a string of this character
    time_ranking?: String[], // array of strings, e.g. [A, C, E]
    professors: IUser[],
    is_DIAP: Boolean,
    is_WRIT: Boolean,
    is_Premodern: Boolean,
    course_type: String,
    geography: String, // has to be from geo_regions list
    is_remote: Boolean,
    is_undergrad: Boolean, // if false, then grad
    is_intro: Boolean,
    proposal_status: String,
    course_status: String, // new, revised, or existing --> these are existing hist. dept. standards that we're replicating here
    description: String,
    further_notes?: String,
}

const courseSchema = new Schema<ICourse>({
    created_at: { type: Date, default: Date.now },
    course_number: { type: String, required: true},
    crn: {type: Number, required: false},
    course_title: { type: String, required: true},
    semester: {type: String, enum: SEMESTERS, required: true},
    year: {type: Number, required: true},
    final_time: { type: String, enum: TIMES, required: true}, // A,B... hour, so a string of this character
    time_ranking: [{type: String}], // array of strings, e.g. [A, C, E]
    professors: [{type: Schema.Types.ObjectId, ref: 'User'}],
    is_DIAP: { type: Boolean, required: true},
    is_WRIT: { type: Boolean, required: true},
    is_Premodern: { type: Boolean, required: true},
    course_type: { type: String, enum: COURSE_TYPES, required: true},
    geography: { type: String, enum: GEO_REGIONS, required: true}, // has to be from geo_regions list
    is_remote: {type: Boolean, required: true},
    is_undergrad: {type: Boolean, required: true},
    is_intro: {type: Boolean, required: true},
    proposal_status: {type: String, enum: PROPOSAL_STATUSES, required: true},
    course_status: {type: String, enum: COURSE_STATUSES, required: true},
    description: { type: String, required: true},
    further_notes: { type: String},
});

const Course = model<ICourse>("Course", courseSchema);
export default Course;
