import { FormFactor } from '../../image-processor/common'

export class HtmlRenderer {
  render(objects) {
    return `<html>
      <head></head>
      <body>
      ${objects.map(object => this.html(object)).join('')}
      </body>
    </html>`
  }

  html(object, parent) {
    if(object.type !== 1) return '';
    const formfactor = object.formfactor;
    let left = formfactor.left
    const right = formfactor.right
    let top = formfactor.top;
    if(parent) {
      top -= parent.formfactor.top;
      left-= parent.formfactor.left;
    }
    const width = (formfactor.right - formfactor.left) + 1;
    const height = (formfactor.bottom - formfactor.top) + 1;
    const color = formfactor.primaryColor;
    const r = color[0];
    const g = color[1];
    const b = color[2];
    const a = color[3];
    return `<div style="position:absolute; width:${width}; height:${height}; background-color:rgba(${r},${g},${b},${a}); left:${left}; top:${top}">${(object.siblings || []).map(element => this.html(element,object)).filter(item => item!==undefined).join('\n')}
    </div>`
  }

}