'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { try { return Function.toString.call(fn).indexOf("[native code]") !== -1; } catch (e) { return typeof fn === "function"; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  _inherits(_class, _HTMLElement);
  var _super = _createSuper(_class);
  function _class() {
    var _this;
    _classCallCheck(this, _class);
    _this = _super.call(this);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }
  _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">ms-auth documentation</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"overview.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>README\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"properties.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-apps\"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter modules\">\n                        <a data-type=\"chapter-link\" href=\"modules.html\">\n                            <div class=\"menu-toggler linked\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"', ">\n                                <span class=\"icon ion-ios-archive\"></span>\n                                <span class=\"link-name\">Modules</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                        </a>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"', ">\n                            <li class=\"link\">\n                                <a href=\"modules/AppModule.html\" data-type=\"entity-link\" >AppModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/AuthModule.html\" data-type=\"entity-link\" >AuthModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#controllers-links-module-AuthModule-af23cd2e2b8514a3052ae84576d99e338affcf6a674ecc9c74705b02918feee0b4c305d32623c6a204b58dd02fc85e3c65191efbd06a68e58185fd1e387f975f"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-af23cd2e2b8514a3052ae84576d99e338affcf6a674ecc9c74705b02918feee0b4c305d32623c6a204b58dd02fc85e3c65191efbd06a68e58185fd1e387f975f"', ">\n                                            <span class=\"icon ion-md-swap\"></span>\n                                            <span>Controllers</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="controllers-links-module-AuthModule-af23cd2e2b8514a3052ae84576d99e338affcf6a674ecc9c74705b02918feee0b4c305d32623c6a204b58dd02fc85e3c65191efbd06a68e58185fd1e387f975f"' : 'id="xs-controllers-links-module-AuthModule-af23cd2e2b8514a3052ae84576d99e338affcf6a674ecc9c74705b02918feee0b4c305d32623c6a204b58dd02fc85e3c65191efbd06a68e58185fd1e387f975f"', ">\n                                            <li class=\"link\">\n                                                <a href=\"controllers/AuthController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AuthController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links-module-AuthModule-af23cd2e2b8514a3052ae84576d99e338affcf6a674ecc9c74705b02918feee0b4c305d32623c6a204b58dd02fc85e3c65191efbd06a68e58185fd1e387f975f"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-af23cd2e2b8514a3052ae84576d99e338affcf6a674ecc9c74705b02918feee0b4c305d32623c6a204b58dd02fc85e3c65191efbd06a68e58185fd1e387f975f"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-AuthModule-af23cd2e2b8514a3052ae84576d99e338affcf6a674ecc9c74705b02918feee0b4c305d32623c6a204b58dd02fc85e3c65191efbd06a68e58185fd1e387f975f"' : 'id="xs-injectables-links-module-AuthModule-af23cd2e2b8514a3052ae84576d99e338affcf6a674ecc9c74705b02918feee0b4c305d32623c6a204b58dd02fc85e3c65191efbd06a68e58185fd1e387f975f"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/AccessTokenStrategy.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AccessTokenStrategy</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/AuthService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AuthService</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/RefreshTokenStrategy.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >RefreshTokenStrategy</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/DatabaseModule.html\" data-type=\"entity-link\" >DatabaseModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/NatsMessengerModule.html\" data-type=\"entity-link\" >NatsMessengerModule</a>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links-module-NatsMessengerModule-d7811dc40b4ad6758fbce5863969262a517f28debab12b980a593d1274c5f3be32e8c40c575e74ac6ba8564470faf1c7879f522f69235fd3f06f2d373e38026f"' : 'data-bs-target="#xs-injectables-links-module-NatsMessengerModule-d7811dc40b4ad6758fbce5863969262a517f28debab12b980a593d1274c5f3be32e8c40c575e74ac6ba8564470faf1c7879f522f69235fd3f06f2d373e38026f"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-NatsMessengerModule-d7811dc40b4ad6758fbce5863969262a517f28debab12b980a593d1274c5f3be32e8c40c575e74ac6ba8564470faf1c7879f522f69235fd3f06f2d373e38026f"' : 'id="xs-injectables-links-module-NatsMessengerModule-d7811dc40b4ad6758fbce5863969262a517f28debab12b980a593d1274c5f3be32e8c40c575e74ac6ba8564470faf1c7879f522f69235fd3f06f2d373e38026f"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/NatsMessengerService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >NatsMessengerService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/UserModule.html\" data-type=\"entity-link\" >UserModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#controllers-links-module-UserModule-454b4323146632ef85909e55230f3a927188f3ada5b3d4d691ad3d71ddf74782b661be69100f9f4ccc0d00c046caf8ef862fe0fbdf318412f59d48ad9598b3fc"' : 'data-bs-target="#xs-controllers-links-module-UserModule-454b4323146632ef85909e55230f3a927188f3ada5b3d4d691ad3d71ddf74782b661be69100f9f4ccc0d00c046caf8ef862fe0fbdf318412f59d48ad9598b3fc"', ">\n                                            <span class=\"icon ion-md-swap\"></span>\n                                            <span>Controllers</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="controllers-links-module-UserModule-454b4323146632ef85909e55230f3a927188f3ada5b3d4d691ad3d71ddf74782b661be69100f9f4ccc0d00c046caf8ef862fe0fbdf318412f59d48ad9598b3fc"' : 'id="xs-controllers-links-module-UserModule-454b4323146632ef85909e55230f3a927188f3ada5b3d4d691ad3d71ddf74782b661be69100f9f4ccc0d00c046caf8ef862fe0fbdf318412f59d48ad9598b3fc"', ">\n                                            <li class=\"link\">\n                                                <a href=\"controllers/UserController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >UserController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links-module-UserModule-454b4323146632ef85909e55230f3a927188f3ada5b3d4d691ad3d71ddf74782b661be69100f9f4ccc0d00c046caf8ef862fe0fbdf318412f59d48ad9598b3fc"' : 'data-bs-target="#xs-injectables-links-module-UserModule-454b4323146632ef85909e55230f3a927188f3ada5b3d4d691ad3d71ddf74782b661be69100f9f4ccc0d00c046caf8ef862fe0fbdf318412f59d48ad9598b3fc"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-UserModule-454b4323146632ef85909e55230f3a927188f3ada5b3d4d691ad3d71ddf74782b661be69100f9f4ccc0d00c046caf8ef862fe0fbdf318412f59d48ad9598b3fc"' : 'id="xs-injectables-links-module-UserModule-454b4323146632ef85909e55230f3a927188f3ada5b3d4d691ad3d71ddf74782b661be69100f9f4ccc0d00c046caf8ef862fe0fbdf318412f59d48ad9598b3fc"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/UserService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >UserService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                </ul>\n                </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#controllers-links"' : 'data-bs-target="#xs-controllers-links"', ">\n                                <span class=\"icon ion-md-swap\"></span>\n                                <span>Controllers</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"controllers/AuthController.html\" data-type=\"entity-link\" >AuthController</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"controllers/UserController.html\" data-type=\"entity-link\" >UserController</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#classes-links"' : 'data-bs-target="#xs-classes-links"', ">\n                            <span class=\"icon ion-ios-paper\"></span>\n                            <span>Classes</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"', ">\n                            <li class=\"link\">\n                                <a href=\"classes/AuthTokenDto.html\" data-type=\"entity-link\" >AuthTokenDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/AuthUserToken.html\" data-type=\"entity-link\" >AuthUserToken</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CreateUserDto.html\" data-type=\"entity-link\" >CreateUserDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/EmailDto.html\" data-type=\"entity-link\" >EmailDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/IdDto.html\" data-type=\"entity-link\" >IdDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/IdDto-1.html\" data-type=\"entity-link\" >IdDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/NewPasswordDto.html\" data-type=\"entity-link\" >NewPasswordDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/passwordDto.html\" data-type=\"entity-link\" >passwordDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/RefreshToken.html\" data-type=\"entity-link\" >RefreshToken</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/RefreshTokenDto.html\" data-type=\"entity-link\" >RefreshTokenDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ResponseErrorInterface.html\" data-type=\"entity-link\" >ResponseErrorInterface</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ResponseInterface.html\" data-type=\"entity-link\" >ResponseInterface</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ResponseSuccessInterface.html\" data-type=\"entity-link\" >ResponseSuccessInterface</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/signInDto.html\" data-type=\"entity-link\" >signInDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/signInInterface.html\" data-type=\"entity-link\" >signInInterface</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/TokenDto.html\" data-type=\"entity-link\" >TokenDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/User.html\" data-type=\"entity-link\" >User</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/userEmailDto.html\" data-type=\"entity-link\" >userEmailDto</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links"' : 'data-bs-target="#xs-injectables-links"', ">\n                                <span class=\"icon ion-md-arrow-round-down\"></span>\n                                <span>Injectables</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"injectables/AccessTokenGuard.html\" data-type=\"entity-link\" >AccessTokenGuard</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/AccessTokenStrategy.html\" data-type=\"entity-link\" >AccessTokenStrategy</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/AuthService.html\" data-type=\"entity-link\" >AuthService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/NatsMessengerService.html\" data-type=\"entity-link\" >NatsMessengerService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/RefreshTokenGuard.html\" data-type=\"entity-link\" >RefreshTokenGuard</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/RefreshTokenStrategy.html\" data-type=\"entity-link\" >RefreshTokenStrategy</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/RpcSuccessInterceptor.html\" data-type=\"entity-link\" >RpcSuccessInterceptor</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/UserService.html\" data-type=\"entity-link\" >UserService</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#interfaces-links"' : 'data-bs-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/acknowledgeResponseinterface.html\" data-type=\"entity-link\" >acknowledgeResponseinterface</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/assoUserEditInterface.html\" data-type=\"entity-link\" >assoUserEditInterface</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/getTokenInterface.html\" data-type=\"entity-link\" >getTokenInterface</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/getUsersCreatedInterface.html\" data-type=\"entity-link\" >getUsersCreatedInterface</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/GlobalEditInterface.html\" data-type=\"entity-link\" >GlobalEditInterface</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/IAuthUp.html\" data-type=\"entity-link\" >IAuthUp</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ParentInterface.html\" data-type=\"entity-link\" >ParentInterface</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/responsePayloadNatsInterface.html\" data-type=\"entity-link\" >responsePayloadNatsInterface</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/sendEmailForgotPasswordResponseInterface.html\" data-type=\"entity-link\" >sendEmailForgotPasswordResponseInterface</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/signInResponseInterface.html\" data-type=\"entity-link\" >signInResponseInterface</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/TokenInterface.html\" data-type=\"entity-link\" >TokenInterface</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/userPayload.html\" data-type=\"entity-link\" >userPayload</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#miscellaneous-links"' : 'data-bs-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/enumerations.html\" data-type=\"entity-link\">Enums</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/functions.html\" data-type=\"entity-link\">Functions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/typealiases.html\" data-type=\"entity-link\">Type aliases</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/variables.html\" data-type=\"entity-link\">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <a data-type=\"chapter-link\" href=\"coverage.html\"><span class=\"icon ion-ios-stats\"></span>Documentation coverage</a>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\" rel=\"noopener noreferrer\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);
  return _class;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));