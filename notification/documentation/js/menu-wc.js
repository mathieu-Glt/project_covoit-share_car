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
                    <a href="index.html" data-type="index-link">notification documentation</a>
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
                                <a href="modules/DatabaseNotificationModule.html" data-type="entity-link" >DatabaseNotificationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EmailBuilderModule.html" data-type="entity-link" >EmailBuilderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EmailBuilderModule-94397e0b775f0d61855b240fb712bee70004c05bdd0ab6ddc1f93da560e002cdd150166a82066f12093bbf092db227dbe168efa207adc3e94957fec3dacf6093"' : 'data-bs-target="#xs-controllers-links-module-EmailBuilderModule-94397e0b775f0d61855b240fb712bee70004c05bdd0ab6ddc1f93da560e002cdd150166a82066f12093bbf092db227dbe168efa207adc3e94957fec3dacf6093"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EmailBuilderModule-94397e0b775f0d61855b240fb712bee70004c05bdd0ab6ddc1f93da560e002cdd150166a82066f12093bbf092db227dbe168efa207adc3e94957fec3dacf6093"' :
                                            'id="xs-controllers-links-module-EmailBuilderModule-94397e0b775f0d61855b240fb712bee70004c05bdd0ab6ddc1f93da560e002cdd150166a82066f12093bbf092db227dbe168efa207adc3e94957fec3dacf6093"' }>
                                            <li class="link">
                                                <a href="controllers/EmailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EmailBuilderModule-94397e0b775f0d61855b240fb712bee70004c05bdd0ab6ddc1f93da560e002cdd150166a82066f12093bbf092db227dbe168efa207adc3e94957fec3dacf6093"' : 'data-bs-target="#xs-injectables-links-module-EmailBuilderModule-94397e0b775f0d61855b240fb712bee70004c05bdd0ab6ddc1f93da560e002cdd150166a82066f12093bbf092db227dbe168efa207adc3e94957fec3dacf6093"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailBuilderModule-94397e0b775f0d61855b240fb712bee70004c05bdd0ab6ddc1f93da560e002cdd150166a82066f12093bbf092db227dbe168efa207adc3e94957fec3dacf6093"' :
                                        'id="xs-injectables-links-module-EmailBuilderModule-94397e0b775f0d61855b240fb712bee70004c05bdd0ab6ddc1f93da560e002cdd150166a82066f12093bbf092db227dbe168efa207adc3e94957fec3dacf6093"' }>
                                        <li class="link">
                                            <a href="injectables/EmailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NatsMessengerModule.html" data-type="entity-link" >NatsMessengerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-NatsMessengerModule-d5322e75378fa76c3e10a39ee9fcd5dd4537212f7b9216c343fb67f63360024eebdf13b5b98655260e4a183474abdddeebc22f8eb11ac82311a64fe29dff6e06"' : 'data-bs-target="#xs-injectables-links-module-NatsMessengerModule-d5322e75378fa76c3e10a39ee9fcd5dd4537212f7b9216c343fb67f63360024eebdf13b5b98655260e4a183474abdddeebc22f8eb11ac82311a64fe29dff6e06"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NatsMessengerModule-d5322e75378fa76c3e10a39ee9fcd5dd4537212f7b9216c343fb67f63360024eebdf13b5b98655260e4a183474abdddeebc22f8eb11ac82311a64fe29dff6e06"' :
                                        'id="xs-injectables-links-module-NatsMessengerModule-d5322e75378fa76c3e10a39ee9fcd5dd4537212f7b9216c343fb67f63360024eebdf13b5b98655260e4a183474abdddeebc22f8eb11ac82311a64fe29dff6e06"' }>
                                        <li class="link">
                                            <a href="injectables/NatsMessengerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NatsMessengerService</a>
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
                                    <a href="controllers/EmailController.html" data-type="entity-link" >EmailController</a>
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
                                <a href="classes/EmailDto.html" data-type="entity-link" >EmailDto</a>
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
                                    <a href="injectables/EmailService.html" data-type="entity-link" >EmailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NatsMessengerService.html" data-type="entity-link" >NatsMessengerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RpcSuccessInterceptor.html" data-type="entity-link" >RpcSuccessInterceptor</a>
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
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/responsePayloadNatsInterface.html" data-type="entity-link" >responsePayloadNatsInterface</a>
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
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
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