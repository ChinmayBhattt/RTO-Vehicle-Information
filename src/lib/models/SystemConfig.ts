import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface ISystemConfig extends Document {
  key: string;
  value: any;
  updatedAt: Date;
}

const SystemConfigSchema = new Schema<ISystemConfig>({
  key: { type: String, required: true, unique: true },
  value: { type: Schema.Types.Mixed, required: true },
  updatedAt: { type: Date, default: Date.now },
});

const SystemConfig: Model<ISystemConfig> =
  mongoose.models.SystemConfig ||
  mongoose.model<ISystemConfig>("SystemConfig", SystemConfigSchema);

export default SystemConfig;
