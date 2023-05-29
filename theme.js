 /*! Lightcase v2.0.3 | Copyright 2015 Cornel Boppart <cornel@bopp-art.com> */

!function(e){window.lightcase={cache:{},support:{},labels:{errorMessage:"Source could not be found...","sequenceInfo.of":" of ",close:"Close","navigator.prev":"Prev","navigator.next":"Next","navigator.play":"Play","navigator.pause":"Pause"},init:function(t){return this.each(function(){e(this).unbind("click").click(function(i){i.preventDefault(),e(this).lightcase("start",t)})})},start:function(t){lightcase.settings=e.extend(!0,{idPrefix:"lightcase-",classPrefix:"lightcase-",transition:"elastic",transitionIn:null,transitionOut:null,cssTransitions:!0,speedIn:170,speedOut:170,maxWidth:1200,maxHeight:700,forceWidth:!1,forceHeight:!1,liveResize:!0,fullScreenModeForMobile:!0,mobileMatchExpression:/(iphone|ipod|ipad|android|blackberry|symbian)/,disableShrink:!1,shrinkFactor:.75,overlayOpacity:.9,slideshow:!1,timeout:5e3,swipe:!0,useKeys:!0,navigateEndless:!0,closeOnOverlayClick:!0,title:null,caption:null,showTitle:!0,showCaption:!0,showSequenceInfo:!0,inline:{width:"auto",height:"auto"},ajax:{width:"auto",height:"auto",type:"get",dataType:"html",data:{}},iframe:{width:800,height:500,frameborder:0},flash:{width:400,height:205,wmode:"transparent"},video:{width:400,height:225,poster:"",preload:"auto",controls:!0,autobuffer:!0,autoplay:!0,loop:!1},href:null,type:null,typeMapping:{image:"jpg,jpeg,gif,png,bmp",flash:"swf",video:"mp4,mov,ogv,ogg,webm",iframe:"html,php",ajax:"json,txt",inline:"#"},errorMessage:function(){return'<p class="'+lightcase.settings.classPrefix+'error">'+lightcase.labels.errorMessage+"</p>"},markup:function(){e("body").append($overlay=e('<div id="'+lightcase.settings.idPrefix+'overlay"></div>'),$loading=e('<div id="'+lightcase.settings.idPrefix+'loading" class="'+lightcase.settings.classPrefix+'icon-spin"></div>'),$case=e('<div id="'+lightcase.settings.idPrefix+'case" aria-hidden="true" role="dialog"></div>')),$case.after($nav=e('<div id="'+lightcase.settings.idPrefix+'nav"></div>')),$nav.append($close=e('<a href="#" class="'+lightcase.settings.classPrefix+'icon-close"><span>'+lightcase.labels.close+"</span></a>"),$prev=e('<a href="#" class="'+lightcase.settings.classPrefix+'icon-prev"><span>'+lightcase.labels["navigator.prev"]+"</span></a>").hide(),$next=e('<a href="#" class="'+lightcase.settings.classPrefix+'icon-next"><span>'+lightcase.labels["navigator.next"]+"</span></a>").hide(),$play=e('<a href="#" class="'+lightcase.settings.classPrefix+'icon-play"><span>'+lightcase.labels["navigator.play"]+"</span></a>").hide(),$pause=e('<a href="#" class="'+lightcase.settings.classPrefix+'icon-pause"><span>'+lightcase.labels["navigator.pause"]+"</span></a>").hide()),$case.append($content=e('<div class="'+lightcase.settings.classPrefix+'content"></div>'),$info=e('<div class="'+lightcase.settings.classPrefix+'info"></div>')),$content.append($contentInner=e('<div class="'+lightcase.settings.classPrefix+'contentInner"></div>')),$info.append($sequenceInfo=e('<div class="'+lightcase.settings.classPrefix+'sequenceInfo"></div>'),$title=e('<h4 class="'+lightcase.settings.classPrefix+'title"></h4>'),$caption=e('<p class="'+lightcase.settings.classPrefix+'caption"></p>'))},onInit:{},onStart:{},onFinish:{}},t),lightcase.callHooks(lightcase.settings.onInit),lightcase.objectData=lightcase.getObjectData(this),lightcase.addElements(),lightcase.lightcaseOpen(),lightcase.dimensions=lightcase.getDimensions()},getObjectData:function(t){var i={$link:t,title:lightcase.settings.title||t.attr("title"),caption:lightcase.settings.caption||t.children("img").attr("alt"),url:lightcase.verifyDataUrl(lightcase.settings.href||t.attr("data-href")||t.attr("href")),requestType:lightcase.settings.ajax.type,requestData:lightcase.settings.ajax.data,requestDataType:lightcase.settings.ajax.dataType,rel:t.attr("data-rel"),type:lightcase.settings.type||lightcase.verifyDataType(t.attr("data-href")||t.attr("href")),isPartOfSequence:lightcase.isPartOfSequence(t.attr("data-rel"),":"),isPartOfSequenceWithSlideshow:lightcase.isPartOfSequence(t.attr("data-rel"),":slideshow"),currentIndex:e('[data-rel="'+t.attr("data-rel")+'"]').index(t),sequenceLength:e('[data-rel="'+t.attr("data-rel")+'"]').length};return i.sequenceInfo=i.currentIndex+1+lightcase.labels["sequenceInfo.of"]+i.sequenceLength,i},isPartOfSequence:function(t,i){var s=e('[data-rel="'+t+'"]'),a=new RegExp(i);return a.test(t)&&s.length>1?!0:!1},isSlideshowEnabled:function(){return!lightcase.objectData.isPartOfSequence||lightcase.settings.slideshow!==!0&&lightcase.objectData.isPartOfSequenceWithSlideshow!==!0?!1:!0},loadContent:function(){lightcase.cache.originalObject&&lightcase.restoreObject(),lightcase.createObject()},createObject:function(){var t;switch(lightcase.objectData.type){case"image":t=e(new Image),t.attr({src:lightcase.objectData.url,alt:lightcase.objectData.title});break;case"inline":t=e('<div class="'+lightcase.settings.classPrefix+'inlineWrap"></div>'),t.html(lightcase.cloneObject(e(lightcase.objectData.url))),e.each(lightcase.settings.inline,function(e,i){t.attr("data-"+e,i)});break;case"ajax":t=e('<div class="'+lightcase.settings.classPrefix+'inlineWrap"></div>'),e.each(lightcase.settings.ajax,function(e,i){"data"!==e&&t.attr("data-"+e,i)});break;case"flash":t=e('<embed src="'+lightcase.objectData.url+'" type="application/x-shockwave-flash"></embed>'),e.each(lightcase.settings.flash,function(e,i){t.attr(e,i)});break;case"video":t=e("<video></video>"),t.attr("src",lightcase.objectData.url),e.each(lightcase.settings.video,function(e,i){t.attr(e,i)});break;default:t=e("<iframe></iframe>"),t.attr({src:lightcase.objectData.url}),e.each(lightcase.settings.iframe,function(e,i){t.attr(e,i)})}lightcase.addObject(t),lightcase.loadObject(t)},addObject:function(e){$contentInner.html(e),lightcase.loading("start"),lightcase.callHooks(lightcase.settings.onStart),lightcase.settings.showSequenceInfo===!0&&lightcase.objectData.isPartOfSequence?($sequenceInfo.html(lightcase.objectData.sequenceInfo),$sequenceInfo.show()):($sequenceInfo.empty(),$sequenceInfo.hide()),lightcase.settings.showTitle===!0&&void 0!==lightcase.objectData.title&&""!==lightcase.objectData.title?($title.html(lightcase.objectData.title),$title.show()):($title.empty(),$title.hide()),lightcase.settings.showCaption===!0&&void 0!==lightcase.objectData.caption&&""!==lightcase.objectData.caption?($caption.html(lightcase.objectData.caption),$caption.show()):($caption.empty(),$caption.hide())},loadObject:function(t){switch(lightcase.objectData.type){case"inline":e(lightcase.objectData.url)?lightcase.showContent(t):lightcase.error();break;case"ajax":e.ajax(e.extend({},lightcase.settings.ajax,{url:lightcase.objectData.url,type:lightcase.objectData.requestType,dataType:lightcase.objectData.requestDataType,data:lightcase.objectData.requestData,success:function(e){"json"===lightcase.objectData.requestDataType?lightcase.objectData.data=e:t.html(e),lightcase.showContent(t)},error:function(){lightcase.error()}}));break;case"flash":lightcase.showContent(t);break;case"video":"function"==typeof t.get(0).canPlayType||0===$case.find("video").length?lightcase.showContent(t):lightcase.error();break;default:lightcase.objectData.url?(t.load(function(){lightcase.showContent(t)}),t.error(function(){lightcase.error()})):lightcase.error()}},error:function(){lightcase.objectData.type="error";var t=e('<div class="'+lightcase.settings.classPrefix+'inlineWrap"></div>');t.html(lightcase.settings.errorMessage),$contentInner.html(t),lightcase.showContent($contentInner)},calculateDimensions:function(e){lightcase.cleanupDimensions();var t={objectWidth:e.attr(e.attr("width")?"width":"data-width"),objectHeight:e.attr(e.attr("height")?"height":"data-height"),maxWidth:parseInt(lightcase.dimensions.windowWidth*lightcase.settings.shrinkFactor),maxHeight:parseInt(lightcase.dimensions.windowHeight*lightcase.settings.shrinkFactor)};if(!lightcase.settings.disableShrink)switch(t.maxWidth>lightcase.settings.maxWidth&&(t.maxWidth=lightcase.settings.maxWidth),t.maxHeight>lightcase.settings.maxHeight&&(t.maxHeight=lightcase.settings.maxHeight),t.differenceWidthAsPercent=parseInt(100/t.maxWidth*t.objectWidth),t.differenceHeightAsPercent=parseInt(100/t.maxHeight*t.objectHeight),lightcase.objectData.type){case"image":case"flash":case"video":t.differenceWidthAsPercent>100&&t.differenceWidthAsPercent>t.differenceHeightAsPercent&&(t.objectWidth=t.maxWidth,t.objectHeight=parseInt(t.objectHeight/t.differenceWidthAsPercent*100)),t.differenceHeightAsPercent>100&&t.differenceHeightAsPercent>t.differenceWidthAsPercent&&(t.objectWidth=parseInt(t.objectWidth/t.differenceHeightAsPercent*100),t.objectHeight=t.maxHeight),t.differenceHeightAsPercent>100&&t.differenceWidthAsPercent<t.differenceHeightAsPercent&&(t.objectWidth=parseInt(t.maxWidth/t.differenceHeightAsPercent*t.differenceWidthAsPercent),t.objectHeight=t.maxHeight);break;case"error":!isNaN(t.objectWidth)&&t.objectWidth>t.maxWidth&&(t.objectWidth=t.maxWidth);break;default:(isNaN(t.objectWidth)||t.objectWidth>t.maxWidth)&&!lightcase.settings.forceWidth&&(t.objectWidth=t.maxWidth),(isNaN(t.objectHeight)&&"auto"!==t.objectHeight||t.objectHeight>t.maxHeight)&&!lightcase.settings.forceHeight&&(t.objectHeight=t.maxHeight)}lightcase.adjustDimensions(e,t)},adjustDimensions:function(e,t){e.css({width:t.objectWidth,height:t.objectHeight,"max-width":e.attr("data-max-width")?e.attr("data-max-width"):t.maxWidth,"max-height":e.attr("data-max-height")?e.attr("data-max-height"):t.maxHeight}),$contentInner.css({width:e.outerWidth(),height:e.outerHeight(),"max-width":"100%"}),$case.css({width:$contentInner.outerWidth()}),$case.css({"margin-top":parseInt(-($case.outerHeight()/2)),"margin-left":parseInt(-($case.outerWidth()/2))})},loading:function(e){"start"===e?($case.addClass(lightcase.settings.classPrefix+"loading"),$loading.show()):"end"===e&&($case.removeClass(lightcase.settings.classPrefix+"loading"),$loading.hide())},getDimensions:function(){return{windowWidth:e(window).innerWidth(),windowHeight:e(window).innerHeight()}},verifyDataUrl:function(e){return e&&void 0!==e&&""!==e?(e.indexOf("#")>-1&&(e=e.split("#"),e="#"+e[e.length-1]),e.toString()):!1},verifyDataType:function(e){var e=lightcase.verifyDataUrl(e),t=lightcase.settings.typeMapping;if(e)for(var i in t)for(var s=t[i].split(","),a=0;a<s.length;a++){var n=s[a],c=new RegExp(".("+n+")$","i"),l=e.split("?")[0].substr(-5);if(c.test(l)===!0)return i;if("inline"===i&&(e.indexOf(n)>-1||!e))return i}return"iframe"},addElements:function(){e('[id^="'+lightcase.settings.idPrefix+'"]').length||lightcase.settings.markup()},showContent:function(e){switch($case.attr("data-type",lightcase.objectData.type),lightcase.cache.object=e,lightcase.calculateDimensions(e),lightcase.callHooks(lightcase.settings.onFinish),lightcase.settings.transitionIn){case"scrollTop":case"scrollRight":case"scrollBottom":case"scrollLeft":case"scrollHorizontal":case"scrollVertical":lightcase.transition.scroll($case,"in",lightcase.settings.speedIn),lightcase.transition.fade($contentInner,"in",lightcase.settings.speedIn);break;case"elastic":$case.css("opacity")<1&&(lightcase.transition.zoom($case,"in",lightcase.settings.speedIn),lightcase.transition.fade($contentInner,"in",lightcase.settings.speedIn));case"fade":case"fadeInline":lightcase.transition.fade($case,"in",lightcase.settings.speedIn),lightcase.transition.fade($contentInner,"in",lightcase.settings.speedIn);break;default:lightcase.transition.fade($case,"in",0)}lightcase.loading("end"),lightcase.busy=!1},processContent:function(){switch(lightcase.busy=!0,lightcase.settings.transitionOut){case"scrollTop":case"scrollRight":case"scrollBottom":case"scrollLeft":case"scrollVertical":case"scrollHorizontal":$case.is(":hidden")?(lightcase.transition.fade($case,"out",0,0,function(){lightcase.loadContent()}),lightcase.transition.fade($contentInner,"out",0)):lightcase.transition.scroll($case,"out",lightcase.settings.speedOut,function(){lightcase.loadContent()});break;case"fade":$case.is(":hidden")?lightcase.transition.fade($case,"out",0,0,function(){lightcase.loadContent()}):lightcase.transition.fade($case,"out",lightcase.settings.speedOut,0,function(){lightcase.loadContent()});break;case"fadeInline":case"elastic":$case.is(":hidden")?lightcase.transition.fade($case,"out",0,0,function(){lightcase.loadContent()}):lightcase.transition.fade($contentInner,"out",lightcase.settings.speedOut,0,function(){lightcase.loadContent()});break;default:lightcase.transition.fade($case,"out",0,0,function(){lightcase.loadContent()})}},handleEvents:function(){lightcase.unbindEvents(),$nav.children().not($close).hide(),lightcase.isSlideshowEnabled()&&($nav.hasClass(lightcase.settings.classPrefix+"paused")?lightcase.stopTimeout():lightcase.startTimeout()),lightcase.settings.liveResize&&e(window).resize(lightcase.resize),$close.click(function(e){e.preventDefault(),lightcase.lightcaseClose()}),lightcase.settings.closeOnOverlayClick===!0&&$overlay.css("cursor","pointer").click(function(e){e.preventDefault(),lightcase.lightcaseClose()}),lightcase.settings.useKeys===!0&&lightcase.addKeyEvents(),lightcase.objectData.isPartOfSequence&&($nav.attr("data-ispartofsequence",!0),lightcase.nav=lightcase.setNavigation(),$prev.click(function(e){e.preventDefault(),$prev.unbind("click"),lightcase.cache.action="prev",lightcase.nav.$prevItem.click(),lightcase.isSlideshowEnabled()&&lightcase.stopTimeout()}),$next.click(function(e){e.preventDefault(),$next.unbind("click"),lightcase.cache.action="next",lightcase.nav.$nextItem.click(),lightcase.isSlideshowEnabled()&&lightcase.stopTimeout()}),lightcase.isSlideshowEnabled()&&($play.click(function(e){e.preventDefault(),lightcase.startTimeout()}),$pause.click(function(e){e.preventDefault(),lightcase.stopTimeout()})),lightcase.settings.swipe===!0&&(e.isPlainObject(e.event.special.swipeleft)&&$case.on("swipeleft",function(e){e.preventDefault(),$next.click(),lightcase.isSlideshowEnabled()&&lightcase.stopTimeout()}),e.isPlainObject(e.event.special.swiperight)&&$case.on("swiperight",function(e){e.preventDefault(),$prev.click(),lightcase.isSlideshowEnabled()&&lightcase.stopTimeout()})))},addKeyEvents:function(){e(document).keyup(function(e){if(!lightcase.busy)switch(e.keyCode){case 27:$close.click();break;case 37:lightcase.objectData.isPartOfSequence&&$prev.click();break;case 39:lightcase.objectData.isPartOfSequence&&$next.click()}})},startTimeout:function(){$play.hide(),$pause.show(),lightcase.cache.action="next",$nav.removeClass(lightcase.settings.classPrefix+"paused"),lightcase.timeout=setTimeout(function(){lightcase.nav.$nextItem.click()},lightcase.settings.timeout)},stopTimeout:function(){$play.show(),$pause.hide(),$nav.addClass(lightcase.settings.classPrefix+"paused"),clearTimeout(lightcase.timeout)},setNavigation:function(){var t=e('[data-rel="'+lightcase.objectData.rel+'"]'),i=lightcase.objectData.currentIndex,s=i-1,a=i+1,n=lightcase.objectData.sequenceLength-1,c={$prevItem:t.eq(s),$nextItem:t.eq(a)};return i>0?$prev.show():c.$prevItem=t.eq(n),n>=a?$next.show():c.$nextItem=t.eq(0),lightcase.settings.navigateEndless===!0&&($prev.show(),$next.show()),c},cloneObject:function(e){var t=e.clone(),i=e.attr("id");return e.is(":hidden")?(lightcase.cacheObjectData(e),e.attr("id",lightcase.settings.idPrefix+"temp-"+i).empty()):t.removeAttr("id"),t.show()},isMobileDevice:function(){var e=navigator.userAgent.toLowerCase(),t=e.match(lightcase.settings.mobileMatchExpression);return t?!0:!1},isTransitionSupported:function(){var t=e("body").get(0),i=!1,s={transition:"",WebkitTransition:"-webkit-",MozTransition:"-moz-",OTransition:"-o-",MsTransition:"-ms-"};for(var a in s)s.hasOwnProperty(a)&&a in t.style&&(lightcase.support.transition=s[a],i=!0);return i},transition:{fade:function(e,t,i,s,a){var n="in"===t,c={},l=e.css("opacity"),o={},r=s?s:n?1:0;(lightcase.open||!n)&&(c.opacity=l,o.opacity=r,e.css(c).show(),lightcase.support.transitions?(o[lightcase.support.transition+"transition"]=i+"ms ease",setTimeout(function(){e.css(o),setTimeout(function(){e.css(lightcase.support.transition+"transition",""),!a||!lightcase.open&&n||a()},i)},15)):(e.stop(),e.animate(o,i,a)))},scroll:function(e,t,i,s){var a="in"===t,n=a?lightcase.settings.transitionIn:lightcase.settings.transitionOut,c="left",l={},o=a?0:1,r=a?"-50%":"50%",h={},g=a?1:0,d=a?"50%":"-50%";if(lightcase.open||!a){switch(n){case"scrollTop":c="top";break;case"scrollRight":r=a?"150%":"50%",d=a?"50%":"150%";break;case"scrollBottom":c="top",r=a?"150%":"50%",d=a?"50%":"150%";break;case"scrollHorizontal":r=a?"150%":"50%",d=a?"50%":"-50%";break;case"scrollVertical":c="top",r=a?"-50%":"50%",d=a?"50%":"150%"}if("prev"===lightcase.cache.action)switch(n){case"scrollHorizontal":r=a?"-50%":"50%",d=a?"50%":"150%";break;case"scrollVertical":r=a?"150%":"50%",d=a?"50%":"-50%"}l.opacity=o,l[c]=r,h.opacity=g,h[c]=d,e.css(l).show(),lightcase.support.transitions?(h[lightcase.support.transition+"transition"]=i+"ms ease",setTimeout(function(){e.css(h),setTimeout(function(){e.css(lightcase.support.transition+"transition",""),!s||!lightcase.open&&a||s()},i)},15)):(e.stop(),e.animate(h,i,s))}},zoom:function(e,t,i,s){var a="in"===t,n={},c=e.css("opacity"),l=a?"scale(0.75)":"scale(1)",o={},r=a?1:0,h=a?"scale(1)":"scale(0.75)";(lightcase.open||!a)&&(n.opacity=c,n[lightcase.support.transition+"transform"]=l,o.opacity=r,e.css(n).show(),lightcase.support.transitions?(o[lightcase.support.transition+"transform"]=h,o[lightcase.support.transition+"transition"]=i+"ms ease",setTimeout(function(){e.css(o),setTimeout(function(){e.css(lightcase.support.transition+"transform",""),e.css(lightcase.support.transition+"transition",""),!s||!lightcase.open&&a||s()},i)},15)):(e.stop(),e.animate(o,i,s)))}},callHooks:function(t){"object"==typeof t&&e.each(t,function(e,t){"function"==typeof t&&t()})},cacheObjectData:function(t){e.data(t,"cache",{id:t.attr("id"),content:t.html()}),lightcase.cache.originalObject=t},restoreObject:function(){var t=e('[id^="'+lightcase.settings.idPrefix+'temp-"]');t.attr("id",e.data(lightcase.cache.originalObject,"cache").id),t.html(e.data(lightcase.cache.originalObject,"cache").content)},resize:function(){lightcase.open&&(lightcase.isSlideshowEnabled()&&lightcase.stopTimeout(),lightcase.dimensions=lightcase.getDimensions(),lightcase.calculateDimensions(lightcase.cache.object))},switchToFullScreenMode:function(){lightcase.settings.shrinkFactor=1,lightcase.settings.overlayOpacity=1,e("html").addClass(lightcase.settings.classPrefix+"fullScreenMode")},lightcaseOpen:function(){switch(lightcase.open=!0,lightcase.support.transitions=lightcase.settings.cssTransitions?lightcase.isTransitionSupported():!1,lightcase.support.mobileDevice=lightcase.isMobileDevice(),lightcase.support.mobileDevice&&(e("html").addClass(lightcase.settings.classPrefix+"isMobileDevice"),lightcase.settings.fullScreenModeForMobile&&lightcase.switchToFullScreenMode()),lightcase.settings.transitionIn||(lightcase.settings.transitionIn=lightcase.settings.transition),lightcase.settings.transitionOut||(lightcase.settings.transitionOut=lightcase.settings.transition),lightcase.settings.transitionIn){case"fade":case"fadeInline":case"elastic":case"scrollTop":case"scrollRight":case"scrollBottom":case"scrollLeft":case"scrollVertical":case"scrollHorizontal":$case.is(":hidden")&&($close.css("opacity",0),$overlay.css("opacity",0),$case.css("opacity",0),$contentInner.css("opacity",0)),lightcase.transition.fade($overlay,"in",lightcase.settings.speedIn,lightcase.settings.overlayOpacity,function(){lightcase.transition.fade($close,"in",lightcase.settings.speedIn),lightcase.handleEvents(),lightcase.processContent()});break;default:lightcase.transition.fade($overlay,"in",0,lightcase.settings.overlayOpacity,function(){lightcase.transition.fade($close,"in",0),lightcase.handleEvents(),lightcase.processContent()})}e("html").addClass(lightcase.settings.classPrefix+"open"),$case.attr("aria-hidden","false")},lightcaseClose:function(){switch(lightcase.open=!1,$loading.hide(),lightcase.unbindEvents(),e(window).off("resize",lightcase.resize),e("html").removeClass(lightcase.settings.classPrefix+"open"),$case.attr("aria-hidden","true"),$nav.children().hide(),lightcase.settings.transitionOut){case"fade":case"fadeInline":case"scrollTop":case"scrollRight":case"scrollBottom":case"scrollLeft":case"scrollHorizontal":case"scrollVertical":lightcase.transition.fade($case,"out",lightcase.settings.speedOut,0,function(){lightcase.transition.fade($overlay,"out",lightcase.settings.speedOut,0,function(){lightcase.cleanup()})});break;case"elastic":lightcase.transition.zoom($case,"out",lightcase.settings.speedOut,function(){lightcase.transition.fade($overlay,"out",lightcase.settings.speedOut,0,function(){lightcase.cleanup()})});break;default:lightcase.cleanup()}},unbindEvents:function(){$overlay.unbind("click"),e(document).unbind("keyup"),$case.unbind("swipeleft").unbind("swiperight"),$nav.children("a").unbind("click"),$close.unbind("click")},cleanupDimensions:function(){var e=$contentInner.css("opacity");$case.css({width:"",height:"",top:"",left:"","margin-top":"","margin-left":""}),$contentInner.removeAttr("style").css("opacity",e),$contentInner.children().removeAttr("style")},cleanup:function(){lightcase.cleanupDimensions(),lightcase.isSlideshowEnabled()&&(lightcase.stopTimeout(),$nav.removeClass(lightcase.settings.classPrefix+"paused")),$loading.hide(),$overlay.hide(),$case.hide(),$nav.children().hide(),$case.removeAttr("data-type"),$nav.removeAttr("data-ispartofsequence"),$contentInner.empty().hide(),$info.children().empty(),lightcase.cache.originalObject&&lightcase.restoreObject(),lightcase.cache={}}},e.fn.lightcase=function(t){return lightcase[t]?lightcase[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist on jQuery.lightcase"):lightcase.init.apply(this,arguments)}}(jQuery);
/*!
* jquery.counterup.js 1.0
*
* Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
* Released under the GPL v2 License
*
* Date: Nov 26, 2013
*/(function(e)
	{
	"use strict";
	e.fn.counterUp=function(t)
		{
		var n=e.extend(
			{
			time:400,delay:10
		}
		,t);
		return this.each(function()
			{
			var t=e(this),r=n,i=function()
				{
				var e=[],n=r.time/r.delay,i=t.text(),s=/[0-9]+,[0-9]+/.test(i);
				i=i.replace(/,/g,"");
				var o=/^[0-9]+$/.test(i),u=/^[0-9]+\.[0-9]+$/.test(i),a=u?(i.split(".")[1]||[]).length:0;
				for(var f=n;
				f>=1;
				f--)
					{
					var l=parseInt(i/n*f);
					u&&(l=parseFloat(i/n*f).toFixed(a));
					if(s)while(/(\d+)(\d
						{
						3
					}
					)/.test(l.toString()))l=l.toString().replace(/(\d+)(\d
						{
						3
					}
					)/,"$1,$2");
					e.unshift(l)
				}
				t.data("counterup-nums",e);
				t.text("0");
				var c=function()
					{
					t.text(t.data("counterup-nums").shift());
					if(t.data("counterup-nums").length)setTimeout(t.data("counterup-func"),r.delay);
					else
						{
						delete t.data("counterup-nums");
						t.data("counterup-nums",null);
						t.data("counterup-func",null)
					}
				};
				t.data("counterup-func",c);
				setTimeout(t.data("counterup-func"),r.delay)
			};
			t.waypoint(i,
				{
				offset:"100%",triggerOnce:!0
			}
			)
		}
		)
	}
}
)(jQuery);


if(typeof Object.create!=="function")
	{
	Object.create=function(e)
		{
		function t()
			{
		}
		t.prototype=e;
		return new t
	}
}
(function(e,t,n)
	{
	var r=
		{
		init:function(t,n)
			{
			var r=this;
			r.$elem=e(n);
			r.options=e.extend(
				{
			}
			,e.fn.owlCarousel.options,r.$elem.data(),t);
			r.userOptions=t;
			r.loadContent()
		}
		,loadContent:function()
			{
			function r(e)
				{
				var n,r="";
				if(typeof t.options.jsonSuccess==="function")
					{
					t.options.jsonSuccess.apply(this,[e])
				}
				else
					{
					for(n in e.owl)
						{
						if(e.owl.hasOwnProperty(n))
							{
							r+=e.owl[n].item
						}
					}
					t.$elem.html(r)
				}
				t.logIn()
			}
			var t=this,n;
			if(typeof t.options.beforeInit==="function")
				{
				t.options.beforeInit.apply(this,[t.$elem])
			}
			if(typeof t.options.jsonPath==="string")
				{
				n=t.options.jsonPath;
				e.getJSON(n,r)
			}
			else
				{
				t.logIn()
			}
		}
		,logIn:function()
			{
			var e=this;
			e.$elem.data("owl-originalStyles",e.$elem.attr("style")).data("owl-originalClasses",e.$elem.attr("class"));
			e.$elem.css(
				{
				opacity:0
			}
			);
			e.orignalItems=e.options.items;
			e.checkBrowser();
			e.wrapperWidth=0;
			e.checkVisible=null;
			e.setVars()
		}
		,setVars:function()
			{
			var e=this;
			if(e.$elem.children().length===0)
				{
				return false
			}
			e.baseClass();
			e.eventTypes();
			e.$userItems=e.$elem.children();
			e.itemsAmount=e.$userItems.length;
			e.wrapItems();
			e.$owlItems=e.$elem.find(".owl-item");
			e.$owlWrapper=e.$elem.find(".owl-wrapper");
			e.playDirection="next";
			e.prevItem=0;
			e.prevArr=[0];
			e.currentItem=0;
			e.customEvents();
			e.onStartup()
		}
		,onStartup:function()
			{
			var e=this;
			e.updateItems();
			e.calculateAll();
			e.buildControls();
			e.updateControls();
			e.response();
			e.moveEvents();
			e.stopOnHover();
			e.owlStatus();
			if(e.options.transitionStyle!==false)
				{
				e.transitionTypes(e.options.transitionStyle)
			}
			if(e.options.autoPlay===true)
				{
				e.options.autoPlay=5e3
			}
			e.play();
			e.$elem.find(".owl-wrapper").css("display","block");
			if(!e.$elem.is(":visible"))
				{
				e.watchVisibility()
			}
			else
				{
				e.$elem.css("opacity",1)
			}
			e.onstartup=false;
			e.eachMoveUpdate();
			if(typeof e.options.afterInit==="function")
				{
				e.options.afterInit.apply(this,[e.$elem])
			}
		}
		,eachMoveUpdate:function()
			{
			var e=this;
			if(e.options.lazyLoad===true)
				{
				e.lazyLoad()
			}
			if(e.options.autoHeight===true)
				{
				e.autoHeight()
			}
			e.onVisibleItems();
			if(typeof e.options.afterAction==="function")
				{
				e.options.afterAction.apply(this,[e.$elem])
			}
		}
		,updateVars:function()
			{
			var e=this;
			if(typeof e.options.beforeUpdate==="function")
				{
				e.options.beforeUpdate.apply(this,[e.$elem])
			}
			e.watchVisibility();
			e.updateItems();
			e.calculateAll();
			e.updatePosition();
			e.updateControls();
			e.eachMoveUpdate();
			if(typeof e.options.afterUpdate==="function")
				{
				e.options.afterUpdate.apply(this,[e.$elem])
			}
		}
		,reload:function()
			{
			var e=this;
			t.setTimeout(function()
				{
				e.updateVars()
			}
			,0)
		}
		,watchVisibility:function()
			{
			var e=this;
			if(e.$elem.is(":visible")===false)
				{
				e.$elem.css(
					{
					opacity:0
				}
				);
				t.clearInterval(e.autoPlayInterval);
				t.clearInterval(e.checkVisible)
			}
			else
				{
				return false
			}
			e.checkVisible=t.setInterval(function()
				{
				if(e.$elem.is(":visible"))
					{
					e.reload();
					e.$elem.animate(
						{
						opacity:1
					}
					,200);
					t.clearInterval(e.checkVisible)
				}
			}
			,500)
		}
		,wrapItems:function()
			{
			var e=this;
			e.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');
			e.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');
			e.wrapperOuter=e.$elem.find(".owl-wrapper-outer");
			e.$elem.css("display","block")
		}
		,baseClass:function()
			{
			var e=this,t=e.$elem.hasClass(e.options.baseClass),n=e.$elem.hasClass(e.options.theme);
			if(!t)
				{
				e.$elem.addClass(e.options.baseClass)
			}
			if(!n)
				{
				e.$elem.addClass(e.options.theme)
			}
		}
		,updateItems:function()
			{
			var t=this,n,r;
			if(t.options.responsive===false)
				{
				return false
			}
			if(t.options.singleItem===true)
				{
				t.options.items=t.orignalItems=1;
				t.options.itemsCustom=false;
				t.options.itemsDesktop=false;
				t.options.itemsDesktopSmall=false;
				t.options.itemsTablet=false;
				t.options.itemsTabletSmall=false;
				t.options.itemsMobile=false;
				return false
			}
			n=e(t.options.responsiveBaseWidth).width();
			if(n>(t.options.itemsDesktop[0]||t.orignalItems))
				{
				t.options.items=t.orignalItems
			}
			if(t.options.itemsCustom!==false)
				{
				t.options.itemsCustom.sort(function(e,t)
					{
					return e[0]-t[0]
				}
				);
				for(r=0;
				r<t.options.itemsCustom.length;
				r+=1)
					{
					if(t.options.itemsCustom[r][0]<=n)
						{
						t.options.items=t.options.itemsCustom[r][1]
					}
				}
			}
			else
				{
				if(n<=t.options.itemsDesktop[0]&&t.options.itemsDesktop!==false)
					{
					t.options.items=t.options.itemsDesktop[1]
				}
				if(n<=t.options.itemsDesktopSmall[0]&&t.options.itemsDesktopSmall!==false)
					{
					t.options.items=t.options.itemsDesktopSmall[1]
				}
				if(n<=t.options.itemsTablet[0]&&t.options.itemsTablet!==false)
					{
					t.options.items=t.options.itemsTablet[1]
				}
				if(n<=t.options.itemsTabletSmall[0]&&t.options.itemsTabletSmall!==false)
					{
					t.options.items=t.options.itemsTabletSmall[1]
				}
				if(n<=t.options.itemsMobile[0]&&t.options.itemsMobile!==false)
					{
					t.options.items=t.options.itemsMobile[1]
				}
			}
			if(t.options.items>t.itemsAmount&&t.options.itemsScaleUp===true)
				{
				t.options.items=t.itemsAmount
			}
		}
		,response:function()
			{
			var n=this,r,i;
			if(n.options.responsive!==true)
				{
				return false
			}
			i=e(t).width();
			n.resizer=function()
				{
				if(e(t).width()!==i)
					{
					if(n.options.autoPlay!==false)
						{
						t.clearInterval(n.autoPlayInterval)
					}
					t.clearTimeout(r);
					r=t.setTimeout(function()
						{
						i=e(t).width();
						n.updateVars()
					}
					,n.options.responsiveRefreshRate)
				}
			};
			e(t).resize(n.resizer)
		}
		,updatePosition:function()
			{
			var e=this;
			e.jumpTo(e.currentItem);
			if(e.options.autoPlay!==false)
				{
				e.checkAp()
			}
		}
		,appendItemsSizes:function()
			{
			var t=this,n=0,r=t.itemsAmount-t.options.items;
			t.$owlItems.each(function(i)
				{
				var s=e(this);
				s.css(
					{
					width:t.itemWidth
				}
				).data("owl-item",Number(i));
				if(i%t.options.items===0||i===r)
					{
					if(!(i>r))
						{
						n+=1
					}
				}
				s.data("owl-roundPages",n)
			}
			)
		}
		,appendWrapperSizes:function()
			{
			var e=this,t=e.$owlItems.length*e.itemWidth;
			e.$owlWrapper.css(
				{
				width:t*2,left:0
			}
			);
			e.appendItemsSizes()
		}
		,calculateAll:function()
			{
			var e=this;
			e.calculateWidth();
			e.appendWrapperSizes();
			e.loops();
			e.max()
		}
		,calculateWidth:function()
			{
			var e=this;
			e.itemWidth=Math.round(e.$elem.width()/e.options.items)
		}
		,max:function()
			{
			var e=this,t=(e.itemsAmount*e.itemWidth-e.options.items*e.itemWidth)*-1;
			if(e.options.items>e.itemsAmount)
				{
				e.maximumItem=0;
				t=0;
				e.maximumPixels=0
			}
			else
				{
				e.maximumItem=e.itemsAmount-e.options.items;
				e.maximumPixels=t
			}
			return t
		}
		,min:function()
			{
			return 0
		}
		,loops:function()
			{
			var t=this,n=0,r=0,i,s,o;
			t.positionsInArray=[0];
			t.pagesInArray=[];
			for(i=0;
			i<t.itemsAmount;
			i+=1)
				{
				r+=t.itemWidth;
				t.positionsInArray.push(-r);
				if(t.options.scrollPerPage===true)
					{
					s=e(t.$owlItems[i]);
					o=s.data("owl-roundPages");
					if(o!==n)
						{
						t.pagesInArray[n]=t.positionsInArray[i];
						n=o
					}
				}
			}
		}
		,buildControls:function()
			{
			var t=this;
			if(t.options.navigation===true||t.options.pagination===true)
				{
				t.owlControls=e('<div class="owl-controls"/>').toggleClass("clickable",!t.browser.isTouch).appendTo(t.$elem)
			}
			if(t.options.pagination===true)
				{
				t.buildPagination()
			}
			if(t.options.navigation===true)
				{
				t.buildButtons()
			}
		}
		,buildButtons:function()
			{
			var t=this,n=e('<div class="owl-buttons"/>');
			t.owlControls.append(n);
			t.buttonPrev=e("<div/>",
				{
				"class":"owl-prev",html:t.options.navigationText[0]||""
			}
			);
			t.buttonNext=e("<div/>",
				{
				"class":"owl-next",html:t.options.navigationText[1]||""
			}
			);
			n.append(t.buttonPrev).append(t.buttonNext);
			n.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(e)
				{
				e.preventDefault()
			}
			);
			n.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(n)
				{
				n.preventDefault();
				if(e(this).hasClass("owl-next"))
					{
					t.next()
				}
				else
					{
					t.prev()
				}
			}
			)
		}
		,buildPagination:function()
			{
			var t=this;
			t.paginationWrapper=e('<div class="owl-pagination"/>');
			t.owlControls.append(t.paginationWrapper);
			t.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(n)
				{
				n.preventDefault();
				if(Number(e(this).data("owl-page"))!==t.currentItem)
					{
					t.goTo(Number(e(this).data("owl-page")),true)
				}
			}
			)
		}
		,updatePagination:function()
			{
			var t=this,n,r,i,s,o,u;
			if(t.options.pagination===false)
				{
				return false
			}
			t.paginationWrapper.html("");
			n=0;
			r=t.itemsAmount-t.itemsAmount%t.options.items;
			for(s=0;
			s<t.itemsAmount;
			s+=1)
				{
				if(s%t.options.items===0)
					{
					n+=1;
					if(r===s)
						{
						i=t.itemsAmount-t.options.items
					}
					o=e("<div/>",
						{
						"class":"owl-page"
					}
					);
					u=e("<span></span>",
						{
						text:t.options.paginationNumbers===true?n:"","class":t.options.paginationNumbers===true?"owl-numbers":""
					}
					);
					o.append(u);
					o.data("owl-page",r===s?i:s);
					o.data("owl-roundPages",n);
					t.paginationWrapper.append(o)
				}
			}
			t.checkPagination()
		}
		,checkPagination:function()
			{
			var t=this;
			if(t.options.pagination===false)
				{
				return false
			}
			t.paginationWrapper.find(".owl-page").each(function()
				{
				if(e(this).data("owl-roundPages")===e(t.$owlItems[t.currentItem]).data("owl-roundPages"))
					{
					t.paginationWrapper.find(".owl-page").removeClass("active");
					e(this).addClass("active")
				}
			}
			)
		}
		,checkNavigation:function()
			{
			var e=this;
			if(e.options.navigation===false)
				{
				return false
			}
			if(e.options.rewindNav===false)
				{
				if(e.currentItem===0&&e.maximumItem===0)
					{
					e.buttonPrev.addClass("disabled");
					e.buttonNext.addClass("disabled")
				}
				else if(e.currentItem===0&&e.maximumItem!==0)
					{
					e.buttonPrev.addClass("disabled");
					e.buttonNext.removeClass("disabled")
				}
				else if(e.currentItem===e.maximumItem)
					{
					e.buttonPrev.removeClass("disabled");
					e.buttonNext.addClass("disabled")
				}
				else if(e.currentItem!==0&&e.currentItem!==e.maximumItem)
					{
					e.buttonPrev.removeClass("disabled");
					e.buttonNext.removeClass("disabled")
				}
			}
		}
		,updateControls:function()
			{
			var e=this;
			e.updatePagination();
			e.checkNavigation();
			if(e.owlControls)
				{
				if(e.options.items>=e.itemsAmount)
					{
					e.owlControls.hide()
				}
				else
					{
					e.owlControls.show()
				}
			}
		}
		,destroyControls:function()
			{
			var e=this;
			if(e.owlControls)
				{
				e.owlControls.remove()
			}
		}
		,next:function(e)
			{
			var t=this;
			if(t.isTransition)
				{
				return false
			}
			t.currentItem+=t.options.scrollPerPage===true?t.options.items:1;
			if(t.currentItem>t.maximumItem+(t.options.scrollPerPage===true?t.options.items-1:0))
				{
				if(t.options.rewindNav===true)
					{
					t.currentItem=0;
					e="rewind"
				}
				else
					{
					t.currentItem=t.maximumItem;
					return false
				}
			}
			t.goTo(t.currentItem,e)
		}
		,prev:function(e)
			{
			var t=this;
			if(t.isTransition)
				{
				return false
			}
			if(t.options.scrollPerPage===true&&t.currentItem>0&&t.currentItem<t.options.items)
				{
				t.currentItem=0
			}
			else
				{
				t.currentItem-=t.options.scrollPerPage===true?t.options.items:1
			}
			if(t.currentItem<0)
				{
				if(t.options.rewindNav===true)
					{
					t.currentItem=t.maximumItem;
					e="rewind"
				}
				else
					{
					t.currentItem=0;
					return false
				}
			}
			t.goTo(t.currentItem,e)
		}
		,goTo:function(e,n,r)
			{
			var i=this,s;
			if(i.isTransition)
				{
				return false
			}
			if(typeof i.options.beforeMove==="function")
				{
				i.options.beforeMove.apply(this,[i.$elem])
			}
			if(e>=i.maximumItem)
				{
				e=i.maximumItem
			}
			else if(e<=0)
				{
				e=0
			}
			i.currentItem=i.owl.currentItem=e;
			if(i.options.transitionStyle!==false&&r!=="drag"&&i.options.items===1&&i.browser.support3d===true)
				{
				i.swapSpeed(0);
				if(i.browser.support3d===true)
					{
					i.transition3d(i.positionsInArray[e])
				}
				else
					{
					i.css2slide(i.positionsInArray[e],1)
				}
				i.afterGo();
				i.singleItemTransition();
				return false
			}
			s=i.positionsInArray[e];
			if(i.browser.support3d===true)
				{
				i.isCss3Finish=false;
				if(n===true)
					{
					i.swapSpeed("paginationSpeed");
					t.setTimeout(function()
						{
						i.isCss3Finish=true
					}
					,i.options.paginationSpeed)
				}
				else if(n==="rewind")
					{
					i.swapSpeed(i.options.rewindSpeed);
					t.setTimeout(function()
						{
						i.isCss3Finish=true
					}
					,i.options.rewindSpeed)
				}
				else
					{
					i.swapSpeed("slideSpeed");
					t.setTimeout(function()
						{
						i.isCss3Finish=true
					}
					,i.options.slideSpeed)
				}
				i.transition3d(s)
			}
			else
				{
				if(n===true)
					{
					i.css2slide(s,i.options.paginationSpeed)
				}
				else if(n==="rewind")
					{
					i.css2slide(s,i.options.rewindSpeed)
				}
				else
					{
					i.css2slide(s,i.options.slideSpeed)
				}
			}
			i.afterGo()
		}
		,jumpTo:function(e)
			{
			var t=this;
			if(typeof t.options.beforeMove==="function")
				{
				t.options.beforeMove.apply(this,[t.$elem])
			}
			if(e>=t.maximumItem||e===-1)
				{
				e=t.maximumItem
			}
			else if(e<=0)
				{
				e=0
			}
			t.swapSpeed(0);
			if(t.browser.support3d===true)
				{
				t.transition3d(t.positionsInArray[e])
			}
			else
				{
				t.css2slide(t.positionsInArray[e],1)
			}
			t.currentItem=t.owl.currentItem=e;
			t.afterGo()
		}
		,afterGo:function()
			{
			var e=this;
			e.prevArr.push(e.currentItem);
			e.prevItem=e.owl.prevItem=e.prevArr[e.prevArr.length-2];
			e.prevArr.shift(0);
			if(e.prevItem!==e.currentItem)
				{
				e.checkPagination();
				e.checkNavigation();
				e.eachMoveUpdate();
				if(e.options.autoPlay!==false)
					{
					e.checkAp()
				}
			}
			if(typeof e.options.afterMove==="function"&&e.prevItem!==e.currentItem)
				{
				e.options.afterMove.apply(this,[e.$elem])
			}
		}
		,stop:function()
			{
			var e=this;
			e.apStatus="stop";
			t.clearInterval(e.autoPlayInterval)
		}
		,checkAp:function()
			{
			var e=this;
			if(e.apStatus!=="stop")
				{
				e.play()
			}
		}
		,play:function()
			{
			var e=this;
			e.apStatus="play";
			if(e.options.autoPlay===false)
				{
				return false
			}
			t.clearInterval(e.autoPlayInterval);
			e.autoPlayInterval=t.setInterval(function()
				{
				e.next(true)
			}
			,e.options.autoPlay)
		}
		,swapSpeed:function(e)
			{
			var t=this;
			if(e==="slideSpeed")
				{
				t.$owlWrapper.css(t.addCssSpeed(t.options.slideSpeed))
			}
			else if(e==="paginationSpeed")
				{
				t.$owlWrapper.css(t.addCssSpeed(t.options.paginationSpeed))
			}
			else if(typeof e!=="string")
				{
				t.$owlWrapper.css(t.addCssSpeed(e))
			}
		}
		,addCssSpeed:function(e)
			{
			return
				{
				"-webkit-transition":"all "+e+"ms ease","-moz-transition":"all "+e+"ms ease","-o-transition":"all "+e+"ms ease",transition:"all "+e+"ms ease"
			}
		}
		,removeTransition:function()
			{
			return
				{
				"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""
			}
		}
		,doTranslate:function(e)
			{
			return
				{
				"-webkit-transform":"translate3d("+e+"px, 0px, 0px)","-moz-transform":"translate3d("+e+"px, 0px, 0px)","-o-transform":"translate3d("+e+"px, 0px, 0px)","-ms-transform":"translate3d("+e+"px, 0px, 0px)",transform:"translate3d("+e+"px, 0px,0px)"
			}
		}
		,transition3d:function(e)
			{
			var t=this;
			t.$owlWrapper.css(t.doTranslate(e))
		}
		,css2move:function(e)
			{
			var t=this;
			t.$owlWrapper.css(
				{
				left:e
			}
			)
		}
		,css2slide:function(e,t)
			{
			var n=this;
			n.isCssFinish=false;
			n.$owlWrapper.stop(true,true).animate(
				{
				left:e
			}
			,
				{
				duration:t||n.options.slideSpeed,complete:function()
					{
					n.isCssFinish=true
				}
			}
			)
		}
		,checkBrowser:function()
			{
			var e=this,r="translate3d(0px, 0px, 0px)",i=n.createElement("div"),s,o,u,a;
			i.style.cssText="  -moz-transform:"+r+";
			 -ms-transform:"+r+";
			 -o-transform:"+r+";
			 -webkit-transform:"+r+";
			 transform:"+r;
			s=/translate3d\(0px, 0px, 0px\)/g;
			o=i.style.cssText.match(s);
			u=o!==null&&o.length===1;
			a="ontouchstart"in t||t.navigator.msMaxTouchPoints;
			e.browser=
				{
				support3d:u,isTouch:a
			}
		}
		,moveEvents:function()
			{
			var e=this;
			if(e.options.mouseDrag!==false||e.options.touchDrag!==false)
				{
				e.gestures();
				e.disabledEvents()
			}
		}
		,eventTypes:function()
			{
			var e=this,t=["s","e","x"];
			e.ev_types=
				{
			};
			if(e.options.mouseDrag===true&&e.options.touchDrag===true)
				{
				t=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]
			}
			else if(e.options.mouseDrag===false&&e.options.touchDrag===true)
				{
				t=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]
			}
			else if(e.options.mouseDrag===true&&e.options.touchDrag===false)
				{
				t=["mousedown.owl","mousemove.owl","mouseup.owl"]
			}
			e.ev_types.start=t[0];
			e.ev_types.move=t[1];
			e.ev_types.end=t[2]
		}
		,disabledEvents:function()
			{
			var t=this;
			t.$elem.on("dragstart.owl",function(e)
				{
				e.preventDefault()
			}
			);
			t.$elem.on("mousedown.disableTextSelect",function(t)
				{
				return e(t.target).is("input, textarea, select, option")
			}
			)
		}
		,gestures:function()
			{
			function s(e)
				{
				if(e.touches!==undefined)
					{
					return
						{
						x:e.touches[0].pageX,y:e.touches[0].pageY
					}
				}
				if(e.touches===undefined)
					{
					if(e.pageX!==undefined)
						{
						return
							{
							x:e.pageX,y:e.pageY
						}
					}
					if(e.pageX===undefined)
						{
						return
							{
							x:e.clientX,y:e.clientY
						}
					}
				}
			}
			function o(t)
				{
				if(t==="on")
					{
					e(n).on(r.ev_types.move,a);
					e(n).on(r.ev_types.end,f)
				}
				else if(t==="off")
					{
					e(n).off(r.ev_types.move);
					e(n).off(r.ev_types.end)
				}
			}
			function u(n)
				{
				var u=n.originalEvent||n||t.event,a;
				if(u.which===3)
					{
					return false
				}
				if(r.itemsAmount<=r.options.items)
					{
					return
				}
				if(r.isCssFinish===false&&!r.options.dragBeforeAnimFinish)
					{
					return false
				}
				if(r.isCss3Finish===false&&!r.options.dragBeforeAnimFinish)
					{
					return false
				}
				if(r.options.autoPlay!==false)
					{
					t.clearInterval(r.autoPlayInterval)
				}
				if(r.browser.isTouch!==true&&!r.$owlWrapper.hasClass("grabbing"))
					{
					r.$owlWrapper.addClass("grabbing")
				}
				r.newPosX=0;
				r.newRelativeX=0;
				e(this).css(r.removeTransition());
				a=e(this).position();
				i.relativePos=a.left;
				i.offsetX=s(u).x-a.left;
				i.offsetY=s(u).y-a.top;
				o("on");
				i.sliding=false;
				i.targetElement=u.target||u.srcElement
			}
			function a(o)
				{
				var u=o.originalEvent||o||t.event,a,f;
				r.newPosX=s(u).x-i.offsetX;
				r.newPosY=s(u).y-i.offsetY;
				r.newRelativeX=r.newPosX-i.relativePos;
				if(typeof r.options.startDragging==="function"&&i.dragging!==true&&r.newRelativeX!==0)
					{
					i.dragging=true;
					r.options.startDragging.apply(r,[r.$elem])
				}
				if((r.newRelativeX>8||r.newRelativeX<-8)&&r.browser.isTouch===true)
					{
					if(u.preventDefault!==undefined)
						{
						u.preventDefault()
					}
					else
						{
						u.returnValue=false
					}
					i.sliding=true
				}
				if((r.newPosY>10||r.newPosY<-10)&&i.sliding===false)
					{
					e(n).off("touchmove.owl")
				}
				a=function()
					{
					return r.newRelativeX/5
				};
				f=function()
					{
					return r.maximumPixels+r.newRelativeX/5
				};
				r.newPosX=Math.max(Math.min(r.newPosX,a()),f());
				if(r.browser.support3d===true)
					{
					r.transition3d(r.newPosX)
				}
				else
					{
					r.css2move(r.newPosX)
				}
			}
			function f(n)
				{
				var s=n.originalEvent||n||t.event,u,a,f;
				s.target=s.target||s.srcElement;
				i.dragging=false;
				if(r.browser.isTouch!==true)
					{
					r.$owlWrapper.removeClass("grabbing")
				}
				if(r.newRelativeX<0)
					{
					r.dragDirection=r.owl.dragDirection="left"
				}
				else
					{
					r.dragDirection=r.owl.dragDirection="right"
				}
				if(r.newRelativeX!==0)
					{
					u=r.getNewPosition();
					r.goTo(u,false,"drag");
					if(i.targetElement===s.target&&r.browser.isTouch!==true)
						{
						e(s.target).on("click.disable",function(t)
							{
							t.stopImmediatePropagation();
							t.stopPropagation();
							t.preventDefault();
							e(t.target).off("click.disable")
						}
						);
						a=e._data(s.target,"events").click;
						f=a.pop();
						a.splice(0,0,f)
					}
				}
				o("off")
			}
			var r=this,i=
				{
				offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null
			};
			r.isCssFinish=true;
			r.$elem.on(r.ev_types.start,".owl-wrapper",u)
		}
		,getNewPosition:function()
			{
			var e=this,t=e.closestItem();
			if(t>e.maximumItem)
				{
				e.currentItem=e.maximumItem;
				t=e.maximumItem
			}
			else if(e.newPosX>=0)
				{
				t=0;
				e.currentItem=0
			}
			return t
		}
		,closestItem:function()
			{
			var t=this,n=t.options.scrollPerPage===true?t.pagesInArray:t.positionsInArray,r=t.newPosX,i=null;
			e.each(n,function(s,o)
				{
				if(r-t.itemWidth/20>n[s+1]&&r-t.itemWidth/20<o&&t.moveDirection()==="left")
					{
					i=o;
					if(t.options.scrollPerPage===true)
						{
						t.currentItem=e.inArray(i,t.positionsInArray)
					}
					else
						{
						t.currentItem=s
					}
				}
				else if(r+t.itemWidth/20<o&&r+t.itemWidth/20>(n[s+1]||n[s]-t.itemWidth)&&t.moveDirection()==="right")
					{
					if(t.options.scrollPerPage===true)
						{
						i=n[s+1]||n[n.length-1];
						t.currentItem=e.inArray(i,t.positionsInArray)
					}
					else
						{
						i=n[s+1];
						t.currentItem=s+1
					}
				}
			}
			);
			return t.currentItem
		}
		,moveDirection:function()
			{
			var e=this,t;
			if(e.newRelativeX<0)
				{
				t="right";
				e.playDirection="next"
			}
			else
				{
				t="left";
				e.playDirection="prev"
			}
			return t
		}
		,customEvents:function()
			{
			var e=this;
			e.$elem.on("owl.next",function()
				{
				e.next()
			}
			);
			e.$elem.on("owl.prev",function()
				{
				e.prev()
			}
			);
			e.$elem.on("owl.play",function(t,n)
				{
				e.options.autoPlay=n;
				e.play();
				e.hoverStatus="play"
			}
			);
			e.$elem.on("owl.stop",function()
				{
				e.stop();
				e.hoverStatus="stop"
			}
			);
			e.$elem.on("owl.goTo",function(t,n)
				{
				e.goTo(n)
			}
			);
			e.$elem.on("owl.jumpTo",function(t,n)
				{
				e.jumpTo(n)
			}
			)
		}
		,stopOnHover:function()
			{
			var e=this;
			if(e.options.stopOnHover===true&&e.browser.isTouch!==true&&e.options.autoPlay!==false)
				{
				e.$elem.on("mouseover",function()
					{
					e.stop()
				}
				);
				e.$elem.on("mouseout",function()
					{
					if(e.hoverStatus!=="stop")
						{
						e.play()
					}
				}
				)
			}
		}
		,lazyLoad:function()
			{
			var t=this,n,r,i,s,o;
			if(t.options.lazyLoad===false)
				{
				return false
			}
			for(n=0;
			n<t.itemsAmount;
			n+=1)
				{
				r=e(t.$owlItems[n]);
				if(r.data("owl-loaded")==="loaded")
					{
					continue
				}
				i=r.data("owl-item");
				s=r.find(".lazyOwl");
				if(typeof s.data("src")!=="string")
					{
					r.data("owl-loaded","loaded");
					continue
				}
				if(r.data("owl-loaded")===undefined)
					{
					s.hide();
					r.addClass("loading").data("owl-loaded","checked")
				}
				if(t.options.lazyFollow===true)
					{
					o=i>=t.currentItem
				}
				else
					{
					o=true
				}
				if(o&&i<t.currentItem+t.options.items&&s.length)
					{
					t.lazyPreload(r,s)
				}
			}
		}
		,lazyPreload:function(e,n)
			{
			function o()
				{
				e.data("owl-loaded","loaded").removeClass("loading");
				n.removeAttr("data-src");
				if(r.options.lazyEffect==="fade")
					{
					n.fadeIn(400)
				}
				else
					{
					n.show()
				}
				if(typeof r.options.afterLazyLoad==="function")
					{
					r.options.afterLazyLoad.apply(this,[r.$elem])
				}
			}
			function u()
				{
				i+=1;
				if(r.completeImg(n.get(0))||s===true)
					{
					o()
				}
				else if(i<=100)
					{
					t.setTimeout(u,100)
				}
				else
					{
					o()
				}
			}
			var r=this,i=0,s;
			if(n.prop("tagName")==="DIV")
				{
				n.css("background-image","url("+n.data("src")+")");
				s=true
			}
			else
				{
				n[0].src=n.data("src")
			}
			u()
		}
		,autoHeight:function()
			{
			function s()
				{
				var r=e(n.$owlItems[n.currentItem]).height();
				n.wrapperOuter.css("height",r+"px");
				if(!n.wrapperOuter.hasClass("autoHeight"))
					{
					t.setTimeout(function()
						{
						n.wrapperOuter.addClass("autoHeight")
					}
					,0)
				}
			}
			function o()
				{
				i+=1;
				if(n.completeImg(r.get(0)))
					{
					s()
				}
				else if(i<=100)
					{
					t.setTimeout(o,100)
				}
				else
					{
					n.wrapperOuter.css("height","")
				}
			}
			var n=this,r=e(n.$owlItems[n.currentItem]).find("img"),i;
			if(r.get(0)!==undefined)
				{
				i=0;
				o()
			}
			else
				{
				s()
			}
		}
		,completeImg:function(e)
			{
			var t;
			if(!e.complete)
				{
				return false
			}
			t=typeof e.naturalWidth;
			if(t!=="undefined"&&e.naturalWidth===0)
				{
				return false
			}
			return true
		}
		,onVisibleItems:function()
			{
			var t=this,n;
			if(t.options.addClassActive===true)
				{
				t.$owlItems.removeClass("active")
			}
			t.visibleItems=[];
			for(n=t.currentItem;
			n<t.currentItem+t.options.items;
			n+=1)
				{
				t.visibleItems.push(n);
				if(t.options.addClassActive===true)
					{
					e(t.$owlItems[n]).addClass("active")
				}
			}
			t.owl.visibleItems=t.visibleItems
		}
		,transitionTypes:function(e)
			{
			var t=this;
			t.outClass="owl-"+e+"-out";
			t.inClass="owl-"+e+"-in"
		}
		,singleItemTransition:function()
			{
			function a(e)
				{
				return
					{
					position:"relative",left:e+"px"
				}
			}
			var e=this,t=e.outClass,n=e.inClass,r=e.$owlItems.eq(e.currentItem),i=e.$owlItems.eq(e.prevItem),s=Math.abs(e.positionsInArray[e.currentItem])+e.positionsInArray[e.prevItem],o=Math.abs(e.positionsInArray[e.currentItem])+e.itemWidth/2,u="webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";
			e.isTransition=true;
			e.$owlWrapper.addClass("owl-origin").css(
				{
				"-webkit-transform-origin":o+"px","-moz-perspective-origin":o+"px","perspective-origin":o+"px"
			}
			);
			i.css(a(s,10)).addClass(t).on(u,function()
				{
				e.endPrev=true;
				i.off(u);
				e.clearTransStyle(i,t)
			}
			);
			r.addClass(n).on(u,function()
				{
				e.endCurrent=true;
				r.off(u);
				e.clearTransStyle(r,n)
			}
			)
		}
		,clearTransStyle:function(e,t)
			{
			var n=this;
			e.css(
				{
				position:"",left:""
			}
			).removeClass(t);
			if(n.endPrev&&n.endCurrent)
				{
				n.$owlWrapper.removeClass("owl-origin");
				n.endPrev=false;
				n.endCurrent=false;
				n.isTransition=false
			}
		}
		,owlStatus:function()
			{
			var e=this;
			e.owl=
				{
				userOptions:e.userOptions,baseElement:e.$elem,userItems:e.$userItems,owlItems:e.$owlItems,currentItem:e.currentItem,prevItem:e.prevItem,visibleItems:e.visibleItems,isTouch:e.browser.isTouch,browser:e.browser,dragDirection:e.dragDirection
			}
		}
		,clearEvents:function()
			{
			var r=this;
			r.$elem.off(".owl owl mousedown.disableTextSelect");
			e(n).off(".owl owl");
			e(t).off("resize",r.resizer)
		}
		,unWrap:function()
			{
			var e=this;
			if(e.$elem.children().length!==0)
				{
				e.$owlWrapper.unwrap();
				e.$userItems.unwrap().unwrap();
				if(e.owlControls)
					{
					e.owlControls.remove()
				}
			}
			e.clearEvents();
			e.$elem.attr("style",e.$elem.data("owl-originalStyles")||"").attr("class",e.$elem.data("owl-originalClasses"))
		}
		,destroy:function()
			{
			var e=this;
			e.stop();
			t.clearInterval(e.checkVisible);
			e.unWrap();
			e.$elem.removeData()
		}
		,reinit:function(t)
			{
			var n=this,r=e.extend(
				{
			}
			,n.userOptions,t);
			n.unWrap();
			n.init(r,n.$elem)
		}
		,addItem:function(e,t)
			{
			var n=this,r;
			if(!e)
				{
				return false
			}
			if(n.$elem.children().length===0)
				{
				n.$elem.append(e);
				n.setVars();
				return false
			}
			n.unWrap();
			if(t===undefined||t===-1)
				{
				r=-1
			}
			else
				{
				r=t
			}
			if(r>=n.$userItems.length||r===-1)
				{
				n.$userItems.eq(-1).after(e)
			}
			else
				{
				n.$userItems.eq(r).before(e)
			}
			n.setVars()
		}
		,removeItem:function(e)
			{
			var t=this,n;
			if(t.$elem.children().length===0)
				{
				return false
			}
			if(e===undefined||e===-1)
				{
				n=-1
			}
			else
				{
				n=e
			}
			t.unWrap();
			t.$userItems.eq(n).remove();
			t.setVars()
		}
	};
	e.fn.owlCarousel=function(t)
		{
		return this.each(function()
			{
			if(e(this).data("owl-init")===true)
				{
				return false
			}
			e(this).data("owl-init",true);
			var n=Object.create(r);
			n.init(t,this);
			e.data(this,"owlCarousel",n)
		}
		)
	};
	e.fn.owlCarousel.options=
		{
		items:5,itemsCustom:false,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:false,itemsMobile:[479,1],singleItem:false,itemsScaleUp:false,slideSpeed:200,paginationSpeed:800,rewindSpeed:1e3,autoPlay:false,stopOnHover:false,navigation:false,navigationText:["prev","next"],rewindNav:true,scrollPerPage:false,pagination:true,paginationNumbers:false,responsive:true,responsiveRefreshRate:200,responsiveBaseWidth:t,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:false,lazyFollow:true,lazyEffect:"fade",autoHeight:false,jsonPath:false,jsonSuccess:false,dragBeforeAnimFinish:true,mouseDrag:true,touchDrag:true,addClassActive:false,transitionStyle:false,beforeUpdate:false,afterUpdate:false,beforeInit:false,afterInit:false,beforeMove:false,afterMove:false,afterAction:false,startDragging:false,afterLazyLoad:false
	}
}
)(jQuery,window,document)
!function(t,i,n,s){var e=function(s,e){this.elem=s,this.$elem=t(s),this.options=e,this.metadata=this.$elem.data("plugin-options"),this.$win=t(i),this.sections={},this.didScroll=!1,this.$doc=t(n),this.docHeight=this.$doc.height()};e.prototype={defaults:{navItems:"a",currentClass:"current",changeHash:!1,easing:"swing",filter:"",scrollSpeed:750,scrollThreshold:.5,begin:!1,end:!1,scrollChange:!1},init:function(){return this.config=t.extend({},this.defaults,this.options,this.metadata),this.$nav=this.$elem.find(this.config.navItems),""!==this.config.filter&&(this.$nav=this.$nav.filter(this.config.filter)),this.$nav.on("click.onePageNav",t.proxy(this.handleClick,this)),this.getPositions(),this.bindInterval(),this.$win.on("resize.onePageNav",t.proxy(this.getPositions,this)),this},adjustNav:function(t,i){t.$elem.find("."+t.config.currentClass).removeClass(t.config.currentClass),i.addClass(t.config.currentClass)},bindInterval:function(){var t,i=this;i.$win.on("scroll.onePageNav",function(){i.didScroll=!0}),i.t=setInterval(function(){t=i.$doc.height(),i.didScroll&&(i.didScroll=!1,i.scrollChange()),t!==i.docHeight&&(i.docHeight=t,i.getPositions())},250)},getHash:function(t){return t.attr("href").split("#")[1]},getPositions:function(){var i,n,s,e=this;e.$nav.each(function(){i=e.getHash(t(this)),(s=t("#"+i)).length&&(n=s.offset().top,e.sections[i]=Math.round(n))})},getSection:function(t){var i=null,n=Math.round(this.$win.height()*this.config.scrollThreshold);for(var s in this.sections)this.sections[s]-n<t&&(i=s);return i},handleClick:function(n){var s=this,e=t(n.currentTarget),o=e.parent(),a="#"+s.getHash(e);o.hasClass(s.config.currentClass)||(s.config.begin&&s.config.begin(),s.adjustNav(s,o),s.unbindInterval(),s.scrollTo(a,function(){s.config.changeHash&&(i.location.hash=a),s.bindInterval(),s.config.end&&s.config.end()})),n.preventDefault()},scrollChange:function(){var t,i=this.$win.scrollTop(),n=this.getSection(i);null!==n&&!(t=this.$elem.find('a[href$="#'+n+'"]').parent()).hasClass(this.config.currentClass)&&(this.adjustNav(this,t),this.config.scrollChange&&this.config.scrollChange(t))},scrollTo:function(i,n){var s=t(i).offset().top;t("html, body").animate({scrollTop:s},this.config.scrollSpeed,this.config.easing,n)},unbindInterval:function(){clearInterval(this.t),this.$win.unbind("scroll.onePageNav")}},e.defaults=e.prototype.defaults,t.fn.onePageNav=function(t){return this.each(function(){new e(this,t).init()})}}(jQuery,window,document);
function ssc_init(){if(document.body){var s=document.body,e=document.documentElement,c=window.innerHeight,t=s.scrollHeight;if(ssc_root=document.compatMode.indexOf("CSS")>=0?e:s,ssc_activeElement=s,ssc_initdone=!0,top!=self)ssc_frame=!0;else if(t>c&&(s.offsetHeight<=c||e.offsetHeight<=c)&&(ssc_root.style.height="auto",ssc_root.offsetHeight<=c)){var r=document.createElement("div");r.style.clear="both",s.appendChild(r)}ssc_fixedback||(s.style.backgroundAttachment="scroll",e.style.backgroundAttachment="scroll"),ssc_keyboardsupport&&ssc_addEvent("keydown",ssc_keydown)}}function ssc_scrollArray(s,e,c,t){if(t||(t=1e3),ssc_directionCheck(e,c),ssc_que.push({x:e,y:c,lastX:e<0?.99:-.99,lastY:c<0?.99:-.99,start:+new Date}),!ssc_pending){var r=function(){for(var o=+new Date,n=0,a=0,i=0;i<ssc_que.length;i++){var l=ssc_que[i],u=o-l.start,d=u>=ssc_animtime,f=d?1:u/ssc_animtime;ssc_pulseAlgorithm&&(f=ssc_pulse(f));var p=l.x*f-l.lastX>>0,h=l.y*f-l.lastY>>0;n+=p,a+=h,l.lastX+=p,l.lastY+=h,d&&(ssc_que.splice(i,1),i--)}if(e){var m=s.scrollLeft;s.scrollLeft+=n,n&&s.scrollLeft===m&&(e=0)}if(c){var $=s.scrollTop;s.scrollTop+=a,a&&s.scrollTop===$&&(c=0)}e||c||(ssc_que=[]),ssc_que.length?setTimeout(r,t/ssc_framerate+1):ssc_pending=!1};setTimeout(r,0),ssc_pending=!0}}function ssc_wheel(s){ssc_initdone||ssc_init();var e=s.target,c=ssc_overflowingAncestor(e);if(!c||s.defaultPrevented||ssc_isNodeName(ssc_activeElement,"embed")||ssc_isNodeName(e,"embed")&&/\.pdf/i.test(e.src))return!0;var t=s.wheelDeltaX||0,r=s.wheelDeltaY||0;t||r||(r=s.wheelDelta||0),Math.abs(t)>1.2&&(t*=ssc_stepsize/120),Math.abs(r)>1.2&&(r*=ssc_stepsize/120),ssc_scrollArray(c,-t,-r),s.preventDefault()}function ssc_keydown(s){var e=s.target,c=s.ctrlKey||s.altKey||s.metaKey;if(/input|textarea|embed/i.test(e.nodeName)||e.isContentEditable||s.defaultPrevented||c||ssc_isNodeName(e,"button")&&s.keyCode===ssc_key.spacebar)return!0;var t,r=0,o=0,n=ssc_overflowingAncestor(ssc_activeElement),a=n.clientHeight;switch(n==document.body&&(a=window.innerHeight),s.keyCode){case ssc_key.up:o=-ssc_arrowscroll;break;case ssc_key.down:o=ssc_arrowscroll;break;case ssc_key.spacebar:o=-(t=s.shiftKey?1:-1)*a*.9;break;case ssc_key.pageup:o=-(.9*a);break;case ssc_key.pagedown:o=.9*a;break;case ssc_key.home:o=-n.scrollTop;break;case ssc_key.end:var i=n.scrollHeight-n.scrollTop-a;o=i>0?i+10:0;break;case ssc_key.left:r=-ssc_arrowscroll;break;case ssc_key.right:r=ssc_arrowscroll;break;default:return!0}ssc_scrollArray(n,r,o),s.preventDefault()}function ssc_mousedown(s){ssc_activeElement=s.target}function ssc_setCache(s,e){for(var c=s.length;c--;)ssc_cache[ssc_uniqueID(s[c])]=e;return e}function ssc_overflowingAncestor(s){var e=[],c=ssc_root.scrollHeight;do{var t=ssc_cache[ssc_uniqueID(s)];if(t)return ssc_setCache(e,t);if(e.push(s),c===s.scrollHeight){if(!ssc_frame||ssc_root.clientHeight+10<c)return ssc_setCache(e,document.body)}else if(s.clientHeight+10<s.scrollHeight&&("scroll"===(overflow=getComputedStyle(s,"").getPropertyValue("overflow"))||"auto"===overflow))return ssc_setCache(e,s)}while(s=s.parentNode)}function ssc_addEvent(s,e,c){window.addEventListener(s,e,c||!1)}function ssc_removeEvent(s,e,c){window.removeEventListener(s,e,c||!1)}function ssc_isNodeName(s,e){return s.nodeName.toLowerCase()===e.toLowerCase()}function ssc_directionCheck(s,e){s=s>0?1:-1,e=e>0?1:-1,(ssc_direction.x!==s||ssc_direction.y!==e)&&(ssc_direction.x=s,ssc_direction.y=e,ssc_que=[])}function ssc_pulse_(s){var e,c,t;return(s*=ssc_pulseScale)<1?e=s-(1-Math.exp(-s)):(s-=1,e=(c=Math.exp(-1))+(t=1-Math.exp(-s))*(1-c)),e*ssc_pulseNormalize}function ssc_pulse(s){return s>=1?1:s<=0?0:(1==ssc_pulseNormalize&&(ssc_pulseNormalize/=ssc_pulse_(1)),ssc_pulse_(s))}var ssc_activeElement,ssc_framerate=150,ssc_animtime=500,ssc_stepsize=150,ssc_pulseAlgorithm=!0,ssc_pulseScale=6,ssc_pulseNormalize=1,ssc_keyboardsupport=!0,ssc_arrowscroll=50,ssc_frame=!1,ssc_direction={x:0,y:0},ssc_initdone=!1,ssc_fixedback=!0,ssc_root=document.documentElement,ssc_key={left:37,up:38,right:39,down:40,spacebar:32,pageup:33,pagedown:34,end:35,home:36},ssc_que=[],ssc_pending=!1,ssc_cache={};setInterval(function(){ssc_cache={}},1e4);var ssc_uniqueID=function(){var s=0;return function(e){return e.ssc_uniqueID||(e.ssc_uniqueID=s++)}}(),ischrome=/chrome/.test(navigator.userAgent.toLowerCase());ischrome&&(ssc_addEvent("mousedown",ssc_mousedown),ssc_addEvent("mousewheel",ssc_wheel),ssc_addEvent("load",ssc_init));
 */ !function(t,e){t.MixItUp=function(){this._execAction("_constructor",0),t.extend(this,{selectors:{target:".mix",filter:".filter",sort:".sort"},animation:{enable:!0,effects:"fade scale",duration:600,easing:"ease",perspectiveDistance:"3000",perspectiveOrigin:"50% 50%",queue:!0,queueLimit:1,animateChangeLayout:!1,animateResizeContainer:!0,animateResizeTargets:!1,staggerSequence:!1,reverseOut:!1},callbacks:{onMixLoad:!1,onMixStart:!1,onMixBusy:!1,onMixEnd:!1,onMixFail:!1,_user:!1},controls:{enable:!0,live:!1,toggleFilterButtons:!1,toggleLogic:"or",activeClass:"active"},layout:{display:"inline-block",containerClass:"",containerClassFail:"fail"},load:{filter:"all",sort:!1},_$body:null,_$container:null,_$targets:null,_$parent:null,_$sortButtons:null,_$filterButtons:null,_suckMode:!1,_mixing:!1,_sorting:!1,_clicking:!1,_loading:!0,_changingLayout:!1,_changingClass:!1,_changingDisplay:!1,_origOrder:[],_startOrder:[],_newOrder:[],_activeFilter:null,_toggleArray:[],_toggleString:"",_activeSort:"default:asc",_newSort:null,_startHeight:null,_newHeight:null,_incPadding:!0,_newDisplay:null,_newClass:null,_targetsBound:0,_targetsDone:0,_queue:[],_$show:t(),_$hide:t()}),this._execAction("_constructor",1)},t.MixItUp.prototype={constructor:t.MixItUp,_instances:{},_handled:{_filter:{},_sort:{}},_bound:{_filter:{},_sort:{}},_actions:{},_filters:{},extend:function(e){for(var a in e)t.MixItUp.prototype[a]=e[a]},addAction:function(e,a,n,r){t.MixItUp.prototype._addHook("_actions",e,a,n,r)},addFilter:function(e,a,n,r){t.MixItUp.prototype._addHook("_filters",e,a,n,r)},_addHook:function(e,a,n,r,s){var o=t.MixItUp.prototype[e],l={};s=1===s||"post"===s?"post":"pre",l[a]={},l[a][s]={},l[a][s][n]=r,t.extend(!0,o,l)},_init:function(e,a){var n=this;if(n._execAction("_init",0,arguments),a&&t.extend(!0,n,a),n._$body=t("body"),n._domNode=e,n._$container=t(e),n._$container.addClass(n.layout.containerClass),n._id=e.id,n._platformDetect(),n._brake=n._getPrefixedCSS("transition","none"),n._refresh(!0),n._$parent=n._$targets.parent().length?n._$targets.parent():n._$container,n.load.sort&&(n._newSort=n._parseSort(n.load.sort),n._newSortString=n.load.sort,n._activeSort=n.load.sort,n._sort(),n._printSort()),n._activeFilter="all"===n.load.filter?n.selectors.target:"none"===n.load.filter?"":n.load.filter,n.controls.enable&&n._bindHandlers(),n.controls.toggleFilterButtons){n._buildToggleArray();for(var r=0;r<n._toggleArray.length;r++)n._updateControls({filter:n._toggleArray[r],sort:n._activeSort},!0)}else n.controls.enable&&n._updateControls({filter:n._activeFilter,sort:n._activeSort});n._filter(),n._init=!0,n._$container.data("mixItUp",n),n._execAction("_init",1,arguments),n._buildState(),n._$targets.css(n._brake),n._goMix(n.animation.enable)},_platformDetect:function(){var t=this,a=["Webkit","Moz","O","ms"],n=["webkit","moz"],r=window.navigator.appVersion.match(/Chrome\/(\d+)\./)||!1,s="undefined"!=typeof InstallTrigger,o=function(t){for(var e=0;e<a.length;e++)if(a[e]+"Transition" in t.style)return{prefix:"-"+a[e].toLowerCase()+"-",vendor:a[e]};return"transition"in t.style&&""}(t._domNode);t._execAction("_platformDetect",0),t._chrome=!!r&&parseInt(r[1],10),t._ff=!!s&&parseInt(window.navigator.userAgent.match(/rv:([^)]+)\)/)[1]),t._prefix=o.prefix,t._vendor=o.vendor,t._suckMode=!window.atob||!t._prefix,t._suckMode&&(t.animation.enable=!1),t._ff&&t._ff<=4&&(t.animation.enable=!1);for(var l=0;l<n.length&&!window.requestAnimationFrame;l++)window.requestAnimationFrame=window[n[l]+"RequestAnimationFrame"];"function"!=typeof Object.getPrototypeOf&&(Object.getPrototypeOf="object"==typeof"test".__proto__?function(t){return t.__proto__}:function(t){return t.constructor.prototype}),t._domNode.nextElementSibling===e&&Object.defineProperty(Element.prototype,"nextElementSibling",{get:function(){for(var t=this.nextSibling;t;){if(1===t.nodeType)return t;t=t.nextSibling}return null}}),t._execAction("_platformDetect",1)},_refresh:function(t,a){var n=this;n._execAction("_refresh",0,arguments),n._$targets=n._$container.find(n.selectors.target);for(var r=0;r<n._$targets.length;r++){var s=n._$targets[r];if(s.dataset===e||a){s.dataset={};for(var o=0;o<s.attributes.length;o++){var l=s.attributes[o],c=l.name,g=l.value;if(c.indexOf("data-")>-1){var d=n._helpers._camelCase(c.substring(5,c.length));s.dataset[d]=g}}}s.mixParent===e&&(s.mixParent=n._id)}if(n._$targets.length&&t||!n._origOrder.length&&n._$targets.length){n._origOrder=[];for(var r=0;r<n._$targets.length;r++){var s=n._$targets[r];n._origOrder.push(s)}}n._execAction("_refresh",1,arguments)},_bindHandlers:function(){var a=this,n=t.MixItUp.prototype._bound._filter,r=t.MixItUp.prototype._bound._sort;a._execAction("_bindHandlers",0),a.controls.live?a._$body.on("click.mixItUp."+a._id,a.selectors.sort,function(){a._processClick(t(this),"sort")}).on("click.mixItUp."+a._id,a.selectors.filter,function(){a._processClick(t(this),"filter")}):(a._$sortButtons=t(a.selectors.sort),a._$filterButtons=t(a.selectors.filter),a._$sortButtons.on("click.mixItUp."+a._id,function(){a._processClick(t(this),"sort")}),a._$filterButtons.on("click.mixItUp."+a._id,function(){a._processClick(t(this),"filter")})),n[a.selectors.filter]=n[a.selectors.filter]===e?1:n[a.selectors.filter]+1,r[a.selectors.sort]=r[a.selectors.sort]===e?1:r[a.selectors.sort]+1,a._execAction("_bindHandlers",1)},_processClick:function(a,n){var r=this,s=function(a,n,s){var o=t.MixItUp.prototype;o._handled["_"+n][r.selectors[n]]=o._handled["_"+n][r.selectors[n]]===e?1:o._handled["_"+n][r.selectors[n]]+1,o._handled["_"+n][r.selectors[n]]===o._bound["_"+n][r.selectors[n]]&&(a[(s?"remove":"add")+"Class"](r.controls.activeClass),delete o._handled["_"+n][r.selectors[n]])};if(r._execAction("_processClick",0,arguments),!r._mixing||r.animation.queue&&r._queue.length<r.animation.queueLimit){if(r._clicking=!0,"sort"===n){var o=a.attr("data-sort");(!a.hasClass(r.controls.activeClass)||o.indexOf("random")>-1)&&(t(r.selectors.sort).removeClass(r.controls.activeClass),s(a,n),r.sort(o))}if("filter"===n){var l,c=a.attr("data-filter"),g="or"===r.controls.toggleLogic?",":"";r.controls.toggleFilterButtons?(r._buildToggleArray(),a.hasClass(r.controls.activeClass)?(s(a,n,!0),l=r._toggleArray.indexOf(c),r._toggleArray.splice(l,1)):(s(a,n),r._toggleArray.push(c)),r._toggleArray=t.grep(r._toggleArray,function(t){return t}),r._toggleString=r._toggleArray.join(g),r.filter(r._toggleString)):a.hasClass(r.controls.activeClass)||(t(r.selectors.filter).removeClass(r.controls.activeClass),s(a,n),r.filter(c))}r._execAction("_processClick",1,arguments)}else"function"==typeof r.callbacks.onMixBusy&&r.callbacks.onMixBusy.call(r._domNode,r._state,r),r._execAction("_processClickBusy",1,arguments)},_buildToggleArray:function(){var t=this,e=t._activeFilter.replace(/\s/g,"");if(t._execAction("_buildToggleArray",0,arguments),"or"===t.controls.toggleLogic)t._toggleArray=e.split(",");else{t._toggleArray=e.split("."),t._toggleArray[0]||t._toggleArray.shift();for(var a,n=0;a=t._toggleArray[n];n++)t._toggleArray[n]="."+a}t._execAction("_buildToggleArray",1,arguments)},_updateControls:function(a,n){var r,s,o={filter:a.filter,sort:a.sort},l="filter",c=null;this._execAction("_updateControls",0,arguments),a.filter===e&&(o.filter=this._activeFilter),a.sort===e&&(o.sort=this._activeSort),o.filter===this.selectors.target&&(o.filter="all");for(var g=0;2>g;g++)(c=this.controls.live?t(this.selectors[l]):this["_$"+l+"Buttons"])&&(r=c,s="[data-"+l+'="'+o[l]+'"]',n&&"filter"==l&&"none"!==o.filter&&""!==o.filter?r.filter(s).addClass(this.controls.activeClass):r.removeClass(this.controls.activeClass).filter(s).addClass(this.controls.activeClass)),l="sort";this._execAction("_updateControls",1,arguments)},_filter:function(){var e=this;e._execAction("_filter",0);for(var a=0;a<e._$targets.length;a++){var n=t(e._$targets[a]);n.is(e._activeFilter)?e._$show=e._$show.add(n):e._$hide=e._$hide.add(n)}e._execAction("_filter",1)},_sort:function(){var t=this;t._execAction("_sort",0),t._startOrder=[];for(var e=0;e<t._$targets.length;e++){var a=t._$targets[e];t._startOrder.push(a)}switch(t._newSort[0].sortBy){case"default":t._newOrder=t._origOrder;break;case"random":t._newOrder=function(t){for(var e=t.slice(),a=e.length,n=a;n--;){var r=parseInt(Math.random()*a),s=e[n];e[n]=e[r],e[r]=s}return e}(t._startOrder);break;case"custom":t._newOrder=t._newSort[0].order;break;default:t._newOrder=t._startOrder.concat().sort(function(e,a){return t._compare(e,a)})}t._execAction("_sort",1)},_compare:function(t,e,a){a=a||0;var n=this,r=n._newSort[a].order,s=function(t){return t.dataset[n._newSort[a].sortBy]||0},o=isNaN(1*s(t))?s(t).toLowerCase():1*s(t),l=isNaN(1*s(e))?s(e).toLowerCase():1*s(e);return l>o?"asc"==r?-1:1:o>l?"asc"==r?1:-1:o==l&&n._newSort.length>a+1?n._compare(t,e,a+1):0},_printSort:function(t){var e=t?this._startOrder:this._newOrder,a=this._$parent[0].querySelectorAll(this.selectors.target),n=a[a.length-1].nextElementSibling,r=document.createDocumentFragment();this._execAction("_printSort",0,arguments);for(var s=0;s<a.length;s++){var o=a[s],l=o.nextSibling;"absolute"!==o.style.position&&(l&&"#text"==l.nodeName&&this._$parent[0].removeChild(l),this._$parent[0].removeChild(o))}for(var s=0;s<e.length;s++){var c=e[s];if("default"!=this._newSort[0].sortBy||"desc"!=this._newSort[0].order||t)r.appendChild(c),r.appendChild(document.createTextNode(" "));else{var g=r.firstChild;r.insertBefore(c,g),r.insertBefore(document.createTextNode(" "),c)}}n?this._$parent[0].insertBefore(r,n):this._$parent[0].appendChild(r),this._execAction("_printSort",1,arguments)},_parseSort:function(t){for(var e="string"==typeof t?t.split(" "):[t],a=[],n=0;n<e.length;n++){var r="string"==typeof t?e[n].split(":"):["custom",e[n]],s={sortBy:this._helpers._camelCase(r[0]),order:r[1]||"asc"};if(a.push(s),"default"==s.sortBy||"random"==s.sortBy)break}return this._execFilter("_parseSort",a,arguments)},_parseEffects:function(){var t=this,e={opacity:"",transformIn:"",transformOut:"",filter:""},a=function(e,a){if(t.animation.effects.indexOf(e)>-1){if(a){var n=t.animation.effects.indexOf(e+"(");if(n>-1){var r=t.animation.effects.substring(n);return{val:/\(([^)]+)\)/.exec(r)[1]}}}return!0}return!1},n=function(t,n){for(var r=[["scale",".01"],["translateX","20px"],["translateY","20px"],["translateZ","20px"],["rotateX","90deg"],["rotateY","90deg"],["rotateZ","180deg"]],s=0;s<r.length;s++){var o,l,c=r[s][0],g=r[s][1],d=n&&"scale"!==c;e[t]+=a(c)?c+"("+(o=a(c,!0).val||g,(l=d)?"-"===o.charAt(0)?o.substr(1,o.length):"-"+o:o)+") ":""}};return e.opacity=a("fade")?a("fade",!0).val||"0":"1",n("transformIn"),t.animation.reverseOut?n("transformOut",!0):e.transformOut=e.transformIn,e.transition={},e.transition=t._getPrefixedCSS("transition","all "+t.animation.duration+"ms "+t.animation.easing+", opacity "+t.animation.duration+"ms linear"),t.animation.stagger=!!a("stagger"),t.animation.staggerDuration=parseInt(a("stagger")&&a("stagger",!0).val?a("stagger",!0).val:100),t._execFilter("_parseEffects",e)},_buildState:function(t){var e=this,a={};return e._execAction("_buildState",0),a={activeFilter:""===e._activeFilter?"none":e._activeFilter,activeSort:t&&e._newSortString?e._newSortString:e._activeSort,fail:!e._$show.length&&""!==e._activeFilter,$targets:e._$targets,$show:e._$show,$hide:e._$hide,totalTargets:e._$targets.length,totalShow:e._$show.length,totalHide:e._$hide.length,display:t&&e._newDisplay?e._newDisplay:e.layout.display},t?e._execFilter("_buildState",a):(e._state=a,void e._execAction("_buildState",1))},_goMix:function(t){var e=this,a=function(){e._chrome&&31===e._chrome&&s(e._$parent[0]),e._setInter(),n()},n=function(){var t=window.pageYOffset,a=window.pageXOffset;document.documentElement.scrollHeight,e._getInterMixData(),e._setFinal(),e._getFinalMixData(),window.pageYOffset!==t&&window.scrollTo(a,t),e._prepTargets(),window.requestAnimationFrame?requestAnimationFrame(r):setTimeout(function(){r()},20)},r=function(){e._animateTargets(),0===e._targetsBound&&e._cleanUp()},s=function(t){var e=t.parentElement,a=document.createElement("div"),n=document.createDocumentFragment();e.insertBefore(a,t),n.appendChild(t),e.replaceChild(t,a)},o=e._buildState(!0);e._execAction("_goMix",0,arguments),e.animation.duration||(t=!1),e._mixing=!0,e._$container.removeClass(e.layout.containerClassFail),"function"==typeof e.callbacks.onMixStart&&e.callbacks.onMixStart.call(e._domNode,e._state,o,e),e._$container.trigger("mixStart",[e._state,o,e]),e._getOrigMixData(),t&&!e._suckMode?window.requestAnimationFrame?requestAnimationFrame(a):a():e._cleanUp(),e._execAction("_goMix",1,arguments)},_getTargetData:function(t,e){var a;t.dataset[e+"PosX"]=t.offsetLeft,t.dataset[e+"PosY"]=t.offsetTop,this.animation.animateResizeTargets&&(a=window.getComputedStyle(t),t.dataset[e+"MarginBottom"]=parseInt(a.marginBottom),t.dataset[e+"MarginRight"]=parseInt(a.marginRight),t.dataset[e+"Width"]=t.offsetWidth,t.dataset[e+"Height"]=t.offsetHeight)},_getOrigMixData:function(){var t=this,e=t._suckMode?{boxSizing:""}:window.getComputedStyle(t._$parent[0]),a=e.boxSizing||e[t._vendor+"BoxSizing"];t._incPadding="border-box"===a,t._execAction("_getOrigMixData",0),t._suckMode||(t.effects=t._parseEffects()),t._$toHide=t._$hide.filter(":visible"),t._$toShow=t._$show.filter(":hidden"),t._$pre=t._$targets.filter(":visible"),t._startHeight=t._incPadding?t._$parent.outerHeight():t._$parent.height();for(var n=0;n<t._$pre.length;n++){var r=t._$pre[n];t._getTargetData(r,"orig")}t._execAction("_getOrigMixData",1)},_setInter:function(){this._execAction("_setInter",0),this._changingLayout&&this.animation.animateChangeLayout?(this._$toShow.css("display",this._newDisplay),this._changingClass&&this._$container.removeClass(this.layout.containerClass).addClass(this._newClass)):this._$toShow.css("display",this.layout.display),this._execAction("_setInter",1)},_getInterMixData:function(){this._execAction("_getInterMixData",0);for(var t=0;t<this._$toShow.length;t++){var e=this._$toShow[t];this._getTargetData(e,"inter")}for(var t=0;t<this._$pre.length;t++){var e=this._$pre[t];this._getTargetData(e,"inter")}this._execAction("_getInterMixData",1)},_setFinal:function(){this._execAction("_setFinal",0),this._sorting&&this._printSort(),this._$toHide.removeStyle("display"),this._changingLayout&&this.animation.animateChangeLayout&&this._$pre.css("display",this._newDisplay),this._execAction("_setFinal",1)},_getFinalMixData:function(){var t=this;t._execAction("_getFinalMixData",0);for(var e=0;e<t._$toShow.length;e++){var a=t._$toShow[e];t._getTargetData(a,"final")}for(var e=0;e<t._$pre.length;e++){var a=t._$pre[e];t._getTargetData(a,"final")}t._newHeight=t._incPadding?t._$parent.outerHeight():t._$parent.height(),t._sorting&&t._printSort(!0),t._$toShow.removeStyle("display"),t._$pre.css("display",t.layout.display),t._changingClass&&t.animation.animateChangeLayout&&t._$container.removeClass(t._newClass).addClass(t.layout.containerClass),t._execAction("_getFinalMixData",1)},_prepTargets:function(){var e={_in:this._getPrefixedCSS("transform",this.effects.transformIn),_out:this._getPrefixedCSS("transform",this.effects.transformOut)};this._execAction("_prepTargets",0),this.animation.animateResizeContainer&&this._$parent.css("height",this._startHeight+"px");for(var a=0;a<this._$toShow.length;a++){var n=this._$toShow[a],r=t(n);n.style.opacity=this.effects.opacity,n.style.display=this._changingLayout&&this.animation.animateChangeLayout?this._newDisplay:this.layout.display,r.css(e._in),this.animation.animateResizeTargets&&(n.style.width=n.dataset.finalWidth+"px",n.style.height=n.dataset.finalHeight+"px",n.style.marginRight=-(n.dataset.finalWidth-n.dataset.interWidth)+1*n.dataset.finalMarginRight+"px",n.style.marginBottom=-(n.dataset.finalHeight-n.dataset.interHeight)+1*n.dataset.finalMarginBottom+"px")}for(var a=0;a<this._$pre.length;a++){var n=this._$pre[a],r=t(n),s={x:n.dataset.origPosX-n.dataset.interPosX,y:n.dataset.origPosY-n.dataset.interPosY},e=this._getPrefixedCSS("transform","translate("+s.x+"px,"+s.y+"px)");r.css(e),this.animation.animateResizeTargets&&(n.style.width=n.dataset.origWidth+"px",n.style.height=n.dataset.origHeight+"px",n.dataset.origWidth-n.dataset.finalWidth&&(n.style.marginRight=-(n.dataset.origWidth-n.dataset.interWidth)+1*n.dataset.origMarginRight+"px"),n.dataset.origHeight-n.dataset.finalHeight&&(n.style.marginBottom=-(n.dataset.origHeight-n.dataset.interHeight)+1*n.dataset.origMarginBottom+"px"))}this._execAction("_prepTargets",1)},_animateTargets:function(){var e=this;e._execAction("_animateTargets",0),e._targetsDone=0,e._targetsBound=0,e._$parent.css(e._getPrefixedCSS("perspective",e.animation.perspectiveDistance+"px")).css(e._getPrefixedCSS("perspective-origin",e.animation.perspectiveOrigin)),e.animation.animateResizeContainer&&e._$parent.css(e._getPrefixedCSS("transition","height "+e.animation.duration+"ms ease")).css("height",e._newHeight+"px");for(var a=0;a<e._$toShow.length;a++){var n=e._$toShow[a],r=t(n),s={x:n.dataset.finalPosX-n.dataset.interPosX,y:n.dataset.finalPosY-n.dataset.interPosY},o=e._getDelay(a),l={};n.style.opacity="";for(var c=0;2>c;c++){var g=0===c?g=e._prefix:"";e._ff&&e._ff<=20&&(l[g+"transition-property"]="all",l[g+"transition-timing-function"]=e.animation.easing+"ms",l[g+"transition-duration"]=e.animation.duration+"ms"),l[g+"transition-delay"]=o+"ms",l[g+"transform"]="translate("+s.x+"px,"+s.y+"px)"}(e.effects.transform||e.effects.opacity)&&e._bindTargetDone(r),e._ff&&e._ff<=20?r.css(l):r.css(e.effects.transition).css(l)}for(var a=0;a<e._$pre.length;a++){var n=e._$pre[a],r=t(n),s={x:n.dataset.finalPosX-n.dataset.interPosX,y:n.dataset.finalPosY-n.dataset.interPosY},o=e._getDelay(a);(n.dataset.finalPosX!==n.dataset.origPosX||n.dataset.finalPosY!==n.dataset.origPosY)&&e._bindTargetDone(r),r.css(e._getPrefixedCSS("transition","all "+e.animation.duration+"ms "+e.animation.easing+" "+o+"ms")),r.css(e._getPrefixedCSS("transform","translate("+s.x+"px,"+s.y+"px)")),e.animation.animateResizeTargets&&(n.dataset.origWidth-n.dataset.finalWidth&&1*n.dataset.finalWidth&&(n.style.width=n.dataset.finalWidth+"px",n.style.marginRight=-(n.dataset.finalWidth-n.dataset.interWidth)+1*n.dataset.finalMarginRight+"px"),n.dataset.origHeight-n.dataset.finalHeight&&1*n.dataset.finalHeight&&(n.style.height=n.dataset.finalHeight+"px",n.style.marginBottom=-(n.dataset.finalHeight-n.dataset.interHeight)+1*n.dataset.finalMarginBottom+"px"))}e._changingClass&&e._$container.removeClass(e.layout.containerClass).addClass(e._newClass);for(var a=0;a<e._$toHide.length;a++){for(var n=e._$toHide[a],r=t(n),o=e._getDelay(a),d={},c=0;2>c;c++){var g=0===c?g=e._prefix:"";d[g+"transition-delay"]=o+"ms",d[g+"transform"]=e.effects.transformOut,d.opacity=e.effects.opacity}r.css(e.effects.transition).css(d),(e.effects.transform||e.effects.opacity)&&e._bindTargetDone(r)}e._execAction("_animateTargets",1)},_bindTargetDone:function(e){var a=this,n=e[0];a._execAction("_bindTargetDone",0,arguments),n.dataset.bound||(n.dataset.bound=!0,a._targetsBound++,e.on("webkitTransitionEnd.mixItUp transitionend.mixItUp",function(r){(r.originalEvent.propertyName.indexOf("transform")>-1||r.originalEvent.propertyName.indexOf("opacity")>-1)&&t(r.originalEvent.target).is(a.selectors.target)&&(e.off(".mixItUp"),delete n.dataset.bound,a._targetDone())})),a._execAction("_bindTargetDone",1,arguments)},_targetDone:function(){this._execAction("_targetDone",0),this._targetsDone++,this._targetsDone===this._targetsBound&&this._cleanUp(),this._execAction("_targetDone",1)},_cleanUp:function(){var e=this,a=e.animation.animateResizeTargets?"transform opacity width height margin-bottom margin-right":"transform opacity";unBrake=function(){e._$targets.removeStyle("transition",e._prefix)},e._execAction("_cleanUp",0),e._changingLayout?e._$show.css("display",e._newDisplay):e._$show.css("display",e.layout.display),e._$targets.css(e._brake),e._$targets.removeStyle(a,e._prefix).removeAttr("data-inter-pos-x data-inter-pos-y data-final-pos-x data-final-pos-y data-orig-pos-x data-orig-pos-y data-orig-height data-orig-width data-final-height data-final-width data-inter-width data-inter-height data-orig-margin-right data-orig-margin-bottom data-inter-margin-right data-inter-margin-bottom data-final-margin-right data-final-margin-bottom"),e._$hide.removeStyle("display"),e._$parent.removeStyle("height transition perspective-distance perspective perspective-origin-x perspective-origin-y perspective-origin perspectiveOrigin",e._prefix),e._sorting&&(e._printSort(),e._activeSort=e._newSortString,e._sorting=!1),e._changingLayout&&(e._changingDisplay&&(e.layout.display=e._newDisplay,e._changingDisplay=!1),e._changingClass&&(e._$parent.removeClass(e.layout.containerClass).addClass(e._newClass),e.layout.containerClass=e._newClass,e._changingClass=!1),e._changingLayout=!1),e._refresh(),e._buildState(),e._state.fail&&e._$container.addClass(e.layout.containerClassFail),e._$show=t(),e._$hide=t(),window.requestAnimationFrame&&requestAnimationFrame(unBrake),e._mixing=!1,"function"==typeof e.callbacks._user&&e.callbacks._user.call(e._domNode,e._state,e),"function"==typeof e.callbacks.onMixEnd&&e.callbacks.onMixEnd.call(e._domNode,e._state,e),e._$container.trigger("mixEnd",[e._state,e]),e._state.fail&&("function"==typeof e.callbacks.onMixFail&&e.callbacks.onMixFail.call(e._domNode,e._state,e),e._$container.trigger("mixFail",[e._state,e])),e._loading&&("function"==typeof e.callbacks.onMixLoad&&e.callbacks.onMixLoad.call(e._domNode,e._state,e),e._$container.trigger("mixLoad",[e._state,e])),e._queue.length&&(e._execAction("_queue",0),e.multiMix(e._queue[0][0],e._queue[0][1],e._queue[0][2]),e._queue.splice(0,1)),e._execAction("_cleanUp",1),e._loading=!1},_getPrefixedCSS:function(t,e,a){var n={};for(i=0;2>i;i++){var r=0===i?this._prefix:"";n[r+t]=a?r+e:e}return this._execFilter("_getPrefixedCSS",n,arguments)},_getDelay:function(t){var e="function"==typeof this.animation.staggerSequence?this.animation.staggerSequence.call(this._domNode,t,this._state):t,a=this.animation.stagger?e*this.animation.staggerDuration:0;return this._execFilter("_getDelay",a,arguments)},_parseMultiMixArgs:function(t){for(var e={command:null,animate:this.animation.enable,callback:null},a=0;a<t.length;a++){var n=t[a];null!==n&&("object"==typeof n||"string"==typeof n?e.command=n:"boolean"==typeof n?e.animate=n:"function"==typeof n&&(e.callback=n))}return this._execFilter("_parseMultiMixArgs",e,arguments)},_parseInsertArgs:function(e){for(var a={index:0,$object:t(),multiMix:{filter:this._state.activeFilter},callback:null},n=0;n<e.length;n++){var r=e[n];"number"==typeof r?a.index=r:"object"==typeof r&&r instanceof t?a.$object=r:"object"==typeof r&&this._helpers._isElement(r)?a.$object=t(r):"object"==typeof r&&null!==r?a.multiMix=r:"boolean"!=typeof r||r?"function"==typeof r&&(a.callback=r):a.multiMix=!1}return this._execFilter("_parseInsertArgs",a,arguments)},_execAction:function(t,e,a){var n=e?"post":"pre";if(!this._actions.isEmptyObject&&this._actions.hasOwnProperty(t))for(var r in this._actions[t][n])this._actions[t][n][r].call(this,a)},_execFilter:function(t,e,a){if(this._filters.isEmptyObject||!this._filters.hasOwnProperty(t))return e;for(var n in this._filters[t])return this._filters[t][n].call(this,a)},_helpers:{_camelCase:function(t){return t.replace(/-([a-z])/g,function(t){return t[1].toUpperCase()})},_isElement:function(t){return window.HTMLElement?t instanceof HTMLElement:null!==t&&1===t.nodeType&&"string"===t.nodeName}},isMixing:function(){return this._execFilter("isMixing",this._mixing)},filter:function(){var t=this,e=t._parseMultiMixArgs(arguments);t._clicking&&(t._toggleString=""),t.multiMix({filter:e.command},e.animate,e.callback)},sort:function(){var t=this._parseMultiMixArgs(arguments);this.multiMix({sort:t.command},t.animate,t.callback)},changeLayout:function(){var t=this._parseMultiMixArgs(arguments);this.multiMix({changeLayout:t.command},t.animate,t.callback)},multiMix:function(){var t=this,a=t._parseMultiMixArgs(arguments);if(t._execAction("multiMix",0,arguments),t._mixing)t.animation.queue&&t._queue.length<t.animation.queueLimit?(t._queue.push(arguments),t.controls.enable&&!t._clicking&&t._updateControls(a.command),t._execAction("multiMixQueue",1,arguments)):("function"==typeof t.callbacks.onMixBusy&&t.callbacks.onMixBusy.call(t._domNode,t._state,t),t._$container.trigger("mixBusy",[t._state,t]),t._execAction("multiMixBusy",1,arguments));else{t.controls.enable&&!t._clicking&&(t.controls.toggleFilterButtons&&t._buildToggleArray(),t._updateControls(a.command,t.controls.toggleFilterButtons)),t._queue.length<2&&(t._clicking=!1),delete t.callbacks._user,a.callback&&(t.callbacks._user=a.callback);var n=a.command.sort,r=a.command.filter,s=a.command.changeLayout;t._refresh(),n&&(t._newSort=t._parseSort(n),t._newSortString=n,t._sorting=!0,t._sort()),r!==e&&(r="all"===r?t.selectors.target:r,t._activeFilter=r),t._filter(),s&&(t._newDisplay="string"==typeof s?s:s.display||t.layout.display,t._newClass=s.containerClass||"",(t._newDisplay!==t.layout.display||t._newClass!==t.layout.containerClass)&&(t._changingLayout=!0,t._changingClass=t._newClass!==t.layout.containerClass,t._changingDisplay=t._newDisplay!==t.layout.display)),t._$targets.css(t._brake),t._goMix(a.animate^t.animation.enable?a.animate:t.animation.enable),t._execAction("multiMix",1,arguments)}},insert:function(){var t=this._parseInsertArgs(arguments),e="function"==typeof t.callback?t.callback:null,a=document.createDocumentFragment(),n=(this._refresh(),this._$targets.length?t.index<this._$targets.length||!this._$targets.length?this._$targets[t.index]:this._$targets[this._$targets.length-1].nextElementSibling:this._$parent[0].children[0]);if(this._execAction("insert",0,arguments),t.$object){for(var r=0;r<t.$object.length;r++){var s=t.$object[r];a.appendChild(s),a.appendChild(document.createTextNode(" "))}this._$parent[0].insertBefore(a,n)}this._execAction("insert",1,arguments),"object"==typeof t.multiMix&&this.multiMix(t.multiMix,e)},prepend:function(){var t=this._parseInsertArgs(arguments);this.insert(0,t.$object,t.multiMix,t.callback)},append:function(){var t=this._parseInsertArgs(arguments);this.insert(this._state.totalTargets,t.$object,t.multiMix,t.callback)},getOption:function(t){return t?this._execFilter("getOption",function(t,a){for(var n=a.split("."),r=n.pop(),s=n.length,o=1,l=n[0]||a;(t=t[l])&&s>o;)l=n[o],o++;return t!==e?t[r]!==e?t[r]:t:void 0}(this,t),arguments):this},setOptions:function(e){this._execAction("setOptions",0,arguments),"object"==typeof e&&t.extend(!0,this,e),this._execAction("setOptions",1,arguments)},getState:function(){return this._execFilter("getState",this._state,this)},forceRefresh:function(){this._refresh(!1,!0)},destroy:function(e){this._execAction("destroy",0,arguments),this._$body.add(t(this.selectors.sort)).add(t(this.selectors.filter)).off(".mixItUp");for(var a=0;a<this._$targets.length;a++){var n=this._$targets[a];e&&(n.style.display=""),delete n.mixParent}this._execAction("destroy",1,arguments),delete t.MixItUp.prototype._instances[this._id]}},t.fn.mixItUp=function(){var a,n=arguments,r=[],s=function(e,a){var n=new t.MixItUp;n._execAction("_instantiate",0,arguments),e.id=e.id?e.id:"MixItUp"+("00000"+(16777216*Math.random()<<0).toString(16)).substr(-6).toUpperCase(),n._instances[e.id]||(n._instances[e.id]=n,n._init(e,a)),n._execAction("_instantiate",1,arguments)};return a=this.each(function(){if(n&&"string"==typeof n[0]){var a=t.MixItUp.prototype._instances[this.id];if("isLoaded"==n[0])r.push(!!a);else{var o=a[n[0]](n[1],n[2],n[3]);o!==e&&r.push(o)}}else s(this,n[0])}),r.length?r.length>1?r:r[0]:a},t.fn.removeStyle=function(t,a){return a=a||"",this.each(function(){for(var n=this,r=t.split(" "),s=0;s<r.length;s++)for(var o=0;2>o;o++){var l=o?r[s]:a+r[s];if(n.style[l]!==e&&"unknown"!=typeof n.style[l]&&n.style[l].length>0&&(n.style[l]=""),!a)break}n.attributes&&n.attributes.style&&n.attributes.style!==e&&""===n.attributes.style.value&&n.attributes.removeNamedItem("style")})}}(jQuery);



