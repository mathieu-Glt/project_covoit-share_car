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
                    <a href="index.html" data-type="index-link">ms-event-request-exchange documentation</a>
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
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EventModule.html" data-type="entity-link" >EventModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EventModule-a86e43b554504eaa0d5818b7013d68671654e56fa65132337c41629cf9ecec46f855020588dc44200098420d91033c2e354ed1f947743176ca104f89c39881f6"' : 'data-bs-target="#xs-controllers-links-module-EventModule-a86e43b554504eaa0d5818b7013d68671654e56fa65132337c41629cf9ecec46f855020588dc44200098420d91033c2e354ed1f947743176ca104f89c39881f6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EventModule-a86e43b554504eaa0d5818b7013d68671654e56fa65132337c41629cf9ecec46f855020588dc44200098420d91033c2e354ed1f947743176ca104f89c39881f6"' :
                                            'id="xs-controllers-links-module-EventModule-a86e43b554504eaa0d5818b7013d68671654e56fa65132337c41629cf9ecec46f855020588dc44200098420d91033c2e354ed1f947743176ca104f89c39881f6"' }>
                                            <li class="link">
                                                <a href="controllers/EventController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EventModule-a86e43b554504eaa0d5818b7013d68671654e56fa65132337c41629cf9ecec46f855020588dc44200098420d91033c2e354ed1f947743176ca104f89c39881f6"' : 'data-bs-target="#xs-injectables-links-module-EventModule-a86e43b554504eaa0d5818b7013d68671654e56fa65132337c41629cf9ecec46f855020588dc44200098420d91033c2e354ed1f947743176ca104f89c39881f6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EventModule-a86e43b554504eaa0d5818b7013d68671654e56fa65132337c41629cf9ecec46f855020588dc44200098420d91033c2e354ed1f947743176ca104f89c39881f6"' :
                                        'id="xs-injectables-links-module-EventModule-a86e43b554504eaa0d5818b7013d68671654e56fa65132337c41629cf9ecec46f855020588dc44200098420d91033c2e354ed1f947743176ca104f89c39881f6"' }>
                                        <li class="link">
                                            <a href="injectables/EventService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NatsMessengerModule.html" data-type="entity-link" >NatsMessengerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-NatsMessengerModule-83692fbe6f4ccb3f4d8a45003967b786080f3cd402598762cbb0e40eca2b53cead7e8fc79dc6f76c7d68f3274838baeedaadd8c7cd0f20315c21db9f0c6f6d70"' : 'data-bs-target="#xs-injectables-links-module-NatsMessengerModule-83692fbe6f4ccb3f4d8a45003967b786080f3cd402598762cbb0e40eca2b53cead7e8fc79dc6f76c7d68f3274838baeedaadd8c7cd0f20315c21db9f0c6f6d70"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NatsMessengerModule-83692fbe6f4ccb3f4d8a45003967b786080f3cd402598762cbb0e40eca2b53cead7e8fc79dc6f76c7d68f3274838baeedaadd8c7cd0f20315c21db9f0c6f6d70"' :
                                        'id="xs-injectables-links-module-NatsMessengerModule-83692fbe6f4ccb3f4d8a45003967b786080f3cd402598762cbb0e40eca2b53cead7e8fc79dc6f76c7d68f3274838baeedaadd8c7cd0f20315c21db9f0c6f6d70"' }>
                                        <li class="link">
                                            <a href="injectables/NatsMessengerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NatsMessengerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RequestModule.html" data-type="entity-link" >RequestModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RequestModule-ef94f8839d9ae8e49dff7293492361d16bbb85e9a6b593f39560182bf4e8f0f63f901e629c52437cd6b09955d8e5a09e723aa061b6831345f5007a8abb08ac0d"' : 'data-bs-target="#xs-controllers-links-module-RequestModule-ef94f8839d9ae8e49dff7293492361d16bbb85e9a6b593f39560182bf4e8f0f63f901e629c52437cd6b09955d8e5a09e723aa061b6831345f5007a8abb08ac0d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RequestModule-ef94f8839d9ae8e49dff7293492361d16bbb85e9a6b593f39560182bf4e8f0f63f901e629c52437cd6b09955d8e5a09e723aa061b6831345f5007a8abb08ac0d"' :
                                            'id="xs-controllers-links-module-RequestModule-ef94f8839d9ae8e49dff7293492361d16bbb85e9a6b593f39560182bf4e8f0f63f901e629c52437cd6b09955d8e5a09e723aa061b6831345f5007a8abb08ac0d"' }>
                                            <li class="link">
                                                <a href="controllers/RequestController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RequestController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RequestModule-ef94f8839d9ae8e49dff7293492361d16bbb85e9a6b593f39560182bf4e8f0f63f901e629c52437cd6b09955d8e5a09e723aa061b6831345f5007a8abb08ac0d"' : 'data-bs-target="#xs-injectables-links-module-RequestModule-ef94f8839d9ae8e49dff7293492361d16bbb85e9a6b593f39560182bf4e8f0f63f901e629c52437cd6b09955d8e5a09e723aa061b6831345f5007a8abb08ac0d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RequestModule-ef94f8839d9ae8e49dff7293492361d16bbb85e9a6b593f39560182bf4e8f0f63f901e629c52437cd6b09955d8e5a09e723aa061b6831345f5007a8abb08ac0d"' :
                                        'id="xs-injectables-links-module-RequestModule-ef94f8839d9ae8e49dff7293492361d16bbb85e9a6b593f39560182bf4e8f0f63f901e629c52437cd6b09955d8e5a09e723aa061b6831345f5007a8abb08ac0d"' }>
                                        <li class="link">
                                            <a href="injectables/RequestService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RequestService</a>
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
                                    <a href="controllers/EventController.html" data-type="entity-link" >EventController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RequestController.html" data-type="entity-link" >RequestController</a>
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
                                <a href="classes/Event.html" data-type="entity-link" >Event</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventDto.html" data-type="entity-link" >EventDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExchangeDto.html" data-type="entity-link" >ExchangeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExchangeRequest.html" data-type="entity-link" >ExchangeRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/IdDto.html" data-type="entity-link" >IdDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Request.html" data-type="entity-link" >Request</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestDto.html" data-type="entity-link" >RequestDto</a>
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
                                    <a href="injectables/EventService.html" data-type="entity-link" >EventService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NatsMessengerService.html" data-type="entity-link" >NatsMessengerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestService.html" data-type="entity-link" >RequestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RpcSuccessInterceptor.html" data-type="entity-link" >RpcSuccessInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RpcSuccessInterceptor-1.html" data-type="entity-link" >RpcSuccessInterceptor</a>
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
                                <a href="interfaces/EventInterface.html" data-type="entity-link" >EventInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExchangeInterface.html" data-type="entity-link" >ExchangeInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestInterface.html" data-type="entity-link" >RequestInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/responsePayloadNatsInterface.html" data-type="entity-link" >responsePayloadNatsInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/responsePayloadNatsInterface-1.html" data-type="entity-link" >responsePayloadNatsInterface</a>
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