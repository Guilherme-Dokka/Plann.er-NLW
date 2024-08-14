import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destinantion-and-date-step";
import { InviteGuestsSteps } from "./steps/invite-guests-steps";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);

  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  const [emailsToInvite, setEmailsToInvite] = useState(["Guilherme@gmail.com"]);

  const [isConfirmTriModalOpen, setIsConfirmTriModalOpen] = useState(false);

  const [destination, SetDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");

  const [eventStartAndDates, SetEventStartAndDates] = useState< DateRange | undefined>(undefined);

  function openGuestInput() {
    setIsGuestInputOpen(true);
  }

  function CloseGuestInput() {
    setIsGuestInputOpen(false);
  }

  function openGuestModal() {
    setIsGuestModalOpen(true);
  }

  function CloseGuestModal() {
    setIsGuestModalOpen(false);
  }

  function openConfirmTriModal() {
    setIsConfirmTriModalOpen(true);
  }

  function closeConfirmTriModal() {
    setIsConfirmTriModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const email = data.get("email")?.toString();

    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      return event.currentTarget.reset();
    }

    setEmailsToInvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove
    );
    setEmailsToInvite(newEmailList);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(destination);
    console.log(eventStartAndDates);
    console.log(emailsToInvite);
    console.log(ownerEmail);
    console.log(ownerName);

    if (!destination) {
      return;
    }
    if (!eventStartAndDates?.from || !eventStartAndDates?.to) {
      return;
    }
    if (emailsToInvite.length === 0) {
      return;
    }

    if (!ownerEmail || !ownerEmail) {
      return;
    }
    const response = await api.post("./trips", {
      destination,
      starts_at: eventStartAndDates?.from,
      ends_at: eventStartAndDates?.to,
      emails_to_envite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    });

    const { tripId } = response.data;

    navigate(`/trips/${tripId}`);
  }

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-patern bg-no-repeat bg-center">
        <div className="max-w-3xl w-full px-6 text-center space-y-10">
          <div className="flex flex-col items-center gap-3">
            <img src="/logo.svg" alt="Plann.er" />
            <p className="text-zinc-300 text-lg">
              Convide seus amigos e planeje sua próxima viagem
            </p>
          </div>
          <div className="space-y-4">
            <DestinationAndDateStep
              isGuestInputOpen={isGuestInputOpen}
              CloseGuestInput={CloseGuestInput}
              openGuestInput={openGuestInput}
              setDestination={SetDestination}
              SetEventStartAndDates={SetEventStartAndDates}
              eventStartAndDates={eventStartAndDates}
            />
            {isGuestInputOpen && (
              <InviteGuestsSteps
                emailsToInvite={emailsToInvite}
                openGuestModal={openGuestModal}
                openConfirmTriModal={openConfirmTriModal}
              />
            )}
          </div>
          <p className="text-sm text-zinc-500">
            Ao planejar sua viagem pela plann.er você automaticamente concoda{" "}
            <br />
            com nossos
            <a href="#" className="text-zinc-300 underline">
              <span> termos de uso.</span>
            </a>
            e{" "}
            <a href="#" className="text-zinc-300 underline">
              políticas de privacidade
            </a>
          </p>
        </div>

        {isGuestModalOpen && (
          <InviteGuestsModal
            emailsToInvite={emailsToInvite}
            addNewEmailToInvite={addNewEmailToInvite}
            CloseGuestModal={CloseGuestModal}
            removeEmailFromInvites={removeEmailFromInvites}
          />
        )}
        {isConfirmTriModalOpen && (
          <ConfirmTripModal
            closeConfirmTriModal={closeConfirmTriModal}
            createTrip={createTrip}
            setOwnerName={setOwnerName}
            setOwnerEmail={setOwnerEmail}
          />
        )}
      </div>
    </>
  );
}
