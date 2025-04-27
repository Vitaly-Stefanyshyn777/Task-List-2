import React from "react";
import { EventItem } from "@/features/events/types";

interface EventActionsProps {
  event: EventItem;
  onEdit: (event: EventItem) => void;
  onDelete: (id: string) => void;
}

const EventActions: React.FC<EventActionsProps> = ({
  event,
  onEdit,
  onDelete,
}) => (
  <div style={{ display: "flex", gap: 10 }}>
    <button onClick={() => onEdit(event)}>Редагувати</button>
    <button onClick={() => onDelete(event.id)}>Видалити</button>
  </div>
);

export default EventActions;
