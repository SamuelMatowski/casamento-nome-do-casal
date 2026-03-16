import mongoose, { Schema, model, models } from "mongoose";

const RsvpSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    cpf: { type: String, required: true },
    message: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export const Rsvp = models.Rsvp || model("Rsvp", RsvpSchema);