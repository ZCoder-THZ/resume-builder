import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetUserSchema, UserSchema } from "@/api/user/userModel";
import dbConnection from "@/common/dbConnection";
import { validateRequest } from "@/common/utils/httpHandlers";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { userController } from "./userController";

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

userRegistry.register("User", UserSchema);

userRegistry.registerPath({
  method: "get",
  path: "/users",
  tags: ["User"],
  responses: createApiResponse(z.array(UserSchema), "Success"),
});

userRouter.get("/", userController.getUsers);
userRouter.get("/resumes", (req, res) => {
  dbConnection.query("SELECT * FROM issues", (err, results) => {
    if (err) {
      console.error("Database query error:", err); // Logs the error for debugging
      return res.status(500).json({
        message: "An error occurred while fetching issues.",
        error: err.message,
      });
    }

    // Respond with the query results if successful
    res.json({
      issues: results,
    });
  });
});

userRegistry.registerPath({
  method: "get",
  path: "/users/resumes",
  tags: ["Resumes"],
  responses: createApiResponse(z.array(UserSchema), "Success"),
});

userRegistry.registerPath({
  method: "get",
  path: "/users/{id}",
  tags: ["User"],
  request: { params: GetUserSchema.shape.params },
  responses: createApiResponse(UserSchema, "Success"),
});

userRouter.get("/:id", validateRequest(GetUserSchema), userController.getUser);
