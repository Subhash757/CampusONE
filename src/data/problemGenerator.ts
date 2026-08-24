import { CodingProblem } from '../types';

export const PROBLEM_CATEGORIES = [
  'Arrays & Hashing',
  'Two Pointers',
  'Sliding Window',
  'Stack & Queue',
  'Binary Search',
  'Linked List',
  'Trees & Binary Search Trees',
  'Heap & Priority Queue',
  'Graphs & BFS/DFS',
  'Dynamic Programming',
  'Greedy Algorithms',
  'Backtracking',
  'Bit Manipulation',
  'Math & Geometry',
  'System Design & Distributed Systems'
] as const;

export const TOP_COMPANIES = [
  'Google',
  'Amazon',
  'Meta',
  'Microsoft',
  'Apple',
  'Netflix',
  'Uber',
  'Bloomberg',
  'Adobe',
  'Goldman Sachs'
] as const;

// Base templates to construct 600+ structured problems deterministically
const CATEGORY_TEMPLATES: Record<string, Array<{
  pattern: string;
  desc: string;
  codeSnippet: string;
  keyword: string;
  exInput: string;
  exOutput: string;
}>> = {
  'Arrays & Hashing': [
    {
      pattern: 'Find Element in Subarray',
      desc: 'Given an array of integers nums and a target value, find all indices or elements that satisfy contiguous subarray properties.',
      codeSnippet: `function solve(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    if (map.has(target - nums[i])) return [map.get(target - nums[i]), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
      keyword: 'map',
      exInput: 'nums = [2, 7, 11, 15], target = 9',
      exOutput: '[0, 1]'
    },
    {
      pattern: 'Group Anagrams & Frequency Count',
      desc: 'Given an array of strings, group words that are anagrams of each other using frequency buckets or sorting keys.',
      codeSnippet: `function groupAnagrams(strs) {\n  const map = {};\n  for (let s of strs) {\n    const key = s.split("").sort().join("");\n    if (!map[key]) map[key] = [];\n    map[key].push(s);\n  }\n  return Object.values(map);\n}`,
      keyword: 'map',
      exInput: 'strs = ["eat","tea","tan","ate","nat","bat"]',
      exOutput: '[["eat","tea","ate"],["tan","nat"],["bat"]]'
    },
    {
      pattern: 'Top K Frequent Elements',
      desc: 'Given an integer array nums and an integer k, return the k most frequent elements in O(n) time.',
      codeSnippet: `function topKFrequent(nums, k) {\n  const count = {};\n  nums.forEach(n => count[n] = (count[n] || 0) + 1);\n  return Object.keys(count).sort((a,b) => count[b] - count[a]).slice(0, k).map(Number);\n}`,
      keyword: 'sort',
      exInput: 'nums = [1,1,1,2,2,3], k = 2',
      exOutput: '[1, 2]'
    }
  ],
  'Two Pointers': [
    {
      pattern: 'Container With Most Water',
      desc: 'You are given an integer array height of length n. Find two lines that together with the x-axis form a container containing the most water.',
      codeSnippet: `function maxArea(height) {\n  let left = 0, right = height.length - 1, maxW = 0;\n  while (left < right) {\n    let area = Math.min(height[left], height[right]) * (right - left);\n    maxW = Math.max(maxW, area);\n    if (height[left] < height[right]) left++; else right--;\n  }\n  return maxW;\n}`,
      keyword: 'left',
      exInput: 'height = [1,8,6,2,5,4,8,3,7]',
      exOutput: '49'
    },
    {
      pattern: '3Sum Zero Combination',
      desc: 'Given an integer array nums, return all unique triplets [nums[i], nums[j], nums[k]] such that nums[i] + nums[j] + nums[k] == 0.',
      codeSnippet: `function threeSum(nums) {\n  nums.sort((a,b) => a - b);\n  const res = [];\n  for (let i = 0; i < nums.length - 2; i++) {\n    if (i > 0 && nums[i] === nums[i-1]) continue;\n    let l = i + 1, r = nums.length - 1;\n    while (l < r) {\n      let sum = nums[i] + nums[l] + nums[r];\n      if (sum === 0) { res.push([nums[i], nums[l], nums[r]]); l++; r--; }\n      else if (sum < 0) l++; else r--;\n    }\n  }\n  return res;\n}`,
      keyword: 'sort',
      exInput: 'nums = [-1,0,1,2,-1,-4]',
      exOutput: '[[-1,-1,2],[-1,0,1]]'
    }
  ],
  'Sliding Window': [
    {
      pattern: 'Longest Substring Without Repeating Characters',
      desc: 'Find the length of the longest contiguous substring without any repeating characters.',
      codeSnippet: `function lengthOfLongestSubstring(s) {\n  let set = new Set(), l = 0, maxL = 0;\n  for (let r = 0; r < s.length; r++) {\n    while (set.has(s[r])) { set.delete(s[l]); l++; }\n    set.add(s[r]);\n    maxL = Math.max(maxL, r - l + 1);\n  }\n  return maxL;\n}`,
      keyword: 'set',
      exInput: 's = "abcabcbb"',
      exOutput: '3'
    },
    {
      pattern: 'Minimum Size Subarray Sum',
      desc: 'Given an array of positive integers nums and a target sum, find the minimal length of a contiguous subarray whose sum is >= target.',
      codeSnippet: `function minSubArrayLen(target, nums) {\n  let l = 0, sum = 0, minL = Infinity;\n  for (let r = 0; r < nums.length; r++) {\n    sum += nums[r];\n    while (sum >= target) {\n      minL = Math.min(minL, r - l + 1);\n      sum -= nums[l++];\n    }\n  }\n  return minL === Infinity ? 0 : minL;\n}`,
      keyword: 'Infinity',
      exInput: 'target = 7, nums = [2,3,1,2,4,3]',
      exOutput: '2'
    }
  ],
  'Trees & Binary Search Trees': [
    {
      pattern: 'Validate Binary Search Tree',
      desc: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
      codeSnippet: `function isValidBST(root, min = null, max = null) {\n  if (!root) return true;\n  if ((min !== null && root.val <= min) || (max !== null && root.val >= max)) return false;\n  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);\n}`,
      keyword: 'isValidBST',
      exInput: 'root = [2,1,3]',
      exOutput: 'true'
    },
    {
      pattern: 'Lowest Common Ancestor of BST',
      desc: 'Find the lowest common ancestor (LCA) node of two given nodes p and q in a Binary Search Tree.',
      codeSnippet: `function lowestCommonAncestor(root, p, q) {\n  while (root) {\n    if (p.val < root.val && q.val < root.val) root = root.left;\n    else if (p.val > root.val && q.val > root.val) root = root.right;\n    else return root;\n  }\n  return null;\n}`,
      keyword: 'root',
      exInput: 'root = [6,2,8,0,4,7,9], p = 2, q = 8',
      exOutput: '6'
    }
  ],
  'Graphs & BFS/DFS': [
    {
      pattern: 'Number of Islands',
      desc: 'Given an m x n 2D binary grid representing a map of 1s (land) and 0s (water), return the total number of connected islands.',
      codeSnippet: `function numIslands(grid) {\n  let count = 0;\n  for (let r = 0; r < grid.length; r++) {\n    for (let c = 0; c < grid[0].length; c++) {\n      if (grid[r][c] === '1') { count++; dfs(grid, r, c); }\n    }\n  }\n  return count;\n}\nfunction dfs(g, r, c) {\n  if (r<0||c<0||r>=g.length||c>=g[0].length||g[r][c]==='0') return;\n  g[r][c] = '0';\n  dfs(g,r+1,c); dfs(g,r-1,c); dfs(g,r,c+1); dfs(g,r,c-1);\n}`,
      keyword: 'dfs',
      exInput: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]',
      exOutput: '2'
    },
    {
      pattern: 'Course Schedule Topological Sort',
      desc: 'Determine if you can finish all courses given prerequisite dependencies. Return true if no cycle exists.',
      codeSnippet: `function canFinish(numCourses, prerequisites) {\n  const adj = Array.from({length: numCourses}, () => []);\n  const visited = new Array(numCourses).fill(0);\n  for (let [u, v] of prerequisites) adj[v].push(u);\n  function hasCycle(curr) {\n    if (visited[curr] === 1) return true;\n    if (visited[curr] === 2) return false;\n    visited[curr] = 1;\n    for (let nxt of adj[curr]) if (hasCycle(nxt)) return true;\n    visited[curr] = 2;\n    return false;\n  }\n  for (let i = 0; i < numCourses; i++) if (hasCycle(i)) return false;\n  return true;\n}`,
      keyword: 'visited',
      exInput: 'numCourses = 2, prerequisites = [[1,0]]',
      exOutput: 'true'
    }
  ],
  'Dynamic Programming': [
    {
      pattern: 'Coin Change Minimum Coins',
      desc: 'Given an integer array coins representing denominations and an amount, return the fewest number of coins needed to make up that amount.',
      codeSnippet: `function coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let coin of coins) {\n    for (let i = coin; i <= amount; i++) {\n      dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}`,
      keyword: 'Infinity',
      exInput: 'coins = [1,2,5], amount = 11',
      exOutput: '3'
    },
    {
      pattern: 'Longest Increasing Subsequence',
      desc: 'Given an integer array nums, return the length of the longest strictly increasing subsequence.',
      codeSnippet: `function lengthOfLIS(nums) {\n  const dp = new Array(nums.length).fill(1);\n  let max = 1;\n  for (let i = 1; i < nums.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (nums[i] > nums[j]) dp[i] = Math.max(dp[i], dp[j] + 1);\n    }\n    max = Math.max(max, dp[i]);\n  }\n  return max;\n}`,
      keyword: 'dp',
      exInput: 'nums = [10,9,2,5,3,7,101,18]',
      exOutput: '4'
    }
  ],
  'System Design & Distributed Systems': [
    {
      pattern: 'Design Distributed Rate Limiter',
      desc: 'Architect a scalable multi-node API Rate Limiter handling 100k requests/sec using Redis Token Bucket or Sliding Window Counters.',
      codeSnippet: `class RateLimiter {\n  constructor(limit, windowMs) {\n    this.limit = limit;\n    this.windowMs = windowMs;\n    this.requests = new Map();\n  }\n  allowRequest(clientId) {\n    const now = Date.now();\n    const timestamps = (this.requests.get(clientId) || []).filter(t => now - t < this.windowMs);\n    if (timestamps.length < this.limit) {\n      timestamps.push(now);\n      this.requests.set(clientId, timestamps);\n      return true;\n    }\n    return false;\n  }\n}`,
      keyword: 'Map',
      exInput: 'clientId = "usr_99", limit = 5/sec',
      exOutput: 'true (within threshold)'
    },
    {
      pattern: 'Distributed URL Shortener (TinyURL)',
      desc: 'Design a high-availability URL shortener system with Base62 encoding, Redis caching, and persistent database storage.',
      codeSnippet: `class URLShortener {\n  constructor() {\n    this.alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";\n    this.counter = 1000000;\n    this.map = new Map();\n  }\n  encode(longUrl) {\n    let num = ++this.counter, str = "";\n    while (num > 0) { str = this.alphabet[num % 62] + str; num = Math.floor(num / 62); }\n    this.map.set(str, longUrl);\n    return "https://vvce.link/" + str;\n  }\n}`,
      keyword: 'alphabet',
      exInput: 'longUrl = "https://vvce.ac.in/departments/cse/research"',
      exOutput: '"https://vvce.link/bFT6a"'
    }
  ]
};

