class ValidateService {

    possibleEdges:Edge[];

    constructor() {
        this.possibleEdges = [];


        this.possibleEdges.push(new Edge(NodeType.Button, ServiceType.GeolocationService));
        this.possibleEdges.push(new Edge(NodeType.Button, ServiceType.NavigationService));
        this.possibleEdges.push(new Edge(ServiceType.GeolocationService, NodeType.Map))


    }

    validate(shapes:Shape[], graph:joint.dia.Graph) {
        var links:joint.dia.Link[] = graph.getLinks();
        var res:string;
        var find:boolean;
        var th = this;
        res = "Validation passed!";
        links.forEach(function (link) {
            find = false;
            var source:joint.shapes.devs.Generic = link.get('source');
            var target:joint.shapes.devs.Generic = link.get('target');
            var sourceType= th.getElementType(shapes, source);
            var targetType = th.getElementType(shapes, target);
            th.possibleEdges.forEach(function (edge) {
                if (edge.source == sourceType && edge.target == targetType) {
                    find = true;
                }
            });
            if (!find) {
                res = "Cant accept edge from " + NodeType[NodeType[sourceType]] + " to " + NodeType[targetType];
            }
        });

        return res;

    }

    getElementType(shapes:Shape[], el:joint.shapes.devs.Generic) {
        var type:NodeType;
        shapes.forEach(function (shape) {
            if (shape.getElement().id == el.id) {
                type = shape.type;
            }
        });
        return type;
    }
}
services.service('validateService', ValidateService);