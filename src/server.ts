import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import passport from 'passport'
import passportMiddleware  from './middlewares/passport'
import authRoutes from './routes/auth.routes'
import privateRoutes from './routes/private.routes'

export class Server {
    private server: Application

    constructor(private port? : number | string ){
        this.server = express();
        this.setting();
        this.middlewares()
        this.routes();
    }
    
    setting(){
        this.server.set('port', process.env.PORT || this.port || 4000)
    }
    middlewares(){
        this.server.use(morgan('dev'));
        this.server.use(cors())
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(passport.initialize());
        passport.use(passportMiddleware)
    }
    routes(){
        this.server.use(authRoutes)
        this.server.use(privateRoutes)
    }
    async listen(){
       await this.server.listen(this.server.get('port'))
       console.log('server listen on port ' + this.server.get('port'))
    }
}