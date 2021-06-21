/**
 * td布局
 * @class BI.TdLayout
 * @extends BI.Layout
 */
BI.TdLayout = BI.inherit(BI.Layout, {
    props: function () {
        return BI.extend(BI.TdLayout.superclass.props.apply(this, arguments), {
            baseCls: "bi-td",
            columnSize: [],
            verticalAlign: BI.VerticalAlign.Middle,
            hgap: 0,
            vgap: 0,
            tgap: 0,
            bgap: 0,
            lgap: 0,
            rgap: 0,
            items: []
        });
    },
    render: function () {
        BI.TdLayout.superclass.render.apply(this, arguments);
        this.$table = BI.Widget._renderEngine.createElement("<table>").attr({cellspacing: 0, cellpadding: 0}).css({
            position: "relative",
            width: "100%",
            height: "100%",
            "border-spacing": "0px",
            border: "none",
            "border-collapse": "separate"
        });
        this.rows = 0;
        this.populate(this.options.items);
    },

    _addElement: function (idx, arr) {
        var o = this.options;

        function firstElement (item, row, col) {
            if (row === 0) {
                item.addClass("first-row");
            }
            if (col === 0) {
                item.addClass("first-col");
            }
            item.addClass(BI.isOdd(row + 1) ? "odd-row" : "even-row");
            item.addClass(BI.isOdd(col + 1) ? "odd-col" : "even-col");
            item.addClass("center-element");
        }

        function firstObject (item, row, col) {
            var cls = "";
            if (row === 0) {
                cls += " first-row";
            }
            if (col === 0) {
                cls += " first-col";
            }
            BI.isOdd(row + 1) ? (cls += " odd-row") : (cls += " even-row");
            BI.isOdd(col + 1) ? (cls += " odd-col") : (cls += " even-col");
            item.cls = (item.cls || "") + cls + " center-element";
        }

        function first (item, row, col) {
            if (item instanceof BI.Widget) {
                firstElement(item.element, row, col);
            } else if (item.el instanceof BI.Widget) {
                firstElement(item.el.element, row, col);
            } else if (item.el) {
                firstObject(item.el, row, col);
            } else {
                firstObject(item, row, col);
            }
        }

        var tr = BI._lazyCreateWidget({
            type: "bi.default",
            tagName: "tr"
        });

        for (var i = 0; i < arr.length; i++) {
            var w = BI._lazyCreateWidget(arr[i]);
            w.element.css({position: "relative", top: "0", left: "0", margin: "0px auto"});
            var item = arr[i];
            if (o.vgap + o.tgap + (item.tgap || 0) + (item.vgap || 0) !== 0) {
                w.element.css({
                    "margin-top": (o.vgap + o.tgap + (item.tgap || 0) + (item.vgap || 0)) / BI.pixRatio + BI.pixUnit
                });
            }
            if (o.hgap + o.lgap + (item.lgap || 0) + (item.hgap || 0) !== 0) {
                w.element.css({
                    "margin-left": ((i === 0 ? o.hgap : 0) + o.lgap + (item.lgap || 0) + (item.hgap || 0)) / BI.pixRatio + BI.pixUnit
                });
            }
            if (o.hgap + o.rgap + (item.rgap || 0) + (item.hgap || 0) !== 0) {
                w.element.css({
                    "margin-right": (o.hgap + o.rgap + (item.rgap || 0) + (item.hgap || 0)) / BI.pixRatio + BI.pixUnit
                });
            }
            if (o.vgap + o.bgap + (item.bgap || 0) + (item.vgap || 0) !== 0) {
                w.element.css({
                    "margin-bottom": (o.vgap + o.bgap + (item.bgap || 0) + (item.vgap || 0)) / BI.pixRatio + BI.pixUnit
                });
            }
            first(w, this.rows++, i);
            var width = o.columnSize[i] === "" ? "" : (o.columnSize[i] < 1 ? ((o.columnSize[i] * 100).toFixed(1) + "%") : (i === 0 ? o.hgap : 0) + o.hgap + o.lgap + o.rgap + o.columnSize[i]);
            var td = BI._lazyCreateWidget({
                type: "bi.default",
                width: width,
                tagName: "td",
                items: [w]
            });
            // 对于表现为td的元素设置最大宽度，有几点需要注意
            // 1、由于直接对td设置最大宽度是在规范中未定义的, 所以要使用类似td:firstChild来迂回实现
            // 2、不能给多个td设置最大宽度，这样只会平分宽度
            // 3、多百分比宽度就算了
            td.element.css({
                "max-width": BI.isNumber(o.columnSize[i]) ? (o.columnSize[i] <= 1 ? width : width / BI.pixRatio + BI.pixUnit) : width,
                position: "relative",
                "vertical-align": o.verticalAlign,
                margin: "0",
                padding: "0",
                border: "none"
            });
            tr.addItem(td);
        }
        this.addWidget(this._getChildName(idx), tr);
        return tr;
    },

    appendFragment: function (frag) {
        this.$table.append(frag);
        this.element.append(this.$table);
    },

    resize: function () {
        // console.log("td布局不需要resize");
    },

    addItem: function (arr) {
        if (!BI.isArray(arr)) {
            throw new Error("item must be array");
        }
        return BI.TdLayout.superclass.addItem.apply(this, arguments);
    },

    update: function () {
    },

    populate: function (items) {
        BI.TdLayout.superclass.populate.apply(this, arguments);
        this._mount();
    }
});
BI.shortcut("bi.td", BI.TdLayout);
