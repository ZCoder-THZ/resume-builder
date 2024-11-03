import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import dbConnection from "@/common/dbConnection";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { GetIssuesSchema, IssueSchema } from "./issueModel";

export const issueRgistry = new OpenAPIRegistry();
export const issueRouter = express.Router();
issueRgistry.register("Issue", IssueSchema);

issueRouter.get("/", (req, res) => {
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

issueRgistry.registerPath({
  method: "get",
  path: "/issues",
  tags: ["Issues"],
  responses: createApiResponse(z.array(IssueSchema), "Success"),
});

// issueRouter.get('/:id', (req, res) => {
//   const { id } = req.params; // Extracts the `id` from the URL
//   console.log('Received request to fetch issue with id:', id); // Log the received id

//   dbConnection.query(
//     'SELECT * FROM issues WHERE id = ?',
//     [id],
//     (rerr, results) => {
//       if (rerr) {
//         console.error('Database query error:', rerr); // Logs the error for debugging
//         return res.status(500).json({
//           message: 'An error occurred while fetching the issue.',
//           error: rerr.message,
//         });
//       }

//       console.log('Query results:', results); // Logs the results of the query

//       // Check if the issue was found
//       if (results.length === 0) {
//         console.log('No issue found with the specified id'); // Log if no issue is found
//         return res.status(404).json({
//           message: 'Issue not found.',
//         });
//       }

//       // Respond with the query result if successful
//       console.log('Issue found, returning result'); // Log successful query return
//       res.json({
//         issue: results[0],
//       });
//     }
//   );
// });
