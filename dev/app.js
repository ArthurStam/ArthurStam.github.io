import Backbone from 'backbone';
import $ from 'jquery';

import AppView from 'dev/views/app';

require('dev/styles/common.css')

var $appContainer = $('[data-role="app"]'),
	appView = new AppView()

$appContainer.append(appView.render().el);