import { Schema, model } from "mongoose";

export interface Driver {
	label: string;
	value: string;
}

const schema = new Schema<Driver>({
	label: {
		type: String,
		required: true
	},
	value: {
		type: String,
		required: true
	}
});

export default model<Driver>("Driver", schema);
