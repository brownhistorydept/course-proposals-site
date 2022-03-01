import { IUser } from "./User";
import mongoose from 'mongoose';
const { model, Schema } = mongoose;

export const GEO_REGIONS = ["Africa", "East Asia", "Europe", "Latin America", "MESA", "North America", "Global"]; // taken from dept. spreadsheet tracking courses, https://docs.google.com/spreadsheets/d/1NT5l7zAqlXDCivZXcTdsdceSnMD5v28ke6550tnBrnE/edit?usp=sharing
export const COURSE_TYPES = ["FYS", "SYS", "Seminar", "Lecture"];
export const SEMESTERS = ["Fall", "Spring", "Winter", "Summer"];
export const TIMES = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q"];

// do we think my designation of optional variables is fair? Might be something to run by the client,
// not sure whether more/less of these are optional than I might think
export interface ICourse {
    _id?: String, // assigned by MongoDB
    created_at?: Date,
    course_number: String,
    crn?: Number,
    course_title: String,
    semester: String,
    final_time: String, // A,B... hour, so a string of this character
    time_ranking?: String[], // array of strings, e.g. [A, C, E]
    professors: IUser[],
    is_DIAP: Boolean,
    is_WRIT: Boolean,
    is_Premodern: Boolean,
    course_type: String,
    geography: String, // has to be from geo_regions list
    is_remote: Boolean,
    is_intro: Boolean,
    description: String,
    further_notes?: String,
}

const courseSchema = new Schema<ICourse>({
    created_at: { type: Date, default: Date.now },
    course_number: { type: String, required: true},
    crn: {type: Number, required: false},
    course_title: { type: String, required: true},
    semester: {type: String, enum: SEMESTERS, required: true},
    final_time: { type: String, enum: TIMES, required: true}, // A,B... hour, so a string of this character
    time_ranking: [{type: String}], // array of strings, e.g. [A, C, E]
    professors: [{type: Schema.Types.ObjectId, ref: 'User'}],
    is_DIAP: { type: Boolean, required: true},
    is_WRIT: { type: Boolean, required: true},
    is_Premodern: { type: Boolean, required: true},
    course_type: { type: String, enum: COURSE_TYPES, required: true},
    geography: { type: String, enum: GEO_REGIONS, required: true}, // has to be from geo_regions list
    is_remote: {type: Boolean, required: true},
    is_intro: {type: Boolean, required: true},
    description: { type: String, required: true},
    further_notes: { type: String},
});

const Course = model<ICourse>("Course", courseSchema);
export default Course;

