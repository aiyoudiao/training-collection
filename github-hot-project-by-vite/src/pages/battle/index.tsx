import { useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Guide } from "@/components/Guide";
import { BattleUser } from "@/components/BattleUser";

const Battle: React.FC = () => {
  const navigate = useNavigate();
  const [githubUserOne, setGithubUserOne] = useState<string>("");
  const [githubUserTwo, setGithubUserTwo] = useState<string>("");
  const [buttonVisibility, setButtonVisibility] = useState<boolean>(false);

  useEffect(() => {
    setButtonVisibility(Boolean(githubUserOne && githubUserTwo));
  }, [githubUserOne, githubUserTwo, navigate]);

  const handleConfirm = () => {
    navigate(`/result?userOne=${githubUserOne}&userTwo=${githubUserTwo}`);
  };

  return (
    <div className="py-4 h-full flex flex-col items-center bg-green-50">
      <Guide />
      <div className="w-full mt-20">
        <h3 className="text-xl text-center mb-6 text-green-700 font-bold">
          玩家们，准备好了吗？
          {buttonVisibility && (
            <button
              onClick={handleConfirm}
              className="bg-green-100 hover:bg-green-200 text-green-800 text-xl font-semibold px-4 border border-green-400 rounded shadow"
            >
              战斗
            </button>
          )}
        </h3>
        <div className="flex items-start justify-between mx-10">
          <div className="flex-1 w-[50%] mr-10">
            <BattleUser
              title="玩家一号"
              onSubmitUser={(user) => {
                setGithubUserOne(user);
              }}
            />
          </div>
          <div className="flex-1 w-[50%]">
            <BattleUser
              title="玩家二号"
              onSubmitUser={(user) => {
                setGithubUserTwo(user);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Battle);
