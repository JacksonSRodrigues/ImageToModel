import { FormFactor } from './common'

export class HierarchyGenerator {

  pushToTree(tree, element) {
    if (tree && tree.formfactor.contains(element)) {
      let didIntersect = false
      let index = 0;
      let end = tree.siblings ? tree.siblings.length : 0;
      while (index < end) {
        let siblingElement = tree.siblings[index];
        if (this.pushToTree(siblingElement, element)) {
          didIntersect = true;
          break;
        }
        index++;
      }

      if (!didIntersect) {
        if (!tree.siblings) tree.siblings = [];
        tree.siblings.push(this.nodeFromFormFactor(element,undefined))
      }

      return true;
    }
    else {
      return false;
    }
  }

  nodeFromFormFactor(element, siblings) {
    return {
      type: ((element.percent() > 0.4) ? 1 : 0),
      siblings: siblings,
      formfactor: element
    };
  }
}