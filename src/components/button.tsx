import { Settings2 } from "lucide-react";
import { ComponentProps, ReactNode } from "react";
import { tv } from "tailwind-variants";

interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
}
export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700"
    >
      {children}
    </button>
  );
}
