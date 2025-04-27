import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addEvent, updateEvent } from "@/features/events/api";
import { useNavigate } from "react-router-dom";

interface EventFormProps {
  existingEvent?: {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    importance: "normal" | "important" | "critical";
  };
}

const EventForm: React.FC<EventFormProps> = ({ existingEvent }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const [title, setTitle] = useState(existingEvent?.title || "");
  const [description, setDescription] = useState(
    existingEvent?.description || ""
  );
  const [date, setDate] = useState(existingEvent?.date || "");
  const [time, setTime] = useState(existingEvent?.time || "");
  const [importance, setImportance] = useState<
    "normal" | "important" | "critical"
  >(existingEvent?.importance || "normal");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const eventData = { title, description, date, time, importance };

    if (existingEvent) {
      await dispatch(
        updateEvent({
          userId: user.uid,
          eventId: existingEvent.id,
          updatedData: eventData,
        })
      );
    } else {
      await dispatch(addEvent({ userId: user.uid, event: eventData }));
    }

    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <input
        type="text"
        placeholder="Назва події"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Опис події"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <select
        value={importance}
        onChange={(e) => setImportance(e.target.value as any)}
        required
      >
        <option value="normal">Звичайна</option>
        <option value="important">Важлива</option>
        <option value="critical">Критична</option>
      </select>
      <button
        type="submit"
        style={{
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "8px",
        }}
      >
        {existingEvent ? "Оновити подію" : "Додати подію"}
      </button>
    </form>
  );
};

export default EventForm;
