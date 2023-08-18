function twoSum(nums, target) {
     const numToIndex = {}; // Object to store numbers and their indices
     
     for (let i = 0; i < nums.length; i++) {
         const num = nums[i];
     //     console.log(nums.length);
         const complement = target - num;
 
         console.log(complement)
         
         if (complement in numToIndex) {
             return [numToIndex[complement], i];
         }

         console.log(i);
         
         numToIndex[num] = i; // Store the current number and its index
     }
     
     // If no solution is found, return an empty array or handle as needed
     return [];
 }
 
 // Example usage
 const nums = [2, 7, 11, 15];
 const target = 9;
 const result = twoSum(nums, target);
 console.log(result); // Output: [0, 1]
 