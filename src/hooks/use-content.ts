import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getSiteContent } from "@/lib/content.functions";
import { mergeContent } from "@/lib/content";

export const contentQuery = queryOptions({ queryKey: ["site-content"], queryFn: () => getSiteContent(), staleTime: 60_000 });
export function useContent() {
  const { data } = useSuspenseQuery(contentQuery);
  return mergeContent(data as Record<string, unknown>);
}
