$(".nano, .menu-items").nanoScroller({
	  alwaysVisible: true,
	  scroll: 'top'
});
    
$('html').on('click','.back-btn, .close-btn', function(event) {
    window.history.back();
});

$('html').on('click','.expand-items-btn', function(event) {
    $('.items-prices').toggleClass('open'); 
});