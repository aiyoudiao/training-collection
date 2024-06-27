#!/bin/bash

# 遍历当前目录下的所有文件
for file in *; do
  # 判断文件名中是否包含 "copy"
  if [[ "$file" == *"copy"* ]]; then
    # 新文件名：将 "copy" 替换为 ".tailwind" 并去掉空格
    new_file=$(echo "$file" | sed 's/copy/.tailwind/g' | tr -d ' ')
    
    # 重命名文件
    mv "$file" "$new_file"
    
    echo "Renamed $file to $new_file"
  fi
done
