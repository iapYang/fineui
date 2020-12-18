import { Combo, _Combo, _ComboStatic } from "./base/combination/combo";
import { _ButtonGroup, _ButtonGroupChooseType, _ButtonGroupStatic, ButtonGroup } from "./base/combination/group.button";
import { _Tab, _TabStatic, Tab } from "./base/combination/tab";
import { _Pane, _PaneStatic, Pane } from "./base/pane";
import { _BasicButton, _BasicButtonStatic, BasicButton } from "./base/single/button/button.basic";
import { _NodeButton, NodeButton } from "./base/single/button/button.node";
import { _Button, _ButtonStatic, Button } from "./base/single/button/buttons/button";
import { TextButton, _TextButton, _TextButtonStatic } from "./base/single/button/buttons/button.text";
import { IconTextItem, _IconTextItem, _IconTextItemStatic } from "./base/single/button/listitem/icontextitem";
import { _Editor, _EditorStatic, Editor } from "./base/single/editor/editor";
import { Iframe, _Iframe } from "./base/single/iframe/iframe";
import { _Checkbox, _CheckboxStatic } from "./base/single/input/checkbox";
import { Input, _Input, _InputStatic } from "./base/single/input/input";
import { _AbstractLabel, AbstractLabel } from "./base/single/label/abstract.label";
import { _Label, Label } from "./base/single/label/label";
import { _Single, Single } from "./base/single/single";
import { _Text, Text } from "./base/single/text";
import { _Trigger } from "./base/single/trigger/trigger";
import { IconChangeButton, _IconChangeButton, _IconChangeButtonStatic } from "./case/button/icon/icon.change";
import { _MultiSelectItem, _MultiSelectItemStatic, MultiSelectItem } from "./case/button/item.multiselect";
import { BubbleCombo, _BubbleCombo, _BubbleComboStatic } from "./case/combo/bubblecombo/combo.bubble";
import { _TextValueCombo, _TextValueComboStatic, TextValueCombo } from "./case/combo/combo.textvalue";
import { SearchTextValueCombo, _SearchTextValueCombo, _SearchTextValueComboStatic } from "./case/combo/searchtextvaluecombo/combo.searchtextvalue";
import { _SignEditor, _SignEditorStatic, SignEditor } from "./case/editor/editor.sign";
import { _LoadingPane } from "./case/loading/loading_pane";
import { AllValueMultiTextValueCombo, _AllValueMultiTextValueCombo, _AllValueMultiTextValueComboStatic } from "./component/allvaluemultitextvaluecombo/allvalue.multitextvalue.combo";
import { _AbstractTreeValueChooser, AbstractTreeValueChooser } from "./component/treevaluechooser/abstract.treevaluechooser";
import { _AbstractListTreeValueChooser, AbstractListTreeValueChooser } from "./component/treevaluechooser/abstract.treevaluechooser.list";
import { _Action, _ActionFactory } from "./core/action/action";
import { _ShowAction } from "./core/action/action.show";
import { _base } from "./core/base";
import { _Behavior, _BehaviorFactory } from "./core/behavior/behavior";
import { _HighlightBehavior } from "./core/behavior/behavior.highlight";
import { _RedMarkBehavior } from "./core/behavior/behavior.redmark";
import * as decorator from "./core/decorator/decorator";
import { _func } from "./core/func";
import { _i18n } from "./core/i18n";
import { _Plugin } from "./core/plugin";
import { _OB } from "./core/ob";
import { _Widget, _WidgetStatic, Widget } from "./core/widget";
import { _inject } from "./core/inject";
import { Layout, _Layout } from "./core/wrapper/layout";
import { AbsoluteLayout, _AbsoluteLayout } from "./core/wrapper/layout/layout.absolute";
import { HTapeLayout, VTapeLayout, _HTapeLayout, _VTapeLayout } from "./core/wrapper/layout/layout.tape";
import { VerticalLayout, _VerticalLayout } from "./core/wrapper/layout/layout.vertical";
import { DefaultLayout, _DefaultLayout } from "./core/wrapper/layout/layout.default";
import { DownListCombo, _DownListCombo, _DownListComboStatic } from "./widget/downlist/combo.downlist";
import { Icon } from "./base/single/icon/icon";
import { LeftVerticalAdaptLayout, _LeftVerticalAdapt } from "./core/wrapper/layout/adapt/adapt.leftvertical";
import { LeftRightVerticalAdaptLayout, RightVerticalAdaptLayout } from "./core/wrapper/layout/adapt/adapt.leftrightvertical";
import { IconTextIconItem } from "./base/single/button/listitem/icontexticonitem";
import { HorizontalAutoLayout } from "./core/wrapper/layout/adapt/auto.horizontal";
import { InlineVerticalAdaptLayout } from "./core/wrapper/layout/adapt/inline.vertical";
import { TableAdaptLayout } from "./core/wrapper/layout/adapt/adapt.table";
import { IconButton } from "./base/single/button/buttons/button.icon";
import { TextEditor } from "./widget/editor/editor.text";
import { IconLabel } from "./base/single/label/icon.label";
import { Popover, BarPopover } from "./base/layer/layer.popover";
import { IconCombo } from "./case/combo/iconcombo/combo.icon";
import { DynamicDateCombo } from "./widget/dynamicdate/dynamicdate.combo";
import { CustomTree } from "./base/tree/customtree";
import { ButtonTree } from "./base/combination/tree.button";
import { IconArrowNode } from "./case/button/node/node.icon.arrow";
import { MidTreeLeafItem } from "./case/button/treeitem/item.mid.treeleaf";
import { FirstTreeLeafItem } from "./case/button/treeitem/item.first.treeleaf";
import { LastTreeLeafItem } from "./case/button/treeitem/item.last.treeleaf";
import { SmallTextEditor } from "./widget/editor/editor.text.small";
import { MultifileEditor } from "./widget/editor/editor.multifile";
import { AbsoluteCenterLayout } from "./core/wrapper/layout/adapt/absolute.center";
import { HorizontalAdaptLayout } from "./core/wrapper/layout/adapt/adapt.horizontal";
import { FloatLeftLayout } from "./core/wrapper/layout/layout.flow";
import { CenterAdaptLayout } from "./core/wrapper/layout/adapt/adapt.center";
import { VerticalAdaptLayout } from "./core/wrapper/layout/adapt/adapt.vertical";
import { MultiSelectInsertCombo } from "./widget/multiselect/multiselect.insert.combo";
import { MultiSelectCombo } from "./widget/multiselect/multiselect.combo";
import { SearchEditor } from "./widget/editor/editor.search";
import { MultiLayerSingleLevelTree } from "./widget/multilayersingletree/multilayersingletree.leveltree";
import { SimpleColorChooser } from "./case/colorchooser/colorchooser.simple";
import { A } from "./base/a/a";
import { Html } from "./base/single/html/html";
import { Switcher } from "./base/combination/switcher";
import { Loader } from "./base/combination/loader";
import { ListPane } from "./case/layer/pane.list";
import { MultiSelectBar } from "./case/toolbar/toolbar.multiselect";
import { SelectList } from "./case/list/list.select";
import { AbstractAllValueChooser } from "./component/allvaluechooser/abstract.allvaluechooser";
import { AllValueChooserCombo } from "./component/allvaluechooser/combo.allvaluechooser";
import { TextAreaEditor } from "./base/single/editor/editor.textarea";
import { SingleSelectItem } from "./case/button/item.singleselect";
import { DynamicDateTimeCombo } from "./widget/dynamicdatetime/dynamicdatetime.combo";
import { MultiTreeCombo } from "./widget/multitree/multi.tree.combo";
import { CenterLayout } from "./core/wrapper/layout/middle/middle.center";
import { VirtualGroup } from "./base/combination/group.virtual";
import { GridLayout } from "./core/wrapper/layout/layout.grid";
import { TriggerIconButton } from "./case/button/icon/icon.trigger";
import { Searcher } from "./base/combination/searcher";
import { ListTreeValueChooserInsertCombo } from "./component/treevaluechooser/combo.listtreevaluechooser";
import { TreeValueChooserCombo } from "./component/treevaluechooser/combo.treevaluechooser";
import { TreeValueChooserInsertCombo } from "./component/treevaluechooser/combo.treevaluechooser.insert";
import { Radio } from "./base/single/input/radio/radio";
import { MultiLayerSelectTreePopup } from "./widget/multilayerselecttree/multilayerselecttree.popup";
import { MultiLayerSingleTreePopup } from "./widget/multilayersingletree/multilayersingletree.popup";
import { TreeView } from "./base/tree/ztree/treeview";
import { MultiTreePopup } from "./widget/multitree/multi.tree.popup";
import { SingleSelectRadioItem } from "./case/button/item.singleselect.radio";
import { SingleSelectInsertCombo } from "./widget/singleselect/singleselect.insert.combo";
import { SingleSelectCombo } from "./widget/singleselect/singleselect.combo";
import { CardLayout } from "./core/wrapper/layout/layout.card";
import { DynamicYearMonthCombo } from "./widget/yearmonth/combo.yearmonth";
import { TimeCombo } from "./widget/time/time.combo";
import { ListTreeView } from "./base/tree/ztree/list/listtreeview";
import { ListAsyncTree } from "./base/tree/ztree/list/listasynctree";
import { AsyncTree } from "./base/tree/ztree/asynctree";
import { MultiLayerSingleTreeCombo } from "./widget/multilayersingletree/multilayersingletree.combo";
import { MultiLayerSelectTreeCombo } from "./widget/multilayerselecttree/multilayerselecttree.combo";
import { MultiTreeListCombo } from "./widget/multitree/multi.tree.list.combo";
import { MultiTreeInsertCombo } from "./widget/multitree/multi.tree.insert.combo";


