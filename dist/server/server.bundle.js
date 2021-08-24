/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 297:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(578);
const app_service_1 = __webpack_require__(279);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ 929:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const auth_module_1 = __webpack_require__(322);
const database_module_1 = __webpack_require__(448);
const common_1 = __webpack_require__(578);
const core_1 = __webpack_require__(84);
const user_service_1 = __webpack_require__(577);
const app_controller_1 = __webpack_require__(297);
const app_service_1 = __webpack_require__(279);
const segment_module_1 = __webpack_require__(151);
const user_module_1 = __webpack_require__(64);
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            core_1.RouterModule.register([{ path: 'auth', module: auth_module_1.AuthModule }]),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            segment_module_1.SegmentModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, user_service_1.UserService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ 279:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(578);
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
};
AppService = __decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ 322:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const jwt_config_1 = __webpack_require__(663);
const database_module_1 = __webpack_require__(448);
const common_1 = __webpack_require__(578);
const config_1 = __webpack_require__(797);
const jwt_1 = __webpack_require__(542);
const passport_1 = __webpack_require__(214);
const user_module_1 = __webpack_require__(64);
const auth_service_1 = __webpack_require__(360);
const login_controller_1 = __webpack_require__(935);
const register_controller_1 = __webpack_require__(85);
const jwt_strategy_1 = __webpack_require__(91);
const local_strategy_1 = __webpack_require__(727);
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forFeature(jwt_config_1.default),
            database_module_1.DatabaseModule,
            user_module_1.UserModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule.forFeature(jwt_config_1.default)],
                useFactory: (config) => ({
                    secret: config.secretKey,
                    signOptions: { expiresIn: config.expireTime },
                }),
                inject: [jwt_config_1.default.KEY],
            }),
        ],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy],
        controllers: [register_controller_1.RegisterController, login_controller_1.LoginController],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ 360:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const rxjs_1 = __webpack_require__(435);
const common_1 = __webpack_require__(578);
const jwt_1 = __webpack_require__(542);
const user_service_1 = __webpack_require__(577);
let AuthService = class AuthService {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    validateUser(email, password) {
        return this.userService.findByEmail(email).pipe(rxjs_1.mergeMap((user) => (user ? rxjs_1.of(user) : rxjs_1.EMPTY)), rxjs_1.throwIfEmpty(() => new common_1.UnauthorizedException(`username or password not matched`)), rxjs_1.mergeMap((user) => user.comparePassword(password).pipe(rxjs_1.map((valid) => {
            if (valid) {
                return {
                    id: user.id,
                    email: user.email,
                };
            }
            else {
                throw new common_1.UnauthorizedException(`username or password not matched`);
            }
        }))));
    }
    login(user) {
        const claimsPayload = {
            ui: user.id,
            ue: user.email,
        };
        return rxjs_1.from(this.jwtService.signAsync(claimsPayload)).pipe(rxjs_1.map((token) => ({ token })));
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ 994:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtGuard = void 0;
const common_1 = __webpack_require__(578);
const passport_1 = __webpack_require__(214);
let JwtGuard = class JwtGuard extends passport_1.AuthGuard('jwt') {
    canActivate(context) {
        return super.canActivate(context);
    }
    handleRequest(error, user, info) {
        if (error || !user) {
            throw error || new common_1.UnauthorizedException();
        }
        return user;
    }
};
JwtGuard = __decorate([
    common_1.Injectable()
], JwtGuard);
exports.JwtGuard = JwtGuard;


/***/ }),

/***/ 839:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalGuard = void 0;
const common_1 = __webpack_require__(578);
const passport_1 = __webpack_require__(214);
let LocalGuard = class LocalGuard extends passport_1.AuthGuard('local') {
};
LocalGuard = __decorate([
    common_1.Injectable()
], LocalGuard);
exports.LocalGuard = LocalGuard;


/***/ }),

