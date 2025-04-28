import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchEvents, deleteEvent, updateEvent } from "@/features/events/api";
import EventForm from "@/features/events/components/EventForm";
import EditEventModal from "@/features/events/components/EditEventModal";
import CalendarView from "@/features/events/components/CalendarView";
import { EventItem } from "@/features/events/types";
import { selectFilteredEvents } from "@/features/events/selectors";
import EventList from "@/features/events/components/EventList";

const EventsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.events);
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
  const filteredEvents = useAppSelector((state) =>
    selectFilteredEvents(state, filter, searchTerm, selectedDate)
  );

  return (
    <div style={{ padding: 20 }}>
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
            <EventList
              events={filteredEvents}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          </div>
        </div>
      ) : (
        <EventList
          events={filteredEvents}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
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
