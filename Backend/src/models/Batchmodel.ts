import mongoose from "mongoose";

const BatchSchema = new mongoose.Schema({
  batchName: { type: String, required: true, unique: true },
});

export default mongoose.model("Batch", BatchSchema);
