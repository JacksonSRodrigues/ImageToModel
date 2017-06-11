import { ColorSegregator, HierarchyGenerator } from './image-processor'
import { HtmlRenderer } from './renderer/html'
import { readContent, saveContent, readFilePath } from './service/file-access'


export function generateHTML() {

    readFilePath().then(tImage => {
      let cSegregator = new ColorSegregator();
      cSegregator.segregate(tImage).then(components => {
        console.log(components);
        let hGenertator = new HierarchyGenerator();
        let tree = [];

        components.forEach((element) => {
          let didPush = false;
          tree.forEach((node) => {
            if (hGenertator.pushToTree(node, element)) {
              didPush = true;
            }
          });

          if (!didPush) {
            tree.push(hGenertator.nodeFromFormFactor(element));
          }
        });

        console.log('Tree Parsing Done');
        console.log('Tree', tree);

        let renderer = new HtmlRenderer();
        let html = renderer.render(tree);

        console.log('HTML Done');
        console.log(html);
        saveContent(html);

      }).catch(err => {
        console.log('Error', err);
      })

    })
  }
