import { FlowSchema } from "@/schemas/flow-schema";
import { z } from "zod";

export type AddCityType = z.infer<typeof FlowSchema.AddCitySchema>;