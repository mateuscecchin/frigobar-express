import { ComponentProps } from "react";

export function Button({ ...rest }: ComponentProps<"button">) {
  return (
    <button
      className="flex w-full bg-red-500 py-2 px-6 text-white font-semibold rounded-md shake data-[success=true]:bg-green-500 hover:bg-red-700 active:bg-red-600 justify-center"
      {...rest}
    />
  );
}