type ClassConstructor<T extends {}> = T & {
    new(config: any): T;
    (config: any): T;
    readonly prototype: T;
    readonly xtype: string;
}

export interface BI extends _func, _i18n, _base, _inject {
    OB: ClassConstructor<_OB>;
    Plugin: _Plugin;
    Widget: ClassConstructor<_Widget> & _WidgetStatic;
    Single: ClassConstructor<_Single>;
    BasicButton: ClassConstructor<_BasicButton> & _BasicButtonStatic;
    NodeButton: ClassConstructor<_NodeButton>;
    Checkbox: ClassConstructor<_Checkbox> & _CheckboxStatic;
    Button: ClassConstructor<_Button> & _ButtonStatic;
    TextButton: ClassConstructor<_TextButton> & _TextButtonStatic;
    IconChangeButton: ClassConstructor<_IconChangeButton> & _IconChangeButtonStatic;
    Trigger: ClassConstructor<_Trigger>;
    Action: ClassConstructor<_Action>;
    ActionFactory: ClassConstructor<_ActionFactory>;
    ShowAction: ClassConstructor<_ShowAction>;
    Behavior: ClassConstructor<_Behavior>;
    BehaviorFactory: ClassConstructor<_BehaviorFactory>;
    HighlightBehavior: ClassConstructor<_HighlightBehavior>;
    RedMarkBehavior: ClassConstructor<_RedMarkBehavior>;
    Pane: ClassConstructor<_Pane> & _PaneStatic;
    LoadingPane: ClassConstructor<_LoadingPane>;
    Tab: ClassConstructor<_Tab> & _TabStatic;
    ButtonGroup: ClassConstructor<_ButtonGroup> & _ButtonGroupChooseType & _ButtonGroupStatic;
    Combo: ClassConstructor<_Combo> & _ComboStatic;
    TextValueCombo: ClassConstructor<_TextValueCombo> & _TextValueComboStatic;
    BubbleCombo: ClassConstructor<_BubbleCombo> & _BubbleComboStatic;
    AllValueMultiTextValueCombo: ClassConstructor<_AllValueMultiTextValueCombo> & _AllValueMultiTextValueComboStatic;
    IconTextItem: ClassConstructor<_IconTextItem> & _IconTextItemStatic;
    MultiSelectItem: ClassConstructor<_MultiSelectItem> & _MultiSelectItemStatic;
    AbstractLabel: ClassConstructor<_AbstractLabel>;
    Label: ClassConstructor<_Label>;
    Text: ClassConstructor<_Text>;
    Editor: ClassConstructor<_Editor> & _EditorStatic;
    SignEditor: ClassConstructor<_SignEditor> & _SignEditorStatic;
    Layout: ClassConstructor<_Layout>;
    HTapeLayout: ClassConstructor<_HTapeLayout>;
    VTapeLayout: ClassConstructor<_VTapeLayout>;
    AbstractTreeValueChooser: ClassConstructor<_AbstractTreeValueChooser>;
    AbstractListTreeValueChooser: ClassConstructor<_AbstractListTreeValueChooser>;
    ListTreeValueChooserInsertCombo: typeof ListTreeValueChooserInsertCombo;
    TreeValueChooserCombo: typeof TreeValueChooserCombo;
    TreeValueChooserInsertCombo: typeof TreeValueChooserInsertCombo;
    MultiLayerSelectTreePopup: typeof MultiLayerSelectTreePopup;
    MultiLayerSingleTreePopup: typeof MultiLayerSingleTreePopup;
    TreeView: typeof TreeView;
    ListTreeView: typeof ListTreeView;
    ListAsyncTree: typeof ListAsyncTree;
    AsyncTree: typeof AsyncTree;
    MultiLayerSingleTreeCombo: typeof MultiLayerSingleTreeCombo;
    MultiLayerSelectTreeCombo: typeof MultiLayerSelectTreeCombo;
    MultiTreeListCombo: typeof MultiTreeListCombo;
    MultiTreeInsertCombo: typeof MultiTreeInsertCombo;
    Decorators: typeof decorator;
    DownListCombo: ClassConstructor<_DownListCombo> & _DownListComboStatic;
    Iframe: ClassConstructor<_Iframe>;
    AbsoluteLayout: ClassConstructor<_AbsoluteLayout>;
    VerticalLayout: ClassConstructor<_VerticalLayout>;
    DefaultLayout: ClassConstructor<_DefaultLayout>;
    Input: ClassConstructor<_Input> & _InputStatic;
    SearchTextValueCombo: ClassConstructor<_SearchTextValueCombo> & _SearchTextValueComboStatic;
    Icon: typeof Icon;
    LeftVerticalAdaptLayout: ClassConstructor<_LeftVerticalAdapt>;
    LeftRightVerticalAdaptLayout: typeof LeftRightVerticalAdaptLayout;
    IconTextIconItem: typeof IconTextIconItem;
    HorizontalAutoLayout: typeof HorizontalAutoLayout;
    InlineVerticalAdaptLayout: typeof InlineVerticalAdaptLayout;
    RightVerticalAdaptLayout: typeof RightVerticalAdaptLayout;
    TableAdaptLayout: typeof TableAdaptLayout;
    AbsoluteCenterLayout: typeof AbsoluteCenterLayout;
    HorizontalAdaptLayout: typeof HorizontalAdaptLayout;
    FloatLeftLayout: typeof FloatLeftLayout;
    CenterAdaptLayout: typeof CenterAdaptLayout;
    VerticalAdaptLayout: typeof VerticalAdaptLayout;
    IconButton: typeof IconButton;
    TriggerIconButton: typeof TriggerIconButton;
    Searcher: typeof Searcher;
    TextEditor: typeof TextEditor;
    Radio: typeof Radio;
    A: typeof A;
    Html: typeof Html;
    Switcher: typeof Switcher;
    Loader: typeof Loader;
    ListPane: typeof ListPane;
    MultiSelectBar: typeof MultiSelectBar;
    SelectList: typeof SelectList;
    IconLabel: typeof IconLabel;
    Popover: typeof Popover;
    BarPopover: typeof BarPopover;
    IconCombo: typeof IconCombo;
    DynamicDateCombo: typeof DynamicDateCombo;
    CustomTree: typeof CustomTree;
    ButtonTree: typeof ButtonTree;
    IconArrowNode: typeof IconArrowNode;
    MidTreeLeafItem: typeof MidTreeLeafItem;
    FirstTreeLeafItem: typeof FirstTreeLeafItem;
    LastTreeLeafItem: typeof LastTreeLeafItem;
    SmallTextEditor: typeof SmallTextEditor;
    MultifileEditor: typeof MultifileEditor;
    MultiSelectInsertCombo: typeof MultiSelectInsertCombo;
    MultiSelectCombo: typeof MultiSelectCombo;
    SearchEditor: typeof SearchEditor;
    MultiLayerSingleLevelTree: typeof MultiLayerSingleLevelTree;
    SimpleColorChooser: typeof SimpleColorChooser;
    AbstractAllValueChooser: typeof AbstractAllValueChooser;
    AllValueChooserCombo: typeof AllValueChooserCombo;
    TextAreaEditor: typeof TextAreaEditor;
    SingleSelectItem: typeof SingleSelectItem;
    DynamicDateTimeCombo: typeof DynamicDateTimeCombo;
    MultiTreeCombo: typeof MultiTreeCombo;
    CenterLayout: typeof CenterLayout;
    VirtualGroup: typeof VirtualGroup;
    GridLayout: typeof GridLayout;
    MultiTreePopup: typeof MultiTreePopup;
    SingleSelectRadioItem: typeof SingleSelectRadioItem;
    SingleSelectInsertCombo: typeof SingleSelectInsertCombo;
    SingleSelectCombo: typeof SingleSelectCombo;
    CardLayout: typeof CardLayout;
    DynamicYearMonthCombo: typeof DynamicYearMonthCombo;
    TimeCombo: typeof TimeCombo;
}

