import { Schema, model } from "mongoose";

export interface Team {
	label: string;
	value: string;
}

const schema = new Schema<Team>({
	label: {
		type: String,
		required: true
	},
	value: {
		type: String,
		required: true
	}
});

export default model<Team>("Team", schema);
