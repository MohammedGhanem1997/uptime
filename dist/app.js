"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const error_middleware_1 = __importDefault(require("@/serviceProvider/middlewares/error.middleware"));
const mongo_connections_1 = __importDefault(require("@/connections/mongo.connections"));
const redis_connections_1 = __importDefault(require("@/connections/redis.connections"));
require("@/serviceProvider/schedulers/ping");
/**
 * App Class: Bootstrap our server and intialise all required steps to start the server
 */
class App {
    constructor(routes, port) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.intialiseMongoConnection();
        this.intialiseRedisConnection();
        this.initialiseMiddlewares();
        this.initialiseRoutes(routes);
        this.intialiseErrorHandling();
    }
    /**
     * method used for intialising all global middlewares
     */
    initialiseMiddlewares() {
        this.express.use((0, helmet_1.default)());
        this.express.use((0, cors_1.default)());
        this.express.use((0, compression_1.default)());
        this.express.use((0, morgan_1.default)('dev'));
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
    }
    /**
     * Intialise all the controllers by looping through the routers of each controller and passes it to express
     * @param controllers - Array of controllers for all modules
     */
    initialiseRoutes(routes) {
        routes.forEach((route) => {
            this.express.use('/api/v1', route.router);
        });
    }
    /**
     * Intialise express global error handling middleware, Accepts HttpExecption from controllers and response it to the client side
     */
    intialiseErrorHandling() {
        this.express.use(error_middleware_1.default);
    }
    intialiseMongoConnection() {
        const mongo = mongo_connections_1.default.connect();
        console.log("mongo conected", mongo);
    }
    intialiseRedisConnection() {
        redis_connections_1.default.connect();
    }
    /**
     * Start listening the express server on the predefined port
     */
    listen() {
        this.express.listen(this.port, () => {
            console.log(`App running on port: ${this.port}`);
        });
    }
}
exports.default = App;
