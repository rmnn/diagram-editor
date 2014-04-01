var Shape = (function () {
    function Shape(el) {
        this.el = el;
    }
    Shape.prototype.setText = function (text) {
        this.text = text;
        this.el.attr({
            text: { text: text }
        });
    };
    return Shape;
})();
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
            this.msg = "hello";
            this.shapesList = [];
            $scope.vm = this;

            this.paper.on('cell:pointerdblclick', function (cellView, evt, x, y) {
                $('#properties').attr("class", "col-md-6");
                $scope.vm.shapesList.forEach(function (shape) {
                    if (shape.el.id == cellView.model.id) {
                        $scope.vm.currentShape = shape;
                        $('#text').val($scope.vm.currentShape.text);
                        $('#property1').val($scope.vm.currentShape.property1);
                        $('#property2').val($scope.vm.currentShape.property2);
                    }
                });
            });

            $('html').keyup(function (e) {
                if (e.keyCode == 46) {
                    if ($scope.vm.currentShape == null) {
                        alert("Current Shape is not defined");
                    } else {
                        $scope.vm.currentShape.el.remove();
                        $scope.vm.close();
                    }
                }
            });
        }
        diagramCtrl.prototype.createFinalNode = function () {
            this.shapesList.push(ShapesFactory.createFinalNode(this.graph));
        };

        diagramCtrl.prototype.createActionNode = function () {
            this.shapesList.push(ShapesFactory.createActionNode(this.graph));
        };

        diagramCtrl.prototype.createInitialNode = function () {
            this.shapesList.push(ShapesFactory.createInitialNode(this.graph));
        };

        diagramCtrl.prototype.createConditionNode = function () {
            this.shapesList.push(ShapesFactory.createConditionNode(this.graph));
        };

        diagramCtrl.prototype.clear = function () {
            this.graph.clear();
        };

        diagramCtrl.prototype.updateValues = function () {
            this.currentShape.property1 = $('#property1').val();
            this.currentShape.property2 = $('#property2').val();
            this.currentShape.setText($('#text').val());

            $('#alertblock').append($('<div>').attr('id', 'alert').attr('class', 'bg-success').text('Successfully updated'));
            $('#alert').append('<button type="button" class="close" data-dismiss="alert">&times;</button>');
        };

        diagramCtrl.prototype.close = function () {
            $('#properties').attr("class", "col-md-6 hidden");
        };
        return diagramCtrl;
    })();
    Controllers.diagramCtrl = diagramCtrl;
})(Controllers || (Controllers = {}));
angular.module('diagram', ['controllers', 'directives']);
var directives = angular.module('directives', []);
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ActionNode = (function (_super) {
    __extends(ActionNode, _super);
    function ActionNode(el) {
        _super.call(this, el);
    }
    return ActionNode;
})(Shape);
var ConditionNode = (function (_super) {
    __extends(ConditionNode, _super);
    function ConditionNode(el) {
        _super.call(this, el);
    }
    ConditionNode.prototype.setText = function (text) {
        console.log("updating");
        this.el.attr({
            '.label': { text: 'hello', 'ref-x': .3 / 2, 'ref-y': .3 }
        });
    };
    return ConditionNode;
})(Shape);
var FinalNode = (function (_super) {
    __extends(FinalNode, _super);
    function FinalNode(el) {
        _super.call(this, el);
    }
    return FinalNode;
})(Shape);
var InitialNode = (function (_super) {
    __extends(InitialNode, _super);
    function InitialNode(el) {
        _super.call(this, el);
    }
    return InitialNode;
})(Shape);
var ShapesFactory = (function () {
    function ShapesFactory() {
    }
    ShapesFactory.createFinalNode = function (graph) {
        var el = new joint.shapes.devs.EllipseWithPorts({
            position: { x: 20, y: 20 },
            inPorts: [''],
            outPorts: [],
            attrs: {
                '.outer': {
                    stroke: '#000000',
                    'stroke-width': 1,
                    'stroke-style': 'solid',
                    rx: 500,
                    ry: 250,
                    fill: '#ffffff'
                },
                '.label': {
                    'ref-x': .4,
                    'ref-y': .4
                }
            }
        });
        graph.addCell(el);
        var node = new FinalNode(el);
        node.setText("final");
        return node;
    };

    ShapesFactory.createInitialNode = function (graph) {
        var el = new joint.shapes.devs.EllipseWithPorts({
            position: { x: 20, y: 20 },
            outPorts: ['', '', ''],
            attrs: {
                '.outer': {
                    stroke: '#000000',
                    'stroke-width': 1,
                    'stroke-style': 'solid',
                    rx: 500,
                    ry: 250,
                    fill: '#f8f8f8'
                },
                '.label': {
                    'ref-x': .7 / 2,
                    'ref-y': .4
                }
            }
        });
        graph.addCell(el);
        var node = new InitialNode(el);
        node.setText("Initial");
        return node;
    };

    ShapesFactory.createActionNode = function (graph) {
        var el = new joint.shapes.devs.RectWithPorts({
            position: { x: 20, y: 20 },
            inPorts: ['', ''],
            outPorts: ['', '']
        });
        graph.addCell(el);
        var node = new ActionNode(el);
        node.setText("process");
        return new ActionNode(el);
    };

    ShapesFactory.createConditionNode = function (graph) {
        var el = new joint.shapes.devs.Diamond({
            position: { x: 20, y: 20 },
            inPorts: ['', ''],
            outPorts: ['', ''],
            attrs: {
                '.outer': {
                    stroke: '#000000',
                    'stroke-width': 1,
                    'stroke-style': 'solid',
                    fill: '#f8f8f8'
                }
            }
        });

        el.rotate(45, 0);
        graph.addCell(el);
        var node = new ConditionNode(el);
        node.setText("123");
        return node;
    };
    return ShapesFactory;
})();
angular.module('controllers', []).controller(Controllers);
//# sourceMappingURL=out.js.map
