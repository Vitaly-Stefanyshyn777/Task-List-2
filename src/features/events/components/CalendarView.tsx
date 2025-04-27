// // src/features/events/components/CalendarView.tsx

// import React from "react";
// import { useAppSelector } from "@/app/hooks";
// // import { EventItem } from "../eventSlice";

// interface CalendarViewProps {
//   selectedDate: string;
//   setSelectedDate: (date: string) => void;
// }

// const CalendarView: React.FC<CalendarViewProps> = ({
//   selectedDate,
//   setSelectedDate,
// }) => {
//   const { events } = useAppSelector((state) => state.events);

//   const today = new Date();
//   const formattedToday = today.toISOString().split("T")[0];

//   const daysToShow = Array.from({ length: 30 }, (_, i) => {
//     const date = new Date();
//     date.setDate(today.getDate() + i);
//     return date.toISOString().split("T")[0];
//   });

//   const eventsForSelectedDate = events.filter(
//     (event) => event.date === selectedDate
//   );

//   return (
//     <div>
//       <h2 style={{ marginBottom: "10px" }}>Календар подій</h2>

//       <div
//         style={{
//           display: "flex",
//           overflowX: "auto",
//           gap: "8px",
//           marginBottom: "20px",
//           paddingBottom: "10px",
//         }}
//       >
//         {daysToShow.map((day) => (
//           <button
//             key={day}
//             onClick={() => setSelectedDate(day)}
//             style={{
//               padding: "8px",
//               borderRadius: "8px",
//               border: "1px solid #ccc",
//               backgroundColor: day === selectedDate ? "#4CAF50" : "#fff",
//               color: day === selectedDate ? "#fff" : "#000",
//               minWidth: "90px",
//               cursor: "pointer",
//               flexShrink: 0,
//             }}
//           >
//             {day}
//           </button>
//         ))}
//       </div>

//       <h3>
//         Події на {selectedDate === formattedToday ? "сьогодні" : selectedDate}
//       </h3>

//       {eventsForSelectedDate.length === 0 ? (
//         <p>Немає подій на цю дату.</p>
//       ) : (
//         <ul style={{ listStyle: "none", padding: 0 }}>
//           {eventsForSelectedDate.map((event) => (
//             <li
//               key={event.id}
//               style={{
//                 marginBottom: "15px",
//                 padding: "10px",
//                 border: "1px solid #ccc",
//                 borderRadius: "8px",
//               }}
//             >
//               <h4>{event.title}</h4>
//               <p>Час: {event.time}</p>
//               <p>Опис: {event.description}</p>
//               <p>Важливість: {event.importance}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CalendarView;

// // src/features/events/components/CalendarView.tsx
// import React from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { useAppSelector } from "@/app/hooks";

// interface CalendarViewProps {
//   onSelectDate: (date: string) => void;
// }

// const CalendarView: React.FC<CalendarViewProps> = ({ onSelectDate }) => {
//   const events = useAppSelector((state) => state.events.events);

//   const handleDateChange = (date: Date) => {
//     const formattedDate = date.toISOString().split("T")[0];
//     onSelectDate(formattedDate);
//   };

//   const tileContent = ({ date }: { date: Date }) => {
//     const formattedDate = date.toISOString().split("T")[0];
//     const hasEvent = events.some((event) => event.date === formattedDate);

//     return hasEvent ? (
//       <div
//         style={{
//           height: "5px",
//           width: "5px",
//           backgroundColor: "red",
//           borderRadius: "50%",
//           margin: "0 auto",
//           marginTop: "2px",
//         }}
//       />
//     ) : null;
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "0 auto" }}>
//       <Calendar onClickDay={handleDateChange} tileContent={tileContent} />
//     </div>
//   );
// };

// // export default CalendarView;
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { useState } from "react";
// import { useAppSelector } from "@/app/hooks";

// const CalendarView: React.FC = () => {
//   const events = useAppSelector((state) => state.events.events);

//   const [selectedDate, setSelectedDate] = useState<string | null>(null);

//   // Масив дат з подіями
//   const eventDates = new Set(events.map((event) => event.date));

//   const handleDateChange = (date: Date) => {
//     const formattedDate = date.toISOString().split("T")[0];
//     setSelectedDate(formattedDate);
//   };

//   const tileContent = ({ date, view }: { date: Date; view: string }) => {
//     if (view === "month") {
//       const formattedDate = date.toISOString().split("T")[0];
//       if (eventDates.has(formattedDate)) {
//         return (
//           <div
//             style={{
//               width: "6px",
//               height: "6px",
//               margin: "0 auto",
//               marginTop: "2px",
//               backgroundColor: "red",
//               borderRadius: "50%",
//             }}
//           />
//         );
//       }
//     }
//     return null;
//   };

//   const filteredEvents = selectedDate
//     ? events.filter((event) => event.date === selectedDate)
//     : events;

//   return (
//     <div style={{ marginTop: "20px" }}>
//       <Calendar onClickDay={handleDateChange} tileContent={tileContent} />

//       <h2 style={{ marginTop: "20px", textAlign: "center" }}>
//         {selectedDate ? `Події на ${selectedDate}` : "Усі події"}
//       </h2>

//       {filteredEvents.length === 0 ? (
//         <p style={{ textAlign: "center" }}>Подій немає.</p>
//       ) : (
//         <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
//           {filteredEvents.map((event) => (
//             <li
//               key={event.id}
//               style={{
//                 marginBottom: "10px",
//                 padding: "10px",
//                 border: "1px solid #ccc",
//                 borderRadius: "8px",
//               }}
//             >
//               <h3>{event.title}</h3>
//               <p>Дата: {event.date}</p>
//               <p>Час: {event.time}</p>
//               <p>Опис: {event.description}</p>
//               <p>Важливість: {event.importance}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CalendarView;

// src/features/events/components/CalendarView.tsx
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAppSelector } from "@/app/hooks";

interface Props {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const CalendarView: React.FC<Props> = ({ selectedDate, onSelectDate }) => {
  const events = useAppSelector((s) => s.events.events);

  // Підсвічуємо дні, в які є події
  const hasEventOn = (date: Date) => {
    const iso = date.toISOString().split("T")[0];
    return events.some((e) => e.date === iso);
  };

  return (
    <Calendar
      value={selectedDate ? new Date(selectedDate) : undefined}
      onChange={(d) => {
        const iso = (d as Date).toISOString().split("T")[0];
        onSelectDate(iso);
      }}
      tileContent={({ date, view }) =>
        view === "month" && hasEventOn(date) ? (
          <div
            style={{
              width: 6,
              height: 6,
              background: "red",
              borderRadius: "50%",
              margin: "2px auto",
            }}
          />
        ) : null
      }
    />
  );
};

export default CalendarView;
