GENTICS.Aloha.ui.TextField = function(properties) {
	this.init(properties)
};
GENTICS.Aloha.ui.TextField.prototype = new GENTICS.Aloha.ui.Button();
GENTICS.Aloha.ui.TextField.prototype.getExtConfigProperties = function() {
	return {
		xtype: "textfield",
		width: this.width || undefined,
		id: this.id,
		validator: this.validator || undefined,
		placeholder: this.placeholder || undefined,
		listeners: {afterrender: function() {jQuery(this.el.dom).attr('placeholder', this.placeholder);}}
	}
};
GENTICS.Aloha.ui.TextField.prototype.getValue = function() {
	if (this.extButton) {
		return this.extButton.getValue()
	}
	return null
};
GENTICS.Aloha.ui.TextField.prototype.setValue = function(v) {
	if (this.extButton) {
		this.extButton.setValue(v)
	}
};
GENTICS.Aloha.ui.TextField.prototype.validate = function() {
	if (this.extButton) {
		return this.extButton.validate()
	}
	return null
};

/**
 * Like Button Plugin
 */
GENTICS.Aloha.LikeButton = new GENTICS.Aloha.Plugin('com.gentics.aloha.plugins.LikeButton');

/**
 * Configure the available languages
 */
GENTICS.Aloha.LikeButton.languages = ['en', 'ru'];

/**
 * Initialize the plugin
 */
GENTICS.Aloha.LikeButton.init = function () {

  var that = this;

  this.menuLikeButton = new GENTICS.Aloha.ui.Button({
    'icon' : GENTICS.Aloha.settings.base + '/plugins/com.gentics.aloha.plugins.LikeButton/images/like_button.png',
    'size' : "small",
    'onclick': function () {
      GENTICS.Aloha.FloatingMenu.userActivatedTab = that.i18n("floatingmenu.tab.like_button");
      GENTICS.Aloha.FloatingMenu.setScope(that.getUID("like_button"));
    }
  });

  GENTICS.Aloha.FloatingMenu.addButton(
    "GENTICS.Aloha.continuoustext",
    this.menuLikeButton,
    that.i18n("floatingmenu.tab.insert"), 1
  );

  GENTICS.Aloha.FloatingMenu.createScope(this.getUID("like_button"), "GENTICS.Aloha.continuoustext");
  this.urlField = new GENTICS.Aloha.ui.TextField({
    width: 320,
    placeholder: 'Insert your site URL here'
  });

  GENTICS.Aloha.FloatingMenu.addButton(this.getUID("like_button"), this.urlField, this.i18n("floatingmenu.tab.like_button"), 1);


  this.insertLikeButton = new GENTICS.Aloha.ui.Button({
    'icon' : GENTICS.Aloha.settings.base + '/plugins/com.gentics.aloha.plugins.LikeButton/images/like_button.png',
    'size' : "small",
    'onclick': function () {
      var url = that.urlField.getValue();

      if (url) {
        var range = GENTICS.Aloha.Selection.getRangeObject();
        var iframe = jQuery('<p style="text-align: center;"><iframe src="http://www.facebook.com/plugins/like.php?href=' + escape(url) + '&amp;layout=standard&amp;show_faces=false&amp;width=450&amp;action=like&amp;colorscheme=light&amp;height=35" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:450px; height:35px;" allowTransparency="true"></iframe></p>');
        GENTICS.Utils.Dom.insertIntoDOM(iframe, range, jQuery(GENTICS.Aloha.activeEditable.obj), true);

        that.urlField.setValue('');
      }
    }
  });

  GENTICS.Aloha.FloatingMenu.addButton(
    this.getUID("like_button"),
    this.insertLikeButton,
    that.i18n("floatingmenu.tab.like_button"), 1
  );
};