/***/ 935:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginController = void 0;
const rxjs_1 = __webpack_require__(435);
const common_1 = __webpack_require__(578);
const auth_service_1 = __webpack_require__(360);
const local_guard_1 = __webpack_require__(839);
let LoginController = class LoginController {
    constructor(authService) {
        this.authService = authService;
    }
    login(req, res) {
        return this.authService
            .login(req.user)
            .pipe(rxjs_1.map(({ token }) => res.header('Authorization', `Bearer ${token}`).json(token).send()));
    }
};
__decorate([
    common_1.UseGuards(local_guard_1.LocalGuard),
    common_1.Post(),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], LoginController.prototype, "login", null);
LoginController = __decorate([
    common_1.Controller('login'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], LoginController);
exports.LoginController = LoginController;


/***/ }),

/***/ 85:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterController = void 0;
const rxjs_1 = __webpack_require__(435);
const register_1 = __webpack_require__(675);
const common_1 = __webpack_require__(578);
const user_service_1 = __webpack_require__(577);
let RegisterController = class RegisterController {
    constructor(userService) {
        this.userService = userService;
    }
    register(body, res) {
        return this.userService.existingEmail(body.email).pipe(rxjs_1.mergeMap((exists) => {
            if (exists) {
                throw new common_1.ConflictException(`Existing email: ${body.email}`);
            }
            return this.userService.register(body).pipe(rxjs_1.map((created) => {
                return res
                    .location(`/users/${created.id}`)
                    .status(common_1.HttpStatus.CREATED)
                    .send(created);
            }));
        }));
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_1.RegisterDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], RegisterController.prototype, "register", null);
RegisterController = __decorate([
    common_1.Controller('register'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], RegisterController);
exports.RegisterController = RegisterController;


/***/ }),

/***/ 91:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const passport_jwt_1 = __webpack_require__(307);
const jwt_config_1 = __webpack_require__(663);
const common_1 = __webpack_require__(578);
const passport_1 = __webpack_require__(214);
let JwtStrategy = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {
    constructor(config) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.secretKey,
        });
    }
    validate(payload) {
        return { id: payload.ui, email: payload.ue };
    }
};
JwtStrategy = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(jwt_config_1.default.KEY)),
    __metadata("design:paramtypes", [void 0])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),

/***/ 727:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const passport_local_1 = __webpack_require__(888);
const rxjs_1 = __webpack_require__(435);
const auth_service_1 = __webpack_require__(360);
const common_1 = __webpack_require__(578);
const passport_1 = __webpack_require__(214);
let LocalStrategy = class LocalStrategy extends passport_1.PassportStrategy(passport_local_1.Strategy) {
    constructor(authService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
        this.authService = authService;
    }
    async validate(email, password) {
        const user = await rxjs_1.lastValueFrom(this.authService.validateUser(email, password));
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
LocalStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;


/***/ }),

/***/ 663:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(797);
exports.default = config_1.registerAs('jwt', () => ({
    secretKey: 'thisisarandomkey',
    expireTime: '3600s',
}));


/***/ }),

/***/ 294:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(797);
exports.default = config_1.registerAs('mongodb', () => ({
    uri: 'mongodb://localhost',
}));


/***/ }),

/***/ 448:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(578);
const config_1 = __webpack_require__(797);
const mongo_config_1 = __webpack_require__(294);
const db_connection_providers_1 = __webpack_require__(306);
const db_models_providers_1 = __webpack_require__(278);
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    common_1.Module({
        imports: [config_1.ConfigModule.forFeature(mongo_config_1.default)],
        providers: [...db_connection_providers_1.dbConnectionProviders, ...db_models_providers_1.dbModelsProviders],
        exports: [...db_connection_providers_1.dbConnectionProviders, ...db_models_providers_1.dbModelsProviders],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;


/***/ }),

/***/ 306:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dbConnectionProviders = void 0;
const mongoose_1 = __webpack_require__(619);
const mongo_config_1 = __webpack_require__(294);
const constants_1 = __webpack_require__(258);
exports.dbConnectionProviders = [
    {
        provide: constants_1.PROVIDERS.DB,
        useFactory: (dbConfig) => mongoose_1.createConnection(dbConfig.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }),
        inject: [mongo_config_1.default.KEY],
    },
];


