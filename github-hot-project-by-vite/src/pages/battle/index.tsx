import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Guide } from "@/components/Guide";
import { BattleUser } from "@/components/BattleUser";

export default function Battle() {
  const navigate = useNavigate();
  const [githubUserOne, setGithubUserOne] = useState<string>('');
  const [githubUserTwo, setGithubUserTwo] = useState<string>('');

  useEffect(() => {
    if (githubUserOne && githubUserTwo) {
      navigate(`/result?userOne=${githubUserOne}&userTwo=${githubUserTwo}`);
    }
  }, [githubUserOne, githubUserTwo, navigate]);

  return (
    <div className="py-4 h-full flex flex-col items-center bg-green-50">
      <Guide />
      <div className="w-full mt-20">
        <h3 className="text-xl text-center mb-6 text-green-700 font-bold">玩家们，准备好了吗？</h3>
        <div className="flex items-center justify-between mx-10">
          <div className="flex-1 w-[50%] mr-10">
            <BattleUser title="玩家一号" onSubmitUser={(user) => {
              setGithubUserOne(user);
            }} />
          </div>
          <div className="flex-1 w-[50%]">
            <BattleUser title="玩家二号" onSubmitUser={(user) => {
              setGithubUserTwo(user);
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}
