import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAppSelector } from "@/app/hooks";

const formatDate = (date: Date) => {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().split("T")[0];
};

interface Props {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const CalendarView: React.FC<Props> = ({ selectedDate, onSelectDate }) => {
  const events = useAppSelector((s) => s.events.events);

  const hasEventOn = (date: Date) => {
    const iso = formatDate(date);
    return events.some((e) => e.date === iso);
  };

  return (
    <Calendar
      value={selectedDate ? new Date(selectedDate) : undefined}
      onChange={(d) => {
        const iso = formatDate(d as Date);
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
