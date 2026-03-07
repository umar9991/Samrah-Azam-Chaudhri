import { STATIC_ARTICLES } from "@/data/static-data";

export function useArticles() {
  return {
    data: STATIC_ARTICLES,
    isLoading: false,
    isError: false,
  };
}
