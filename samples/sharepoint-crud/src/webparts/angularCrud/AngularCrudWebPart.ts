import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import styles from './AngularCrud.module.scss';
import * as strings from 'angularCrudStrings';
import { IAngularCrudWebPartProps } from './IAngularCrudWebPartProps';

import * as angular from 'angular';
import './app/app-module';

export default class AngularCrudWebPart extends BaseClientSideWebPart<IAngularCrudWebPartProps> {
  private $injector: ng.auto.IInjectorService;

  public render(): void {
    if (this.renderedOnce === false) {
      this.domElement.innerHTML = `
<div class="${styles.angularCrud}" data-ng-controller="HomeController as vm">
  <div class="${styles.container}">
    <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
      <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
          <span class="ms-font-xl ms-fontColor-white">
            Sample SharePoint CRUD operations in Angular
          </span>
        </div>
      </div>
      <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
        <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
          <uif-button ng-click="vm.createItem()" ng-disabled="vm.listNotConfigured">Create item</uif-button>
          <uif-button ng-click="vm.readItem()" ng-disabled="vm.listNotConfigured">Read item</uif-button>
        </div>
      </div>
      <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
        <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
          <uif-button ng-click="vm.readItems()" ng-disabled="vm.listNotConfigured">Read all items</uif-button>
        </div>
      </div>
      <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
        <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
          <uif-button ng-click="vm.updateItem()" ng-disabled="vm.listNotConfigured">Update item</uif-button>
          <uif-button ng-click="vm.deleteItem()" ng-disabled="vm.listNotConfigured">Delete item</uif-button>
        </div>
      </div>
      <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
        <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
          <div>{{vm.status}}</div>
          <ul>
            <li ng-repeat="item in vm.items">{{item.Title}} ({{item.Id}})</li>
          <ul>
        </div>
      </div>
  </div>
</div>`;

      this.$injector = angular.bootstrap(this.domElement, ['crudapp']);
    }

    this.$injector.get('$rootScope').$broadcast('configurationChanged', {
      webUrl: this.context.pageContext.web.absoluteUrl,
      listName: this.properties.listName
    });
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.DataGroupName,
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}