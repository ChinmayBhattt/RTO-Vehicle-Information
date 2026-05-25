import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface ISearchHistory extends Document {
  userId: mongoose.Types.ObjectId;
  registrationNumber: string;
  vehicleData: Record<string, unknown>;
  searchedAt: Date;
}

const SearchHistorySchema = new Schema<ISearchHistory>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  registrationNumber: { type: String, required: true, uppercase: true },
  vehicleData: { type: Schema.Types.Mixed, required: true },
  searchedAt: { type: Date, default: Date.now },
});

SearchHistorySchema.index({ userId: 1, searchedAt: -1 });

const SearchHistory: Model<ISearchHistory> =
  mongoose.models.SearchHistory ||
  mongoose.model<ISearchHistory>("SearchHistory", SearchHistorySchema);

export default SearchHistory;
