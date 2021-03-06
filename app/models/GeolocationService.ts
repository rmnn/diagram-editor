class GeolocationService implements Shape {

    type;
    id:string;
    el = new joint.shapes.devs.RectWithPorts;
    text:string;



    constructor(el:joint.shapes.devs.RectWithPorts, id:string) {
        this.el = el;
        this.type = ServiceType[ServiceType.GeolocationService];
        this.id = id;
    }


    setText(text:string) {
        this.text = text;
        this.el.attr({
                '.label': { text: text, 'ref-x': .2, 'ref-y': .9 / 2 }
            }
        )
    }

    getElement() {
        return this.el;
    }

}