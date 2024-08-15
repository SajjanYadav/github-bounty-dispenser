import mongoose, { Schema, Document } from "mongoose";
import { User } from "./User"; 

export interface Bounty extends Document {
    amount: string;
    github_repo: string;
    github_issue: string;
    created_by: User;
    created_at: Date;
}

const BountySchema: Schema<Bounty> = new Schema({
    amount: {
        type: String,
        required: true,
    },
    github_repo: {
        type: String,
        required: true,
    },
    github_issue: {
        type: String,
        required: true,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Bounty = mongoose.models.Bounty || mongoose.model<Bounty>("Bounty", BountySchema);

export default Bounty;