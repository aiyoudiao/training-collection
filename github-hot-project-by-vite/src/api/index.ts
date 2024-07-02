// 从 GitHub API 获取用户数据
export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  [key: string]: any; // 其他未指定的字段
}

export async function fetchPlayer(username: string): Promise<GitHubUser> {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "发生错误");
  }
  return response.json();
}
