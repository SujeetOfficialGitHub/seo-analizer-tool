const config = {
    development: {
        apiUrl: 'http://localhost:8000'
    },
    production: {
        apiUrl: 'https://seo-analizer-tool.vercel.app'
    }
}

export default config[process.env.NODE_ENV || 'development'];