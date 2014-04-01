class ConditionNode extends Shape {

    constructor(el:joint.shapes.devs.Diamond) {
        super(el);
    }

    setText(text:string) {
        console.log("updating");
        this.el.attr({
            '.label': { text: 'hello', 'ref-x': .3 / 2, 'ref-y': .3 }
        });
    }
}