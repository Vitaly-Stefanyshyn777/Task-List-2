import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

const selectEvents = (state: RootState) => state.events.events;
const selectFilter = (_: RootState, filter: string) => filter;
const selectSearchTerm = (
  _state: RootState,
  _filter: string,
  searchTerm: string
) => searchTerm;
const selectSelectedDate = (
  _state: RootState,
  _filter: string,
  _searchTerm: string,
  selectedDate: string
) => selectedDate;

export const selectFilteredEvents = createSelector(
  selectEvents,
  selectFilter,
  selectSearchTerm,
  selectSelectedDate,
  (events, filter, searchTerm, selectedDate) => {
    return events
      .filter((e) => filter === "all" || e.importance === filter)
      .filter(
        (e) =>
          !searchTerm ||
          e.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((e) => !selectedDate || e.date === selectedDate);
  }
);
