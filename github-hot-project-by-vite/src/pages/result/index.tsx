import React, { useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "@/components/Loading";
import { UserCard } from "@/components/UserCard";
import { useTwoUserName } from "@/hooks/useUtils";

// 定义 GitHub 用户的数据类型
interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  [key: string]: any; // 其他未指定的字段
}

// 从 GitHub API 获取用户数据
async function fetchPlayer(username: string): Promise<GitHubUser> {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "发生错误");
  }
  return response.json();
}

const Result: React.FC = () => {
  const navigate = useNavigate();
  const { githubUserOne, githubUserTwo } = useTwoUserName();
  const [playerOneData, setPlayerOneData] = useState<GitHubUser | null>(null);
  const [playerTwoData, setPlayerTwoData] = useState<GitHubUser | null>(null);

  useEffect(() => {
    if (githubUserOne) {
      fetchPlayerOne();
    }
    if (githubUserTwo) {
      fetchPlayerTwo();
    }
  }, [githubUserOne, githubUserTwo]);

  const fetchPlayerOne = async () => {
    try {
      const user = await fetchPlayer(githubUserOne);
      setPlayerOneData(user);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlayerTwo = async () => {
    try {
      const user = await fetchPlayer(githubUserTwo);
      setPlayerTwoData(user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    navigate('/battle');
  };

  if (!githubUserOne || !githubUserTwo) {
    return (
      <div className="py-4 h-full flex flex-col items-center">
        <h1 className="pb-4">计算无法完成，因为用户输入有误</h1>
        <button onClick={handleReset} className="bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-2 px-4 border border-green-400 rounded shadow">
          重置
        </button>
      </div>
    );
  }

  if (!playerOneData || !playerTwoData) {
    return (
      <div className="py-4 h-full flex flex-col items-center">
        <Loading load={true} />
      </div>
    );
  }

  const getWinnerTitle = () => {
    if (playerOneData.public_repos > playerTwoData.public_repos) {
      return ["无敌胜者", "努力加油！"];
    } else if (playerOneData.public_repos < playerTwoData.public_repos) {
      return ["努力加油！", "无敌胜者"];
    } else {
      return ["势均力敌？", "势均力敌？"];
    }
  };

  const [titleOne, titleTwo] = getWinnerTitle();

  return (
    <div className="py-4 h-full flex flex-col items-center bg-green-50">
      <div className="flex w-full mb-10">
        <div className="w-1/2">
          <UserCard title={titleOne} data={playerOneData} />
        </div>
        <div className="w-1/2">
          <UserCard title={titleTwo} data={playerTwoData} />
        </div>
      </div>
      <button onClick={handleReset} className="bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-2 px-4 border border-green-400 rounded shadow">
        重置
      </button>
    </div>
  );
}

export default memo(Result);
