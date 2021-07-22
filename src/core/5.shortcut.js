(function () {
    var kv = {};
    BI.shortcut = BI.component = BI.shortcut || function (xtype, cls) {
        if (kv[xtype] != null) {
            _global.console && console.error("组件： [" + xtype + "] 已经注册过了");
        }
        if (cls) {
            cls["xtype"] = xtype;
        }
        kv[xtype] = cls;
    };

    // 根据配置属性生成widget
    var createWidget = function (config, context, lazy) {
        var cls = kv[config.type];

        if (!cls) {
            throw new Error("组件： [" + config.type + "] 未定义");
        }
        var pushed = false;
        var widget = new cls();
        widget._context = BI.Widget.context || context;
        if (!BI.Widget.context && context) {
            pushed = true;
            BI.Widget.pushContext(context);
        }
        widget._initProps(config);
        widget._constructed();
        widget._initRoot();
        // if (!lazy || config.element || config.root) {
        widget._lazyConstructor();
        // }
        pushed && BI.Widget.popContext();
        return widget;
    };

    BI.createWidget = BI.createWidget || function (item, options, context, lazy) {
        // 先把准备环境准备好
        BI.init();
        var el, w;
        item || (item = {});
        if (BI.isWidget(options)) {
            context = options;
            options = {};
        } else {
            options || (options = {});
        }
        if (BI.isEmpty(item) && BI.isEmpty(options)) {
            return BI.createWidget({
                type: "bi.layout"
            });
        }
        if (BI.isWidget(item)) {
            return item;
        }
        if (item.type || options.type) {
            el = BI.extend({}, options, item);
            w = BI.Plugin.getWidget(el.type, el);
            if (w.type === el.type) {
                if (BI.Plugin.hasObject(el.type)) {
                    w.listeners = (w.listeners || []).concat([{
                        eventName: BI.Events.MOUNT,
                        action: function () {
                            BI.Plugin.getObject(el.type, this);
                        }
                    }]);
                }
                return createWidget(w, context, lazy);
            }
            return BI.createWidget(w, options, context, lazy);
        }
        if (item.el && (item.el.type || options.type)) {
            el = BI.extend({}, options, item.el);
            w = BI.Plugin.getWidget(el.type, el);
            if (w.type === el.type) {
                if (BI.Plugin.hasObject(el.type)) {
                    w.listeners = (w.listeners || []).concat([{
                        eventName: BI.Events.MOUNT,
                        action: function () {
                            BI.Plugin.getObject(el.type, this);
                        }
                    }]);
                }
                return createWidget(w, context, lazy);
            }
            return BI.createWidget(w, options, context, lazy);
        }
        if (BI.isWidget(item.el)) {
            return item.el;
        }
        throw new Error("组件创建：无法根据item创建组件", item);
    };

    BI._lazyCreateWidget = BI._lazyCreateWidget || function (item, options, context) {
        return BI.createWidget(item, options, context, true);
    };

    BI.createElement = BI.createElement || function () {
        var widget = BI.createWidget.apply(this, arguments);
        return widget.element;
    };

})();