/***/ }),

/***/ 278:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dbModelsProviders = void 0;
const constants_1 = __webpack_require__(258);
const segment_model_1 = __webpack_require__(627);
const segment_stat_model_1 = __webpack_require__(192);
const user_model_1 = __webpack_require__(114);
exports.dbModelsProviders = [
    {
        provide: constants_1.PROVIDERS.MODELS.USER,
        useFactory: (cnt) => user_model_1.createUserModel(cnt),
        inject: [constants_1.PROVIDERS.DB],
    },
    {
        provide: constants_1.PROVIDERS.MODELS.SEGMENT,
        useFactory: (cnt) => segment_model_1.createSegmentModel(cnt),
        inject: [constants_1.PROVIDERS.DB],
    },
    {
        provide: constants_1.PROVIDERS.MODELS.SEGMENT_STAT,
        useFactory: (cnt) => segment_stat_model_1.createSegmentStatModel(cnt),
        inject: [constants_1.PROVIDERS.DB],
    },
];


/***/ }),

/***/ 627:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createSegmentModel = exports.afterDelete = exports.beforeSave = exports.SegmentSchema = void 0;
const mongoose_1 = __webpack_require__(619);
exports.SegmentSchema = new mongoose_1.Schema({
    name: { type: mongoose_1.SchemaTypes.String, required: true },
    distance: { type: mongoose_1.SchemaTypes.Number, required: true },
    elevation: { type: mongoose_1.SchemaTypes.Number, required: true },
    steep: { type: mongoose_1.SchemaTypes.Number, min: 0.0, max: 100.0 },
    stravaUrl: mongoose_1.SchemaTypes.String,
    type: {
        type: mongoose_1.SchemaTypes.String,
        enum: ['HILLY', 'FLAT', 'DOWNHILL'],
        default: 'FLAT',
    },
    owner: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
    versionKey: false,
});
async function beforeSave(next) {
    if (this.steep) {
        return next();
    }
    this.set('steep', (this.elevation / this.distance) * 0.1);
    next();
}
exports.beforeSave = beforeSave;
exports.SegmentSchema.pre(['save', 'updateOne'], beforeSave);
async function afterDelete(segment, next) {
    await this.model('SegmentState').deleteMany({ segment: segment._id });
    next();
}
exports.afterDelete = afterDelete;
exports.SegmentSchema.post('deleteOne', afterDelete);
const createSegmentModel = (cnt) => cnt.model('Segment', exports.SegmentSchema, 'segments');
exports.createSegmentModel = createSegmentModel;


/***/ }),

/***/ 192:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createSegmentStatModel = exports.SegmentStatSchema = void 0;
const mongoose_1 = __webpack_require__(619);
exports.SegmentStatSchema = new mongoose_1.Schema({
    segment: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'Segment', required: true },
    duration: { type: mongoose_1.SchemaTypes.Number, required: true },
    speed: { type: mongoose_1.SchemaTypes.Number, required: true },
    cadence: { type: mongoose_1.SchemaTypes.Number, required: false },
    bpm: { type: mongoose_1.SchemaTypes.Number, required: false },
    power: { type: mongoose_1.SchemaTypes.Number, required: false },
    feel: { type: mongoose_1.SchemaTypes.Number, required: false },
    notes: { type: mongoose_1.SchemaTypes.String, required: false },
    date: { type: mongoose_1.SchemaTypes.Date, required: true, default: new Date() },
}, { versionKey: false });
const createSegmentStatModel = (cnt) => cnt.model('SegmentStat', exports.SegmentStatSchema, 'segmentStats');
exports.createSegmentStatModel = createSegmentStatModel;


/***/ }),

