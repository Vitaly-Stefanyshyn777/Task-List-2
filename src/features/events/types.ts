export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  importance: "normal" | "important" | "critical";
  createdAt: string | null;
}
