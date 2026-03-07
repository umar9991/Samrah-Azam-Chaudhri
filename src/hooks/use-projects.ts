import { STATIC_PROJECTS } from "@/data/static-data";

export function useProjects() {
  return {
    data: STATIC_PROJECTS,
    isLoading: false,
    isError: false,
  };
}