/***/ 114:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createUserModel = exports.userNameHook = exports.comparePassword = exports.beforeSave = exports.UserSchema = void 0;
const bcrypt_1 = __webpack_require__(552);
const mongoose_1 = __webpack_require__(619);
const rxjs_1 = __webpack_require__(435);
const helpers_1 = __webpack_require__(217);
exports.UserSchema = new mongoose_1.Schema({
    email: { type: mongoose_1.SchemaTypes.String, immutable: true },
    password: { type: mongoose_1.SchemaTypes.String },
    firstName: mongoose_1.SchemaTypes.String,
    lastName: { type: mongoose_1.SchemaTypes.String, required: false },
    weight: { type: mongoose_1.SchemaTypes.Number, default: 80.0 },
    height: { type: mongoose_1.SchemaTypes.Number, default: 170.0 },
    gender: {
        type: mongoose_1.SchemaTypes.String,
        enum: ['MALE', 'FEMALE', 'OTHER'],
        default: 'OTHER',
    },
    level: {
        type: mongoose_1.SchemaTypes.String,
        enum: ['BEGGINER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'],
        default: 'INTERMEDIATE',
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true, transform: helpers_1.baseSerializer },
    versionKey: false,
});
async function beforeSave(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const password = await bcrypt_1.hash(this.password, 12);
    this.set('password', password);
    next();
}
exports.beforeSave = beforeSave;
exports.UserSchema.pre('save', beforeSave);
exports.UserSchema.pre('updateOne', beforeSave);
function comparePassword(password) {
    return rxjs_1.from(bcrypt_1.compare(password, this.password));
}
exports.comparePassword = comparePassword;
exports.UserSchema.methods.comparePassword = comparePassword;
function userNameHook() {
    return `${this.firstName} ${this.lastName}`;
}
exports.userNameHook = userNameHook;
exports.UserSchema.virtual('name').get(userNameHook);
const createUserModel = (cnt) => cnt.model('User', exports.UserSchema, 'users');
exports.createUserModel = createUserModel;


/***/ }),

/***/ 396:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SegmentController = void 0;
const rxjs_1 = __webpack_require__(435);
const jwt_guard_1 = __webpack_require__(994);
const common_1 = __webpack_require__(578);
const segment_1 = __webpack_require__(166);
const segment_stat_1 = __webpack_require__(973);
const pipes_1 = __webpack_require__(331);
const segment_service_1 = __webpack_require__(581);
let SegmentController = class SegmentController {
    constructor(segmentService) {
        this.segmentService = segmentService;
    }
    getAll(query = {}) {
        return this.segmentService.findAll(query);
    }
    getSingle(id) {
        return this.segmentService.findById(id);
    }
    createSegment(body, response) {
        return this.segmentService
            .save(body)
            .pipe(rxjs_1.map((segment) => response
            .location(`/posts/${segment._id}`)
            .status(common_1.HttpStatus.CREATED)
            .send(segment)));
    }
    updateSegment(id, body, response) {
        return this.segmentService
            .update(id, body)
            .pipe(rxjs_1.map(() => response.status(common_1.HttpStatus.NO_CONTENT).send()));
    }
    deleteSegment(id, response) {
        return this.segmentService
            .delete(id)
            .pipe(rxjs_1.map(() => response.status(common_1.HttpStatus.NO_CONTENT).send()));
    }
    getStatsFrom(id, response) {
        return this.segmentService
            .getStatsFrom(id)
            .pipe(rxjs_1.map((stats) => response.status(common_1.HttpStatus.OK).send(stats)));
    }
    createStat(id, body, response) {
        return this.segmentService
            .createStatFor(id, body)
            .pipe(rxjs_1.map((stat) => response
            .location(`/segments/${id}/stats/${stat._id}`)
            .status(common_1.HttpStatus.CREATED)
            .send(stat)));
    }
    deleteStat(id, statId, response) {
        return this.segmentService
            .deleteStatFrom(id, statId)
            .pipe(rxjs_1.map(() => response.status(common_1.HttpStatus.NO_CONTENT).send()));
    }
};
__decorate([
    common_1.Get(''),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], SegmentController.prototype, "getAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id', new pipes_1.ParseObjectIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], SegmentController.prototype, "getSingle", null);
__decorate([
    common_1.Post(''),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [segment_1.SegmentDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], SegmentController.prototype, "createSegment", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id', new pipes_1.ParseObjectIdPipe())),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, segment_1.SegmentDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], SegmentController.prototype, "updateSegment", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id', new pipes_1.ParseObjectIdPipe())),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], SegmentController.prototype, "deleteSegment", null);
