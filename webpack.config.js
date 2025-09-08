export default {
  entry: "./src/main.tsx",
  output: {
    filename: "bundle.js",
  },
  module: [
    {
      test: /.haha/,
      use: [
        {
          loader: "haha-loader",
          options: {
            name: "haha",
          },
        },
      ],
    },
  ],
};
