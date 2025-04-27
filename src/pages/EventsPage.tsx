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
      dispatch(deleteEvent({ userId: user.uid, eventId }));
    }
  };

  const handleEditClick = (event: EventItem) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleUpdateEvent = async (updatedData: Partial<EventItem>) => {
    if (user && editingEvent) {
      await dispatch(
        updateEvent({ userId: user.uid, eventId: editingEvent.id, updatedData })
      );
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
          onChange={(e) => setFilter(e.target.value as any)}
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
// import React, { useState, useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/app/hooks";
// import { fetchEvents, deleteEvent, updateEvent } from "@/features/events/api";
// import EventForm from "@/features/events/components/EventForm";
// import EditEventModal from "@/features/events/components/EditEventModal";
// import { EventItem } from "@/features/events/eventSlice";

// const EventsPage: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { events, loading, error } = useAppSelector((state) => state.events);
//   const user = useAppSelector((state) => state.auth.user);

//   const [filter, setFilter] = useState<
//     "all" | "normal" | "important" | "critical"
//   >("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     if (user) {
//       dispatch(fetchEvents(user.uid));
//     }
//   }, [dispatch, user]);

//   const handleDelete = (eventId: string) => {
//     if (user && window.confirm("Точно видалити подію?")) {
//       dispatch(deleteEvent({ userId: user.uid, eventId }));
//     }
//   };

//   const handleEditClick = (event: EventItem) => {
//     setEditingEvent(event);
//     setIsModalOpen(true);
//   };

//   const handleUpdateEvent = async (updatedData: Partial<EventItem>) => {
//     if (user && editingEvent) {
//       await dispatch(
//         updateEvent({ userId: user.uid, eventId: editingEvent.id, updatedData })
//       );
//       setIsModalOpen(false);
//       setEditingEvent(null);
//     }
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setEditingEvent(null);
//   };

//   const filteredEvents = events
//     .filter((event) => filter === "all" || event.importance === filter)
//     .filter((event) =>
//       event.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Мої події</h1>

//       <div style={{ marginBottom: "20px" }}>
//         <EventForm />
//       </div>

//       <div
//         style={{
//           marginBottom: "20px",
//           display: "flex",
//           gap: "10px",
//           flexWrap: "wrap",
//         }}
//       >
//         <input
//           type="text"
//           placeholder="Пошук подій..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{ padding: "8px", flex: "1" }}
//         />

//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value as any)}
//           style={{ padding: "8px" }}
//         >
//           <option value="all">Всі</option>
//           <option value="normal">Звичайна</option>
//           <option value="important">Важлива</option>
//           <option value="critical">Критична</option>
//         </select>
//       </div>

//       {loading && <p>Завантаження...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {filteredEvents.map((event) => (
//           <li
//             key={event.id}
//             style={{
//               marginBottom: "20px",
//               border: "1px solid #ccc",
//               padding: "10px",
//               borderRadius: "8px",
//             }}
//           >
//             <h3>{event.title}</h3>
//             <p>Дата: {event.date}</p>
//             <p>Час: {event.time}</p>
//             <p>Опис: {event.description}</p>
//             <p>Важливість: {event.importance}</p>
//             <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
//               <button
//                 onClick={() => handleEditClick(event)}
//                 style={{
//                   padding: "8px",
//                   backgroundColor: "#2196F3",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Редагувати
//               </button>
//               <button
//                 onClick={() => handleDelete(event.id)}
//                 style={{
//                   padding: "8px",
//                   backgroundColor: "red",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Видалити
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {isModalOpen && editingEvent && (
//         <EditEventModal
//           event={editingEvent}
//           onClose={handleCloseModal}
//           onSave={handleUpdateEvent}
//         />
//       )}
//     </div>
//   );
// };

// export default EventsPage;

// поточна спроба --------------------------

// src/pages/EventsPage.tsx

// import React, { useState, useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/app/hooks";
// import {
//   fetchEvents,
//   deleteEvent,
//   updateEvent,
// } from "@/features/events/eventSlice";
// import EventForm from "@/features/events/components/EventForm";
// import CalendarView from "@/features/events/components/CalendarView";
// import EditEventModal from "@/features/events/components/EditEventModal";

// const EventsPage: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { events, loading, error } = useAppSelector((state) => state.events);
//   const user = useAppSelector((state) => state.auth.user);

//   const [filter, setFilter] = useState<
//     "all" | "normal" | "important" | "critical"
//   >("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDate, setSelectedDate] = useState(() => {
//     const today = new Date();
//     return today.toISOString().split("T")[0];
//   });

//   const [editingEvent, setEditingEvent] = useState<null | {
//     id: string;
//     title: string;
//     description: string;
//     date: string;
//     time: string;
//     importance: "normal" | "important" | "critical";
//   }>(null);

//   useEffect(() => {
//     if (user) {
//       dispatch(fetchEvents(user.uid));
//     }
//   }, [dispatch, user]);

//   const handleDelete = (eventId: string) => {
//     if (user && window.confirm("Точно видалити подію?")) {
//       dispatch(deleteEvent({ userId: user.uid, eventId }));
//     }
//   };

//   const handleEdit = (event: typeof editingEvent) => {
//     setEditingEvent(event);
//   };

//   const handleUpdateEvent = (updatedEvent: {
//     id: string;
//     title: string;
//     description: string;
//     date: string;
//     time: string;
//     importance: "normal" | "important" | "critical";
//   }) => {
//     if (user) {
//       dispatch(
//         updateEvent({
//           userId: user.uid,
//           eventId: updatedEvent.id,
//           updatedData: updatedEvent,
//         })
//       );
//       setEditingEvent(null); // Закрити модалку після оновлення
//     }
//   };

//   const filteredEvents = events
//     .filter((event) => filter === "all" || event.importance === filter)
//     .filter((event) =>
//       event.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Мої події</h1>

//       <div style={{ marginBottom: "20px" }}>
//         <EventForm />
//       </div>

//       <CalendarView
//         selectedDate={selectedDate}
//         setSelectedDate={setSelectedDate}
//       />

//       <div
//         style={{
//           marginBottom: "20px",
//           marginTop: "20px",
//           display: "flex",
//           gap: "10px",
//           flexWrap: "wrap",
//         }}
//       >
//         <input
//           type="text"
//           placeholder="Пошук подій..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{ padding: "8px", flex: "1" }}
//         />

//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value as any)}
//           style={{ padding: "8px" }}
//         >
//           <option value="all">Всі</option>
//           <option value="normal">Звичайна</option>
//           <option value="important">Важлива</option>
//           <option value="critical">Критична</option>
//         </select>
//       </div>

//       {loading && <p>Завантаження...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {filteredEvents
//           .filter((event) => event.date === selectedDate)
//           .map((event) => (
//             <li
//               key={event.id}
//               style={{
//                 marginBottom: "20px",
//                 border: "1px solid #ccc",
//                 padding: "10px",
//                 borderRadius: "8px",
//               }}
//             >
//               <h3>{event.title}</h3>
//               <p>Дата: {event.date}</p>
//               <p>Час: {event.time}</p>
//               <p>Опис: {event.description}</p>
//               <p>Важливість: {event.importance}</p>
//               <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
//                 <button
//                   onClick={() => handleEdit(event)}
//                   style={{
//                     padding: "8px",
//                     backgroundColor: "blue",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "4px",
//                   }}
//                 >
//                   Редагувати
//                 </button>

//                 <button
//                   onClick={() => handleDelete(event.id)}
//                   style={{
//                     padding: "8px",
//                     backgroundColor: "red",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "4px",
//                   }}
//                 >
//                   Видалити
//                 </button>
//               </div>
//             </li>
//           ))}
//       </ul>

//       {editingEvent && (
//         <EditEventModal
//           event={editingEvent}
//           onClose={() => setEditingEvent(null)}
//           onSave={handleUpdateEvent}
//         />
//       )}
//     </div>
//   );
// };

// export default EventsPage;

// ------------------------------

// // src/pages/EventsPage.tsx

// import React, { useState, useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/app/hooks";
// import { fetchEvents, deleteEvent } from "@/features/events/eventSlice";
// import EventForm from "@/features/events/components/EventForm";
// import EditEventModal from "@/features/events/components/EditEventModal";
// const EventsPage: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { events, loading, error } = useAppSelector((state) => state.events);
//   const user = useAppSelector((state) => state.auth.user);

//   const [filter, setFilter] = useState<
//     "all" | "normal" | "important" | "critical"
//   >("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   useEffect(() => {
//     if (user) {
//       dispatch(fetchEvents(user.uid));
//     }
//   }, [dispatch, user]);

//   const handleDelete = (eventId: string) => {
//     if (user && window.confirm("Точно видалити подію?")) {
//       dispatch(deleteEvent({ userId: user.uid, eventId }));
//     }
//   };

//   const filteredEvents = events
//     .filter((event) => filter === "all" || event.importance === filter)
//     .filter((event) =>
//       event.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Мої події</h1>

//       <div style={{ marginBottom: "20px" }}>
//         <EventForm />
//       </div>

//       <div
//         style={{
//           marginBottom: "20px",
//           display: "flex",
//           gap: "10px",
//           flexWrap: "wrap",
//         }}
//       >
//         <input
//           type="text"
//           placeholder="Пошук подій..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{ padding: "8px", flex: "1" }}
//         />

//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value as any)}
//           style={{ padding: "8px" }}
//         >
//           <option value="all">Всі</option>
//           <option value="normal">Звичайна</option>
//           <option value="important">Важлива</option>
//           <option value="critical">Критична</option>
//         </select>
//       </div>

//       {loading && <p>Завантаження...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {filteredEvents.map((event) => (
//           <li
//             key={event.id}
//             style={{
//               marginBottom: "20px",
//               border: "1px solid #ccc",
//               padding: "10px",
//               borderRadius: "8px",
//             }}
//           >
//             <h3>{event.title}</h3>
//             <p>Дата: {event.date}</p>
//             <p>Час: {event.time}</p>
//             <p>Опис: {event.description}</p>
//             <p>Важливість: {event.importance}</p>
//             <div style={{ marginTop: "10px" }}>
//               {/* Тут пізніше додамо редагування */}
//               <button
//                 onClick={() => handleDelete(event.id)}
//                 style={{
//                   padding: "8px",
//                   backgroundColor: "red",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                 }}
//               >
//                 Видалити
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default EventsPage;

// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/app/hooks";
// import { fetchEvents } from "@/features/events/eventSlice";
// import EventForm from "@/features/events/components/EventForm";

// const EventsPage: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { events, loading, error } = useAppSelector((state) => state.events);
//   const user = useAppSelector((state) => state.auth.user);
//   const [isFormOpen, setIsFormOpen] = useState(false);

//   useEffect(() => {
//     if (user?.uid) {
//       dispatch(fetchEvents(user.uid));
//     }
//   }, [dispatch, user?.uid]);

//   const handleToggleForm = () => {
//     setIsFormOpen((prev) => !prev);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Мої події</h1>

//       <button onClick={handleToggleForm} style={{ marginBottom: "20px" }}>
//         {isFormOpen ? "Сховати форму" : "Додати подію"}
//       </button>

//       {isFormOpen && <EventForm />}

//       {loading && <p>Завантаження подій...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {events.length === 0 && !loading ? (
//         <p>У вас поки немає подій.</p>
//       ) : (
//         <ul>
//           {events.map((event) => (
//             <li key={event.id} style={{ marginBottom: "10px" }}>
//               <strong>{event.title}</strong> - {event.date} {event.time} <br />
//               <em>{event.description}</em> [{event.importance}]
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default EventsPage;
