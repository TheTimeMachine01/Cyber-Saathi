// This file acts as a bridge for an external Convex backend
// It allows using useQuery(api.path.to.function) in the frontend

export const api = {
  analysis_logs: {
    list: "analysis_logs:list", // Adjust these strings to match your actual Convex function paths
    get: "analysis_logs:get",
  },
  // Add more as needed by your backend structure
} as any;
