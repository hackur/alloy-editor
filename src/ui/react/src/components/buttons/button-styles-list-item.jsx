(function () {
    'use strict';

    /**
     * The ButtonStylesListItem class provides functionality for previewing a style definition
     * inside a list and applying it to the current editor selection.
     *
     * @class ButtonStylesListItem
     */
    var ButtonStylesListItem = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonActionStyle],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'buttonstyleslistitem'
        },

        /**
         * Lifecycle. Invoked once, both on the client and server, immediately before the initial rendering occurs.
         */
        componentWillMount: function () {
            // Styles with wildcard element (*) generate an empty tag in their preview < class="custom-class" />.
            // We default to element span and remove the margins to obtain a more consistent set of previews.
            var styleCfg = {
                element: 'span',
                styles: {
                    margin: 0
                }
            };

            styleCfg = CKEDITOR.tools.merge(styleCfg, this.props.style);

            this._preview = new CKEDITOR.style(styleCfg).buildPreview(this.props.name);
        },

        /**
         * Applies the item style to the editor selection.
         *
         * @protected
         * @method _applyStyle
         */
        _applyStyle: function() {
            // Typically, we want the style to be the only one applied to the current selection, so
            // we execute the 'removeFormat' command first. Note that block styles won't be cleaned.
            // However, this is consistent with other editors implementations of this feature.
            this.props.editor.get('nativeEditor').execCommand('removeFormat');

            this.handleClick();
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            // We need to use dangerouselySetInnterHTML since we're not in control of the style
            // preview that is generated by CKEditor
            return (
                <button className="alloy-editor-toolbar-element" dangerouslySetInnerHTML={{__html: this._preview}} onClick={this._applyStyle} tabIndex={this.props.tabIndex}></button>
            );
        }
    });

    global.AlloyEditor.ButtonStylesListItem = ButtonStylesListItem;
}());