$(document).ready(function(){(e=jQuery).fn.parallax=function(t){var i=e(window).height(),a=e.extend({speed:.15},t);return this.each(function(){var t=e(this);e(document).scroll(function(){var s=e(window).scrollTop(),l=t.offset().top;if(!(l+t.outerHeight()<=s)&&!(l>=s+i)){var o=Math.round((l-s)*a.speed);t.css("background-position","center "+o+"px")}})})},$(window).load(function(){$(".loader-overlay").fadeOut("slow")}),$(".counter").counterUp({delay:10,time:1e3}),$("a[data-rel^=lightcase]").lightcase(),$(".portfolio-items").mixItUp({animation:{duration:300}}),$(".cl-client-carousel").owlCarousel({pagination:!0,slideSpeed:300,paginationSpeed:400,singleItem:!0,autoPlay:!0}),$(".cl-logo-carousel").owlCarousel({items:6,itemsDesktop:[1199,5],itemsDesktopSmall:[979,3],stopOnHover:!0,autoPlay:3e3}),$(".header-carousel").owlCarousel({pagination:!0,navigation:!0,slideSpeed:500,paginationSpeed:500,singleItem:!0,autoPlay:!0}),$(".parallax-section").parallax({speed:.1}),$(function(){var e=$(".header-home");$(window).scroll(function(){$(window).scrollTop()>=100?e.removeClass("header-home").addClass("header-default"):e.removeClass("header-default").addClass("header-home")})}),$(".nav-container").onePageNav({scrollSpeed:600,currentClass:"current",changeHash:!0,filter:":not(.external)"});var e,t=$(window);function i(){767>t.width()&&$("#top-header").removeClass("header-home").addClass("header-default"),t.width()>=767&&$("#top-header").removeClass("header-default").addClass("header-home")}i(),$(window).resize(i),navigator.userAgent.toLowerCase().indexOf("trident");var a="#1abc9c",s={center:new google.maps.LatLng(45.537383,-73.597623),zoom:14,panControl:!1,zoomControl:!1,mapTypeControl:!1,streetViewControl:!1,mapTypeId:google.maps.MapTypeId.ROADMAP,scrollwheel:!1,styles:[{elementType:"labels",stylers:[{saturation:-20}]},{featureType:"poi",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road.highway",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road.local",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"geometry.fill",stylers:[{hue:a},{visibility:"on"},{lightness:5},{saturation:-20}]},{featureType:"poi",elementType:"geometry.fill",stylers:[{hue:a},{visibility:"on"},{lightness:5},{saturation:-20}]},{featureType:"poi.government",elementType:"geometry.fill",stylers:[{hue:a},{visibility:"on"},{lightness:5},{saturation:-20}]},{featureType:"poi.sport_complex",elementType:"geometry.fill",stylers:[{hue:a},{visibility:"on"},{lightness:5},{saturation:-20}]},{featureType:"poi.attraction",elementType:"geometry.fill",stylers:[{hue:a},{visibility:"on"},{lightness:5},{saturation:-20}]},{featureType:"poi.business",elementType:"geometry.fill",stylers:[{hue:a},{visibility:"on"},{lightness:5},{saturation:-20}]},{featureType:"transit",elementType:"geometry.fill",stylers:[{hue:a},{visibility:"on"},{lightness:5},{saturation:-20}]},{featureType:"transit.station",elementType:"geometry.fill",stylers:[{hue:a},{visibility:"on"},{lightness:5},{saturation:-20}]},{featureType:"landscape",stylers:[{hue:a},{visibility:"on"},{lightness:5},{saturation:-20}]},{featureType:"road",elementType:"geometry.fill",stylers:[{hue:a},{visibility:"on"},{lightness:5},{saturation:-20}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{hue:a},{visibility:"on"},{lightness:5},{saturation:-20}]},{featureType:"water",elementType:"geometry",stylers:[{hue:a},{visibility:"on"},{lightness:5},{saturation:-20}]}]},l=new google.maps.Map(document.getElementById("google-container"),s);new google.maps.Marker({position:new google.maps.LatLng(45.537383,-73.597623),map:l,visible:!0,icon:"http://i.imgur.com/TYdWTLk.png"});var o=document.createElement("div");new function e(t,i){var a=document.getElementById("cd-zoom-in"),s=document.getElementById("cd-zoom-out");t.appendChild(a),t.appendChild(s),google.maps.event.addDomListener(a,"click",function(){i.setZoom(i.getZoom()+1)}),google.maps.event.addDomListener(s,"click",function(){i.setZoom(i.getZoom()-1)})}(o,l),l.controls[google.maps.ControlPosition.LEFT_TOP].push(o)});