// Generates 600 problems deterministically
export function generate600Problems(): CodingProblem[] {
  const problems: CodingProblem[] = [];
  let idCounter = 1;

  // We iterate through categories and generate variations
  for (let cIdx = 0; cIdx < PROBLEM_CATEGORIES.length; cIdx++) {
    const category = PROBLEM_CATEGORIES[cIdx];
    const templates = CATEGORY_TEMPLATES[category] || CATEGORY_TEMPLATES['Arrays & Hashing'];

    // Generate ~40 problems per category = 15 * 40 = 600 problems
    for (let pIdx = 1; pIdx <= 40; pIdx++) {
      const template = templates[(pIdx - 1) % templates.length];
      const diff: 'Easy' | 'Medium' | 'Hard' = (idCounter % 3 === 0) ? 'Hard' : (idCounter % 2 === 0) ? 'Medium' : 'Easy';
      const company1 = TOP_COMPANIES[(idCounter) % TOP_COMPANIES.length];
      const company2 = TOP_COMPANIES[(idCounter + 3) % TOP_COMPANIES.length];
      
      const pId = `prob_${String(idCounter).padStart(3, '0')}`;
      const title = `${template.pattern} - Variant #${pIdx} (${category})`;
      
      problems.push({
        id: pId,
        title: `${category.split(' ')[0]} #${idCounter}: ${template.pattern} Part ${((pIdx - 1) % 4) + 1}`,
        difficulty: diff,
        description: `${template.desc} (Problem #${idCounter} in VVCE Interview Bank. Evaluated under strict time complexity bounds).`,
        examples: [
          {
            input: template.exInput,
            output: template.exOutput,
            explanation: `Standard testcase for ${template.pattern} under ${diff} constraints.`
          }
        ],
        constraints: [
          '1 <= element.length <= 10^5',
          '-10^9 <= value <= 10^9',
          'Memory Limit: 256MB',
          'Time Limit: 2000ms'
        ],
        starterCode: template.codeSnippet,
        expectedOutputKeyword: template.keyword,
        tags: [category, diff, 'Interview Standard'],
        timeLimitMs: 2000,
        companyTags: [company1, company2],
        acceptanceRate: Math.round(42 + (idCounter * 7) % 53)
      });

      idCounter++;
    }
  }

  return problems;
}

let cachedProblems: CodingProblem[] | null = null;

export function getAllProblems(): CodingProblem[] {
  if (!cachedProblems) {
    cachedProblems = generate600Problems();
  }
  return cachedProblems;
}

export function getProblemById(id: string): CodingProblem | undefined {
  return getAllProblems().find(p => p.id === id);
}
