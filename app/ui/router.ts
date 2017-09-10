import * as _ from "lodash";

class Router {

  private views = new Map<string, ViewControllerConstructor>();
  private currentViewController: any;

  constructor(private readonly viewContainer: HTMLElement) {}

  addView(name: string, contructorFn: ViewControllerConstructor) {
    this.views.set(name, contructorFn);
  }

  go(viewName: string, params?: any) {
    if (!this.views.has(viewName)) {
      throw Error(`View ${viewName} has not been found`);
    }

    const viewControllerConstructor = <ViewControllerConstructor> this.views.get(viewName);

    this.destroyCurrentViewController();
    this.clearViewContainer();

    this.viewContainer.innerHTML = _.get(viewControllerConstructor, 'template');

    this.currentViewController = new viewControllerConstructor(this.viewContainer, this, params);
  }

  destroyCurrentViewController() {
    const dispose = _.get(this.currentViewController, 'dispose');

    if (_.isFunction(dispose)) {
      this.currentViewController.dispose();
    }
  }

  clearViewContainer() {
    while(this.viewContainer.firstChild) {
      this.viewContainer.removeChild(this.viewContainer.firstChild);
    }
  }

}

interface ViewControllerConstructor {
  new (element:HTMLElement, router: Router, params?: any) : object;
}

const router = new Router(<HTMLElement> document.getElementById('view-container'));
export {
  router,
  Router
};