const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
	transpileDependencies: true,
	devServer: {
		proxy: {
			'/uploads': {
				target: 'http://localhost:5400',
				changeOrigin: true,
			},
		},
	},
});