export default {
    Decorators: decorator,
};
export {
    Widget,
    Single,
    BasicButton,
    Icon,
    LeftVerticalAdaptLayout,
    LeftRightVerticalAdaptLayout,
    SearchTextValueCombo,
    Input,
    IconTextItem,
    AllValueMultiTextValueCombo,
    IconTextIconItem,
    Layout,
    HorizontalAutoLayout,
    InlineVerticalAdaptLayout,
    RightVerticalAdaptLayout,
    TableAdaptLayout,
    AbsoluteCenterLayout,
    HorizontalAdaptLayout,
    FloatLeftLayout,
    VerticalLayout,
    AbsoluteLayout,
    DefaultLayout,
    HTapeLayout,
    CenterAdaptLayout,
    VTapeLayout,
    VerticalAdaptLayout,
    IconButton,
    TriggerIconButton,
    Searcher,
    AbstractLabel,
    Label,
    TextButton,
    DownListCombo,
    IconChangeButton,
    Button,
    TextEditor,
    A,
    Html,
    Switcher,
    BubbleCombo,
    Loader,
    ListPane,
    MultiSelectBar,
    SelectList,
    TextValueCombo,
    Editor,
    IconLabel,
    Popover,
    BarPopover,
    Tab,
    AbstractTreeValueChooser,
    AbstractListTreeValueChooser,
    ListTreeValueChooserInsertCombo,
    TreeValueChooserCombo,
    TreeValueChooserInsertCombo,
    MultiLayerSelectTreePopup,
    MultiLayerSingleTreePopup,
    TreeView,
    ListTreeView,
    ListAsyncTree,
    AsyncTree,
    MultiLayerSingleTreeCombo,
    MultiLayerSelectTreeCombo,
    MultiTreeListCombo,
    MultiTreeInsertCombo,
    Combo,
    IconCombo,
    DynamicDateCombo,
    Radio,
    MultiSelectItem,
    CustomTree,
    ButtonGroup,
    ButtonTree,
    NodeButton,
    IconArrowNode,
    MidTreeLeafItem,
    FirstTreeLeafItem,
    LastTreeLeafItem,
    SmallTextEditor,
    MultifileEditor,
    SignEditor,
    MultiSelectInsertCombo,
    MultiSelectCombo,
    SearchEditor,
    Text,
    Pane,
    MultiLayerSingleLevelTree,
    SimpleColorChooser,
    AbstractAllValueChooser,
    AllValueChooserCombo,
    TextAreaEditor,
    SingleSelectItem,
    DynamicDateTimeCombo,
    MultiTreeCombo,
    CenterLayout,
    VirtualGroup,
    GridLayout,
    MultiTreePopup,
    SingleSelectRadioItem,
    SingleSelectInsertCombo,
    SingleSelectCombo,
    CardLayout,
    DynamicYearMonthCombo,
    TimeCombo,
    Iframe,
};
