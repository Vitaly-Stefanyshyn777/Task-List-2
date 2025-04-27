import React from "react";
import { EventItem } from "@/features/events/types";
import EventActions from "./EventActions";

interface EventListProps {
  events: EventItem[];
  onEdit: (event: EventItem) => void;
  onDelete: (id: string) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onEdit, onDelete }) => (
  <ul style={{ listStyle: "none", padding: 0 }}>
    {events.map((e) => (
      <li
        key={e.id}
        style={{
          marginBottom: 20,
          border: "1px solid #ccc",
          padding: 10,
          borderRadius: 8,
        }}
      >
        <h3>{e.title}</h3>
        <p>
          Дата: {e.date} | Час: {e.time}
        </p>
        <p>{e.description}</p>
        <p>Важливість: {e.importance}</p>
        <EventActions event={e} onEdit={onEdit} onDelete={onDelete} />
      </li>
    ))}
  </ul>
);

export default EventList;