__decorate([
    common_1.Get(':id/stats'),
    __param(0, common_1.Param('id', new pipes_1.ParseObjectIdPipe())),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], SegmentController.prototype, "getStatsFrom", null);
__decorate([
    common_1.Post(':id/stats'),
    __param(0, common_1.Param('id', new pipes_1.ParseObjectIdPipe())),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, segment_stat_1.SegmentStatDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], SegmentController.prototype, "createStat", null);
__decorate([
    common_1.Delete(':id/stats/:statId'),
    __param(0, common_1.Param('id', new pipes_1.ParseObjectIdPipe())),
    __param(1, common_1.Param('statId', new pipes_1.ParseObjectIdPipe())),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], SegmentController.prototype, "deleteStat", null);
SegmentController = __decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Controller({ path: 'segments', scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [segment_service_1.SegmentService])
], SegmentController);
exports.SegmentController = SegmentController;


/***/ }),

/***/ 151:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SegmentModule = void 0;
const database_module_1 = __webpack_require__(448);
const common_1 = __webpack_require__(578);
const segment_controller_1 = __webpack_require__(396);
const segment_service_1 = __webpack_require__(581);
let SegmentModule = class SegmentModule {
};
SegmentModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule],
        controllers: [segment_controller_1.SegmentController],
        providers: [segment_service_1.SegmentService],
        exports: [segment_service_1.SegmentService],
    })
], SegmentModule);
exports.SegmentModule = SegmentModule;


/***/ }),

