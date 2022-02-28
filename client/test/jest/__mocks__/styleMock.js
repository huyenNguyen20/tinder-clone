// Problem: Jest is hitting these CSS imports and 
// trying to parse them as if they were JavaScript.
// Solution: create a file containing a module
//  which exports an empty object

module.exports = {}