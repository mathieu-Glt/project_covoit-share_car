'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ms-auth documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-af23cd2e2b8514a3052ae84576d99e338affcf6a674ecc9c74705b02918feee0b4c305d32623c6a204b58dd02fc85e3c65191efbd06a68e58185fd1e387f975f"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-af23cd2e2b8514a3052ae84576d99e338affcf6a674ecc9c74705b02918feee0b4c305d32623c6a204b58dd02fc85e3c65191efbd06a68e58185fd1e387f975f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-af23cd2e2b8514a3052ae84576d99e338affcf6a674ecc9c74705b02918feee0b4c305d32623c6a204b58dd02fc85e3c65191efbd06a68e58185fd1e387f975f"' :
                                            'id="xs-controllers-links-module-AuthModule-af23cd2e2b8514a3052ae84576d99e338affcf6a674ecc9c74705b02918feee0b4c305d32623c6a204b58dd02fc85e3c65191efbd06a68e58185fd1e387f975f"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-af23cd2e2b8514a3052ae84576d99e338affcf6a674ecc9c74705b02918feee0b4c305d32623c6a204b58dd02fc85e3c65191efbd06a68e58185fd1e387f975f"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-af23cd2e2b8514a3052ae84576d99e338affcf6a674ecc9c74705b02918feee0b4c305d32623c6a204b58dd02fc85e3c65191efbd06a68e58185fd1e387f975f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-af23cd2e2b8514a3052ae84576d99e338affcf6a674ecc9c74705b02918feee0b4c305d32623c6a204b58dd02fc85e3c65191efbd06a68e58185fd1e387f975f"' :
                                        'id="xs-injectables-links-module-AuthModule-af23cd2e2b8514a3052ae84576d99e338affcf6a674ecc9c74705b02918feee0b4c305d32623c6a204b58dd02fc85e3c65191efbd06a68e58185fd1e387f975f"' }>
                                        <li class="link">
                                            <a href="injectables/AccessTokenStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccessTokenStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RefreshTokenStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RefreshTokenStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NatsMessengerModule.html" data-type="entity-link" >NatsMessengerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-NatsMessengerModule-d7811dc40b4ad6758fbce5863969262a517f28debab12b980a593d1274c5f3be32e8c40c575e74ac6ba8564470faf1c7879f522f69235fd3f06f2d373e38026f"' : 'data-bs-target="#xs-injectables-links-module-NatsMessengerModule-d7811dc40b4ad6758fbce5863969262a517f28debab12b980a593d1274c5f3be32e8c40c575e74ac6ba8564470faf1c7879f522f69235fd3f06f2d373e38026f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NatsMessengerModule-d7811dc40b4ad6758fbce5863969262a517f28debab12b980a593d1274c5f3be32e8c40c575e74ac6ba8564470faf1c7879f522f69235fd3f06f2d373e38026f"' :
                                        'id="xs-injectables-links-module-NatsMessengerModule-d7811dc40b4ad6758fbce5863969262a517f28debab12b980a593d1274c5f3be32e8c40c575e74ac6ba8564470faf1c7879f522f69235fd3f06f2d373e38026f"' }>
                                        <li class="link">
                                            <a href="injectables/NatsMessengerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NatsMessengerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-454b4323146632ef85909e55230f3a927188f3ada5b3d4d691ad3d71ddf74782b661be69100f9f4ccc0d00c046caf8ef862fe0fbdf318412f59d48ad9598b3fc"' : 'data-bs-target="#xs-controllers-links-module-UserModule-454b4323146632ef85909e55230f3a927188f3ada5b3d4d691ad3d71ddf74782b661be69100f9f4ccc0d00c046caf8ef862fe0fbdf318412f59d48ad9598b3fc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-454b4323146632ef85909e55230f3a927188f3ada5b3d4d691ad3d71ddf74782b661be69100f9f4ccc0d00c046caf8ef862fe0fbdf318412f59d48ad9598b3fc"' :
                                            'id="xs-controllers-links-module-UserModule-454b4323146632ef85909e55230f3a927188f3ada5b3d4d691ad3d71ddf74782b661be69100f9f4ccc0d00c046caf8ef862fe0fbdf318412f59d48ad9598b3fc"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-454b4323146632ef85909e55230f3a927188f3ada5b3d4d691ad3d71ddf74782b661be69100f9f4ccc0d00c046caf8ef862fe0fbdf318412f59d48ad9598b3fc"' : 'data-bs-target="#xs-injectables-links-module-UserModule-454b4323146632ef85909e55230f3a927188f3ada5b3d4d691ad3d71ddf74782b661be69100f9f4ccc0d00c046caf8ef862fe0fbdf318412f59d48ad9598b3fc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-454b4323146632ef85909e55230f3a927188f3ada5b3d4d691ad3d71ddf74782b661be69100f9f4ccc0d00c046caf8ef862fe0fbdf318412f59d48ad9598b3fc"' :
                                        'id="xs-injectables-links-module-UserModule-454b4323146632ef85909e55230f3a927188f3ada5b3d4d691ad3d71ddf74782b661be69100f9f4ccc0d00c046caf8ef862fe0fbdf318412f59d48ad9598b3fc"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AuthTokenDto.html" data-type="entity-link" >AuthTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthUserToken.html" data-type="entity-link" >AuthUserToken</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailDto.html" data-type="entity-link" >EmailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/IdDto.html" data-type="entity-link" >IdDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/IdDto-1.html" data-type="entity-link" >IdDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/NewPasswordDto.html" data-type="entity-link" >NewPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/passwordDto.html" data-type="entity-link" >passwordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshToken.html" data-type="entity-link" >RefreshToken</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenDto.html" data-type="entity-link" >RefreshTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseErrorInterface.html" data-type="entity-link" >ResponseErrorInterface</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseInterface.html" data-type="entity-link" >ResponseInterface</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseSuccessInterface.html" data-type="entity-link" >ResponseSuccessInterface</a>
                            </li>
                            <li class="link">
                                <a href="classes/signInDto.html" data-type="entity-link" >signInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/signInInterface.html" data-type="entity-link" >signInInterface</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenDto.html" data-type="entity-link" >TokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/userEmailDto.html" data-type="entity-link" >userEmailDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AccessTokenGuard.html" data-type="entity-link" >AccessTokenGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AccessTokenStrategy.html" data-type="entity-link" >AccessTokenStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NatsMessengerService.html" data-type="entity-link" >NatsMessengerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RefreshTokenGuard.html" data-type="entity-link" >RefreshTokenGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RefreshTokenStrategy.html" data-type="entity-link" >RefreshTokenStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RpcSuccessInterceptor.html" data-type="entity-link" >RpcSuccessInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/acknowledgeResponseinterface.html" data-type="entity-link" >acknowledgeResponseinterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/assoUserEditInterface.html" data-type="entity-link" >assoUserEditInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/getTokenInterface.html" data-type="entity-link" >getTokenInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/getUsersCreatedInterface.html" data-type="entity-link" >getUsersCreatedInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GlobalEditInterface.html" data-type="entity-link" >GlobalEditInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAuthUp.html" data-type="entity-link" >IAuthUp</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ParentInterface.html" data-type="entity-link" >ParentInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/responsePayloadNatsInterface.html" data-type="entity-link" >responsePayloadNatsInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/sendEmailForgotPasswordResponseInterface.html" data-type="entity-link" >sendEmailForgotPasswordResponseInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/signInResponseInterface.html" data-type="entity-link" >signInResponseInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenInterface.html" data-type="entity-link" >TokenInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/userPayload.html" data-type="entity-link" >userPayload</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});