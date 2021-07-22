(function () {
    var moduleInjection = {};
    BI.module = BI.module || function (xtype, cls) {
        if (moduleInjection[xtype] != null) {
            _global.console && console.error("module： [" + xtype + "] 已经注册过了");
        }
        moduleInjection[xtype] = cls;
    };

    var constantInjection = {};
    BI.constant = BI.constant || function (xtype, cls) {
        if (constantInjection[xtype] != null) {
            _global.console && console.error("constant: [" + xtype + "]已经注册过了");
        }
        constantInjection[xtype] = cls;
    };

    var modelInjection = {};
    BI.model = BI.model || function (xtype, cls) {
        if (modelInjection[xtype] != null) {
            _global.console && console.error("model: [" + xtype + "] 已经注册过了");
        }
        modelInjection[xtype] = cls;
    };

    var storeInjection = {};
    BI.store = BI.store || function (xtype, cls) {
        if (storeInjection[xtype] != null) {
            _global.console && console.error("store: [" + xtype + "] 已经注册过了");
        }
        storeInjection[xtype] = cls;
    };

    var serviceInjection = {};
    BI.service = BI.service || function (xtype, cls) {
        if (serviceInjection[xtype] != null) {
            _global.console && console.error("service: [" + xtype + "] 已经注册过了");
        }
        serviceInjection[xtype] = cls;
    };

    var providerInjection = {};
    BI.provider = BI.provider || function (xtype, cls) {
        if (providerInjection[xtype] != null) {
            _global.console && console.error("provider: [" + xtype + "] 已经注册过了");
        }
        providerInjection[xtype] = cls;
    };

    var configFunctions = {};
    BI.config = BI.config || function (type, configFn, opt) {
        if (BI.initialized) {
            if (constantInjection[type]) {
                return (constantInjection[type] = configFn(constantInjection[type]));
            }
            if (providerInjection[type]) {
                if (!providers[type]) {
                    providers[type] = new providerInjection[type]();
                }
                // 如果config被重新配置的话，需要删除掉之前的实例
                if (providerInstance[type]) {
                    delete providerInstance[type];
                }
                return configFn(providers[type]);
            }
            return BI.Plugin.configWidget(type, configFn, opt);
        }
        if (!configFunctions[type]) {
            configFunctions[type] = [];
            BI.prepares.push(function () {
                var queue = configFunctions[type];
                for (var i = 0; i < queue.length; i++) {
                    if (constantInjection[type]) {
                        constantInjection[type] = queue[i](constantInjection[type]);
                        continue;
                    }
                    if (providerInjection[type]) {
                        if (!providers[type]) {
                            providers[type] = new providerInjection[type]();
                        }
                        if (providerInstance[type]) {
                            delete providerInstance[type];
                        }
                        queue[i](providers[type]);
                        continue;
                    }
                    BI.Plugin.configWidget(type, queue[i]);
                }
                configFunctions[type] = null;
            });
        }
        configFunctions[type].push(configFn);
    };

    BI.getReference = BI.getReference || function (type, fn) {
        return BI.Plugin.registerObject(type, fn);
    };

    var actions = {};
    var globalAction = [];
    BI.action = BI.action || function (type, actionFn) {
        if (BI.isFunction(type)) {
            globalAction.push(type);
            return function () {
                BI.remove(globalAction, function (idx) {
                    return globalAction.indexOf(actionFn) === idx;
                });
            };
        }
        if (!actions[type]) {
            actions[type] = [];
        }
        actions[type].push(actionFn);
        return function () {
            BI.remove(actions[type], function (idx) {
                return actions[type].indexOf(actionFn) === idx;
            });
            if (actions[type].length === 0) {
                delete actions[type];
            }
        };
    };

    var points = {};
    BI.point = BI.point || function (type, action, pointFn, after) {
        if (!points[type]) {
            points[type] = {};
        }
        if (!points[type][action]) {
            points[type][action] = {};
        }
        if (!points[type][action][after ? "after" : "before"]) {
            points[type][action][after ? "after" : "before"] = [];
        }
        points[type][action][after ? "after" : "before"].push(pointFn);
    };

    BI.Modules = BI.Modules || {
        getModule: function (type) {
            if (!moduleInjection[type]) {
                throw new Error("module: [" + type + "] 未定义");
            }
            return moduleInjection[type];
        },
        getAllModules: function () {
            return moduleInjection;
        }
    };

    BI.Constants = BI.Constants || {
        getConstant: function (type) {
            if (!constantInjection[type]) {
                throw new Error("constant: [" + type + "] 未定义");
            }
            return constantInjection[type];
        }
    };

    var callPoint = function (inst, types) {
        types = BI.isArray(types) ? types : [types];
        BI.each(types, function (idx, type) {
            if (points[type]) {
                for (var action in points[type]) {
                    var bfns = points[type][action].before;
                    if (bfns) {
                        BI.aspect.before(inst, action, function (bfns) {
                            return function () {
                                for (var i = 0, len = bfns.length; i < len; i++) {
                                    try {
                                        bfns[i].apply(inst, arguments);
                                    } catch (e) {
                                        _global.console && console.error(e);
                                    }
                                }
                            };
                        }(bfns));
                    }
                    var afns = points[type][action].after;
                    if (afns) {
                        BI.aspect.after(inst, action, function (afns) {
                            return function () {
                                for (var i = 0, len = afns.length; i < len; i++) {
                                    try {
                                        afns[i].apply(inst, arguments);
                                    } catch (e) {
                                        _global.console && console.error(e);
                                    }
                                }
                            };
                        }(afns));
                    }
                }
            }
        });
    };

    BI.Models = BI.Models || {
        getModel: function (type, config) {
            if (!modelInjection[type]) {
                throw new Error("model: [" + type + "] 未定义");
            }
            var inst = new modelInjection[type](config);
            inst._constructor && inst._constructor(config);
            inst.mixins && callPoint(inst, inst.mixins);
            callPoint(inst, type);
            return inst;
        }
    };

    var stores = {};

    BI.Stores = BI.Stores || {
        getStore: function (type, config) {
            if (!storeInjection[type]) {
                throw new Error("store: [" + type + "] 未定义");
            }
            if (stores[type]) {
                return stores[type];
            }
            var inst = stores[type] = new storeInjection[type](config);
            inst._constructor && inst._constructor(config, function () {
                delete stores[type];
            });
            callPoint(inst, type);
            return inst;
        }
    };

    var services = {};

    BI.Services = BI.Services || {
        getService: function (type, config) {
            if (!serviceInjection[type]) {
                throw new Error("service: [" + type + "] 未定义");
            }
            if (services[type]) {
                return services[type];
            }
            services[type] = new serviceInjection[type](config);
            callPoint(services[type], type);
            return services[type];
        }
    };

    var providers = {},
        providerInstance = {};

    BI.Providers = BI.Providers || {
        getProvider: function (type, config) {
            if (!providerInjection[type]) {
                throw new Error("provider: [" + type + "] 未定义");
            }
            if (!providers[type]) {
                providers[type] = new providerInjection[type]();
            }
            if (!providerInstance[type]) {
                providerInstance[type] = new (providers[type].$get())(config);
            }
            return providerInstance[type];
        }
    };

    BI.Actions = BI.Actions || {
        runAction: function (type, event, config) {
            BI.each(actions[type], function (i, act) {
                try {
                    act(event, config);
                } catch (e) {
                    _global.console && console.error(e);
                }
            });
        },
        runGlobalAction: function () {
            var args = [].slice.call(arguments);
            BI.each(globalAction, function (i, act) {
                try {
                    act.apply(null, args);
                } catch (e) {
                    _global.console && console.error(e);
                }
            });
        }
    };

    BI.getResource = BI.getResource || function (type, config) {
        if (constantInjection[type]) {
            return BI.Constants.getConstant(type);
        }
        if (modelInjection[type]) {
            return BI.Models.getModel(type, config);
        }
        if (storeInjection[type]) {
            return BI.Stores.getStore(type, config);
        }
        if (serviceInjection[type]) {
            return BI.Services.getService(type, config);
        }
        if (providerInjection[type]) {
            return BI.Providers.getProvider(type, config);
        }
        throw new Error("未知类型: [" + type + "] 未定义");
    };
})();
