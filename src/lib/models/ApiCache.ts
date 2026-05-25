import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IApiCache extends Document {
  registrationNumber: string;
  data: Record<string, unknown>;
  fetchedAt: Date;
  expiresAt: Date;
}

const ApiCacheSchema = new Schema<IApiCache>({
  registrationNumber: { type: String, required: true, unique: true, uppercase: true },
  data: { type: Schema.Types.Mixed, required: true },
  fetchedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true, index: { expires: 0 } }, // TTL index
});

const ApiCache: Model<IApiCache> =
  mongoose.models.ApiCache ||
  mongoose.model<IApiCache>("ApiCache", ApiCacheSchema);

export default ApiCache;
