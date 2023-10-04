import { ComponentProps } from "react";

export function Button({ ...rest }: ComponentProps<"button">) {
  return (
    <button
      className="flex w-full bg-red-500 py-2 px-6 text-white text-2xl font-semibold rounded-md data-[success=true]:bg-green-500 hover:bg-red-700 active:bg-red-600 justify-center"
      {...rest}
    />
  );
}
