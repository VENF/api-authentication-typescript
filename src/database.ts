import mongoose, { ConnectionOptions } from 'mongoose'
import config from './config/config'

const options: ConnectionOptions = {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose.connect(config.DB.URI, options)

const connection = mongoose.connection;

connection.once('open', _=> console.log('connection is stablished'))
connection.on('error', err => {
    console.log(err)
    process.exit(0)
})