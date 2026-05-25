import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface ISavedVehicle extends Document {
  userId: mongoose.Types.ObjectId;
  registrationNumber: string;
  nickname: string;
  vehicleData: Record<string, unknown>;
  savedAt: Date;
}

const SavedVehicleSchema = new Schema<ISavedVehicle>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  registrationNumber: { type: String, required: true, uppercase: true },
  nickname: { type: String, default: "" },
  vehicleData: { type: Schema.Types.Mixed, required: true },
  savedAt: { type: Date, default: Date.now },
});

SavedVehicleSchema.index({ userId: 1, registrationNumber: 1 }, { unique: true });

const SavedVehicle: Model<ISavedVehicle> =
  mongoose.models.SavedVehicle ||
  mongoose.model<ISavedVehicle>("SavedVehicle", SavedVehicleSchema);

export default SavedVehicle;