/*! jQuery v2.0.3 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license

//@ sourceMappingURL=jquery-2.0.3.min.map

*/

(function(e,undefined){var t,n,r=typeof undefined,i=e.location,o=e.document,s=o.documentElement,a=e.jQuery,u=e.$,l={},c=[],p="2.0.3",f=c.concat,h=c.push,d=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,x=function(e,n){return new x.fn.init(e,n,t)},b=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^-ms-/,N=/-([\da-z])/gi,E=function(e,t){return t.toUpperCase()},S=function(){o.removeEventListener("DOMContentLoaded",S,!1),e.removeEventListener("load",S,!1),x.ready()};x.fn=x.prototype={jquery:p,constructor:x,init:function(e,t,n){var r,i;if(!e)return this;if("string"==typeof e){if(r="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:T.exec(e),!r||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof x?t[0]:t,x.merge(this,x.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:o,!0)),C.test(r[1])&&x.isPlainObject(t))for(r in t)x.isFunction(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return i=o.getElementById(r[2]),i&&i.parentNode&&(this.length=1,this[0]=i),this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?n.ready(e):(e.selector!==undefined&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return d.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,t,n,r,i,o,s=arguments[0]||{},a=1,u=arguments.length,l=!1;for("boolean"==typeof s&&(l=s,s=arguments[1]||{},a=2),"object"==typeof s||x.isFunction(s)||(s={}),u===a&&(s=this,--a);u>a;a++)if(null!=(e=arguments[a]))for(t in e)n=s[t],r=e[t],s!==r&&(l&&r&&(x.isPlainObject(r)||(i=x.isArray(r)))?(i?(i=!1,o=n&&x.isArray(n)?n:[]):o=n&&x.isPlainObject(n)?n:{},s[t]=x.extend(l,o,r)):r!==undefined&&(s[t]=r));return s},x.extend({expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=a),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){(e===!0?--x.readyWait:x.isReady)||(x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(o,[x]),x.fn.trigger&&x(o).trigger("ready").off("ready")))},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if("object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}return!0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:JSON.parse,parseXML:function(e){var t,n;if(!e||"string"!=typeof e)return null;try{n=new DOMParser,t=n.parseFromString(e,"text/xml")}catch(r){t=undefined}return(!t||t.getElementsByTagName("parsererror").length)&&x.error("Invalid XML: "+e),t},noop:function(){},globalEval:function(e){var t,n=eval;e=x.trim(e),e&&(1===e.indexOf("use strict")?(t=o.createElement("script"),t.text=e,o.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){return e.replace(k,"ms-").replace(N,E)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,s=j(e);if(n){if(s){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(s){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:function(e){return null==e?"":v.call(e)},makeArray:function(e,t){var n=t||[];return null!=e&&(j(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:g.call(t,e,n)},merge:function(e,t){var n=t.length,r=e.length,i=0;if("number"==typeof n)for(;n>i;i++)e[r++]=t[i];else while(t[i]!==undefined)e[r++]=t[i++];return e.length=r,e},grep:function(e,t,n){var r,i=[],o=0,s=e.length;for(n=!!n;s>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,s=j(e),a=[];if(s)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(a[a.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(a[a.length]=r);return f.apply([],a)},guid:1,proxy:function(e,t){var n,r,i;return"string"==typeof t&&(n=e[t],t=e,e=n),x.isFunction(e)?(r=d.call(arguments,2),i=function(){return e.apply(t||this,r.concat(d.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):undefined},access:function(e,t,n,r,i,o,s){var a=0,u=e.length,l=null==n;if("object"===x.type(n)){i=!0;for(a in n)x.access(e,t,a,n[a],!0,o,s)}else if(r!==undefined&&(i=!0,x.isFunction(r)||(s=!0),l&&(s?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(x(e),n)})),t))for(;u>a;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)));return i?e:l?t.call(e):u?t(e[0],n):o},now:Date.now,swap:function(e,t,n,r){var i,o,s={};for(o in t)s[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=s[o];return i}}),x.ready.promise=function(t){return n||(n=x.Deferred(),"complete"===o.readyState?setTimeout(x.ready):(o.addEventListener("DOMContentLoaded",S,!1),e.addEventListener("load",S,!1))),n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function j(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}t=x(o),function(e,undefined){var t,n,r,i,o,s,a,u,l,c,p,f,h,d,g,m,y,v="sizzle"+-new Date,b=e.document,w=0,T=0,C=st(),k=st(),N=st(),E=!1,S=function(e,t){return e===t?(E=!0,0):0},j=typeof undefined,D=1<<31,A={}.hasOwnProperty,L=[],q=L.pop,H=L.push,O=L.push,F=L.slice,P=L.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",W="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",$=W.replace("w","w#"),B="\\["+M+"*("+W+")"+M+"*(?:([*^$|!~]?=)"+M+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+$+")|)|)"+M+"*\\]",I=":("+W+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+B.replace(3,8)+")*)|.*)\\)|)",z=RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=RegExp("^"+M+"*,"+M+"*"),X=RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=RegExp(M+"*[+~]"),Y=RegExp("="+M+"*([^\\]'\"]*)"+M+"*\\]","g"),V=RegExp(I),G=RegExp("^"+$+"$"),J={ID:RegExp("^#("+W+")"),CLASS:RegExp("^\\.("+W+")"),TAG:RegExp("^("+W.replace("w","w*")+")"),ATTR:RegExp("^"+B),PSEUDO:RegExp("^"+I),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:RegExp("^(?:"+R+")$","i"),needsContext:RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Q=/^[^{]+\{\s*\[native \w/,K=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,Z=/^(?:input|select|textarea|button)$/i,et=/^h\d$/i,tt=/'|\\/g,nt=RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),rt=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{O.apply(L=F.call(b.childNodes),b.childNodes),L[b.childNodes.length].nodeType}catch(it){O={apply:L.length?function(e,t){H.apply(e,F.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function ot(e,t,r,i){var o,s,a,u,l,f,g,m,x,w;if((t?t.ownerDocument||t:b)!==p&&c(t),t=t||p,r=r||[],!e||"string"!=typeof e)return r;if(1!==(u=t.nodeType)&&9!==u)return[];if(h&&!i){if(o=K.exec(e))if(a=o[1]){if(9===u){if(s=t.getElementById(a),!s||!s.parentNode)return r;if(s.id===a)return r.push(s),r}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(a))&&y(t,s)&&s.id===a)return r.push(s),r}else{if(o[2])return O.apply(r,t.getElementsByTagName(e)),r;if((a=o[3])&&n.getElementsByClassName&&t.getElementsByClassName)return O.apply(r,t.getElementsByClassName(a)),r}if(n.qsa&&(!d||!d.test(e))){if(m=g=v,x=t,w=9===u&&e,1===u&&"object"!==t.nodeName.toLowerCase()){f=gt(e),(g=t.getAttribute("id"))?m=g.replace(tt,"\\$&"):t.setAttribute("id",m),m="[id='"+m+"'] ",l=f.length;while(l--)f[l]=m+mt(f[l]);x=U.test(e)&&t.parentNode||t,w=f.join(",")}if(w)try{return O.apply(r,x.querySelectorAll(w)),r}catch(T){}finally{g||t.removeAttribute("id")}}}return kt(e.replace(z,"$1"),t,r,i)}function st(){var e=[];function t(n,r){return e.push(n+=" ")>i.cacheLength&&delete t[e.shift()],t[n]=r}return t}function at(e){return e[v]=!0,e}function ut(e){var t=p.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function lt(e,t){var n=e.split("|"),r=e.length;while(r--)i.attrHandle[n[r]]=t}function ct(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||D)-(~e.sourceIndex||D);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function pt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ft(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function ht(e){return at(function(t){return t=+t,at(function(n,r){var i,o=e([],n.length,t),s=o.length;while(s--)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))})})}s=ot.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},n=ot.support={},c=ot.setDocument=function(e){var t=e?e.ownerDocument||e:b,r=t.defaultView;return t!==p&&9===t.nodeType&&t.documentElement?(p=t,f=t.documentElement,h=!s(t),r&&r.attachEvent&&r!==r.top&&r.attachEvent("onbeforeunload",function(){c()}),n.attributes=ut(function(e){return e.className="i",!e.getAttribute("className")}),n.getElementsByTagName=ut(function(e){return e.appendChild(t.createComment("")),!e.getElementsByTagName("*").length}),n.getElementsByClassName=ut(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),n.getById=ut(function(e){return f.appendChild(e).id=v,!t.getElementsByName||!t.getElementsByName(v).length}),n.getById?(i.find.ID=function(e,t){if(typeof t.getElementById!==j&&h){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){return e.getAttribute("id")===t}}):(delete i.find.ID,i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){var n=typeof e.getAttributeNode!==j&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=n.getElementsByTagName?function(e,t){return typeof t.getElementsByTagName!==j?t.getElementsByTagName(e):undefined}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.CLASS=n.getElementsByClassName&&function(e,t){return typeof t.getElementsByClassName!==j&&h?t.getElementsByClassName(e):undefined},g=[],d=[],(n.qsa=Q.test(t.querySelectorAll))&&(ut(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||d.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll(":checked").length||d.push(":checked")}),ut(function(e){var n=t.createElement("input");n.setAttribute("type","hidden"),e.appendChild(n).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&d.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||d.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),d.push(",.*:")})),(n.matchesSelector=Q.test(m=f.webkitMatchesSelector||f.mozMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&ut(function(e){n.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",I)}),d=d.length&&RegExp(d.join("|")),g=g.length&&RegExp(g.join("|")),y=Q.test(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},S=f.compareDocumentPosition?function(e,r){if(e===r)return E=!0,0;var i=r.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(r);return i?1&i||!n.sortDetached&&r.compareDocumentPosition(e)===i?e===t||y(b,e)?-1:r===t||y(b,r)?1:l?P.call(l,e)-P.call(l,r):0:4&i?-1:1:e.compareDocumentPosition?-1:1}:function(e,n){var r,i=0,o=e.parentNode,s=n.parentNode,a=[e],u=[n];if(e===n)return E=!0,0;if(!o||!s)return e===t?-1:n===t?1:o?-1:s?1:l?P.call(l,e)-P.call(l,n):0;if(o===s)return ct(e,n);r=e;while(r=r.parentNode)a.unshift(r);r=n;while(r=r.parentNode)u.unshift(r);while(a[i]===u[i])i++;return i?ct(a[i],u[i]):a[i]===b?-1:u[i]===b?1:0},t):p},ot.matches=function(e,t){return ot(e,null,null,t)},ot.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Y,"='$1']"),!(!n.matchesSelector||!h||g&&g.test(t)||d&&d.test(t)))try{var r=m.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(i){}return ot(t,p,null,[e]).length>0},ot.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},ot.attr=function(e,t){(e.ownerDocument||e)!==p&&c(e);var r=i.attrHandle[t.toLowerCase()],o=r&&A.call(i.attrHandle,t.toLowerCase())?r(e,t,!h):undefined;return o===undefined?n.attributes||!h?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null:o},ot.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},ot.uniqueSort=function(e){var t,r=[],i=0,o=0;if(E=!n.detectDuplicates,l=!n.sortStable&&e.slice(0),e.sort(S),E){while(t=e[o++])t===e[o]&&(i=r.push(o));while(i--)e.splice(r[i],1)}return e},o=ot.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=ot.selectors={cacheLength:50,createPseudo:at,match:J,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(nt,rt),e[3]=(e[4]||e[5]||"").replace(nt,rt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||ot.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&ot.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return J.CHILD.test(e[0])?null:(e[3]&&e[4]!==undefined?e[2]=e[4]:n&&V.test(n)&&(t=gt(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(nt,rt).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=C[e+" "];return t||(t=RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&C(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==j&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=ot.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,h,d,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,y=a&&t.nodeName.toLowerCase(),x=!u&&!a;if(m){if(o){while(g){p=t;while(p=p[g])if(a?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;d=g="only"===e&&!d&&"nextSibling"}return!0}if(d=[s?m.firstChild:m.lastChild],s&&x){c=m[v]||(m[v]={}),l=c[e]||[],h=l[0]===w&&l[1],f=l[0]===w&&l[2],p=h&&m.childNodes[h];while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[w,h,f];break}}else if(x&&(l=(t[v]||(t[v]={}))[e])&&l[0]===w)f=l[1];else while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if((a?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(x&&((p[v]||(p[v]={}))[e]=[w,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||ot.error("unsupported pseudo: "+e);return r[v]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?at(function(e,n){var i,o=r(e,t),s=o.length;while(s--)i=P.call(e,o[s]),e[i]=!(n[i]=o[s])}):function(e){return r(e,0,n)}):r}},pseudos:{not:at(function(e){var t=[],n=[],r=a(e.replace(z,"$1"));return r[v]?at(function(e,t,n,i){var o,s=r(e,null,i,[]),a=e.length;while(a--)(o=s[a])&&(e[a]=!(t[a]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:at(function(e){return function(t){return ot(e,t).length>0}}),contains:at(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:at(function(e){return G.test(e||"")||ot.error("unsupported lang: "+e),e=e.replace(nt,rt).toLowerCase(),function(t){var n;do if(n=h?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return et.test(e.nodeName)},input:function(e){return Z.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:ht(function(){return[0]}),last:ht(function(e,t){return[t-1]}),eq:ht(function(e,t,n){return[0>n?n+t:n]}),even:ht(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:ht(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:ht(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:ht(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}},i.pseudos.nth=i.pseudos.eq;for(t in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[t]=pt(t);for(t in{submit:!0,reset:!0})i.pseudos[t]=ft(t);function dt(){}dt.prototype=i.filters=i.pseudos,i.setFilters=new dt;function gt(e,t){var n,r,o,s,a,u,l,c=k[e+" "];if(c)return t?0:c.slice(0);a=e,u=[],l=i.preFilter;while(a){(!n||(r=_.exec(a)))&&(r&&(a=a.slice(r[0].length)||a),u.push(o=[])),n=!1,(r=X.exec(a))&&(n=r.shift(),o.push({value:n,type:r[0].replace(z," ")}),a=a.slice(n.length));for(s in i.filter)!(r=J[s].exec(a))||l[s]&&!(r=l[s](r))||(n=r.shift(),o.push({value:n,type:s,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?ot.error(e):k(e,u).slice(0)}function mt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function yt(e,t,n){var i=t.dir,o=n&&"parentNode"===i,s=T++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,a){var u,l,c,p=w+" "+s;if(a){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,a))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[v]||(t[v]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,a)||r,l[1]===!0)return!0}}function vt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function xt(e,t,n,r,i){var o,s=[],a=0,u=e.length,l=null!=t;for(;u>a;a++)(o=e[a])&&(!n||n(o,r,i))&&(s.push(o),l&&t.push(a));return s}function bt(e,t,n,r,i,o){return r&&!r[v]&&(r=bt(r)),i&&!i[v]&&(i=bt(i,o)),at(function(o,s,a,u){var l,c,p,f=[],h=[],d=s.length,g=o||Ct(t||"*",a.nodeType?[a]:a,[]),m=!e||!o&&t?g:xt(g,f,e,a,u),y=n?i||(o?e:d||r)?[]:s:m;if(n&&n(m,y,a,u),r){l=xt(y,h),r(l,[],a,u),c=l.length;while(c--)(p=l[c])&&(y[h[c]]=!(m[h[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?P.call(o,p):f[c])>-1&&(o[l]=!(s[l]=p))}}else y=xt(y===s?y.splice(d,y.length):y),i?i(null,s,y,u):O.apply(s,y)})}function wt(e){var t,n,r,o=e.length,s=i.relative[e[0].type],a=s||i.relative[" "],l=s?1:0,c=yt(function(e){return e===t},a,!0),p=yt(function(e){return P.call(t,e)>-1},a,!0),f=[function(e,n,r){return!s&&(r||n!==u)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>l;l++)if(n=i.relative[e[l].type])f=[yt(vt(f),n)];else{if(n=i.filter[e[l].type].apply(null,e[l].matches),n[v]){for(r=++l;o>r;r++)if(i.relative[e[r].type])break;return bt(l>1&&vt(f),l>1&&mt(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(z,"$1"),n,r>l&&wt(e.slice(l,r)),o>r&&wt(e=e.slice(r)),o>r&&mt(e))}f.push(n)}return vt(f)}function Tt(e,t){var n=0,o=t.length>0,s=e.length>0,a=function(a,l,c,f,h){var d,g,m,y=[],v=0,x="0",b=a&&[],T=null!=h,C=u,k=a||s&&i.find.TAG("*",h&&l.parentNode||l),N=w+=null==C?1:Math.random()||.1;for(T&&(u=l!==p&&l,r=n);null!=(d=k[x]);x++){if(s&&d){g=0;while(m=e[g++])if(m(d,l,c)){f.push(d);break}T&&(w=N,r=++n)}o&&((d=!m&&d)&&v--,a&&b.push(d))}if(v+=x,o&&x!==v){g=0;while(m=t[g++])m(b,y,l,c);if(a){if(v>0)while(x--)b[x]||y[x]||(y[x]=q.call(f));y=xt(y)}O.apply(f,y),T&&!a&&y.length>0&&v+t.length>1&&ot.uniqueSort(f)}return T&&(w=N,u=C),b};return o?at(a):a}a=ot.compile=function(e,t){var n,r=[],i=[],o=N[e+" "];if(!o){t||(t=gt(e)),n=t.length;while(n--)o=wt(t[n]),o[v]?r.push(o):i.push(o);o=N(e,Tt(i,r))}return o};function Ct(e,t,n){var r=0,i=t.length;for(;i>r;r++)ot(e,t[r],n);return n}function kt(e,t,r,o){var s,u,l,c,p,f=gt(e);if(!o&&1===f.length){if(u=f[0]=f[0].slice(0),u.length>2&&"ID"===(l=u[0]).type&&n.getById&&9===t.nodeType&&h&&i.relative[u[1].type]){if(t=(i.find.ID(l.matches[0].replace(nt,rt),t)||[])[0],!t)return r;e=e.slice(u.shift().value.length)}s=J.needsContext.test(e)?0:u.length;while(s--){if(l=u[s],i.relative[c=l.type])break;if((p=i.find[c])&&(o=p(l.matches[0].replace(nt,rt),U.test(u[0].type)&&t.parentNode||t))){if(u.splice(s,1),e=o.length&&mt(u),!e)return O.apply(r,o),r;break}}}return a(e,f)(o,t,!h,r,U.test(e)),r}n.sortStable=v.split("").sort(S).join("")===v,n.detectDuplicates=E,c(),n.sortDetached=ut(function(e){return 1&e.compareDocumentPosition(p.createElement("div"))}),ut(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||lt("type|href|height|width",function(e,t,n){return n?undefined:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),n.attributes&&ut(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||lt("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?undefined:e.defaultValue}),ut(function(e){return null==e.getAttribute("disabled")})||lt(R,function(e,t,n){var r;return n?undefined:(r=e.getAttributeNode(t))&&r.specified?r.value:e[t]===!0?t.toLowerCase():null}),x.find=ot,x.expr=ot.selectors,x.expr[":"]=x.expr.pseudos,x.unique=ot.uniqueSort,x.text=ot.getText,x.isXMLDoc=ot.isXML,x.contains=ot.contains}(e);var D={};function A(e){var t=D[e]={};return x.each(e.match(w)||[],function(e,n){t[n]=!0}),t}x.Callbacks=function(e){e="string"==typeof e?D[e]||A(e):x.extend({},e);var t,n,r,i,o,s,a=[],u=!e.once&&[],l=function(p){for(t=e.memory&&p,n=!0,s=i||0,i=0,o=a.length,r=!0;a&&o>s;s++)if(a[s].apply(p[0],p[1])===!1&&e.stopOnFalse){t=!1;break}r=!1,a&&(u?u.length&&l(u.shift()):t?a=[]:c.disable())},c={add:function(){if(a){var n=a.length;(function s(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&c.has(n)||a.push(n):n&&n.length&&"string"!==r&&s(n)})})(arguments),r?o=a.length:t&&(i=n,l(t))}return this},remove:function(){return a&&x.each(arguments,function(e,t){var n;while((n=x.inArray(t,a,n))>-1)a.splice(n,1),r&&(o>=n&&o--,s>=n&&s--)}),this},has:function(e){return e?x.inArray(e,a)>-1:!(!a||!a.length)},empty:function(){return a=[],o=0,this},disable:function(){return a=u=t=undefined,this},disabled:function(){return!a},lock:function(){return u=undefined,t||c.disable(),this},locked:function(){return!u},fireWith:function(e,t){return!a||n&&!u||(t=t||[],t=[e,t.slice?t.slice():t],r?u.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!n}};return c},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,o){var s=o[0],a=x.isFunction(e[t])&&e[t];i[o[1]](function(){var e=a&&a.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===r?n.promise():this,a?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,o){var s=o[2],a=o[3];r[o[1]]=s.add,a&&s.add(function(){n=a},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=s.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=d.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,o=1===i?e:x.Deferred(),s=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?d.call(arguments):r,n===a?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},a,u,l;if(r>1)for(a=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(s(t,l,n)).fail(o.reject).progress(s(t,u,a)):--i;return i||o.resolveWith(l,n),o.promise()}}),x.support=function(t){var n=o.createElement("input"),r=o.createDocumentFragment(),i=o.createElement("div"),s=o.createElement("select"),a=s.appendChild(o.createElement("option"));return n.type?(n.type="checkbox",t.checkOn=""!==n.value,t.optSelected=a.selected,t.reliableMarginRight=!0,t.boxSizingReliable=!0,t.pixelPosition=!1,n.checked=!0,t.noCloneChecked=n.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!a.disabled,n=o.createElement("input"),n.value="t",n.type="radio",t.radioValue="t"===n.value,n.setAttribute("checked","t"),n.setAttribute("name","t"),r.appendChild(n),t.checkClone=r.cloneNode(!0).cloneNode(!0).lastChild.checked,t.focusinBubbles="onfocusin"in e,i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===i.style.backgroundClip,x(function(){var n,r,s="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",a=o.getElementsByTagName("body")[0];a&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",a.appendChild(n).appendChild(i),i.innerHTML="",i.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",x.swap(a,null!=a.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===i.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(i,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(i,null)||{width:"4px"}).width,r=i.appendChild(o.createElement("div")),r.style.cssText=i.style.cssText=s,r.style.marginRight=r.style.width="0",i.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),a.removeChild(n))}),t):t}({});var L,q,H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,O=/([A-Z])/g;function F(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=x.expando+Math.random()}F.uid=1,F.accepts=function(e){return e.nodeType?1===e.nodeType||9===e.nodeType:!0},F.prototype={key:function(e){if(!F.accepts(e))return 0;var t={},n=e[this.expando];if(!n){n=F.uid++;try{t[this.expando]={value:n},Object.defineProperties(e,t)}catch(r){t[this.expando]=n,x.extend(e,t)}}return this.cache[n]||(this.cache[n]={}),n},set:function(e,t,n){var r,i=this.key(e),o=this.cache[i];if("string"==typeof t)o[t]=n;else if(x.isEmptyObject(o))x.extend(this.cache[i],t);else for(r in t)o[r]=t[r];return o},get:function(e,t){var n=this.cache[this.key(e)];return t===undefined?n:n[t]},access:function(e,t,n){var r;return t===undefined||t&&"string"==typeof t&&n===undefined?(r=this.get(e,t),r!==undefined?r:this.get(e,x.camelCase(t))):(this.set(e,t,n),n!==undefined?n:t)},remove:function(e,t){var n,r,i,o=this.key(e),s=this.cache[o];if(t===undefined)this.cache[o]={};else{x.isArray(t)?r=t.concat(t.map(x.camelCase)):(i=x.camelCase(t),t in s?r=[t,i]:(r=i,r=r in s?[r]:r.match(w)||[])),n=r.length;while(n--)delete s[r[n]]}},hasData:function(e){return!x.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){e[this.expando]&&delete this.cache[e[this.expando]]}},L=new F,q=new F,x.extend({acceptData:F.accepts,hasData:function(e){return L.hasData(e)||q.hasData(e)},data:function(e,t,n){return L.access(e,t,n)},removeData:function(e,t){L.remove(e,t)},_data:function(e,t,n){return q.access(e,t,n)},_removeData:function(e,t){q.remove(e,t)}}),x.fn.extend({data:function(e,t){var n,r,i=this[0],o=0,s=null;if(e===undefined){if(this.length&&(s=L.get(i),1===i.nodeType&&!q.get(i,"hasDataAttrs"))){for(n=i.attributes;n.length>o;o++)r=n[o].name,0===r.indexOf("data-")&&(r=x.camelCase(r.slice(5)),P(i,r,s[r]));q.set(i,"hasDataAttrs",!0)}return s}return"object"==typeof e?this.each(function(){L.set(this,e)}):x.access(this,function(t){var n,r=x.camelCase(e);if(i&&t===undefined){if(n=L.get(i,e),n!==undefined)return n;if(n=L.get(i,r),n!==undefined)return n;if(n=P(i,r,undefined),n!==undefined)return n}else this.each(function(){var n=L.get(this,r);L.set(this,r,t),-1!==e.indexOf("-")&&n!==undefined&&L.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){L.remove(this,e)})}});function P(e,t,n){var r;if(n===undefined&&1===e.nodeType)if(r="data-"+t.replace(O,"-$1").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:H.test(n)?JSON.parse(n):n}catch(i){}L.set(e,t,n)}else n=undefined;return n}x.extend({queue:function(e,t,n){var r;return e?(t=(t||"fx")+"queue",r=q.get(e,t),n&&(!r||x.isArray(n)?r=q.access(e,t,x.makeArray(n)):r.push(n)),r||[]):undefined},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),o=x._queueHooks(e,t),s=function(){x.dequeue(e,t)

};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,s,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return q.get(e,n)||q.access(e,n,{empty:x.Callbacks("once memory").add(function(){q.remove(e,[t+"queue",n])})})}}),x.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),n>arguments.length?x.queue(this[0],e):t===undefined?this:this.each(function(){var n=x.queue(this,e,t);x._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=x.Deferred(),o=this,s=this.length,a=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=undefined),e=e||"fx";while(s--)n=q.get(o[s],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(a));return a(),i.promise(t)}});var R,M,W=/[\t\r\n\f]/g,$=/\r/g,B=/^(?:input|select|textarea|button)$/i;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[x.propFix[e]||e]})},addClass:function(e){var t,n,r,i,o,s=0,a=this.length,u="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,s=0,a=this.length,u=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var t,i=0,o=x(this),s=e.match(w)||[];while(t=s[i++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else(n===r||"boolean"===n)&&(this.className&&q.set(this,"__className__",this.className),this.className=this.className||e===!1?"":q.get(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(W," ").indexOf(t)>=0)return!0;return!1},val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=x.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,x(this).val()):e,null==i?i="":"number"==typeof i?i+="":x.isArray(i)&&(i=x.map(i,function(e){return null==e?"":e+""})),t=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&t.set(this,i,"value")!==undefined||(this.value=i))});if(i)return t=x.valHooks[i.type]||x.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&(n=t.get(i,"value"))!==undefined?n:(n=i.value,"string"==typeof n?n.replace($,""):null==n?"":n)}}}),x.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,s=o?null:[],a=o?i+1:r.length,u=0>i?a:o?i:0;for(;a>u;u++)if(n=r[u],!(!n.selected&&u!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),o)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=x.makeArray(t),s=i.length;while(s--)r=i[s],(r.selected=x.inArray(x(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,t,n){var i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return typeof e.getAttribute===r?x.prop(e,t,n):(1===s&&x.isXMLDoc(e)||(t=t.toLowerCase(),i=x.attrHooks[t]||(x.expr.match.bool.test(t)?M:R)),n===undefined?i&&"get"in i&&null!==(o=i.get(e,t))?o:(o=x.find.attr(e,t),null==o?undefined:o):null!==n?i&&"set"in i&&(o=i.set(e,n,t))!==undefined?o:(e.setAttribute(t,n+""),n):(x.removeAttr(e,t),undefined))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=x.propFix[n]||n,x.expr.match.bool.test(n)&&(e[r]=!1),e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,t,n){var r,i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return o=1!==s||!x.isXMLDoc(e),o&&(t=x.propFix[t]||t,i=x.propHooks[t]),n!==undefined?i&&"set"in i&&(r=i.set(e,n,t))!==undefined?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||B.test(e.nodeName)||e.href?e.tabIndex:-1}}}}),M={set:function(e,t,n){return t===!1?x.removeAttr(e,n):e.setAttribute(n,n),n}},x.each(x.expr.match.bool.source.match(/\w+/g),function(e,t){var n=x.expr.attrHandle[t]||x.find.attr;x.expr.attrHandle[t]=function(e,t,r){var i=x.expr.attrHandle[t],o=r?undefined:(x.expr.attrHandle[t]=undefined)!=n(e,t,r)?t.toLowerCase():null;return x.expr.attrHandle[t]=i,o}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,t){return x.isArray(t)?e.checked=x.inArray(x(e).val(),t)>=0:undefined}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var I=/^key/,z=/^(?:mouse|contextmenu)|click/,_=/^(?:focusinfocus|focusoutblur)$/,X=/^([^.]*)(?:\.(.+)|)$/;function U(){return!0}function Y(){return!1}function V(){try{return o.activeElement}catch(e){}}x.event={global:{},add:function(e,t,n,i,o){var s,a,u,l,c,p,f,h,d,g,m,y=q.get(e);if(y){n.handler&&(s=n,n=s.handler,o=s.selector),n.guid||(n.guid=x.guid++),(l=y.events)||(l=y.events={}),(a=y.handle)||(a=y.handle=function(e){return typeof x===r||e&&x.event.triggered===e.type?undefined:x.event.dispatch.apply(a.elem,arguments)},a.elem=e),t=(t||"").match(w)||[""],c=t.length;while(c--)u=X.exec(t[c])||[],d=m=u[1],g=(u[2]||"").split(".").sort(),d&&(f=x.event.special[d]||{},d=(o?f.delegateType:f.bindType)||d,f=x.event.special[d]||{},p=x.extend({type:d,origType:m,data:i,handler:n,guid:n.guid,selector:o,needsContext:o&&x.expr.match.needsContext.test(o),namespace:g.join(".")},s),(h=l[d])||(h=l[d]=[],h.delegateCount=0,f.setup&&f.setup.call(e,i,g,a)!==!1||e.addEventListener&&e.addEventListener(d,a,!1)),f.add&&(f.add.call(e,p),p.handler.guid||(p.handler.guid=n.guid)),o?h.splice(h.delegateCount++,0,p):h.push(p),x.event.global[d]=!0);e=null}},remove:function(e,t,n,r,i){var o,s,a,u,l,c,p,f,h,d,g,m=q.hasData(e)&&q.get(e);if(m&&(u=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(a=X.exec(t[l])||[],h=g=a[1],d=(a[2]||"").split(".").sort(),h){p=x.event.special[h]||{},h=(r?p.delegateType:p.bindType)||h,f=u[h]||[],a=a[2]&&RegExp("(^|\\.)"+d.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=f.length;while(o--)c=f[o],!i&&g!==c.origType||n&&n.guid!==c.guid||a&&!a.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(f.splice(o,1),c.selector&&f.delegateCount--,p.remove&&p.remove.call(e,c));s&&!f.length&&(p.teardown&&p.teardown.call(e,d,m.handle)!==!1||x.removeEvent(e,h,m.handle),delete u[h])}else for(h in u)x.event.remove(e,h+t[l],n,r,!0);x.isEmptyObject(u)&&(delete m.handle,q.remove(e,"events"))}},trigger:function(t,n,r,i){var s,a,u,l,c,p,f,h=[r||o],d=y.call(t,"type")?t.type:t,g=y.call(t,"namespace")?t.namespace.split("."):[];if(a=u=r=r||o,3!==r.nodeType&&8!==r.nodeType&&!_.test(d+x.event.triggered)&&(d.indexOf(".")>=0&&(g=d.split("."),d=g.shift(),g.sort()),c=0>d.indexOf(":")&&"on"+d,t=t[x.expando]?t:new x.Event(d,"object"==typeof t&&t),t.isTrigger=i?2:3,t.namespace=g.join("."),t.namespace_re=t.namespace?RegExp("(^|\\.)"+g.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=undefined,t.target||(t.target=r),n=null==n?[t]:x.makeArray(n,[t]),f=x.event.special[d]||{},i||!f.trigger||f.trigger.apply(r,n)!==!1)){if(!i&&!f.noBubble&&!x.isWindow(r)){for(l=f.delegateType||d,_.test(l+d)||(a=a.parentNode);a;a=a.parentNode)h.push(a),u=a;u===(r.ownerDocument||o)&&h.push(u.defaultView||u.parentWindow||e)}s=0;while((a=h[s++])&&!t.isPropagationStopped())t.type=s>1?l:f.bindType||d,p=(q.get(a,"events")||{})[t.type]&&q.get(a,"handle"),p&&p.apply(a,n),p=c&&a[c],p&&x.acceptData(a)&&p.apply&&p.apply(a,n)===!1&&t.preventDefault();return t.type=d,i||t.isDefaultPrevented()||f._default&&f._default.apply(h.pop(),n)!==!1||!x.acceptData(r)||c&&x.isFunction(r[d])&&!x.isWindow(r)&&(u=r[c],u&&(r[c]=null),x.event.triggered=d,r[d](),x.event.triggered=undefined,u&&(r[c]=u)),t.result}},dispatch:function(e){e=x.event.fix(e);var t,n,r,i,o,s=[],a=d.call(arguments),u=(q.get(this,"events")||{})[e.type]||[],l=x.event.special[e.type]||{};if(a[0]=e,e.delegateTarget=this,!l.preDispatch||l.preDispatch.call(this,e)!==!1){s=x.event.handlers.call(this,e,u),t=0;while((i=s[t++])&&!e.isPropagationStopped()){e.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(o.namespace))&&(e.handleObj=o,e.data=o.data,r=((x.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,a),r!==undefined&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return l.postDispatch&&l.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,i,o,s=[],a=t.delegateCount,u=e.target;if(a&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!==this;u=u.parentNode||this)if(u.disabled!==!0||"click"!==e.type){for(r=[],n=0;a>n;n++)o=t[n],i=o.selector+" ",r[i]===undefined&&(r[i]=o.needsContext?x(i,this).index(u)>=0:x.find(i,this,null,[u]).length),r[i]&&r.push(o);r.length&&s.push({elem:u,handlers:r})}return t.length>a&&s.push({elem:this,handlers:t.slice(a)}),s},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,i,s=t.button;return null==e.pageX&&null!=t.clientX&&(n=e.target.ownerDocument||o,r=n.documentElement,i=n.body,e.pageX=t.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&i.clientLeft||0),e.pageY=t.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&i.clientTop||0)),e.which||s===undefined||(e.which=1&s?1:2&s?3:4&s?2:0),e}},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,s=e,a=this.fixHooks[i];a||(this.fixHooks[i]=a=z.test(i)?this.mouseHooks:I.test(i)?this.keyHooks:{}),r=a.props?this.props.concat(a.props):this.props,e=new x.Event(s),t=r.length;while(t--)n=r[t],e[n]=s[n];return e.target||(e.target=o),3===e.target.nodeType&&(e.target=e.target.parentNode),a.filter?a.filter(e,s):e},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==V()&&this.focus?(this.focus(),!1):undefined},delegateType:"focusin"},blur:{trigger:function(){return this===V()&&this.blur?(this.blur(),!1):undefined},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&x.nodeName(this,"input")?(this.click(),!1):undefined},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==undefined&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},x.Event=function(e,t){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.getPreventDefault&&e.getPreventDefault()?U:Y):this.type=e,t&&x.extend(this,t),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,undefined):new x.Event(e,t)},x.Event.prototype={isDefaultPrevented:Y,isPropagationStopped:Y,isImmediatePropagationStopped:Y,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=U,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=U,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=U,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,t,n,r,i){var o,s;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=undefined);for(s in e)this.on(s,t,n,e[s],i);return this}if(null==n&&null==r?(r=t,n=t=undefined):null==r&&("string"==typeof t?(r=n,n=undefined):(r=n,n=t,t=undefined)),r===!1)r=Y;else if(!r)return this;return 1===i&&(o=r,r=function(e){return x().off(e),o.apply(this,arguments)},r.guid=o.guid||(o.guid=x.guid++)),this.each(function(){x.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,x(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=undefined),n===!1&&(n=Y),this.each(function(){x.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?x.event.trigger(e,t,n,!0):undefined}});var G=/^.[^:#\[\.,]*$/,J=/^(?:parents|prev(?:Until|All))/,Q=x.expr.match.needsContext,K={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(x(e).filter(function(){for(t=0;i>t;t++)if(x.contains(r[t],this))return!0}));for(t=0;i>t;t++)x.find(e,r[t],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t=x(e,this),n=t.length;return this.filter(function(){var e=0;for(;n>e;e++)if(x.contains(this,t[e]))return!0})},not:function(e){return this.pushStack(et(this,e||[],!0))},filter:function(e){return this.pushStack(et(this,e||[],!1))},is:function(e){return!!et(this,"string"==typeof e&&Q.test(e)?x(e):e||[],!1).length},closest:function(e,t){var n,r=0,i=this.length,o=[],s=Q.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(s?s.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?x.unique(o):o)},index:function(e){return e?"string"==typeof e?g.call(x(e),this[0]):g.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function Z(e,t){while((e=e[t])&&1!==e.nodeType);return e}x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return Z(e,"nextSibling")},prev:function(e){return Z(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return e.contentDocument||x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(K[e]||x.unique(i),J.test(e)&&i.reverse()),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,t,n){var r=[],i=n!==undefined;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&x(e).is(n))break;r.push(e)}return r},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function et(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(G.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return g.call(t,e)>=0!==n})}var tt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,nt=/<([\w:]+)/,rt=/<|&#?\w+;/,it=/<(?:script|style|link)/i,ot=/^(?:checkbox|radio)$/i,st=/checked\s*(?:[^=]|=\s*.checked.)/i,at=/^$|\/(?:java|ecma)script/i,ut=/^true\/(.*)/,lt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ct={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ct.optgroup=ct.option,ct.tbody=ct.tfoot=ct.colgroup=ct.caption=ct.thead,ct.th=ct.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===undefined?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(mt(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&dt(mt(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++)1===e.nodeType&&(x.cleanData(mt(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var t=this[0]||{},n=0,r=this.length;if(e===undefined&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!it.test(e)&&!ct[(nt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(tt,"<$1></$2>");try{for(;r>n;n++)t=this[n]||{},1===t.nodeType&&(x.cleanData(mt(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=f.apply([],e);var r,i,o,s,a,u,l=0,c=this.length,p=this,h=c-1,d=e[0],g=x.isFunction(d);if(g||!(1>=c||"string"!=typeof d||x.support.checkClone)&&st.test(d))return this.each(function(r){var i=p.eq(r);g&&(e[0]=d.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(r=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),i=r.firstChild,1===r.childNodes.length&&(r=i),i)){for(o=x.map(mt(r,"script"),ft),s=o.length;c>l;l++)a=r,l!==h&&(a=x.clone(a,!0,!0),s&&x.merge(o,mt(a,"script"))),t.call(this[l],a,l);if(s)for(u=o[o.length-1].ownerDocument,x.map(o,ht),l=0;s>l;l++)a=o[l],at.test(a.type||"")&&!q.access(a,"globalEval")&&x.contains(u,a)&&(a.src?x._evalUrl(a.src):x.globalEval(a.textContent.replace(lt,"")))}return this}}),x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=[],i=x(e),o=i.length-1,s=0;for(;o>=s;s++)n=s===o?this:this.clone(!0),x(i[s])[t](n),h.apply(r,n.get());return this.pushStack(r)}}),x.extend({clone:function(e,t,n){var r,i,o,s,a=e.cloneNode(!0),u=x.contains(e.ownerDocument,e);if(!(x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(s=mt(a),o=mt(e),r=0,i=o.length;i>r;r++)yt(o[r],s[r]);if(t)if(n)for(o=o||mt(e),s=s||mt(a),r=0,i=o.length;i>r;r++)gt(o[r],s[r]);else gt(e,a);return s=mt(a,"script"),s.length>0&&dt(s,!u&&mt(e,"script")),a},buildFragment:function(e,t,n,r){var i,o,s,a,u,l,c=0,p=e.length,f=t.createDocumentFragment(),h=[];for(;p>c;c++)if(i=e[c],i||0===i)if("object"===x.type(i))x.merge(h,i.nodeType?[i]:i);else if(rt.test(i)){o=o||f.appendChild(t.createElement("div")),s=(nt.exec(i)||["",""])[1].toLowerCase(),a=ct[s]||ct._default,o.innerHTML=a[1]+i.replace(tt,"<$1></$2>")+a[2],l=a[0];while(l--)o=o.lastChild;x.merge(h,o.childNodes),o=f.firstChild,o.textContent=""}else h.push(t.createTextNode(i));f.textContent="",c=0;while(i=h[c++])if((!r||-1===x.inArray(i,r))&&(u=x.contains(i.ownerDocument,i),o=mt(f.appendChild(i),"script"),u&&dt(o),n)){l=0;while(i=o[l++])at.test(i.type||"")&&n.push(i)}return f},cleanData:function(e){var t,n,r,i,o,s,a=x.event.special,u=0;for(;(n=e[u])!==undefined;u++){if(F.accepts(n)&&(o=n[q.expando],o&&(t=q.cache[o]))){if(r=Object.keys(t.events||{}),r.length)for(s=0;(i=r[s])!==undefined;s++)a[i]?x.event.remove(n,i):x.removeEvent(n,i,t.handle);q.cache[o]&&delete q.cache[o]}delete L.cache[n[L.expando]]}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}});function pt(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function ft(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function ht(e){var t=ut.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function dt(e,t){var n=e.length,r=0;for(;n>r;r++)q.set(e[r],"globalEval",!t||q.get(t[r],"globalEval"))}function gt(e,t){var n,r,i,o,s,a,u,l;if(1===t.nodeType){if(q.hasData(e)&&(o=q.access(e),s=q.set(t,o),l=o.events)){delete s.handle,s.events={};for(i in l)for(n=0,r=l[i].length;r>n;n++)x.event.add(t,i,l[i][n])}L.hasData(e)&&(a=L.access(e),u=x.extend({},a),L.set(t,u))}}function mt(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[];return t===undefined||t&&x.nodeName(e,t)?x.merge([e],n):n}function yt(e,t){var n=t.nodeName.toLowerCase();"input"===n&&ot.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}x.fn.extend({wrapAll:function(e){var t;return x.isFunction(e)?this.each(function(t){x(this).wrapAll(e.call(this,t))}):(this[0]&&(t=x(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this)},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var vt,xt,bt=/^(none|table(?!-c[ea]).+)/,wt=/^margin/,Tt=RegExp("^("+b+")(.*)$","i"),Ct=RegExp("^("+b+")(?!px)[a-z%]+$","i"),kt=RegExp("^([+-])=("+b+")","i"),Nt={BODY:"block"},Et={position:"absolute",visibility:"hidden",display:"block"},St={letterSpacing:0,fontWeight:400},jt=["Top","Right","Bottom","Left"],Dt=["Webkit","O","Moz","ms"];function At(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Dt.length;while(i--)if(t=Dt[i]+n,t in e)return t;return r}function Lt(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function qt(t){return e.getComputedStyle(t,null)}function Ht(e,t){var n,r,i,o=[],s=0,a=e.length;for(;a>s;s++)r=e[s],r.style&&(o[s]=q.get(r,"olddisplay"),n=r.style.display,t?(o[s]||"none"!==n||(r.style.display=""),""===r.style.display&&Lt(r)&&(o[s]=q.access(r,"olddisplay",Rt(r.nodeName)))):o[s]||(i=Lt(r),(n&&"none"!==n||!i)&&q.set(r,"olddisplay",i?n:x.css(r,"display"))));for(s=0;a>s;s++)r=e[s],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[s]||"":"none"));return e}x.fn.extend({css:function(e,t){return x.access(this,function(e,t,n){var r,i,o={},s=0;if(x.isArray(t)){for(r=qt(e),i=t.length;i>s;s++)o[t[s]]=x.css(e,t[s],!1,r);return o}return n!==undefined?x.style(e,t,n):x.css(e,t)},e,t,arguments.length>1)},show:function(){return Ht(this,!0)},hide:function(){return Ht(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){Lt(this)?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=vt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,s,a=x.camelCase(t),u=e.style;return t=x.cssProps[a]||(x.cssProps[a]=At(u,a)),s=x.cssHooks[t]||x.cssHooks[a],n===undefined?s&&"get"in s&&(i=s.get(e,!1,r))!==undefined?i:u[t]:(o=typeof n,"string"===o&&(i=kt.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(x.css(e,t)),o="number"),null==n||"number"===o&&isNaN(n)||("number"!==o||x.cssNumber[a]||(n+="px"),x.support.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),s&&"set"in s&&(n=s.set(e,n,r))===undefined||(u[t]=n)),undefined)}},css:function(e,t,n,r){var i,o,s,a=x.camelCase(t);return t=x.cssProps[a]||(x.cssProps[a]=At(e.style,a)),s=x.cssHooks[t]||x.cssHooks[a],s&&"get"in s&&(i=s.get(e,!0,n)),i===undefined&&(i=vt(e,t,r)),"normal"===i&&t in St&&(i=St[t]),""===n||n?(o=parseFloat(i),n===!0||x.isNumeric(o)?o||0:i):i}}),vt=function(e,t,n){var r,i,o,s=n||qt(e),a=s?s.getPropertyValue(t)||s[t]:undefined,u=e.style;return s&&(""!==a||x.contains(e.ownerDocument,e)||(a=x.style(e,t)),Ct.test(a)&&wt.test(t)&&(r=u.width,i=u.minWidth,o=u.maxWidth,u.minWidth=u.maxWidth=u.width=a,a=s.width,u.width=r,u.minWidth=i,u.maxWidth=o)),a};function Ot(e,t,n){var r=Tt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function Ft(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,s=0;for(;4>o;o+=2)"margin"===n&&(s+=x.css(e,n+jt[o],!0,i)),r?("content"===n&&(s-=x.css(e,"padding"+jt[o],!0,i)),"margin"!==n&&(s-=x.css(e,"border"+jt[o]+"Width",!0,i))):(s+=x.css(e,"padding"+jt[o],!0,i),"padding"!==n&&(s+=x.css(e,"border"+jt[o]+"Width",!0,i)));return s}function Pt(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=qt(e),s=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=vt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Ct.test(i))return i;r=s&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+Ft(e,t,n||(s?"border":"content"),r,o)+"px"}function Rt(e){var t=o,n=Nt[e];return n||(n=Mt(e,t),"none"!==n&&n||(xt=(xt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(xt[0].contentWindow||xt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=Mt(e,t),xt.detach()),Nt[e]=n),n}function Mt(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}x.each(["height","width"],function(e,t){x.cssHooks[t]={get:function(e,n,r){return n?0===e.offsetWidth&&bt.test(x.css(e,"display"))?x.swap(e,Et,function(){return Pt(e,t,r)}):Pt(e,t,r):undefined},set:function(e,n,r){var i=r&&qt(e);return Ot(e,n,r?Ft(e,t,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,t){return t?x.swap(e,{display:"inline-block"},vt,[e,"marginRight"]):undefined}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,t){x.cssHooks[t]={get:function(e,n){return n?(n=vt(e,t),Ct.test(n)?x(e).position()[t]+"px":n):undefined}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+jt[r]+t]=o[r]||o[r-2]||o[0];return i}},wt.test(e)||(x.cssHooks[e+t].set=Ot)});var Wt=/%20/g,$t=/\[\]$/,Bt=/\r?\n/g,It=/^(?:submit|button|image|reset|file)$/i,zt=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&zt.test(this.nodeName)&&!It.test(e)&&(this.checked||!ot.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace(Bt,"\r\n")}}):{name:t.name,value:n.replace(Bt,"\r\n")}}).get()}}),x.param=function(e,t){var n,r=[],i=function(e,t){t=x.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(t===undefined&&(t=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){i(this.name,this.value)});else for(n in e)_t(n,e[n],t,i);return r.join("&").replace(Wt,"+")};function _t(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||$t.test(e)?r(e,i):_t(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)_t(e+"["+i+"]",t[i],n,r)}x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)

},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var Xt,Ut,Yt=x.now(),Vt=/\?/,Gt=/#.*$/,Jt=/([?&])_=[^&]*/,Qt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Kt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Zt=/^(?:GET|HEAD)$/,en=/^\/\//,tn=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,nn=x.fn.load,rn={},on={},sn="*/".concat("*");try{Ut=i.href}catch(an){Ut=o.createElement("a"),Ut.href="",Ut=Ut.href}Xt=tn.exec(Ut.toLowerCase())||[];function un(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(x.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function ln(e,t,n,r){var i={},o=e===on;function s(a){var u;return i[a]=!0,x.each(e[a]||[],function(e,a){var l=a(t,n,r);return"string"!=typeof l||o||i[l]?o?!(u=l):undefined:(t.dataTypes.unshift(l),s(l),!1)}),u}return s(t.dataTypes[0])||!i["*"]&&s("*")}function cn(e,t){var n,r,i=x.ajaxSettings.flatOptions||{};for(n in t)t[n]!==undefined&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&x.extend(!0,e,r),e}x.fn.load=function(e,t,n){if("string"!=typeof e&&nn)return nn.apply(this,arguments);var r,i,o,s=this,a=e.indexOf(" ");return a>=0&&(r=e.slice(a),e=e.slice(0,a)),x.isFunction(t)?(n=t,t=undefined):t&&"object"==typeof t&&(i="POST"),s.length>0&&x.ajax({url:e,type:i,dataType:"html",data:t}).done(function(e){o=arguments,s.html(r?x("<div>").append(x.parseHTML(e)).find(r):e)}).complete(n&&function(e,t){s.each(n,o||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ut,type:"GET",isLocal:Kt.test(Xt[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":sn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?cn(cn(e,x.ajaxSettings),t):cn(x.ajaxSettings,e)},ajaxPrefilter:un(rn),ajaxTransport:un(on),ajax:function(e,t){"object"==typeof e&&(t=e,e=undefined),t=t||{};var n,r,i,o,s,a,u,l,c=x.ajaxSetup({},t),p=c.context||c,f=c.context&&(p.nodeType||p.jquery)?x(p):x.event,h=x.Deferred(),d=x.Callbacks("once memory"),g=c.statusCode||{},m={},y={},v=0,b="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(2===v){if(!o){o={};while(t=Qt.exec(i))o[t[1].toLowerCase()]=t[2]}t=o[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===v?i:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return v||(e=y[n]=y[n]||e,m[e]=t),this},overrideMimeType:function(e){return v||(c.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>v)for(t in e)g[t]=[g[t],e[t]];else T.always(e[T.status]);return this},abort:function(e){var t=e||b;return n&&n.abort(t),k(0,t),this}};if(h.promise(T).complete=d.add,T.success=T.done,T.error=T.fail,c.url=((e||c.url||Ut)+"").replace(Gt,"").replace(en,Xt[1]+"//"),c.type=t.method||t.type||c.method||c.type,c.dataTypes=x.trim(c.dataType||"*").toLowerCase().match(w)||[""],null==c.crossDomain&&(a=tn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===Xt[1]&&a[2]===Xt[2]&&(a[3]||("http:"===a[1]?"80":"443"))===(Xt[3]||("http:"===Xt[1]?"80":"443")))),c.data&&c.processData&&"string"!=typeof c.data&&(c.data=x.param(c.data,c.traditional)),ln(rn,c,t,T),2===v)return T;u=c.global,u&&0===x.active++&&x.event.trigger("ajaxStart"),c.type=c.type.toUpperCase(),c.hasContent=!Zt.test(c.type),r=c.url,c.hasContent||(c.data&&(r=c.url+=(Vt.test(r)?"&":"?")+c.data,delete c.data),c.cache===!1&&(c.url=Jt.test(r)?r.replace(Jt,"$1_="+Yt++):r+(Vt.test(r)?"&":"?")+"_="+Yt++)),c.ifModified&&(x.lastModified[r]&&T.setRequestHeader("If-Modified-Since",x.lastModified[r]),x.etag[r]&&T.setRequestHeader("If-None-Match",x.etag[r])),(c.data&&c.hasContent&&c.contentType!==!1||t.contentType)&&T.setRequestHeader("Content-Type",c.contentType),T.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+("*"!==c.dataTypes[0]?", "+sn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)T.setRequestHeader(l,c.headers[l]);if(c.beforeSend&&(c.beforeSend.call(p,T,c)===!1||2===v))return T.abort();b="abort";for(l in{success:1,error:1,complete:1})T[l](c[l]);if(n=ln(on,c,t,T)){T.readyState=1,u&&f.trigger("ajaxSend",[T,c]),c.async&&c.timeout>0&&(s=setTimeout(function(){T.abort("timeout")},c.timeout));try{v=1,n.send(m,k)}catch(C){if(!(2>v))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,t,o,a){var l,m,y,b,w,C=t;2!==v&&(v=2,s&&clearTimeout(s),n=undefined,i=a||"",T.readyState=e>0?4:0,l=e>=200&&300>e||304===e,o&&(b=pn(c,T,o)),b=fn(c,b,T,l),l?(c.ifModified&&(w=T.getResponseHeader("Last-Modified"),w&&(x.lastModified[r]=w),w=T.getResponseHeader("etag"),w&&(x.etag[r]=w)),204===e||"HEAD"===c.type?C="nocontent":304===e?C="notmodified":(C=b.state,m=b.data,y=b.error,l=!y)):(y=C,(e||!C)&&(C="error",0>e&&(e=0))),T.status=e,T.statusText=(t||C)+"",l?h.resolveWith(p,[m,C,T]):h.rejectWith(p,[T,C,y]),T.statusCode(g),g=undefined,u&&f.trigger(l?"ajaxSuccess":"ajaxError",[T,c,l?m:y]),d.fireWith(p,[T,C]),u&&(f.trigger("ajaxComplete",[T,c]),--x.active||x.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,t){return x.get(e,undefined,t,"script")}}),x.each(["get","post"],function(e,t){x[t]=function(e,n,r,i){return x.isFunction(n)&&(i=i||r,r=n,n=undefined),x.ajax({url:e,type:t,dataType:i,data:n,success:r})}});function pn(e,t,n){var r,i,o,s,a=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),r===undefined&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in a)if(a[i]&&a[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}s||(s=i)}o=o||s}return o?(o!==u[0]&&u.unshift(o),n[o]):undefined}function fn(e,t,n,r){var i,o,s,a,u,l={},c=e.dataTypes.slice();if(c[1])for(s in e.converters)l[s.toLowerCase()]=e.converters[s];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(s=l[u+" "+o]||l["* "+o],!s)for(i in l)if(a=i.split(" "),a[1]===o&&(s=l[u+" "+a[0]]||l["* "+a[0]])){s===!0?s=l[i]:l[i]!==!0&&(o=a[0],c.unshift(a[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(p){return{state:"parsererror",error:s?p:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===undefined&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),x.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(r,i){t=x("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),o.head.appendChild(t[0])},abort:function(){n&&n()}}}});var hn=[],dn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=hn.pop()||x.expando+"_"+Yt++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,s,a=t.jsonp!==!1&&(dn.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&dn.test(t.data)&&"data");return a||"jsonp"===t.dataTypes[0]?(i=t.jsonpCallback=x.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(dn,"$1"+i):t.jsonp!==!1&&(t.url+=(Vt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return s||x.error(i+" was not called"),s[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){s=arguments},r.always(function(){e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,hn.push(i)),s&&x.isFunction(o)&&o(s[0]),s=o=undefined}),"script"):undefined}),x.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var gn=x.ajaxSettings.xhr(),mn={0:200,1223:204},yn=0,vn={};e.ActiveXObject&&x(e).on("unload",function(){for(var e in vn)vn[e]();vn=undefined}),x.support.cors=!!gn&&"withCredentials"in gn,x.support.ajax=gn=!!gn,x.ajaxTransport(function(e){var t;return x.support.cors||gn&&!e.crossDomain?{send:function(n,r){var i,o,s=e.xhr();if(s.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(i in e.xhrFields)s[i]=e.xhrFields[i];e.mimeType&&s.overrideMimeType&&s.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(i in n)s.setRequestHeader(i,n[i]);t=function(e){return function(){t&&(delete vn[o],t=s.onload=s.onerror=null,"abort"===e?s.abort():"error"===e?r(s.status||404,s.statusText):r(mn[s.status]||s.status,s.statusText,"string"==typeof s.responseText?{text:s.responseText}:undefined,s.getAllResponseHeaders()))}},s.onload=t(),s.onerror=t("error"),t=vn[o=yn++]=t("abort"),s.send(e.hasContent&&e.data||null)},abort:function(){t&&t()}}:undefined});var xn,bn,wn=/^(?:toggle|show|hide)$/,Tn=RegExp("^(?:([+-])=|)("+b+")([a-z%]*)$","i"),Cn=/queueHooks$/,kn=[An],Nn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Tn.exec(t),o=i&&i[3]||(x.cssNumber[e]?"":"px"),s=(x.cssNumber[e]||"px"!==o&&+r)&&Tn.exec(x.css(n.elem,e)),a=1,u=20;if(s&&s[3]!==o){o=o||s[3],i=i||[],s=+r||1;do a=a||".5",s/=a,x.style(n.elem,e,s+o);while(a!==(a=n.cur()/r)&&1!==a&&--u)}return i&&(s=n.start=+s||+r||0,n.unit=o,n.end=i[1]?s+(i[1]+1)*i[2]:+i[2]),n}]};function En(){return setTimeout(function(){xn=undefined}),xn=x.now()}function Sn(e,t,n){var r,i=(Nn[t]||[]).concat(Nn["*"]),o=0,s=i.length;for(;s>o;o++)if(r=i[o].call(n,t,e))return r}function jn(e,t,n){var r,i,o=0,s=kn.length,a=x.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=xn||En(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,s=0,u=l.tweens.length;for(;u>s;s++)l.tweens[s].run(o);return a.notifyWith(e,[l,o,n]),1>o&&u?n:(a.resolveWith(e,[l]),!1)},l=a.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:xn||En(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?a.resolveWith(e,[l,t]):a.rejectWith(e,[l,t]),this}}),c=l.props;for(Dn(c,l.opts.specialEasing);s>o;o++)if(r=kn[o].call(l,e,c,l.opts))return r;return x.map(c,Sn,l),x.isFunction(l.opts.start)&&l.opts.start.call(e,l),x.fx.timer(x.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function Dn(e,t){var n,r,i,o,s;for(n in e)if(r=x.camelCase(n),i=t[r],o=e[n],x.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),s=x.cssHooks[r],s&&"expand"in s){o=s.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}x.Animation=x.extend(jn,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Nn[n]=Nn[n]||[],Nn[n].unshift(t)},prefilter:function(e,t){t?kn.unshift(e):kn.push(e)}});function An(e,t,n){var r,i,o,s,a,u,l=this,c={},p=e.style,f=e.nodeType&&Lt(e),h=q.get(e,"fxshow");n.queue||(a=x._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,u=a.empty.fire,a.empty.fire=function(){a.unqueued||u()}),a.unqueued++,l.always(function(){l.always(function(){a.unqueued--,x.queue(e,"fx").length||a.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(p.display="inline-block")),n.overflow&&(p.overflow="hidden",l.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],wn.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(f?"hide":"show")){if("show"!==i||!h||h[r]===undefined)continue;f=!0}c[r]=h&&h[r]||x.style(e,r)}if(!x.isEmptyObject(c)){h?"hidden"in h&&(f=h.hidden):h=q.access(e,"fxshow",{}),o&&(h.hidden=!f),f?x(e).show():l.done(function(){x(e).hide()}),l.done(function(){var t;q.remove(e,"fxshow");for(t in c)x.style(e,t,c[t])});for(r in c)s=Sn(f?h[r]:0,r,l),r in h||(h[r]=s.start,f&&(s.end=s.start,s.start="width"===r||"height"===r?1:0))}}function Ln(e,t,n,r,i){return new Ln.prototype.init(e,t,n,r,i)}x.Tween=Ln,Ln.prototype={constructor:Ln,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(x.cssNumber[n]?"":"px")},cur:function(){var e=Ln.propHooks[this.prop];return e&&e.get?e.get(this):Ln.propHooks._default.get(this)},run:function(e){var t,n=Ln.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Ln.propHooks._default.set(this),this}},Ln.prototype.init.prototype=Ln.prototype,Ln.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Ln.propHooks.scrollTop=Ln.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(qn(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Lt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),o=x.speed(t,n,r),s=function(){var t=jn(this,x.extend({},e),o);(i||q.get(this,"finish"))&&t.stop(!0)};return s.finish=s,i||o.queue===!1?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=undefined),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=x.timers,s=q.get(this);if(i)s[i]&&s[i].stop&&r(s[i]);else for(i in s)s[i]&&s[i].stop&&Cn.test(i)&&r(s[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));(t||!n)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=q.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=x.timers,s=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;s>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function qn(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=jt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}x.each({slideDown:qn("show"),slideUp:qn("hide"),slideToggle:qn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=Ln.prototype.init,x.fx.tick=function(){var e,t=x.timers,n=0;for(xn=x.now();t.length>n;n++)e=t[n],e()||t[n]!==e||t.splice(n--,1);t.length||x.fx.stop(),xn=undefined},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){bn||(bn=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(bn),bn=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===undefined?this:this.each(function(t){x.offset.setOffset(this,e,t)});var t,n,i=this[0],o={top:0,left:0},s=i&&i.ownerDocument;if(s)return t=s.documentElement,x.contains(t,i)?(typeof i.getBoundingClientRect!==r&&(o=i.getBoundingClientRect()),n=Hn(s),{top:o.top+n.pageYOffset-t.clientTop,left:o.left+n.pageXOffset-t.clientLeft}):o},x.offset={setOffset:function(e,t,n){var r,i,o,s,a,u,l,c=x.css(e,"position"),p=x(e),f={};"static"===c&&(e.style.position="relative"),a=p.offset(),o=x.css(e,"top"),u=x.css(e,"left"),l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1,l?(r=p.position(),s=r.top,i=r.left):(s=parseFloat(o)||0,i=parseFloat(u)||0),x.isFunction(t)&&(t=t.call(e,n,a)),null!=t.top&&(f.top=t.top-a.top+s),null!=t.left&&(f.left=t.left-a.left+i),"using"in t?t.using.call(e,f):p.css(f)}},x.fn.extend({position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};return"fixed"===x.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(r=e.offset()),r.top+=x.css(e[0],"borderTopWidth",!0),r.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-r.top-x.css(n,"marginTop",!0),left:t.left-r.left-x.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,n){var r="pageYOffset"===n;x.fn[t]=function(i){return x.access(this,function(t,i,o){var s=Hn(t);return o===undefined?s?s[n]:t[i]:(s?s.scrollTo(r?e.pageXOffset:o,r?o:e.pageYOffset):t[i]=o,undefined)},t,i,arguments.length,null)}});function Hn(e){return x.isWindow(e)?e:9===e.nodeType&&e.defaultView}x.each({Height:"height",Width:"width"},function(e,t){x.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){x.fn[r]=function(r,i){var o=arguments.length&&(n||"boolean"!=typeof r),s=n||(r===!0||i===!0?"margin":"border");return x.access(this,function(t,n,r){var i;return x.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):r===undefined?x.css(t,n,s):x.style(t,n,r,s)},t,o?r:undefined,o,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=x:"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}),"object"==typeof e&&"object"==typeof e.document&&(e.jQuery=e.$=x)})(window);
