// const { GroceryItem, BasketItem } = require("../mongo/models/grocery");
// const resolvers = {
//   ListName: {
//     GROCERY: GroceryItem,
//     BASKET: BasketItem,
//   },
//   Query: {
//     allListItems: async (_, { list }) => {
//       try {
//         const itemsArray = await list.find({});
//         return itemsArray;
//       } catch ({ message }) {
//         console.log(message);
//       }
//     },
//   },
//   Mutation: {
//     addGroceryItem: async (_, { item }) => {
//       try {
//         const newGroceryItem = new GroceryItem({ item: item });
//         await newGroceryItem.save();
//         const groceryItemsArray = await GroceryItem.find({});
//         return groceryItemsArray;
//       } catch ({ message }) {
//         console.log(message);
//         return groceryItemsArray;
//       }
//     },
//     addBasketItem: async (_, { item }) => {
//       try {
//         const newBasketItem = new BasketItem({
//           item: item,
//           amount: 1,
//           isBought: false,
//         });
//         await newBasketItem.save();
//         const basketItemsArray = await BasketItem.find({});
//         return basketItemsArray;
//       } catch {
//         await BasketItem.findOneAndUpdate(
//           { item: item },
//           { $inc: { amount: 1 } },
//           { new: true }
//         );
//         const basketItemsArray = await BasketItem.find({});
//         return basketItemsArray;
//       }
//     },
//     clearList: async (_, { list }) => {
//       await list.deleteMany({});
//     },
//     deleteOne: async (_, args) => {
//       try {
//         if (args.list === BasketItem) {
//           const relevantItem = await BasketItem.find({ item: `${args.item}` });
//           if (relevantItem[0].amount === 1) {
//             await args.list.deleteOne({ item: args.item });
//           } else {
//             await BasketItem.findOneAndUpdate(
//               { item: args.item },
//               { $inc: { amount: -1 } },
//               { new: true }
//             );
//           }
//           const basketItemsArray = await BasketItem.find({});
//           return basketItemsArray;
//         } else {
//           await list.deleteOne({ item: item });
//           const listItemArray = await list.find({});
//           return listItemArray;
//         }
//       } catch ({ message }) {
//         console.log(message);
//       }
//     },
//     toggleBought: async (_, { item }) => {
//       try {
//         const relevantItem = await BasketItem.find({ item: item });
//         relevantItem[0].isBought = !relevantItem[0].isBought;
//         await BasketItem.replaceOne({ item: item }, relevantItem[0]);
//         const allListItems = await BasketItem.find({});
//         return allListItems;
//       } catch ({ message }) {
//         console.log(message);
//       }
//     },
//   },
// };

// module.exports = { resolvers };
