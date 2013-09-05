//>>built
require({cache:{"url:esriviewer/ui/query/theme/QueryBuilderResultsTheme.css":".clearQueryBuilderResultsHeader{cursor:pointer;color:blue;text-decoration:underline;margin-bottom:5px;}.queryBuilderResultsRowClickLbl{position:absolute;right:15px;top:5px;}","url:esriviewer/ui/query/template/QueryBuilderResultsTemplate.html":"<div style=\"height: 100%\">\r\n    <div data-dojo-attach-event=\"click:clearResults\" class=\"clearQueryBuilderResultsHeader\">Clear Results</div>\r\n    <div class=\"queryBuilderResultsRowClickLbl\">Click result row to pan and flash</div>\r\n    <div style=\"height: 100%\" data-dojo-attach-point=\"queryBuilderResultGridContainer\"></div>\r\n</div>"}});define("esriviewer/ui/query/QueryBuilderResultsWidget",["dojo/_base/declare","xstyle/css!./theme/QueryBuilderResultsTheme.css","dojo/text!./template/QueryBuilderResultsTemplate.html","dojo/topic","dojo/_base/lang","../base/UITemplatedWidget","./base/QueryBuilderResultsGrid","dojo/dom-construct","esri/layers/GraphicsLayer","esri/symbols/SimpleFillSymbol","esri/symbols/SimpleLineSymbol","esri/symbols/SimpleMarkerSymbol","esri/renderers/SimpleRenderer","esri/renderers/UniqueValueRenderer","esri/renderers/ClassBreaksRenderer","esri/InfoTemplate","dojo/_base/Color"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11){return _1([_6],{maxResults:300,templateString:_3,postCreate:function(){this.inherited(arguments);this.initSymbology();this.createResultGraphicsLayer();},initSymbology:function(){this.polygonSymbol=new _a(_a.STYLE_SOLID,new _b(_b.STYLE_SOLID,new _11([0,0,255]),1),new _11([0,0,255,0]));this.pointSymbol=new _c(_c.STYLE_X,1,new _b(_b.STYLE_SOLID,new _11("blue")));this.lineSymbol=new _b(_b.STYLE_SOLID,new _11([0,0,255]),1);},_setGridResults:function(_12){if(this.queryBuilderResultGrid==null){this.createResultsGrid();}this.queryBuilderResultGrid.populateResults(_12);},_setGraphicResults:function(_13){var _14=this.pointSymbol;if(_13.geometryType==VIEWER_GLOBALS.ESRI_GEOMETRY_TYPES.POLYGON){_14=this.polygonSymbol;}else{if(_13.geometryType==VIEWER_GLOBALS.ESRI_GEOMETRY_TYPES.LINE){_14=this.lineSymbol;}}var _15;var _16=false;for(var i=0;i<_13.features.length;i++){if(i+1==this.maxResults){_16=true;break;}_15=_13.features[i];if(this.graphicsRenderer==null){_15.setSymbol(_14);}else{_15.setSymbol(this.graphicsRenderer.getSymbol(_15));}_15.setInfoTemplate(this.getInfoTemplate(_15));this.resultsGraphicsLayer.add(_15);}},setLayerGraphicInfo:function(_17){if(_17.drawingInfo&&_17.drawingInfo.renderer){var _18=_17.drawingInfo.renderer;if(_18.type==VIEWER_GLOBALS.ESRI_RENDERER_TYPES.SIMPLE){this.graphicsRenderer=new _d(_18);}else{if(_18.type==VIEWER_GLOBALS.ESRI_RENDERER_TYPES.UNIQUE_VALUE){this.graphicsRenderer=new _e(_18);}else{if(_18.type==VIEWER_GLOBALS.ESRI_RENDERER_TYPES.CLASS_BREAKS){this.graphicsRenderer=new _f(_18);}}}}},createResultsGrid:function(){this.queryBuilderResultGrid=new _7({maxResults:this.maxResults});_8.place(this.queryBuilderResultGrid.domNode,this.queryBuilderResultGridContainer);},handleQueryResponse:function(_19){this.clearGraphics();if(_19==null||_19.features==null||!_5.isArray(_19.features)){this.handleQueryError();}this._setGraphicResults(_19);var _1a=_19.features.length>this.maxResults;var _1b=_1a?this.maxResults:_19.features.length;var _1c=_19.features.length===1?"Result":"Results";_4.publish(VIEWER_GLOBALS.EVENTS.MESSAGING.SHOW,"Query Complete ("+_1b+" "+_1c+")");VIEWER_UTILS.log("SQL Query Returned "+_1b+" "+_1c,VIEWER_GLOBALS.LOG_TYPE.INFO);this._setGridResults(_19);},clearGraphics:function(){if(this.resultsGraphicsLayer){this.resultsGraphicsLayer.clear();}},createResultGraphicsLayer:function(){if(this.resultsGraphicsLayer==null){this.resultsGraphicsLayer=_9();this.resultsGraphicsLayer.on("mouse-over",function(evt){domStyle.set(evt.target,"cursor","pointer");});_4.publish(VIEWER_GLOBALS.EVENTS.MAP.LAYERS.ADD_EXTERNAL_MANAGED_LAYER,this.resultsGraphicsLayer);}},getInfoTemplate:function(_1d){var _1e=new _10();_1e.setTitle("Result");var _1f=_8.create("div");var _20=_8.create("div");_8.place(_20,_1f);var _21;var _22=_1d.attributes;for(var key in _22){var _23=_8.create("div",{className:"infoTemplateEntry"});var _24=_8.create("span",{className:"infoTemplateEntryLbl",innerHTML:key+":"});_21=_22[key];var _25=_8.create("span",{className:"infoTemplateEntryValue",innerHTML:_21});_8.place(_24,_23);_8.place(_25,_23);_8.place(_23,_20);}_1e.setContent(_1f.innerHTML);return _1e;},clearResults:function(){this.clearGraphics();if(this.queryBuilderResultGrid){this.queryBuilderResultGrid.clearResults();}}});});