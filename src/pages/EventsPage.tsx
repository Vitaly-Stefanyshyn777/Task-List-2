import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchEvents, deleteEvent, updateEvent } from "@/features/events/api";
import EventForm from "@/features/events/components/EventForm";
import EditEventModal from "@/features/events/components/EditEventModal";
import CalendarView from "@/features/events/components/CalendarView";
import { EventItem } from "@/features/events/types";

const EventsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { events, loading, error } = useAppSelector((state) => state.events);
  const user = useAppSelector((state) => state.auth.user);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [filter, setFilter] = useState<
    "all" | "normal" | "important" | "critical"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  useEffect(() => {
    if (user) {
      dispatch(fetchEvents(user.uid));
    }
  }, [dispatch, user]);

  const handleDelete = (eventId: string) => {
    if (user && window.confirm("Точно видалити подію?")) {
      dispatch(deleteEvent({ eventId }));
    }
  };

  const handleEditClick = (event: EventItem) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleUpdateEvent = async (updatedData: Partial<EventItem>) => {
    if (user && editingEvent) {
      await dispatch(updateEvent({ eventId: editingEvent.id, updatedData }));
      setIsModalOpen(false);
      setEditingEvent(null);
    }
  };

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };
  const filteredEvents = events
    .filter((e) => filter === "all" || e.importance === filter)
    .filter(
      (e) =>
        !searchTerm || e.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((e) => !selectedDate || e.date === selectedDate);

  return (
    <div style={{ padding: 20 }}>
      <h1>Мої події</h1>

      <div style={{ marginBottom: 20 }}>
        <EventForm />
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Пошук подій..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <select
          value={filter}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFilter(
              e.target.value as "all" | "normal" | "important" | "critical"
            )
          }
          style={{ padding: 8 }}
        >
          <option value="all">Всі</option>
          <option value="normal">Звичайна</option>
          <option value="important">Важлива</option>
          <option value="critical">Критична</option>
        </select>
        <button
          onClick={() => setViewMode(viewMode === "list" ? "calendar" : "list")}
          style={{
            padding: 8,
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: 8,
          }}
        >
          {viewMode === "list" ? "Календар" : "Список"}
        </button>
      </div>

      {loading && <p>Завантаження...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {viewMode === "calendar" ? (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
          <div style={{ width: 300 }}>
            <CalendarView
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
            />
          </div>
          <div style={{ flex: 1 }}>
            <h2>
              {selectedDate ? `Події на ${selectedDate}` : "Виберіть дату"}
            </h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {filteredEvents.map((e) => (
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
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => handleEditClick(e)}>
                      Редагувати
                    </button>
                    <button onClick={() => handleDelete(e.id)}>Видалити</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredEvents.map((e) => (
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
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => handleEditClick(e)}>Редагувати</button>
                <button onClick={() => handleDelete(e.id)}>Видалити</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isModalOpen && editingEvent && (
        <EditEventModal
          event={editingEvent}
          onClose={handleCloseModal}
          onSave={handleUpdateEvent}
        />
      )}
    </div>
  );
};

export default EventsPage;
