import mongoose, { Document, Schema } from 'mongoose'

export interface TaskDocument extends Document {
    title: string;
    done: boolean;
    created_at: Date;
}

const taskSchema = new Schema<TaskDocument>({
    title: String,
    done: Boolean,
    created_at: Date,
}, { versionKey: false })

export default mongoose.model<TaskDocument>('task', taskSchema)