/***/ 581:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SegmentService = void 0;
const mongoose_1 = __webpack_require__(619);
const rxjs_1 = __webpack_require__(435);
const common_1 = __webpack_require__(578);
const core_1 = __webpack_require__(84);
const constants_1 = __webpack_require__(258);
let SegmentService = class SegmentService {
    constructor(segmentModel, segmentStatModel, request) {
        this.segmentModel = segmentModel;
        this.segmentStatModel = segmentStatModel;
        this.request = request;
    }
    getFilters(filters = null) {
        var _a, _b, _c, _d;
        if (!filters || Object.keys(filters).length === 0) {
            return {};
        }
        const result = {
            name: { $regex: `.*${(_a = filters.keyword) !== null && _a !== void 0 ? _a : ''}*.` },
            distance: { $geq: (_b = filters.minDistance) !== null && _b !== void 0 ? _b : 0.0 },
            elevation: { $geq: (_c = filters.minElevation) !== null && _c !== void 0 ? _c : 0.0 },
            steep: { $geq: (_d = filters.minSteep) !== null && _d !== void 0 ? _d : 0.0 },
        };
        if (filters.maxDistance) {
            result.distance = Object.assign(Object.assign({}, result.distance), { $leq: filters.maxDistance });
        }
        if (filters.maxElevation) {
            result.elevation = Object.assign(Object.assign({}, result.elevation), { $leq: filters.maxElevation });
        }
        if (filters.maxSteep) {
            result.steep = Object.assign(Object.assign({}, result.steep), { $leq: filters.maxSteep });
        }
        if (filters.type) {
            result.type = { $eq: filters.type };
        }
        return result;
    }
    checkOwnage(segment) {
        if (!segment) {
            return rxjs_1.EMPTY;
        }
        if (segment.owner._id != this.request.user.id) {
            throw new common_1.ForbiddenException(`user does not own this segment`);
        }
        return rxjs_1.of(segment);
    }
    findAll(_a = {}) {
        var { limit = 20, skip = 0 } = _a, filters = __rest(_a, ["limit", "skip"]);
        return rxjs_1.from(this.segmentModel
            .find(Object.assign({ owner: { _id: this.request.user.id } }, this.getFilters(filters)))
            .skip(skip)
            .limit(limit)
            .exec());
    }
    findById(id) {
        return rxjs_1.from(this.segmentModel.findById(id).exec()).pipe(rxjs_1.mergeMap((s) => this.checkOwnage(s)), rxjs_1.throwIfEmpty(() => new common_1.NotFoundException(`segment:${id} not found`)));
    }
    save(segment) {
        return rxjs_1.from(this.segmentModel.create(Object.assign(Object.assign({}, segment), { owner: { _id: this.request.user.id } })));
    }
    update(id, data) {
        return this.findById(id).pipe(rxjs_1.mergeMap((s) => this.checkOwnage(s)), rxjs_1.throwIfEmpty(() => new common_1.NotFoundException(`segment:${id} not found`)), rxjs_1.mergeMap((s) => Object.assign(s, data).save()));
    }
    delete(id) {
        return this.findById(id).pipe(rxjs_1.mergeMap((s) => this.checkOwnage(s)), rxjs_1.throwIfEmpty(() => new common_1.NotFoundException(`segment:${id} not found`)), rxjs_1.mergeMap((s) => {
            s.delete();
            return rxjs_1.of(s);
        }));
    }
    getStatsFrom(id) {
        return this.findById(id).pipe(rxjs_1.mergeMap((s) => this.checkOwnage(s)), rxjs_1.throwIfEmpty(() => new common_1.NotFoundException(`segment:${id} not found`)), rxjs_1.mergeMap((segment) => {
            return rxjs_1.from(this.segmentStatModel
                .find({
                segment: { _id: segment._id },
            })
                .select('-segment')
                .exec());
        }));
    }
    createStatFor(id, stat) {
        return this.findById(id).pipe(rxjs_1.mergeMap((s) => this.checkOwnage(s)), rxjs_1.throwIfEmpty(() => new common_1.NotFoundException(`segment:${id} not found`)), rxjs_1.mergeMap((segment) => {
            return rxjs_1.from(this.segmentStatModel.create(Object.assign(Object.assign({}, stat), { segment: { _id: segment._id } })));
        }));
    }
    updateStatFrom(id, statId, data) {
        return this.findById(id).pipe(rxjs_1.mergeMap((s) => this.checkOwnage(s)), rxjs_1.throwIfEmpty(() => new common_1.NotFoundException(`segment:${id} not found`)), rxjs_1.mergeMap(() => rxjs_1.from(this.segmentStatModel.findByIdAndUpdate(statId, data)).pipe(rxjs_1.mergeMap((s) => (s ? rxjs_1.of(s) : rxjs_1.EMPTY)), rxjs_1.throwIfEmpty(() => new common_1.NotFoundException(`segment:${id} not found`)))));
    }
    deleteStatFrom(id, statId) {
        return this.findById(id).pipe(rxjs_1.mergeMap((s) => this.checkOwnage(s)), rxjs_1.throwIfEmpty(() => new common_1.NotFoundException(`segment:${id} not found`)), rxjs_1.mergeMap(() => rxjs_1.from(this.segmentStatModel.findByIdAndDelete(statId)).pipe(rxjs_1.mergeMap((s) => (s ? rxjs_1.of(s) : rxjs_1.EMPTY)), rxjs_1.throwIfEmpty(() => new common_1.NotFoundException(`segment:${id} not found`)))));
    }
};
SegmentService = __decorate([
    common_1.Injectable({ scope: common_1.Scope.REQUEST }),
    __param(0, common_1.Inject(constants_1.PROVIDERS.MODELS.SEGMENT)),
    __param(1, common_1.Inject(constants_1.PROVIDERS.MODELS.SEGMENT_STAT)),
    __param(2, common_1.Inject(core_1.REQUEST)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model, Object])
], SegmentService);
exports.SegmentService = SegmentService;


/***/ }),

/***/ 258:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PROVIDERS = void 0;
exports.PROVIDERS = {
    DB: 'DATABASE_CONNECTION',
    MODELS: {
        USER: 'USER_MODEL',
        SEGMENT: 'SEGMENT_MODEL',
        SEGMENT_STAT: 'SEGMENT_STAT_MODEL',
    },
};


