// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery3
//= require popper
//= require bootstrap
//= require jquery_ujs
//= require_tree .

// A method for declaring html programmatically
ch = function(tagName, attributes, children){
	var out = [],
		temp = '';
	if (!_.isString(tagName)){
		throw new Error('Cannot create tag without a string tagName');
	}
	temp = '<'+tagName;
	if (_.isString(attributes)){
		temp += ' ' + attributes;
	} else if (_.isObject(attributes)){
		_.each(attributes, function(val, key){
			temp += ' ' + key + '="' + val + '"';
		});
	}
	if (!children){
		temp += ' /';
	}
	temp += '>';
	out.push(temp);
	if(_.isString(children)){
		out.push(children);
	} else if (_.isArray(children)){
		out = out.concat(children);
	}
	if (children){
		out.push('</'+tagName+'>');
	}
	return out.join('');
};
