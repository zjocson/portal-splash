/**
 * WDS Discovery Corporate Accordions
 * http://webdevstudios.com
 *
 * Licensed under the GPLv2+ license.
 */

/*jslint browser: true */
/*global jQuery */

window.WDS_Corporate_Accordions = window.WDS_Corporate_Accordions || (function(window, document, $, undefined) {

	var that = {},
		$c   = {};

	var init = function() {
		that.cache();
		that.initAccordions();
	};

	that.cache = function() {
		$c.window     = $(window);
		$c.body       = $(document.body);
		$c.accordions = $c.body.find('.wds-accordion');
		$c.tableAccordion= $c.body.find('.table-accordion');      
	};

	that.initAccordions = function() {
		$c.accordions.accordion({
			collapsible: true,
			heightStyle: 'content'
		});
		$c.tableAccordion.accordion({
			collapsible: true,
			heightStyle: 'content',
			active: false
		});
	};

	$(init);
})(window, document, jQuery);
