var services = angular.module('services', []);
var NodeType;
(function (NodeType) {
    NodeType[NodeType["Action"] = 0] = "Action";
    NodeType[NodeType["Condition"] = 1] = "Condition";
    NodeType[NodeType["Final"] = 2] = "Final";
    NodeType[NodeType["Initial"] = 3] = "Initial";
})(NodeType || (NodeType = {}));
var Controllers;
(function (Controllers) {
    var diagramCtrl = (function () {
        function diagramCtrl($scope, validateService) {
            this.graph = new joint.dia.Graph();
            this.paper = new joint.dia.Paper({
                el: $('#paper'),
                width: 600,
                height: 320,
                gridSize: 1,
                model: this.graph
            });
            this.shapesList = [];
            $scope.vm = this;
            this.validateService = validateService;

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
                        $scope.vm.shapeList.splice($scope.vm.currentShape, $scope.vm.shapeList.indexOf($scope.vm.currentShape));
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

        diagramCtrl.prototype.validate = function () {
            alert(this.validateService.validate(this.shapesList, this.graph));
        };
        return diagramCtrl;
    })();
    Controllers.diagramCtrl = diagramCtrl;
})(Controllers || (Controllers = {}));
angular.module('diagram', ['controllers', 'services', 'directives']);
var directives = angular.module('directives', []);
var ActionNode = (function () {
    function ActionNode(el) {
        this.el = el;
        this.type = NodeType.Action;
    }
    ActionNode.prototype.setText = function (text) {
        this.text = text;
        this.el.attr({
            '.label': { text: text, 'ref-x': .2, 'ref-y': .9 / 2 }
        });
    };
    ActionNode.prototype.getElement = function () {
        return this.el;
    };
    return ActionNode;
})();
var ConditionNode = (function () {
    function ConditionNode(el) {
        this.el = el;
        this.type = NodeType.Condition;
    }
    ConditionNode.prototype.setText = function (text) {
        this.text = text;
        this.el.attr({
            '.label': { text: text, 'ref-x': .3, 'ref-y': .4 }
        });
    };
    ConditionNode.prototype.getElement = function () {
        return this.el;
    };
    return ConditionNode;
})();
var FinalNode = (function () {
    function FinalNode(el) {
        this.el = el;
        this.type = NodeType.Final;
    }
    FinalNode.prototype.setText = function (text) {
        this.text = text;
        this.el.attr({
            '.label': { text: text, 'ref-x': .7 / 2, 'ref-y': .4 }
        });
    };
    FinalNode.prototype.getElement = function () {
        return this.el;
    };
    return FinalNode;
})();
var InitialNode = (function () {
    function InitialNode(el) {
        this.el = el;
        this.type = NodeType.Initial;
    }
    InitialNode.prototype.setText = function (text) {
        this.text = text;
        this.el.attr({
            '.label': { text: text, 'ref-x': .7 / 2, 'ref-y': .4 }
        });
    };
    InitialNode.prototype.getElement = function () {
        return this.el;
    };
    return InitialNode;
})();
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
        return node;
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
var Edge = (function () {
    function Edge(source, target) {
        this.source = source;
        this.target = target;
    }
    return Edge;
})();
var ValidateService = (function () {
    function ValidateService() {
        this.possibleEdges = [];

        this.possibleEdges.push(new Edge(NodeType.Condition, NodeType.Condition));
        this.possibleEdges.push(new Edge(NodeType.Condition, NodeType.Action));
        this.possibleEdges.push(new Edge(NodeType.Condition, NodeType.Final));

        this.possibleEdges.push(new Edge(NodeType.Initial, NodeType.Condition));
        this.possibleEdges.push(new Edge(NodeType.Initial, NodeType.Final));
        this.possibleEdges.push(new Edge(NodeType.Initial, NodeType.Action));

        this.possibleEdges.push(new Edge(NodeType.Action, NodeType.Condition));
        this.possibleEdges.push(new Edge(NodeType.Action, NodeType.Final));
        this.possibleEdges.push(new Edge(NodeType.Action, NodeType.Initial));
        this.possibleEdges.push(new Edge(NodeType.Action, NodeType.Action));
    }
    ValidateService.prototype.validate = function (shapes, graph) {
        var links = graph.getLinks();
        var res;
        var find;
        var th = this;
        res = "Validation passed";
        links.forEach(function (link) {
            find = false;
            var source = link.get('source');
            var target = link.get('target');
            var sourceType = th.getElementType(shapes, source);
            var targetType = th.getElementType(shapes, target);
            th.possibleEdges.forEach(function (edge) {
                if (edge.source == sourceType && edge.target == targetType) {
                    find = true;
                }
            });
            if (!find) {
                res = "Cant accept edge from " + NodeType[sourceType] + " to " + NodeType[targetType];
            }
        });
        return res;
    };

    ValidateService.prototype.getElementType = function (shapes, el) {
        var type;
        shapes.forEach(function (shape) {
            if (shape.getElement().id == el.id) {
                type = shape.type;
            }
        });
        return type;
    };
    return ValidateService;
})();
services.service('validateService', ValidateService);
angular.module('controllers', []).controller(Controllers);
//# sourceMappingURL=out.js.map