/***/ }),

/***/ 675:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterDto = void 0;
const class_validator_1 = __webpack_require__(516);
const enums_1 = __webpack_require__(770);
class RegisterDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.MinLength(8, { message: 'Password min length is 8' }),
    class_validator_1.MaxLength(24, { message: 'Password max length is 24' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], RegisterDto.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], RegisterDto.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], RegisterDto.prototype, "weight", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], RegisterDto.prototype, "height", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEnum(enums_1.Gender),
    __metadata("design:type", String)
], RegisterDto.prototype, "gender", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEnum(enums_1.Level),
    __metadata("design:type", String)
], RegisterDto.prototype, "level", void 0);
exports.RegisterDto = RegisterDto;


/***/ }),

/***/ 973:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SegmentStatDto = void 0;
const class_validator_1 = __webpack_require__(516);
class SegmentStatDto {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Min(0),
    __metadata("design:type", Number)
], SegmentStatDto.prototype, "duration", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Min(0),
    __metadata("design:type", Number)
], SegmentStatDto.prototype, "speed", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Min(0),
    __metadata("design:type", Number)
], SegmentStatDto.prototype, "cadence", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Min(0),
    __metadata("design:type", Number)
], SegmentStatDto.prototype, "bpm", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Min(0),
    __metadata("design:type", Number)
], SegmentStatDto.prototype, "power", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Min(0),
    class_validator_1.Max(10),
    __metadata("design:type", Number)
], SegmentStatDto.prototype, "feel", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], SegmentStatDto.prototype, "notes", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Date)
], SegmentStatDto.prototype, "date", void 0);
exports.SegmentStatDto = SegmentStatDto;


/***/ }),

/***/ 166:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SegmentDto = void 0;
const class_validator_1 = __webpack_require__(516);
const enums_1 = __webpack_require__(770);
class SegmentDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], SegmentDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], SegmentDto.prototype, "distance", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], SegmentDto.prototype, "elevation", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Min(0.0),
    class_validator_1.Max(100.0),
    __metadata("design:type", Number)
], SegmentDto.prototype, "steep", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], SegmentDto.prototype, "stravaUrl", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEnum(enums_1.SegmentType),
    __metadata("design:type", String)
], SegmentDto.prototype, "type", void 0);
exports.SegmentDto = SegmentDto;


/***/ }),

/***/ 595:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = void 0;
const class_validator_1 = __webpack_require__(516);
const enums_1 = __webpack_require__(770);
class UpdateUserDto {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.MinLength(8, { message: 'Password min length is 8' }),
    class_validator_1.MaxLength(24, { message: 'Password max length is 24' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "weight", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "height", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEnum(enums_1.Gender),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "gender", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEnum(enums_1.Level),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "level", void 0);
exports.UpdateUserDto = UpdateUserDto;


/***/ }),

/***/ 770:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SegmentType = exports.Level = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
    Gender["OTHER"] = "OTHER";
})(Gender = exports.Gender || (exports.Gender = {}));
var Level;
(function (Level) {
    Level["BEGINNER"] = "BEGINNER";
    Level["INTERMEDIATE"] = "INTERMEDIATE";
    Level["ADVANCED"] = "ADVANCED";
    Level["EXPERT"] = "EXPERT";
})(Level = exports.Level || (exports.Level = {}));
var SegmentType;
(function (SegmentType) {
    SegmentType["HILLY"] = "HILLY";
    SegmentType["FLAT"] = "FLAT";
    SegmentType["DOWNHILL"] = "DOWNHILL";
})(SegmentType = exports.SegmentType || (exports.SegmentType = {}));


/***/ }),

/***/ 217:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.baseSerializer = void 0;
const baseSerializer = (doc, ret) => {
    if (ret._id) {
        delete ret._id;
    }
    return ret;
};
exports.baseSerializer = baseSerializer;


/***/ }),

