import z from "zod";

export const campaignZod = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().url(),
});

export type Campaign = z.infer<typeof campaignZod>;