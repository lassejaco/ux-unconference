/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config, { webpack }) => {
    return {
      ...config,
      plugins: [
        new webpack.DefinePlugin({
          devMode: process.env.NODE_ENV !== 'production',
        }),
        ...config.plugins,
      ],
      module: {
        ...config.module,
        rules: [
          {
            test: /\.svg$/,
            exclude: /icons/,
            use: [
              {
                loader: '@svgr/webpack',
                options: {
                  svgoConfig: {
                    plugins: [
                      {
                        name: 'preset-default',
                        params: {
                          overrides: {
                            removeViewBox: false,
                          },
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
          {
            test: /\.svg$/,
            include: /icons/,
            issuer: { not: /\.(css|scss|sass)$/ },
            use: [
              {
                loader: '@svgr/webpack',
                options: {
                  icon: true,
                  svgProps: {
                    className: 'icon',
                  },
                  svgoConfig: {
                    plugins: [
                      {
                        name: 'preset-default',
                        params: {
                          overrides: {
                            removeViewBox: false,
                          },
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
          {
            test: /\.mtl$/,
            loader: 'mtl-loader',
          },
          {
            test: /\.obj$/,
            loader: 'url-loader',
          },
          ...config.module.rules,
        ],
      },
    }
  },
}
