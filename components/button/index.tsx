import { ComponentProps } from "react";

export function Button({ ...rest }: ComponentProps<"button">) {
  return (
    <button
      className="flex w-full bg-red-500 py-6 px-8 text-white text-2xl shake font-semibold rounded-md hover:bg-red-700 active:bg-red-600 justify-center"
      {...rest}
    />
  );
}
