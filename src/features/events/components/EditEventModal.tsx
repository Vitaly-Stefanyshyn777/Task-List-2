// // src/features/events/components/EditEventModal.tsx

// import React, { useState, useEffect } from "react";
// import { useAppDispatch } from "@/app/hooks";
// import { updateEvent } from "../eventSlice";
// import { EventItem } from "../eventSlice";

// interface EditEventModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   event: EventItem | null;
//   userId: string;
// }

// const EditEventModal: React.FC<EditEventModalProps> = ({
//   isOpen,
//   onClose,
//   event,
//   userId,
// }) => {
//   const dispatch = useAppDispatch();
//   const [title, setTitle] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [description, setDescription] = useState("");
//   const [importance, setImportance] = useState<
//     "normal" | "important" | "critical"
//   >("normal");

//   useEffect(() => {
//     if (event) {
//       setTitle(event.title);
//       setDate(event.date);
//       setTime(event.time);
//       setDescription(event.description);
//       setImportance(event.importance);
//     }
//   }, [event]);

//   const handleUpdate = () => {
//     if (!event) return;

//     dispatch(
//       updateEvent({
//         userId,
//         eventId: event.id,
//         updatedData: {
//           title,
//           date,
//           time,
//           description,
//           importance,
//         },
//       })
//     );

//     onClose(); // Закрити модалку після збереження
//   };

//   if (!isOpen || !event) return null;

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: "rgba(0,0,0,0.5)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         zIndex: 1000,
//       }}
//     >
//       <div
//         style={{
//           background: "white",
//           padding: "20px",
//           borderRadius: "8px",
//           width: "90%",
//           maxWidth: "500px",
//         }}
//       >
//         <h2>Редагувати подію</h2>

//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Назва події"
//           style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
//         />
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
//         />
//         <input
//           type="time"
//           value={time}
//           onChange={(e) => setTime(e.target.value)}
//           style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
//         />
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Опис"
//           style={{
//             marginBottom: "10px",
//             padding: "8px",
//             width: "100%",
//             minHeight: "80px",
//           }}
//         />
//         <select
//           value={importance}
//           onChange={(e) => setImportance(e.target.value as any)}
//           style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
//         >
//           <option value="normal">Звичайна</option>
//           <option value="important">Важлива</option>
//           <option value="critical">Критична</option>
//         </select>

//         <div
//           style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
//         >
//           <button
//             onClick={onClose}
//             style={{
//               padding: "10px",
//               backgroundColor: "gray",
//               color: "white",
//               border: "none",
//               borderRadius: "5px",
//             }}
//           >
//             Скасувати
//           </button>
//           <button
//             onClick={handleUpdate}
//             style={{
//               padding: "10px",
//               backgroundColor: "green",
//               color: "white",
//               border: "none",
//               borderRadius: "5px",
//             }}
//           >
//             Зберегти
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditEventModal;

// src/features/events/components/EditEventModal.tsx

import React, { useState } from "react";
import { EventItem } from "@/features/events/eventSlice";

interface EditEventModalProps {
  event: EventItem;
  onClose: () => void;
  onSave: (updatedData: Partial<EventItem>) => void;
}

const EditEventModal: React.FC<EditEventModalProps> = ({
  event,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [date, setDate] = useState(event.date);
  const [time, setTime] = useState(event.time);
  const [importance, setImportance] = useState(event.importance);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, description, date, time, importance });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Редагувати подію</h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <input
            type="text"
            placeholder="Назва"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          <textarea
            placeholder="Опис"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />

          <select
            value={importance}
            onChange={(e) =>
              setImportance(
                e.target.value as "normal" | "important" | "critical"
              )
            }
            required
          >
            <option value="normal">Звичайна</option>
            <option value="important">Важлива</option>
            <option value="critical">Критична</option>
          </select>

          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Зберегти
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Скасувати
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
