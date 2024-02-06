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
                    <a href="index.html" data-type="index-link">ms-asso-groupe-relation documentation</a>
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
                                <a href="modules/AssociationModule.html" data-type="entity-link" >AssociationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AssociationModule-58e2d5bcfdef4108ccc0d88c2544b20a41760d542492f846889970a11e275bff24a9c1651b644437ef9ed903d8989912404221ecf1ec6e8651549222a3cf3dce"' : 'data-bs-target="#xs-controllers-links-module-AssociationModule-58e2d5bcfdef4108ccc0d88c2544b20a41760d542492f846889970a11e275bff24a9c1651b644437ef9ed903d8989912404221ecf1ec6e8651549222a3cf3dce"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AssociationModule-58e2d5bcfdef4108ccc0d88c2544b20a41760d542492f846889970a11e275bff24a9c1651b644437ef9ed903d8989912404221ecf1ec6e8651549222a3cf3dce"' :
                                            'id="xs-controllers-links-module-AssociationModule-58e2d5bcfdef4108ccc0d88c2544b20a41760d542492f846889970a11e275bff24a9c1651b644437ef9ed903d8989912404221ecf1ec6e8651549222a3cf3dce"' }>
                                            <li class="link">
                                                <a href="controllers/AssociationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AssociationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AssociationModule-58e2d5bcfdef4108ccc0d88c2544b20a41760d542492f846889970a11e275bff24a9c1651b644437ef9ed903d8989912404221ecf1ec6e8651549222a3cf3dce"' : 'data-bs-target="#xs-injectables-links-module-AssociationModule-58e2d5bcfdef4108ccc0d88c2544b20a41760d542492f846889970a11e275bff24a9c1651b644437ef9ed903d8989912404221ecf1ec6e8651549222a3cf3dce"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AssociationModule-58e2d5bcfdef4108ccc0d88c2544b20a41760d542492f846889970a11e275bff24a9c1651b644437ef9ed903d8989912404221ecf1ec6e8651549222a3cf3dce"' :
                                        'id="xs-injectables-links-module-AssociationModule-58e2d5bcfdef4108ccc0d88c2544b20a41760d542492f846889970a11e275bff24a9c1651b644437ef9ed903d8989912404221ecf1ec6e8651549222a3cf3dce"' }>
                                        <li class="link">
                                            <a href="injectables/AssociationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AssociationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GroupModule.html" data-type="entity-link" >GroupModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-GroupModule-fc9998c2a3534cab27bce0f69cfe647a74956591ec50bcd2b1b9f5e13076ff1f62faa57d4420524fea5843a1a8d176540f5dfddfc79f62e083a92873859dfa03"' : 'data-bs-target="#xs-controllers-links-module-GroupModule-fc9998c2a3534cab27bce0f69cfe647a74956591ec50bcd2b1b9f5e13076ff1f62faa57d4420524fea5843a1a8d176540f5dfddfc79f62e083a92873859dfa03"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-GroupModule-fc9998c2a3534cab27bce0f69cfe647a74956591ec50bcd2b1b9f5e13076ff1f62faa57d4420524fea5843a1a8d176540f5dfddfc79f62e083a92873859dfa03"' :
                                            'id="xs-controllers-links-module-GroupModule-fc9998c2a3534cab27bce0f69cfe647a74956591ec50bcd2b1b9f5e13076ff1f62faa57d4420524fea5843a1a8d176540f5dfddfc79f62e083a92873859dfa03"' }>
                                            <li class="link">
                                                <a href="controllers/GroupController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-GroupModule-fc9998c2a3534cab27bce0f69cfe647a74956591ec50bcd2b1b9f5e13076ff1f62faa57d4420524fea5843a1a8d176540f5dfddfc79f62e083a92873859dfa03"' : 'data-bs-target="#xs-injectables-links-module-GroupModule-fc9998c2a3534cab27bce0f69cfe647a74956591ec50bcd2b1b9f5e13076ff1f62faa57d4420524fea5843a1a8d176540f5dfddfc79f62e083a92873859dfa03"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GroupModule-fc9998c2a3534cab27bce0f69cfe647a74956591ec50bcd2b1b9f5e13076ff1f62faa57d4420524fea5843a1a8d176540f5dfddfc79f62e083a92873859dfa03"' :
                                        'id="xs-injectables-links-module-GroupModule-fc9998c2a3534cab27bce0f69cfe647a74956591ec50bcd2b1b9f5e13076ff1f62faa57d4420524fea5843a1a8d176540f5dfddfc79f62e083a92873859dfa03"' }>
                                        <li class="link">
                                            <a href="injectables/GroupService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NatsMessengerModule.html" data-type="entity-link" >NatsMessengerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-NatsMessengerModule-fd6ad88c7448ea4b3ae3cc8395d5802244f590e550ec23c79bddfe9c5a5225e5b5f5f48aa0e1722b2c7f95c4727221d20d29fa4780ff45d54c603dad15196836"' : 'data-bs-target="#xs-injectables-links-module-NatsMessengerModule-fd6ad88c7448ea4b3ae3cc8395d5802244f590e550ec23c79bddfe9c5a5225e5b5f5f48aa0e1722b2c7f95c4727221d20d29fa4780ff45d54c603dad15196836"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NatsMessengerModule-fd6ad88c7448ea4b3ae3cc8395d5802244f590e550ec23c79bddfe9c5a5225e5b5f5f48aa0e1722b2c7f95c4727221d20d29fa4780ff45d54c603dad15196836"' :
                                        'id="xs-injectables-links-module-NatsMessengerModule-fd6ad88c7448ea4b3ae3cc8395d5802244f590e550ec23c79bddfe9c5a5225e5b5f5f48aa0e1722b2c7f95c4727221d20d29fa4780ff45d54c603dad15196836"' }>
                                        <li class="link">
                                            <a href="injectables/NatsMessengerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NatsMessengerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RelationModule.html" data-type="entity-link" >RelationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RelationModule-13bff7b239f06edbc76ff0405150e91a391efbbc1d882420e049f5272ed1d594c05e1a1880509978400934c180589ad5d5e143b048eac3932ac1668455777a75"' : 'data-bs-target="#xs-controllers-links-module-RelationModule-13bff7b239f06edbc76ff0405150e91a391efbbc1d882420e049f5272ed1d594c05e1a1880509978400934c180589ad5d5e143b048eac3932ac1668455777a75"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RelationModule-13bff7b239f06edbc76ff0405150e91a391efbbc1d882420e049f5272ed1d594c05e1a1880509978400934c180589ad5d5e143b048eac3932ac1668455777a75"' :
                                            'id="xs-controllers-links-module-RelationModule-13bff7b239f06edbc76ff0405150e91a391efbbc1d882420e049f5272ed1d594c05e1a1880509978400934c180589ad5d5e143b048eac3932ac1668455777a75"' }>
                                            <li class="link">
                                                <a href="controllers/RelationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RelationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RelationModule-13bff7b239f06edbc76ff0405150e91a391efbbc1d882420e049f5272ed1d594c05e1a1880509978400934c180589ad5d5e143b048eac3932ac1668455777a75"' : 'data-bs-target="#xs-injectables-links-module-RelationModule-13bff7b239f06edbc76ff0405150e91a391efbbc1d882420e049f5272ed1d594c05e1a1880509978400934c180589ad5d5e143b048eac3932ac1668455777a75"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RelationModule-13bff7b239f06edbc76ff0405150e91a391efbbc1d882420e049f5272ed1d594c05e1a1880509978400934c180589ad5d5e143b048eac3932ac1668455777a75"' :
                                        'id="xs-injectables-links-module-RelationModule-13bff7b239f06edbc76ff0405150e91a391efbbc1d882420e049f5272ed1d594c05e1a1880509978400934c180589ad5d5e143b048eac3932ac1668455777a75"' }>
                                        <li class="link">
                                            <a href="injectables/RelationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RelationService</a>
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
                                    <a href="controllers/AssociationController.html" data-type="entity-link" >AssociationController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/GroupController.html" data-type="entity-link" >GroupController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RelationController.html" data-type="entity-link" >RelationController</a>
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
                                <a href="classes/Association.html" data-type="entity-link" >Association</a>
                            </li>
                            <li class="link">
                                <a href="classes/AssociationDTO.html" data-type="entity-link" >AssociationDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/AssoNameDTO.html" data-type="entity-link" >AssoNameDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Group.html" data-type="entity-link" >Group</a>
                            </li>
                            <li class="link">
                                <a href="classes/GroupDto.html" data-type="entity-link" >GroupDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/IdDto.html" data-type="entity-link" >IdDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/NameDto.html" data-type="entity-link" >NameDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Relation.html" data-type="entity-link" >Relation</a>
                            </li>
                            <li class="link">
                                <a href="classes/RelationDTO.html" data-type="entity-link" >RelationDTO</a>
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
                                    <a href="injectables/AssociationService.html" data-type="entity-link" >AssociationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GroupService.html" data-type="entity-link" >GroupService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NatsMessengerService.html" data-type="entity-link" >NatsMessengerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RelationService.html" data-type="entity-link" >RelationService</a>
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
                                <a href="interfaces/AssoInterface.html" data-type="entity-link" >AssoInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/assoUserEditInterface.html" data-type="entity-link" >assoUserEditInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GroupInterface.html" data-type="entity-link" >GroupInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RelationInterface.html" data-type="entity-link" >RelationInterface</a>
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