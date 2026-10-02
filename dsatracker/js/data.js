/* Static topic catalogue. Each problem gets a stable id like "arrays-0". */
const TOPICS = [
  ['arrays','Arrays','Traversal, prefix sums, Kadane and two pointers.',[['Two Sum','Easy'],['Best Time to Buy and Sell Stock','Easy'],['Maximum Subarray','Medium'],['Product of Array Except Self','Medium'],['Container With Most Water','Medium']]],
  ['2d-arrays','2D Arrays','Matrix traversal, rotation and searching.',[['Transpose Matrix','Easy'],['Spiral Matrix','Medium'],['Rotate Image','Medium'],['Set Matrix Zeroes','Medium'],['Search a 2D Matrix','Medium']]],
  ['strings','Strings','Character arrays, palindromes and anagrams.',[['Reverse String','Easy'],['Valid Palindrome','Easy'],['Valid Anagram','Easy'],['Longest Common Prefix','Easy'],['Longest Substring Without Repeating Characters','Medium']]],
  ['vectors','Vectors','Dynamic arrays in C++ and in-place edits.',[['Move Zeroes','Easy'],['Remove Duplicates from Sorted Array','Easy'],['Merge Sorted Array','Easy'],['Rotate Array','Medium'],['Find All Duplicates in an Array','Medium']]],
  ['sorting','Sorting','Sort-based tricks and custom comparators.',[['Squares of a Sorted Array','Easy'],['Sort Colors','Medium'],['Merge Intervals','Medium'],['Kth Largest Element in an Array','Medium'],['Largest Number','Medium']]],
  ['binary-search','Binary Search','Search on sorted data and on answers.',[['Binary Search','Easy'],['Search Insert Position','Easy'],['Find First and Last Position of Element','Medium'],['Search in Rotated Sorted Array','Medium'],['Koko Eating Bananas','Medium']]]
].map(([id,title,desc,p])=>({id,title,desc,problems:p.map(([name,level],i)=>({id:`${id}-${i}`,name,level}))}));
