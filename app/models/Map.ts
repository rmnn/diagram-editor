class MapNode implements Shape {
    id:string;
    type:NodeType;
    text:string;
    el:joint.shapes.devs.EllipseWithPorts;

    constructor(el:joint.shapes.devs.EllipseWithPorts, id:string) {
        this.el = el;
        this.type = NodeType.Map;
        this.id = id;
    }


    setText(text:string) {
        this.text = text;
        this.el.attr({
            '.label': { text: text, 'ref-x': .3, 'ref-y': .4 }
        });
    }
    getElement() {
        return this.el;
    }
}