const config = {
    development: {
        apiUrl: 'http://localhost:8000'
    },
    production: {
        apiUrl: 'https://seo-tool-5s3j.onrender.com'
    }
}

export default config[process.env.NODE_ENV || 'development'];