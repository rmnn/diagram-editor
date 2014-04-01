class Shape {
    property1:string;
    property2:string;
    el:joint.shapes.basic.Generic;
    text:string;

    constructor(el:joint.shapes.basic.Generic) {
        this.el = el;
    }

    setText(text:string) {
        this.text = text;
        this.el.attr({
            text: {text: text }});
    }
}