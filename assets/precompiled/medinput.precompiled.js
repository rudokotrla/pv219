(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['medinput'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<li>\n    <label>Liek:\n        <input type=\"text\" name=\"medication\">\n    </label>\n    <button type=\"button\" class=\"removemed\">Odstranit</button>\n</li>";
},"useData":true});
})();