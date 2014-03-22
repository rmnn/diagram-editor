module Controllers {

    /**
     * The main controller for the app. The controller:
     * - retrieves and persists the model via the todoStorage service
     * - exposes the model to the template and provides event handlers
     */
    export class diagramCtrl {

        graph = new joint.dia.Graph;


        constructor($scope) {
            var paper = new joint.dia.Paper({ el: $('#paper'),
                width: 600,
                height: 300,
                gridSize: 1,
                model: this.graph
            });
            $scope.vm = this;
        }

        createRect() {
            var el = new joint.shapes.basic.Rect({
                position: { x: 0, y: 0 },
                size: { width: 100, height: 40 },
                attrs: {
                    rect: { rx: 2, ry: 2, fill: '#2ECC71', stroke: '#27AE60', 'stroke-width': 2 },
                    text: { 'font-size': 10, fill: '#333' }
                }
            });

            var dropShadow = el.clone();
            dropShadow.translate(20, 20);
            dropShadow.attr('text/text', 'Hello world!');
            dropShadow.attr('rect/filter', { name: 'dropShadow', args: { dx: 2, dy: 2, blur: 3 } });
            this.graph.addCell(dropShadow);

        }
    }
}