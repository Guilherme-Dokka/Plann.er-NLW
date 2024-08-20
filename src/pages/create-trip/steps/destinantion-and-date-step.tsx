import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/style.css";

interface DestinationAndDateStepProps {
  isGuestInputOpen: boolean;
  CloseGuestInput: () => void;
  eventStartAndDates: DateRange | undefined;
  openGuestInput: () => void;
  setDestination: (destinantion: string) => void;
  SetEventStartAndDates: (dates: DateRange | undefined) => Range;
}
export function DestinationAndDateStep({
  isGuestInputOpen,
  CloseGuestInput,
  openGuestInput,
  setDestination,
  eventStartAndDates,
  SetEventStartAndDates,
}: DestinationAndDateStepProps) {
  const [isDataPicketrOpen, SetIsDataPickerOpen] = useState(false);

  function openDatePicker() {
    return SetIsDataPickerOpen(true);
  }

  function CloseDataPicker() {
    return SetIsDataPickerOpen(false);
  }

  const displayedDate =
    eventStartAndDates && eventStartAndDates.from && eventStartAndDates.to
      ? format(eventStartAndDates.from, "d 'de' LLL")
          .concat(" até ")
          .concat(format(eventStartAndDates.to, "d 'de' LLL"))
      : null;
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          onChange={(event) => setDestination(event.target.value)}
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400  outline-none flex-1"
          disabled={isGuestInputOpen}
        />
      </div>

      <button
        onClick={openDatePicker}
        disabled={isGuestInputOpen}
        className="flex items-center gap-2 text-left 
        "
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-400 w-40 flex-1">
          {displayedDate || "Quando?"}
        </span>
      </button>

      {isDataPicketrOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center ">
          <div className=" rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2 ">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data </h2>
                <button type="button" onClick={CloseDataPicker}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>
            <DayPicker
              mode="range"
              selected={eventStartAndDates}
              onSelect={SetEventStartAndDates}
            />
          </div>
        </div>
      )}

      <div className="w-px h-6 bg-zinc-800"></div>

      {isGuestInputOpen ? (
        <Button variant="secundary" onClick={CloseGuestInput}>
          <Settings2 className="size-5 text-zinc-400" />
          Alterar local/data
          <ArrowRight className="size-5" />
        </Button>
      ) : (
        <Button variant="primary" onClick={openGuestInput}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}
