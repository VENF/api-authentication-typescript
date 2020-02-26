export default {
    key: process.env.JWT_KEY || '',
    DB: {
        URI: process.env.URI || '',
        USER: process.env.USER,
        PASSWORD: process.env.PASSWORD
    }
}