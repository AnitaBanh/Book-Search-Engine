const { bookSchema, User } = require("../models");

const resolvers = {
  Query: {
    me: async () => {
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate("savedBooks");
        }
        throw new AuthenticationError("You need to be logged in!");
      };
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(profile);
      return { token, profile };
    },

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, profile };
    },
    saveBook: async (parent, { userId, book }, context) => {
      // Find the user by their ID
      if (context.user) {
        const { author, description, title, bookId, image, link } = book;
        const newBook = {
          author,
          description,
          title,
          bookId,
          image,
          link,
        };
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { newBook } }
        );
        return user;
      }
    },

    removeBook: async (bookId) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: params.bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        return res
          .status(404)
          .json({ message: "Couldn't find user with this id!" });
      }
      return res.json(updatedUser);
    },
  },
};

module.exports = resolvers;
