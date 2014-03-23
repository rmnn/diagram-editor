angular.module('diagram', ['controllers']);
var Controllers;
(function (Controllers) {
    var diagramCtrl = (function () {
        function diagramCtrl($scope) {
            this.graph = new joint.dia.Graph();
            this.paper = new joint.dia.Paper({
                el: $('#paper'),
                width: 600,
                height: 300,
                gridSize: 1,
                model: this.graph
            });
            $scope.vm = this;
        }
        diagramCtrl.prototype.createRect = function () {
            ShapesFactory.createRect(this.graph);
        };

        diagramCtrl.prototype.createLink = function () {
            ShapesFactory.createLink(this.graph);
        };

        diagramCtrl.prototype.createCircle = function () {
            ShapesFactory.createCircle(this.graph);
        };

        diagramCtrl.prototype.clear = function () {
            this.graph.clear();
        };
        return diagramCtrl;
    })();
    Controllers.diagramCtrl = diagramCtrl;
})(Controllers || (Controllers = {}));
var Circle = (function () {
    function Circle(el) {
        this.el = el;
    }
    Circle.prototype.getEl = function () {
        return this.el;
    };
    return Circle;
})();
var Link = (function () {
    function Link(el) {
        this.el = el;
    }
    Link.prototype.getEl = function () {
        return this.el;
    };
    return Link;
})();
var Rect = (function () {
    function Rect(el) {
        this.el = el;
    }
    Rect.prototype.getEl = function () {
        return this.el;
    };
    return Rect;
})();
var ShapesFactory = (function () {
    function ShapesFactory() {
    }
    ShapesFactory.createRect = function (graph) {
        var el = new joint.shapes.basic.Rect({
            position: { x: 0, y: 0 },
            size: { width: 100, height: 40 },
            attrs: {
                rect: { rx: 2, ry: 2, fill: '#2ECC71', stroke: '#27AE60', 'stroke-width': 2, filter: { name: 'dropShadow', args: { dx: 2, dy: 2, blur: 3 } } },
                text: { 'font-size': 15, fill: '#333', text: 'RECT' }
            }
        });

        el.translate(20, 20);
        graph.addCell(el);
        return new Rect(el);
    };

    ShapesFactory.createCircle = function (graph) {
        var circle = new joint.shapes.basic.Circle({
            size: { width: 60, height: 60 },
            attrs: {
                text: { 'font-size': 10, fill: '#333', text: 'CIRCLE' },
                circle: { rx: 2, ry: 2, fill: '#2ECC71', stroke: '#27AE60', 'stroke-width': 2, filter: { name: 'dropShadow', args: { dx: 2, dy: 2, blur: 3 } } }
            }
        });
        graph.addCell(circle);
        return new Circle(circle);
    };

    ShapesFactory.createLink = function (graph) {
        var link = new joint.dia.Link({
            source: { x: 10, y: 20 },
            target: { x: 100, y: 20 },
            attrs: {}
        });
        graph.addCell(link);
        return new Link(link);
    };
    return ShapesFactory;
})();
angular.module('controllers', []).controller(Controllers);
//# sourceMappingURL=out.js.map
