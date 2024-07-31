import { CircleCheck } from "lucide-react";

export function Activities() {
  return (
    <div className="space-y-8 ">
      <div className="space-y-2.5 gap-2 items-baseline">
        <div className="flex gap-2 items-baseline">
          <span className="text-xl text-zinc-300 font-semibold">dia 17</span>
          <span className="text-xs text-zinc-500 ">Sabado</span>
        </div>
        <p className="text-zinc-500 text-sm">
          Nenhuma atividade cadastrada nessa data.
        </p>
      </div>

      <div className="space-y-2.5 gap-2 items-baseline">
        <div className="flex gap-2 items-baseline">
          <span className="text-xl text-zinc-300 font-semibold">dia 8</span>
          <span className="text-xs text-zinc-500 ">Domingo</span>
        </div>
        <div className="space-y-2.5">
          <div className="px-5 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
            <CircleCheck className="size-5 text-line-300" />
            <span className="text-zinc-100">Academia em grupo</span>
            <span className="text-zinc-400 text-sm ml-auto">08:00</span>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="px-5 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
            <CircleCheck className="size-5 text-line-300" />
            <span className="text-zinc-100">Academia em grupo</span>
            <span className="text-zinc-400 text-sm ml-auto">08:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
