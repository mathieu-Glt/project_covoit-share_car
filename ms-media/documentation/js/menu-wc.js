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
                    <a href="index.html" data-type="index-link">ms-medias documentation</a>
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
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-cfeb6bdd9aaa6b7c0181e74c7d7a92ca065de3498023d7c37b08fd3a149f3cb9da9e4daf49bfd4d8d00969c42eb88071f133404a408b1bd57730d136ddf52420"' : 'data-bs-target="#xs-injectables-links-module-AppModule-cfeb6bdd9aaa6b7c0181e74c7d7a92ca065de3498023d7c37b08fd3a149f3cb9da9e4daf49bfd4d8d00969c42eb88071f133404a408b1bd57730d136ddf52420"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-cfeb6bdd9aaa6b7c0181e74c7d7a92ca065de3498023d7c37b08fd3a149f3cb9da9e4daf49bfd4d8d00969c42eb88071f133404a408b1bd57730d136ddf52420"' :
                                        'id="xs-injectables-links-module-AppModule-cfeb6bdd9aaa6b7c0181e74c7d7a92ca065de3498023d7c37b08fd3a149f3cb9da9e4daf49bfd4d8d00969c42eb88071f133404a408b1bd57730d136ddf52420"' }>
                                        <li class="link">
                                            <a href="injectables/AvatarWorker.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AvatarWorker</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FileCreatedListener.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileCreatedListener</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FileDeletedListener.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileDeletedListener</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FsUtil.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FsUtil</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductWorker.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductWorker</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FilesModule-e745324d06e3b53b437195a67cdaf6f1a2feab70a78f45af983f2e2b959fe564e6dbdab43de271920cb9365d3912fec8998140967e1dfe7229a9915704b7bcc7"' : 'data-bs-target="#xs-controllers-links-module-FilesModule-e745324d06e3b53b437195a67cdaf6f1a2feab70a78f45af983f2e2b959fe564e6dbdab43de271920cb9365d3912fec8998140967e1dfe7229a9915704b7bcc7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesModule-e745324d06e3b53b437195a67cdaf6f1a2feab70a78f45af983f2e2b959fe564e6dbdab43de271920cb9365d3912fec8998140967e1dfe7229a9915704b7bcc7"' :
                                            'id="xs-controllers-links-module-FilesModule-e745324d06e3b53b437195a67cdaf6f1a2feab70a78f45af983f2e2b959fe564e6dbdab43de271920cb9365d3912fec8998140967e1dfe7229a9915704b7bcc7"' }>
                                            <li class="link">
                                                <a href="controllers/FilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FilesModule-e745324d06e3b53b437195a67cdaf6f1a2feab70a78f45af983f2e2b959fe564e6dbdab43de271920cb9365d3912fec8998140967e1dfe7229a9915704b7bcc7"' : 'data-bs-target="#xs-injectables-links-module-FilesModule-e745324d06e3b53b437195a67cdaf6f1a2feab70a78f45af983f2e2b959fe564e6dbdab43de271920cb9365d3912fec8998140967e1dfe7229a9915704b7bcc7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-e745324d06e3b53b437195a67cdaf6f1a2feab70a78f45af983f2e2b959fe564e6dbdab43de271920cb9365d3912fec8998140967e1dfe7229a9915704b7bcc7"' :
                                        'id="xs-injectables-links-module-FilesModule-e745324d06e3b53b437195a67cdaf6f1a2feab70a78f45af983f2e2b959fe564e6dbdab43de271920cb9365d3912fec8998140967e1dfe7229a9915704b7bcc7"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FormatterUtil.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormatterUtil</a>
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
                                    <a href="controllers/FilesController.html" data-type="entity-link" >FilesController</a>
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
                                <a href="classes/FileInfoInterface.html" data-type="entity-link" >FileInfoInterface</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileResponseInterface.html" data-type="entity-link" >FileResponseInterface</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilesResponseInterface.html" data-type="entity-link" >FilesResponseInterface</a>
                            </li>
                            <li class="link">
                                <a href="classes/GridFsMulterConfigService.html" data-type="entity-link" >GridFsMulterConfigService</a>
                            </li>
                            <li class="link">
                                <a href="classes/MongoGridFS.html" data-type="entity-link" >MongoGridFS</a>
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
                                    <a href="injectables/AvatarWorker.html" data-type="entity-link" >AvatarWorker</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileCreatedListener.html" data-type="entity-link" >FileCreatedListener</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileDeletedListener.html" data-type="entity-link" >FileDeletedListener</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesService.html" data-type="entity-link" >FilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormatterUtil.html" data-type="entity-link" >FormatterUtil</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FsUtil.html" data-type="entity-link" >FsUtil</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductWorker.html" data-type="entity-link" >ProductWorker</a>
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
                                <a href="interfaces/deleteFileInterface.html" data-type="entity-link" >deleteFileInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDownloadOptions.html" data-type="entity-link" >IDownloadOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGridFSObject.html" data-type="entity-link" >IGridFSObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGridFSWriteOption.html" data-type="entity-link" >IGridFSWriteOption</a>
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