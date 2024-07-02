import { useState } from "react";
import { Icon } from "./Icon";

export function BattleUser({
  title,
  onSubmitUser,
}: {
  title: string;
  onSubmitUser: (username: string, data: any) => void;
}) {
  const [username, setUsername] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isDisabled = username === "";

  const handleChangeUsername: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (isLoading) {
      return;
    }
    setUsername(e.target.value);
    setIsChecked(false);
    setError(null);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.code === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (isDisabled) {
      return;
    }

    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      setIsChecked(true);
      onSubmitUser(username, data);
    } catch (error) {
      setError(error?.toString() || "请求失败");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h4 className="text-sm font-medium leading-6 text-gray-900">{title}</h4>
      <div className="flex items-center mt-2">
        <div className="relative w-full mr-3">
          <input
            type="text"
            value={username}
            onKeyDown={handleKeyDown}
            onChange={handleChangeUsername}
            className="block w-full rounded-md border-0 py-1.5 pl-4 pr-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
            placeholder="Github 用户名"
          ></input>
          {isChecked && (
            <div className="absolute right-2 top-2.5 text-green-600">
              <Icon className="fa-solid fa-check text-green-600"></Icon>
            </div>
          )}
        </div>
        <button
          type="button"
          className="ml-2 disabled:cursor-not-allowed disabled:opacity-50 bg-green-100 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-200"
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          {isLoading ? (
            <i className="fa-solid fa-spinner text-green-600 text-2xl  animate-spin"></i>
          ) : (
            <i className="fa-solid fa-rocket text-green-700 text-2xl"></i>
          )}
        </button>
      </div>
      <div className="mt-1 text-xs text-red-500 h-[16px]">{error}</div>
    </div>
  );
}
