import { commonValidations } from "@/common/utils/commonValidation";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Issue = z.infer<typeof IssueSchema>;
export const IssueSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.enum(["OPEN", "CLOSED"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  userId: z.string(),
  assignedToUserId: z.string().nullable(),
  priority: z.enum(["low", "medium", "high"]),
  assignedDate: z.string().nullable(),
  deadlineDate: z.string().nullable(),
});

export const GetIssuesSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

// Example usage:
// IssuesSchema.parse(data);