/***/ 331:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ParseObjectIdPipe = void 0;
const mongoose = __webpack_require__(619);
const common_1 = __webpack_require__(578);
const http_error_by_code_util_1 = __webpack_require__(662);
let ParseObjectIdPipe = class ParseObjectIdPipe {
    constructor(options) {
        this.exceptionFactory = (error) => {
            var _a;
            return new http_error_by_code_util_1.HttpErrorByCode[(_a = options === null || options === void 0 ? void 0 : options.errorHttpStatusCode) !== null && _a !== void 0 ? _a : common_1.HttpStatus.BAD_REQUEST](error);
        };
    }
    transform(value, metadata) {
        if (!mongoose.isValidObjectId(value)) {
            throw this.exceptionFactory(`${value} is not a valid id`);
        }
        return value;
    }
};
ParseObjectIdPipe = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Optional()),
    __metadata("design:paramtypes", [Object])
], ParseObjectIdPipe);
exports.ParseObjectIdPipe = ParseObjectIdPipe;


/***/ }),

/***/ 733:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const rxjs_1 = __webpack_require__(435);
const jwt_guard_1 = __webpack_require__(994);
const common_1 = __webpack_require__(578);
const update_users_1 = __webpack_require__(595);
const pipes_1 = __webpack_require__(331);
const user_service_1 = __webpack_require__(577);
let UserController = class UserController {
    constructor(service) {
        this.service = service;
    }
    getUser(id, res) {
        return this.service
            .findById(id)
            .pipe(rxjs_1.map((found) => res.status(common_1.HttpStatus.OK).send(found)));
    }
    updateUser(id, user, res) {
        return this.service.update(id, user).pipe(rxjs_1.map((updated) => {
            return res.status(common_1.HttpStatus.ACCEPTED).send(updated);
        }));
    }
};
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id', new pipes_1.ParseObjectIdPipe())),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "getUser", null);
__decorate([
    common_1.Patch(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    __param(0, common_1.Param('id', new pipes_1.ParseObjectIdPipe())),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_users_1.UpdateUserDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "updateUser", null);
UserController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;


/***/ }),

/***/ 64:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const database_module_1 = __webpack_require__(448);
const common_1 = __webpack_require__(578);
const user_controller_1 = __webpack_require__(733);
const user_service_1 = __webpack_require__(577);
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule],
        providers: [user_service_1.UserService],
        controllers: [user_controller_1.UserController],
        exports: [user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;


/***/ }),

/***/ 577:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const rxjs_1 = __webpack_require__(435);
const common_1 = __webpack_require__(578);
const constants_1 = __webpack_require__(258);
let UserService = class UserService {
    constructor(model) {
        this.model = model;
    }
    findByEmail(email) {
        return rxjs_1.from(this.model.findOne({ email }).exec());
    }
    findById(_id) {
        return rxjs_1.from(this.model.findById(_id).exec());
    }
    existingEmail(email) {
        return rxjs_1.from(this.model.exists({ email }));
    }
    register(data) {
        return rxjs_1.from(this.model.create(Object.assign({}, data)));
    }
    update(id, data) {
        return this.findById(id).pipe(rxjs_1.mergeMap((u) => (u ? rxjs_1.of(u) : rxjs_1.EMPTY)), rxjs_1.throwIfEmpty(() => new common_1.NotFoundException(`user:${id} not found`)), rxjs_1.mergeMap((u) => Object.assign(u, data).save()));
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(constants_1.PROVIDERS.MODELS.USER)),
    __metadata("design:paramtypes", [Object])
], UserService);
exports.UserService = UserService;


/***/ }),

/***/ 578:
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ 662:
/***/ ((module) => {

module.exports = require("@nestjs/common/utils/http-error-by-code.util");

/***/ }),

/***/ 797:
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ 84:
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ 542:
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ 214:
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ 552:
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ 516:
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ 619:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 307:
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ 888:
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),

/***/ 435:
/***/ ((module) => {

module.exports = require("rxjs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const common_1 = __webpack_require__(578);
const core_1 = __webpack_require__(84);
const app_module_1 = __webpack_require__(929);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['log', 'error', 'warn'],
    });
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors();
    await app.listen(3000);
    if (false) {}
}
bootstrap();

})();

/******/ })()
;