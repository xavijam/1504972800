(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();
'use strict';

/**
 *
 *  ____ _ ___ _  _ _  _ ___     ___  ____ ____ ____ ____    ____ ___  ____
 *  | __ |  |  |__| |  | |__]    |__] |__| | __ |___ [__     [__  |__] |__|
 *  |__] |  |  |  | |__| |__]    |    |  | |__] |___ ___]    ___] |    |  |
 *
 *  Easy way to enable Single Page Applications for GitHub Pages
 *
 *  This project was released under MIT license.
 *
 *  @link      https://github.com/rafrex/spa-github-pages
 *  @author    Rafael Pedicini <code@rafrex.com>
 *  @link      http://websemantics.ca
 *  @author    Adnan M.Sagar, PhD. <adnan@websemantics.ca>
 *
 *  @param {Object} l, the document current location
 *  @param {Boolean} projectPages, true by default, https://help.github.com/articles/user-organization-and-project-pages
 *
 */

;(function (l, projectPages) {

  var repo = projectPages ? '/' + l.pathname.split('/')[1] : '';

  /* redirect all 404 trafic to index.html */
  function redirect() {
    l.replace(l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') + repo + '/?' + (l.pathname ? 'p=' + l.pathname.replace(/&/g, '~and~').replace(repo, '') : '') + (l.search ? '&q=' + l.search.slice(1).replace(/&/g, '~and~') : '') + l.hash);
  }

  /* resolve 404 redirects into internal routes */
  function resolve() {
    if (l.search) {
      var q = {};
      l.search.slice(1).split('&').forEach(function (v) {
        var a = v.split('=');
        q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
      });
      if (q.p !== undefined) {
        window.history.replaceState(null, null, repo + (q.p || '') + (q.q ? '?' + q.q : '') + l.hash);
      }
    }
  }

  /* if current document is 404 page page, redirect to index.html otherwise resolve */
  document.title === '404' ? redirect() : resolve();
})(window.location, window.projectPages || true);


//# sourceMappingURL=ghspa.js.map