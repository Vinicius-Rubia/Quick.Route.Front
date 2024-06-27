import { z } from "zod";

const AddCitySchema = z.object({
  cityName: z.string().min(1, "Cidade inválida"),
});

export const FlowSchema = {
  AddCitySchema,
}