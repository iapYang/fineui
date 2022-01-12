/**
 * @author windy
 * @version 2.0
 * Created by windy on 2021/6/30
 */
// 系统参数常量
!(function () {
    var system = {
        dependencies: {},
        responsiveMode: false,
        workerMode: false,
        size: {
            // 尺寸
            // 通用尺寸
            TOOL_BAR_HEIGHT: 24,
            LIST_ITEM_HEIGHT: 24,
            TRIGGER_HEIGHT: 24,
            TOAST_TOP: 10,
            // 根据控件类型特化尺寸
            DATE_LIST_ITEM_HEIGHT: 24
        }
    };

    var provider = function () {

        this.SYSTEM = system;

        this.setSize = function (opt) {
            BI.deepExtend(system, {size: opt});
        };

        this.setResponsiveMode = function (mode) {
            system.responsiveMode = !!mode;
        };

        this.setWorkerMode = function (mode) {
            system.workerMode = !!mode;
        };

        this.addDependency = function (moduleId, minVersion, maxVersion) {
            system.dependencies[moduleId] = {
                min: minVersion,
                max: maxVersion
            };
        };

        this.addDependencies = function (moduleConfig) {
            BI.extend(system.dependencies, moduleConfig);
        };

        this.$get = function () {
            return BI.inherit(BI.OB, {

                getSize: function () {
                    return system.size;
                },

                getResponsiveMode: function () {
                    return system.responsiveMode;
                },

                getWorkerMode: function () {
                    return system.workerMode;
                },

                getDependencies: function () {
                    return system.dependencies;
                }
            });
        };
    };

    BI.provider("bi.provider.system", provider);
})();

BI.prepares.push(function () {
    BI.SIZE_CONSANTS = BI.Providers.getProvider("bi.provider.system").getSize();
});
