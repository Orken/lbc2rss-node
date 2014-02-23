var express = require('express')
, jsdom     = require('jsdom')
, request   = require('request')
, app       = express()
, iconv     = require('iconv');;

app.get(/^\/json\/(.+)$/, function (req, res) {
	request({
		uri: req.url.replace('/json/',''),
		encoding:null
	}, function (err, response, body) {
		var self   = this;
		self.items = new Array();
		 
		if (err && response.statusCode !== 200) {
			console.log('Request error.');
		}
		 
		body = new iconv.Iconv('iso-8859-15', 'utf-8').convert(body);

		jsdom.env({
			html: body,
			scripts: ['http://code.jquery.com/jquery-1.6.min.js'],
			done : function (err, window) {
				var $    = window.jQuery,
				$body    = $('.list-lbc'),
				$annonce = $body.find('a');

				$annonce.each(function (i, item) {
					var $item = $(item);

					var $a   	   = $item.attr('href'),
						$title     = $item.attr('title'),
						$price     = $item.find('.price').text(),
						$placement = $item.find('.placement').text(),
						$img       = $item.find('img'); 

					self.items[i]  = {
						href: $a.trim(),
						title: $title.trim(),
						price: $price.trim(),
						thumbnail: ($img.attr('src'))?($img.attr('src')):'',
						image: ($img.attr('src'))?($img.attr('src')).replace('/thumbs/','/images/'):'',
						placement: $placement.replace(/\s{2,}/gi,' ').trim()
					};
				});

				res.end(JSON.stringify(self.items));
			}
		});
	});
});

app.listen(8000);
