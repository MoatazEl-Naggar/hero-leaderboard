import { ZodSchema } from "zod";

export function validateBody<T>(schema: ZodSchema<T>, body: any) {
  return schema.parse(body);
}

export function validateParams<T>(schema: ZodSchema<T>, params: any) {
  return schema.parse(params);
}
