module Controllers {

    export class diagramCtrl {

        graph = new joint.dia.Graph;
        paper = new joint.dia.Paper({ el: $('#paper'),
            width: 600,
            height: 300,
            gridSize: 1,
            model: this.graph
        });


        constructor($scope) {
            $scope.vm = this;
        }

        createRect() {
            ShapesFactory.createRect(this.graph);
        }

        createLink() {
            ShapesFactory.createLink(this.graph);

        }

        createCircle() {
            ShapesFactory.createCircle(this.graph);
        }

        clear() {
            this.graph.clear();
        }
    }
}