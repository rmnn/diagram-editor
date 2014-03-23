class ShapesFactory {

    static createRect(graph:joint.dia.Graph) {
        var el = new joint.shapes.basic.Rect({
            position: { x: 0, y: 0 },
            size: { width: 100, height: 40 },
            attrs: {
                rect: { rx: 2, ry: 2, fill: '#2ECC71', stroke: '#27AE60', 'stroke-width': 2, filter: { name: 'dropShadow', args: {dx: 2, dy: 2, blur: 3}} },
                text: { 'font-size': 15, fill: '#333', text: 'RECT' }
            }
        });

        el.translate(20, 20);
        graph.addCell(el);
        return new Rect(el);
    }

    static createCircle(graph:joint.dia.Graph) {
        var circle = new joint.shapes.basic.Circle({
            size: { width: 60, height: 60 },
            attrs: {
                text: { 'font-size': 10, fill: '#333', text: 'CIRCLE' },
                circle: { rx: 2, ry: 2, fill: '#2ECC71', stroke: '#27AE60', 'stroke-width': 2, filter: { name: 'dropShadow', args: {dx: 2, dy: 2, blur: 3}}  }}
        });
        graph.addCell(circle);
        return new Circle(circle);
    }

    static createLink(graph:joint.dia.Graph) {
        var link = new joint.dia.Link({
            source: { x: 10, y: 20 },
            target: { x: 100, y: 20 },
            attrs: {}
        });
        graph.addCell(link);
        return new Link(link);
    }

}