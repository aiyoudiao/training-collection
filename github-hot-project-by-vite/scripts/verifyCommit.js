/*
 * File: verifyCommit.js                                                       *
 * Project: yasla                                                              *
 * Created Date: 2022-09-17 23:40:54                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-17 23:40:54                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * ----------	---	---------------------------------------------------------  *
 */
const fs = require('fs')

const msg = fs.readFileSync('.git/COMMIT_EDITMSG', 'utf-8').trim()

const commitREG = /^(revert: )?(feat|fix|docs|dx|refactor|perf|test|workflow|build|ci|chore|types|wip|release|deps)(\(.+\))?: .{1,50}/
const myCommitREG = /^(Merge pull request|Merge branch|feature|test)/

if (!commitREG.test(msg)) {
  if (!myCommitREG.test(msg)) {
    console.log('git commit 信息格式有问题。')
    console.error('需要使用以下格式： type(module): message。具体逻辑请看scripts/verifyCommit.js')

    process.exit(1)
  }
}

console.log('git commit 校验通过')
